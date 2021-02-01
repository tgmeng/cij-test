import * as React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Table = styled.div`
  display: table;
`;

const TableRowStyle = styled.div`
  display: table-row;
`;

const TableCell = styled.div`
  display: table-cell;
  padding: 10px;
  background-color: #f00;
`;

export default function EmotionStyledTable({ dataSource }) {
  return (
    <Table>
      {dataSource.map((cols, rowIndex) => (
        <TableRowStyle key={rowIndex}>
          {cols.map((value, colIndex) => (
            <TableCell key={colIndex}></TableCell>
          ))}
        </TableRowStyle>
      ))}
    </Table>
  );
}

EmotionStyledTable.propTypes = {
  dataSource: PropTypes.array,
};
