
import { useState } from 'react';
import { supabase } from '../supabase';

const BATCH_SIZE = 100;

const styles = {
  panel: {
    background: '#fff',
    border: '1px solid #e8e5df',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '28px',
  },
  button: {
    border: 'none',
    borderRadius: '6px',
    padding: '12px 18px',
    background: '#c5a46d',
    color: '#101d2b',
    fontWeight: '700',
    cursor: 'pointer',
  },
  secondary: {
    border: '1px solid #d9d5cd',
    borderRadius: '6px',
    padding: '11px 16px',
    background: '#fff',
    color: '#243449',
    fontWeight: '600',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    minWidth: '650px',
  },
  cell: {
    padding: '11px',
    borderBottom: '1px solid #eee',
    textAlign: 'left',
  },
};

function normaliseHeader(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function getField(row, aliases) {
  const keys = Object.keys(row);

  for (const alias of aliases) {
    const found = keys.find(
      key => normaliseHeader(key) === normaliseHeader(alias)
    );

    if (found !== undefined && String(row[found]).trim() !== '') {
      return String(row[found]).trim();
    }
  }

  return '';
}

function cleanValue(value) {
  const cleaned = String(value ?? '').trim();

  if (
    !cleaned ||
    ['nil', 'null', 'undefined', 'n/a', 'na', 'none'].includes(
      cleaned.toLowerCase()
    )
  ) {
    return '';
  }

  return cleaned;
}

function mapSpreadsheetRow(row) {
  const rawCategory = getField(row, [
    'category',
    'property category',
    'property type',
    'listing type',
  ]).toLowerCase();

  let category = '';

  if (['land', 'plot', 'plots', 'land property'].includes(rawCategory)) {
    category = 'Land';
  } else if (['residential', 'house', 'houses'].includes(rawCategory)) {
    category = 'Residential';
  } else if (['commercial', 'building'].includes(rawCategory)) {
    category = 'Commercial';
  }

  const propertyUse = cleanValue(
    getField(row, [
      'propertyUse',
      'property use',
      'land use',
      'intended use',
    ])
  );

  const statusValue = getField(row, ['status', 'availability']).toLowerCase();

  const status =
    statusValue === 'sold' ? 'Sold' : 'Available';

  return {
    title: cleanValue(getField(row, ['title', 'property name', 'name'])),
    location: cleanValue(getField(row, ['location', 'address', 'area'])),
    category,
    propertyUse,
    price: cleanValue(getField(row, ['price', 'asking price'])),
    units: cleanValue(getField(row, ['units', 'number of units'])),
    bedrooms: cleanValue(getField(row, ['bedrooms', 'number of bedrooms'])),
    landSize: cleanValue(
      getField(row, ['landSize', 'land size', 'plot size', 'land area'])
    ),
    titleDocument: cleanValue(
  getField(row, [
    'titleDocument',
    'title document',
    'legal title',
    'title deed',
    'ownership document',
  ])
),
    description: cleanValue(
      getField(row, ['description', 'property description', 'details'])
    ),
    image: cleanValue(
      getField(row, ['image', 'image url', 'cover image', 'photo url'])
    ),
    status,
  };
}

function validateProperty(property) {
  const errors = [];

  if (!property.title) errors.push('Property name is required.');
  if (!property.location) errors.push('Location is required.');
  if (!property.category) {
    errors.push('Category must be Land, Residential or Commercial.');
  }
  if (!property.price) errors.push('Asking price is required.');

  if (property.category === 'Land') {
    if (!property.propertyUse) {
      errors.push('Land Use is required for land listings.');
    }

    if (!property.landSize) {
      errors.push('Plot Size is required for land listings.');
    }
  }

  if (
    property.image &&
    !/^https?:\/\/\S+$/i.test(property.image)
  ) {
    errors.push('Image must be a valid HTTP or HTTPS URL.');
  }

  return errors;
}

async function downloadTemplate() {
  const XLSX = await import('xlsx');
  const headers = [
    'title',
    'location',
    'category',
    'propertyUse',
    'price',
    'units',
    'bedrooms',
    'landSize',
    'titleDocument',
    'description',
    'image',
    'status',
  ];

  const examples = [
    [
      'Example Residential Plot',
      'Katampe, Abuja',
      'Land',
      'Residential',
      '₦150 Million',
      '',
      '',
      '1000 sqm',
      'C of O',
      'Example land description',
      '',
      'Available',
    ],
    [
      'Example Luxury Duplex',
      'Maitama, Abuja',
      'Residential',
      '',
      '₦850 Million',
      '1 Unit',
      '5 Bedrooms',
      '600 sqm',
      'C of O',
      'Example house description',
      '',
      'Available',
    ],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...examples]);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Properties');

  XLSX.writeFile(workbook, 'Saachizy_Property_Import_Template.xlsx');
}

