const fs = require('node:fs');
const path = require('node:path');
const Mocha = require('mocha');

const rootDir = path.resolve(__dirname, '..');
const testsDir = path.join(rootDir, 'tests');
const reportDir = path.join(rootDir, 'selenium-report');
const reportPath = path.join(reportDir, 'index.html');

function findTestFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...findTestFiles(entryPath));
      continue;
    }

    if (entry.name.endsWith('.test.js')) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

function html(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatDuration(duration) {
  return typeof duration === 'number' ? `${duration}ms` : '';
}

function outcomeClass(outcome) {
  return outcome.toLowerCase();
}

function writeHtmlReport(results) {
  fs.mkdirSync(reportDir, { recursive: true });

  const total = results.length;
  const passed = results.filter((result) => result.outcome === 'Passed').length;
  const failed = results.filter((result) => result.outcome === 'Failed').length;
  const skipped = results.filter((result) => result.outcome === 'Skipped').length;
  const outcome = failed > 0 ? 'Failed' : 'Passed';
  const generatedAt = new Date().toLocaleString();

  const rows = results.map((result) => {
    const details = result.outcome === 'Failed'
      ? `
        <tr class="failure-row">
          <td colspan="3">
            <div class="failure-details">
              <div class="detail-label">Error message</div>
              <pre>${html(result.message || 'No error message captured.')}</pre>
              <div class="detail-label">Stack trace</div>
              <pre>${html(result.stack || 'No stack trace captured.')}</pre>
            </div>
          </td>
        </tr>`
      : '';

    return `
        <tr>
          <td>${html(result.title)}</td>
          <td><span class="badge ${outcomeClass(result.outcome)}">${html(result.outcome)}</span></td>
          <td>${html(formatDuration(result.duration))}</td>
        </tr>${details}`;
  }).join('\n');

  const document = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Automation Exercise Selenium JavaScript Test Report</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #18212f;
      background: #f5f7fb;
    }

    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: 32px;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 28px;
    }

    .meta {
      color: #64748b;
      margin-bottom: 24px;
    }

    .summary {
      display: grid;
      grid-template-columns: repeat(5, minmax(120px, 1fr));
      gap: 12px;
      margin-bottom: 24px;
    }

    .tile {
      background: #ffffff;
      border: 1px solid #dde5f0;
      border-radius: 8px;
      padding: 16px;
    }

    .label {
      color: #64748b;
      font-size: 13px;
      margin-bottom: 6px;
    }

    .value {
      font-size: 26px;
      font-weight: 700;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #ffffff;
      border: 1px solid #dde5f0;
      border-radius: 8px;
      overflow: hidden;
    }

    th, td {
      text-align: left;
      padding: 12px 14px;
      border-bottom: 1px solid #e7edf5;
    }

    th {
      background: #eef3f9;
      font-size: 13px;
      color: #334155;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    .badge {
      display: inline-block;
      min-width: 72px;
      text-align: center;
      border-radius: 999px;
      padding: 4px 10px;
      font-size: 13px;
      font-weight: 700;
    }

    .passed {
      background: #dcfce7;
      color: #166534;
    }

    .failed {
      background: #fee2e2;
      color: #991b1b;
    }

    .skipped {
      background: #e0f2fe;
      color: #075985;
    }

    .failure-row td {
      background: #fff7f7;
    }

    .failure-details {
      border-left: 4px solid #ef4444;
      padding: 4px 0 4px 14px;
    }

    .detail-label {
      color: #991b1b;
      font-size: 13px;
      font-weight: 700;
      margin: 8px 0 6px;
    }

    pre {
      white-space: pre-wrap;
      overflow-x: auto;
      margin: 0 0 10px;
      padding: 12px;
      border-radius: 6px;
      background: #1f2937;
      color: #f8fafc;
      font-size: 12px;
      line-height: 1.45;
    }
  </style>
</head>
<body>
  <main>
    <h1>Automation Exercise Selenium JavaScript Test Report</h1>
    <div class="meta">Generated at ${html(generatedAt)}</div>

    <section class="summary">
      <div class="tile"><div class="label">Outcome</div><div class="value">${html(outcome)}</div></div>
      <div class="tile"><div class="label">Total</div><div class="value">${total}</div></div>
      <div class="tile"><div class="label">Passed</div><div class="value">${passed}</div></div>
      <div class="tile"><div class="label">Failed</div><div class="value">${failed}</div></div>
      <div class="tile"><div class="label">Skipped</div><div class="value">${skipped}</div></div>
    </section>

    <table>
      <thead>
        <tr>
          <th>Test Case</th>
          <th>Outcome</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
${rows}
      </tbody>
    </table>
  </main>
</body>
</html>
`;

  fs.writeFileSync(reportPath, document, 'utf8');
  console.log(`HTML report created: ${path.relative(rootDir, reportPath)}`);
}

const mocha = new Mocha({
  timeout: 90_000,
  reporter: 'spec'
});

for (const file of findTestFiles(testsDir)) {
  mocha.addFile(file);
}

const results = [];

const runner = mocha.run((failures) => {
  writeHtmlReport(results);
  process.exitCode = failures > 0 ? 1 : 0;
});

runner.on('pass', (test) => {
  results.push({
    title: test.fullTitle(),
    outcome: 'Passed',
    duration: test.duration
  });
});

runner.on('fail', (test, error) => {
  results.push({
    title: test.fullTitle(),
    outcome: 'Failed',
    duration: test.duration,
    message: error && error.message,
    stack: error && error.stack
  });
});

runner.on('pending', (test) => {
  results.push({
    title: test.fullTitle(),
    outcome: 'Skipped',
    duration: test.duration
  });
});
