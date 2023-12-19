import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const generatePDF = students => {
  const doc = new jsPDF();
  const tableColumns = ["Rank", "Student ID", "No. of Attempts", "Average Marks", "Highest Mark", "Lowest Mark"];
  const tableRows = [];

  students.forEach(student => {
    const rowData = [
      student.rank,
      student.indexNumber,
      student.noOfAttempts,
      calculateAverageMarks(student.marksPercentage),
      student.highestMark,
      student.lowestMark,
    ];

    tableRows.push(rowData);
  });

  const date = new Date();
  const dateStr = format(date, "yyyy-MM-dd");

  doc.text(`Students Performance Report - Up to ${dateStr}`, 14, 15);

  doc.autoTable(tableColumns, tableRows, { startY: 30 });
  doc.save(`performance_report_${dateStr}.pdf`);
};

const calculateAverageMarks = marksPercentage => {
  const sum = marksPercentage.reduce((acc, mark) => acc + mark, 0);
  return (sum / marksPercentage.length).toFixed(2);
};

export default generatePDF;
