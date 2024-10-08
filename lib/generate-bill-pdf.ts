import { appConfig } from "@/next.app.config.mjs";
import { BASE_URL } from "@/next.constants.mjs";
import { Order } from "@/types";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import formatter from "./formatter";

const generateBillPDF = (order: Order): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [80, 297],
  });

  doc.addFont(BASE_URL + '/fonts/Roboto-Bold.ttf', 'RobotoBold', 'bold');
  doc.addFont(BASE_URL + '/fonts/Roboto-Italic.ttf', 'RobotoItalic', 'italic');
  doc.addFont(BASE_URL + '/fonts/Roboto-Regular.ttf', 'RobotoNormal', 'normal');
  doc.addFont(BASE_URL + '/fonts/Roboto-Thin.ttf', 'RobotoThin', 'thin');

  const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  let startY = 20;
  let baseFontSize = 11;

  // Header.
  doc.setFontSize(baseFontSize);
  doc.setFont('RobotoBold', 'normal', 'bold');
  doc.text(appConfig.name, pageWidth / 2, startY, {
    align: 'center',
  });

  // Introduction section:
  doc.setFont('RobotoNormal', 'normal', 'normal');
  doc.setFontSize(baseFontSize - 4);
  doc.text(appConfig.address, pageWidth / 2, startY += 6, {
    align: 'center',
  });

  doc.setFontSize(baseFontSize - 4);
  doc.text("Phone: " + appConfig.phoneNumber, pageWidth / 2, startY += 4, {
    align: 'center',
  });

  doc.setFontSize(baseFontSize - 4);
  doc.text(appConfig.description, pageWidth / 2, startY += 4, {
    align: 'center',
  });

  doc.setFont('RobotoBold', 'normal', 'bold');
  doc.setFontSize(baseFontSize - 2);
  doc.text('Customer information:', 12, startY += 10);
  doc.line(12, startY+= 2, pageWidth - 12, startY);

  autoTable(doc, {
    theme: 'plain',
    startY: startY += 1,
    margin: 11,
    body: [
      ['Full name', order.customer.fullName],
      ['Phone number',order.customer.phoneNumber],
      ['Address', order.customer.address],
    ],
    headStyles: { fillColor: [255, 255, 255] },
    bodyStyles: { fontSize: baseFontSize - 4, cellPadding: 1 },
    styles: {
      fontSize: baseFontSize - 4,
      font: 'RobotoNormal',
      fontStyle: 'normal',
    },
    didParseCell: (data) => {
      if (data.column.index === 0) {
        data.cell.styles.cellWidth = 20;
      }
    }
  });

  const maxLine = Math.round(order.customer.address.length / pageWidth);

  doc.setFont('RobotoBold', 'normal', 'bold');
  doc.setFontSize(baseFontSize - 2);
  doc.text('Ordered items:', 12, startY += 20  + (maxLine * 4));
  doc.line(12, startY+= 2, pageWidth - 12, startY);

  const body = order.orders.map((o) => [
    o.product.name,
    o.product.price,
    o.quantity,
    formatter(o.product.salePrice ?? o.product.price * o.quantity, 'vi'),
  ]);

  doc.setFont('RobotoBold', 'normal', 'bold');
  autoTable(doc, {
    theme: 'plain',
    startY: startY += 2,
    margin: 10,
    head: [['Name', 'Price', 'Quantity', 'Total']],
    body: [
      ...body,
    ],
    headStyles: {
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: baseFontSize - 4,
      font: 'RobotoBold',
    },
    bodyStyles: {
      fontSize: baseFontSize - 4,
      cellPadding: 2
    },
    styles: {
      fontSize: baseFontSize - 4,
      font: 'RobotoNormal',
      fontStyle: 'normal',
    }
  });

  doc.setFont('RobotoBold', 'normal', 'bold');
  doc.setFontSize(baseFontSize - 2);
  doc.text('Grand total:', 12, startY += (body.length * 2) + 20);
  doc.line(12, startY+= 2, pageWidth - 12, startY);

  autoTable(doc, {
    theme: 'plain',
    startY: startY += 1,
    margin: 11,
    body: [
      ['Total Items', order.orders.length],
      ['Total Price',
        formatter(order.orders.reduce((total, {product: { salePrice, price }, quantity}) => {
          return (total + ((salePrice ?? price) * quantity));
        }, 0), 'vi')
      ],
    ],
    headStyles: { fillColor: [255, 255, 255] },
    bodyStyles: { fontSize: baseFontSize - 4, cellPadding: 1 },
    styles: {
      fontSize: baseFontSize - 4,
      font: 'RobotoNormal',
      fontStyle: 'normal',
    },
    didParseCell: (data) => {
      if (data.column.index === 1) {
        data.cell.styles.font = 'RobotoBold';
        data.cell.styles.fontStyle = 'bold';
      }
    }
  });

  // Footer
  doc.setFontSize(baseFontSize - 4);
  doc.text(appConfig.thankMessage, pageWidth / 2, startY += 16, {
    align: 'center'
  });

  doc.setFontSize(baseFontSize - 4);
  doc.text(new Date(order.createdAt ?? Date.now()).toLocaleString(), pageWidth / 2, startY += 4, {
    align: 'center'
  });

  return doc;
}

export default generateBillPDF;