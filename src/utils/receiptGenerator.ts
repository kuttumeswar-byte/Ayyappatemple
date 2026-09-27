import jsPDF from 'jspdf';

export interface ReceiptData {
  receiptNumber: string;
  donorName: string;
  phone: string;
  email: string;
  panNumber?: string;
  amount: number;
  cause: string;
  causeLabel: string;
  transactionRef?: string;
  date: string;
  templeUpi: string;
}

// Convert numbers to Indian currency words
export function numberToWords(num: number): string {
  const a = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if (num === 0) return 'Zero';

  function inWords(n: number): string {
    let str = '';
    if (n > 99) {
      str += a[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n > 19) {
      str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
    } else if (n > 0) {
      str += a[n];
    }
    return str.trim();
  }

  let crore = Math.floor(num / 10000000);
  num %= 10000000;
  let lakh = Math.floor(num / 100000);
  num %= 100000;
  let thousand = Math.floor(num / 1000);
  num %= 1000;

  let res = '';
  if (crore > 0) res += inWords(crore) + ' Crore ';
  if (lakh > 0) res += inWords(lakh) + ' Lakh ';
  if (thousand > 0) res += inWords(thousand) + ' Thousand ';
  if (num > 0) res += inWords(num);

  return (res.trim() + ' Rupees Only').replace(/\s+/g, ' ');
}

/**
 * Generates and downloads a clean, official PDF receipt
 */
export function downloadReceiptPDF(data: ReceiptData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Outer Border & Gold accent header
  doc.setDrawColor(180, 130, 40);
  doc.setLineWidth(1);
  doc.rect(10, 10, pageWidth - 20, 277);

  doc.setDrawColor(218, 165, 32);
  doc.setLineWidth(0.3);
  doc.rect(12, 12, pageWidth - 24, 273);

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(180, 120, 20);
  doc.text('॥ SWAMIYE SARANAM AYYAPPA ॥', pageWidth / 2, 22, { align: 'center' });

  doc.setFontSize(18);
  doc.setTextColor(20, 20, 20);
  doc.text('SRI AYYAPPA SWAMY TEMPLE', pageWidth / 2, 30, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('Campbell Bay, Great Nicobar • Reg. Trust No: TR/80G/SAS-2026/0491', pageWidth / 2, 36, {
    align: 'center',
  });
  doc.text('Website: ayyappatemple-greatnicobar.org • Canara Bank UPI: 226112039003611@cnrb', pageWidth / 2, 41, {
    align: 'center',
  });

  // Divider line
  doc.setDrawColor(200, 160, 50);
  doc.setLineWidth(0.5);
  doc.line(16, 45, pageWidth - 16, 45);

  // Receipt Banner
  doc.setFillColor(245, 235, 210);
  doc.roundedRect(pageWidth / 2 - 50, 48, 100, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(130, 80, 10);
  doc.text('OFFICIAL 80G DONATION RECEIPT', pageWidth / 2, 54, { align: 'center' });

  // Exemption notice
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(60, 60, 60);
  doc.text(
    'Donations are 100% Tax Exempt under Section 80G of the Indian Income Tax Act, 1961',
    pageWidth / 2,
    62,
    { align: 'center' }
  );

  // Meta grid: Receipt No and Date
  let y = 72;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text(`Receipt No: ${data.receiptNumber}`, 20, y);
  doc.text(`Date: ${data.date}`, pageWidth - 20, y, { align: 'right' });

  y += 8;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, y, pageWidth - 20, y);

  // Donor Details Table / Section
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(140, 80, 10);
  doc.text('DONOR INFORMATION', 20, y);

  y += 7;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);

  const rowH = 7;

  // Donor Name
  doc.text('Donor / Devotee Name:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text(data.donorName || 'Devotee of Lord Ayyappa', 75, y);

  y += rowH;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Contact Mobile:', 20, y);
  doc.setTextColor(20, 20, 20);
  doc.text(data.phone || 'N/A', 75, y);

  y += rowH;
  doc.setTextColor(70, 70, 70);
  doc.text('Email Address:', 20, y);
  doc.setTextColor(20, 20, 20);
  doc.text(data.email || 'N/A', 75, y);

  if (data.panNumber) {
    y += rowH;
    doc.setTextColor(70, 70, 70);
    doc.text('PAN Card Number:', 20, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(data.panNumber, 75, y);
  }

  // Contribution Details Section
  y += 12;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, y, pageWidth - 20, y);

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(140, 80, 10);
  doc.text('CONTRIBUTION & SEVA DETAILS', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Seva Fund Allocated:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(20, 20, 20);
  doc.text(data.causeLabel, 75, y);

  y += rowH;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Contribution Amount:', 20, y);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(180, 30, 20);
  doc.text(`Rs. ${data.amount.toLocaleString('en-IN')} /-`, 75, y);

  y += rowH;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Amount in Words:', 20, y);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(30, 30, 30);
  doc.text(numberToWords(data.amount), 75, y);

  y += rowH;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(70, 70, 70);
  doc.text('Payment Mode:', 20, y);
  doc.setTextColor(20, 20, 20);
  doc.text(`Canara Bank UPI (${data.templeUpi})`, 75, y);

  if (data.transactionRef) {
    y += rowH;
    doc.setTextColor(70, 70, 70);
    doc.text('Bank Reference / UTR:', 20, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(data.transactionRef, 75, y);
  }

  // Box highlight for 80G deduction
  y += 14;
  doc.setFillColor(248, 248, 248);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(20, y, pageWidth - 40, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(20, 100, 30);
  doc.text('80G TAX EXEMPTION CERTIFICATE (ITBA/EXM/80G/SAS-TR-2026/0491)', 24, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(
    'This is a computer-generated authenticated receipt issued by Sri Ayyappa Swamy Temple Trust.',
    24,
    y + 12
  );
  doc.text(
    'Eligible for deduction under Section 80G(5)(vi) of the Income Tax Act 1961.',
    24,
    y + 17
  );

  // Signatures Section
  y += 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 30, 30);
  doc.text('Managing Trustee', 35, y);
  doc.text('Authorized Finance Signatory', pageWidth - 35, y, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Sri Ayyappa Swamy Temple Trust', 35, y + 5);
  doc.text('Campbell Bay, Great Nicobar', pageWidth - 35, y + 5, { align: 'right' });

  // Footer benediction
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(160, 110, 20);
  doc.text(
    'May the divine blessings of Lord Dharma Sastha always protect and prosper you.',
    pageWidth / 2,
    275,
    { align: 'center' }
  );

  // Save PDF
  doc.save(`Sri_Ayyappa_Temple_80G_Receipt_${data.receiptNumber}.pdf`);
}

/**
 * Triggers clean print popup window with formatted receipt
 */
export function printReceiptWindow(data: ReceiptData): void {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Sri Ayyappa Swamy Temple 80G Receipt - ${data.receiptNumber}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            background: #fff;
            padding: 20px;
          }
          .receipt-container {
            border: 2px solid #b48228;
            padding: 30px;
            max-width: 750px;
            margin: 0 auto;
            position: relative;
            background: #fff;
          }
          .inner-border {
            border: 1px solid #daa520;
            padding: 25px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #daa520;
            padding-bottom: 15px;
            margin-bottom: 20px;
          }
          .kicker {
            color: #b47814;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin: 4px 0;
            color: #111;
          }
          .subtitle {
            font-size: 11px;
            color: #555;
          }
          .badge {
            background: #fdf6e2;
            color: #8c500a;
            border: 1px solid #daa520;
            display: inline-block;
            padding: 4px 16px;
            font-weight: bold;
            font-size: 13px;
            border-radius: 4px;
            margin: 10px 0;
          }
          .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 13px;
          }
          .info-table td {
            padding: 8px 6px;
            border-bottom: 1px solid #eee;
          }
          .label {
            color: #666;
            width: 35%;
          }
          .val {
            font-weight: 600;
            color: #111;
          }
          .amount-val {
            font-size: 16px;
            color: #b41e14;
            font-weight: bold;
          }
          .tax-box {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 12px;
            border-radius: 6px;
            margin-top: 15px;
            font-size: 11px;
            color: #334155;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
            font-size: 12px;
          }
          .sign-col {
            text-align: center;
          }
          .sign-line {
            width: 160px;
            border-top: 1px solid #333;
            margin-bottom: 6px;
          }
          .blessing {
            text-align: center;
            font-style: italic;
            color: #966e14;
            margin-top: 30px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <div class="inner-border">
            <div class="header">
              <div class="kicker">॥ SWAMIYE SARANAM AYYAPPA ॥</div>
              <div class="title">SRI AYYAPPA SWAMY TEMPLE</div>
              <div class="subtitle">Campbell Bay, Great Nicobar • Regd. Trust No: TR/80G/SAS-2026/0491</div>
              <div class="subtitle">Canara Bank UPI: ${data.templeUpi}</div>
              <div><span class="badge">OFFICIAL 80G DONATION RECEIPT</span></div>
              <div style="font-size: 11px; color: #166534; font-weight: 500;">
                100% Tax Exempt under Section 80G of the Indian Income Tax Act 1961
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: bold; margin-bottom: 10px;">
              <span>Receipt No: <span style="color: #b48228;">${data.receiptNumber}</span></span>
              <span>Date: ${data.date}</span>
            </div>

            <table class="info-table">
              <tr>
                <td class="label">Donor / Devotee Name:</td>
                <td class="val">${data.donorName || 'Devotee of Lord Ayyappa'}</td>
              </tr>
              <tr>
                <td class="label">Mobile Number:</td>
                <td class="val">${data.phone || 'N/A'}</td>
              </tr>
              <tr>
                <td class="label">Email Address:</td>
                <td class="val">${data.email || 'N/A'}</td>
              </tr>
              ${
                data.panNumber
                  ? `<tr><td class="label">Donor PAN Card No:</td><td class="val">${data.panNumber}</td></tr>`
                  : ''
              }
              <tr>
                <td class="label">Seva Fund Allocated:</td>
                <td class="val" style="color: #8c500a;">${data.causeLabel}</td>
              </tr>
              <tr>
                <td class="label">Contribution Amount:</td>
                <td class="amount-val">₹ ${data.amount.toLocaleString('en-IN')} /-</td>
              </tr>
              <tr>
                <td class="label">Amount in Words:</td>
                <td class="val" style="font-style: italic;">${numberToWords(data.amount)}</td>
              </tr>
              <tr>
                <td class="label">Temple Bank UPI:</td>
                <td class="val">${data.templeUpi} (Canara Bank)</td>
              </tr>
              ${
                data.transactionRef
                  ? `<tr><td class="label">Bank UTR / Ref No:</td><td class="val">${data.transactionRef}</td></tr>`
                  : ''
              }
            </table>

            <div class="tax-box">
              <strong>TAX EXEMPTION ENDORSEMENT (ITBA/EXM/80G/SAS-TR-2026/0491):</strong><br/>
              This official receipt confirms that the donation has been received into the consecrated trust account of Sri Ayyappa Swamy Temple Devaswom and qualifies for statutory tax deduction under Section 80G(5)(vi).
            </div>

            <div class="signatures">
              <div class="sign-col">
                <div class="sign-line"></div>
                <strong>Managing Trustee</strong><br/>
                <span style="font-size: 10px; color: #666;">Sri Ayyappa Swamy Temple</span>
              </div>
              <div class="sign-col">
                <div class="sign-line"></div>
                <strong>Finance Secretary</strong><br/>
                <span style="font-size: 10px; color: #666;">Campbell Bay Trust</span>
              </div>
            </div>

            <div class="blessing">
              May the divine grace and blessings of Lord Dharma Sastha accompany you and your loved ones.
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        </script>
      </body>
    </html>
  `;

  // Create a blob and open it in a clean popup or fallback to hidden iframe print
  try {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
      // If popup blocked, create an invisible iframe to print
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.src = url;
      document.body.appendChild(iframe);
      setTimeout(() => {
        iframe.contentWindow?.print();
      }, 500);
    }
  } catch (e) {
    console.error('Print trigger error:', e);
  }
}
