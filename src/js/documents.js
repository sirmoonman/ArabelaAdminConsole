const ArabelaDocs = {
    generatePrintView(res, config) {
        const printWindow = window.open('', '_blank');
        const timestamp = new Date().toLocaleString();
        
        // Document Content
        const html = `
            <html>
            <head>
                <title>Arabela Document - ARB-${res.id}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; color: #1a1a1a; padding: 40px; line-height: 1.6; }
                    .header { text-align: center; border-bottom: 2px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 30px; }
                    .header h1 { text-transform: uppercase; letter-spacing: 5px; margin: 0; font-size: 28px; }
                    .header p { text-transform: uppercase; font-size: 10px; letter-spacing: 2px; margin-top: 5px; }
                    
                    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 30px; font-size: 12px; }
                    .section-title { font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #e5e1da; margin-bottom: 15px; padding-bottom: 5px; font-size: 14px; }
                    
                    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    .details-table th { text-align: left; font-size: 10px; text-transform: uppercase; color: #a8a297; padding: 10px; border-bottom: 1px solid #f0ede7; }
                    .details-table td { padding: 15px 10px; border-bottom: 1px solid #f0ede7; font-size: 14px; }
                    
                    .legal-terms { font-size: 11px; color: #4a4a4a; background: #f9f5f0; padding: 20px; border: 1px solid #e5e1da; margin-bottom: 40px; }
                    .legal-terms h4 { margin-top: 0; text-transform: uppercase; font-size: 12px; }
                    
                    .footer { margin-top: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
                    .sig-line { border-top: 1px solid #1a1a1a; margin-top: 40px; text-align: center; font-size: 10px; text-transform: uppercase; font-weight: bold; }
                    
                    @media print {
                        .no-print { display: none; }
                        body { padding: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Arabela</h1>
                    <p>Gown Rental Service - Official Transaction Document</p>
                </div>

                <div class="meta-grid">
                    <div>
                        <p><strong>REFERENCE NO:</strong> ARB-${res.id}</p>
                        <p><strong>TIMESTAMP:</strong> ${timestamp}</p>
                    </div>
                    <div style="text-align: right;">
                        <p><strong>CLIENT NAME:</strong> ${res.name}</p>
                        <p><strong>STATUS:</strong> ${res.status.toUpperCase()}</p>
                    </div>
                </div>

                <div class="section-title">Asset & Rental Details</div>
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>ID</th>
                            <th>Release Date</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${res.gown}</td>
                            <td>#${res.gownId}</td>
                            <td>${new Date(res.createdAt).toLocaleDateString('en-GB')}</td>
                            <td>${res.deadline ? new Date(res.deadline).toLocaleDateString('en-GB') : '---'}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="section-title">Financial Summary</div>
                <table class="details-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Security Deposit (Refundable Collateral)</td>
                            <td style="text-align: right;">₱${config.depositAmount.toLocaleString()}</td>
                        </tr>
                        ${res.finalFine > 0 ? `
                        <tr>
                            <td>Late Return Penalty / Surcharges</td>
                            <td style="text-align: right;">₱${res.finalFine.toLocaleString()}</td>
                        </tr>` : ''}
                    </tbody>
                </table>

                <div class="legal-terms">
                    <h4>Terms & Conditions</h4>
                    <p>1. <strong>Policy:</strong> Arabela Gown Service follows a two-days-before pickup and two-days-after return policy[cite: 33].</p>
                    <p>2. <strong>Security Deposit:</strong> A security deposit of Php 2,000.00 is required as collateral. This is non-refundable if the reservation is cancelled[cite: 36].</p>
                    <p>3. <strong>Late Penalties:</strong> Failure to return the gown on time results in a penalty of Php 200.00 per day, deducted from the deposit[cite: 30, 34, 97].</p>
                    <p>4. <strong>Condition:</strong> Gowns must be returned in the same condition as received to ensure the full return of the security deposit[cite: 29].</p>
                </div>

                <div class="footer">
                    <div>
                        <div class="sig-line">Client Signature</div>
                    </div>
                    <div>
                        <div class="sig-line">Arabela Authorized Representative</div>
                    </div>
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;
        
        printWindow.document.write(html);
        printWindow.document.close();
    }
};