function BulkPropertyImport({ properties = [] }) {
  const [previewRows, setPreviewRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [reading, setReading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setReading(true);
    setMessage('');
    setResult(null);
    setPreviewRows([]);
    setFileName(file.name);

    try {
      const extension = file.name.split('.').pop().toLowerCase();

      if (!['xlsx', 'xls', 'csv'].includes(extension)) {
        throw new Error('Please select an Excel or CSV file.');
      }

      const XLSX = await import('xlsx');

const buffer = await file.arrayBuffer();

      const workbook = XLSX.read(buffer, {
        type: 'array',
      });

      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawRows = XLSX.utils.sheet_to_json(firstSheet, {
        defval: '',
        raw: false,
      });

      if (!rawRows.length) {
        throw new Error('The selected spreadsheet contains no property records.');
      }

      const existingKeys = new Set(
        properties.map(property =>
          `${String(property.title || '').trim().toLowerCase()}|${String(
            property.location || ''
          ).trim().toLowerCase()}`
        )
      );

      const seenKeys = new Set();

      const preparedRows = rawRows.map((row, index) => {
        const property = mapSpreadsheetRow(row);
        const errors = validateProperty(property);

        const duplicateKey =
          `${property.title.toLowerCase()}|${property.location.toLowerCase()}`;

        if (property.title && property.location) {
          if (existingKeys.has(duplicateKey)) {
            errors.push('This property already exists in your portfolio.');
          }

          if (seenKeys.has(duplicateKey)) {
            errors.push('This property appears more than once in the spreadsheet.');
          }

          seenKeys.add(duplicateKey);
        }

        return {
          rowNumber: index + 2,
          property,
          errors,
        };
      });

      setPreviewRows(preparedRows);

      const validCount = preparedRows.filter(
        item => item.errors.length === 0
      ).length;

      setMessage(
        `Spreadsheet loaded: ${preparedRows.length} records found, ${validCount} ready for import.`
      );
    } catch (error) {
      console.error('Spreadsheet reading failed:', error);
      setMessage(error.message || 'Unable to read this spreadsheet.');
    } finally {
      setReading(false);
      event.target.value = '';
    }
  }

  async function handleImport() {
    const validRows = previewRows.filter(
      item => item.errors.length === 0
    );

    if (!validRows.length || importing) return;

    const confirmed = window.confirm(
      `Import ${validRows.length} valid properties into Saachizy? Existing records will not be overwritten.`
    );

    if (!confirmed) return;

    setImporting(true);
    setMessage('');

    let importedCount = 0;

    try {
      for (
        let index = 0;
        index < validRows.length;
        index += BATCH_SIZE
      ) {
        const batch = validRows
          .slice(index, index + BATCH_SIZE)
          .map(item => {
            const property = item.property;
            const isLand = property.category === 'Land';

            return {
              title: property.title,
              location: property.location,
              category: property.category,
              property_use: isLand ? property.propertyUse : null,
              price: property.price,
              units: isLand ? null : property.units || null,
              bedrooms: isLand ? null : property.bedrooms || null,
              land_size: property.landSize || null,
              title_document: property.titleDocument || null,
              description: property.description || null,
              image: property.image || null,
              status: property.status,
            };
          });

        const { error } = await supabase
          .from('properties')
          .insert(batch);

        if (error) {
          throw new Error(
            `Import stopped after ${importedCount} records: ${error.message}`
          );
        }

        importedCount += batch.length;

        setMessage(
          `Importing properties... ${importedCount} of ${validRows.length} completed.`
        );
      }

      setResult({
        imported: importedCount,
        skipped: previewRows.length - validRows.length,
      });

      setMessage(
        `Successfully imported ${importedCount} properties.`
      );

      setPreviewRows([]);

      setTimeout(() => {
        window.location.reload();
      }, 1800);
    } catch (error) {
      console.error('Bulk property import failed:', error);
      setMessage(error.message || 'The import could not be completed.');

      if (importedCount > 0) {
        setResult({
          imported: importedCount,
          skipped: previewRows.length - validRows.length,
        });
      }
    } finally {
      setImporting(false);
    }
  }

  const validCount = previewRows.filter(
    item => item.errors.length === 0
  ).length;

  const invalidCount = previewRows.length - validCount;

  return (
    <section style={styles.panel}>
      <div style={{ marginBottom: '20px' }}>
        <span
          style={{
            color: '#a1875c',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1.5px',
          }}
        >
          PORTFOLIO IMPORT
        </span>

        <h2
          style={{
            color: '#172638',
            margin: '8px 0',
            fontSize: '23px',
          }}
        >
          Upload Multiple Properties
        </h2>

        <p style={{ color: '#737373', fontSize: '14px', lineHeight: 1.6 }}>
          Import many land and house listings from one Excel or CSV
          spreadsheet. Review the records before saving them.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <button
          type="button"
          style={styles.secondary}
          onClick={downloadTemplate}
          disabled={reading || importing}
        >
          Download Excel Template
        </button>

        <label
          style={{
            ...styles.button,
            display: 'inline-block',
          }}
        >
          {reading ? 'Reading spreadsheet...' : 'Choose Excel / CSV File'}

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            disabled={reading || importing}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {fileName && (
        <p style={{ fontSize: '13px', color: '#666', marginTop: '12px' }}>
          Selected file: <strong>{fileName}</strong>
        </p>
      )}

      {message && (
        <p
          role="status"
          style={{
            marginTop: '16px',
            color: result ? '#18794e' : '#34465a',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>
      )}

      {result && (
        <div style={{ marginTop: '12px', fontSize: '14px' }}>
          <strong>{result.imported}</strong> imported successfully.
          {' '}
          <strong>{result.skipped}</strong> skipped.
        </div>
      )}

      {previewRows.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '14px',
              fontSize: '14px',
            }}
          >
            <strong style={{ color: '#18794e' }}>
              {validCount} valid
            </strong>

            <strong style={{ color: invalidCount ? '#b54708' : '#777' }}>
              {invalidCount} need attention
            </strong>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {['Row', 'Property', 'Location', 'Category', 'Price', 'Validation'].map(
                    heading => (
                      <th
                        key={heading}
                        style={{
                          ...styles.cell,
                          background: '#f7f6f3',
                          color: '#243449',
                        }}
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {previewRows.slice(0, 50).map(item => (
                  <tr key={item.rowNumber}>
                    <td style={styles.cell}>{item.rowNumber}</td>
                    <td style={styles.cell}>{item.property.title || '—'}</td>
                    <td style={styles.cell}>{item.property.location || '—'}</td>
                    <td style={styles.cell}>{item.property.category || '—'}</td>
                    <td style={styles.cell}>{item.property.price || '—'}</td>
                    <td style={styles.cell}>
                      {item.errors.length === 0 ? (
                        <span style={{ color: '#18794e', fontWeight: '600' }}>
                          Ready
                        </span>
                      ) : (
                        <span style={{ color: '#b54708' }}>
                          {item.errors.join(' ')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {previewRows.length > 50 && (
            <p style={{ fontSize: '12px', color: '#777' }}>
              Showing the first 50 records for preview. All {previewRows.length}
              {' '}records are checked before import.
            </p>
          )}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '20px',
            }}
          >
            <button
              type="button"
              style={styles.button}
              onClick={handleImport}
              disabled={validCount === 0 || importing}
            >
              {importing
                ? 'Importing...'
                : `Import ${validCount} Valid Properties`}
            </button>

            <button
              type="button"
              style={styles.secondary}
              disabled={importing}
              onClick={() => {
                setPreviewRows([]);
                setFileName('');
                setMessage('');
                setResult(null);
              }}
            >
              Clear Preview
            </button>
          </div>
        </div>
      )}

      <p
        style={{
          marginTop: '20px',
          color: '#888',
          fontSize: '12px',
          lineHeight: 1.6,
        }}
      >
        Imports are processed in batches of 100. Existing matching listings
        are skipped rather than overwritten. Photos and videos can be
        uploaded separately through the property management form.
      </p>
    </section>
  );
}

export default BulkPropertyImport;
