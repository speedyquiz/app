import PropTypes from 'prop-types';
// @mui
import { Box, Grid, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
};

CarouselPageHeader.propTypes = {
    order: PropTypes.oneOf(['asc', 'desc']),
    orderBy: PropTypes.string,
    headLabel: PropTypes.array,
    onRequestSort: PropTypes.func,
};

export default function CarouselPageHeader({ order, orderBy, headLabel, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <Grid item xs={10} container spacing={1} justifyContent={(headCell.label === 'Action')?'flex-end':"center"}>
                            <TableSortLabel hideSortIcon>
                                {headCell.label}
                            </TableSortLabel>
                        </Grid>

                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
