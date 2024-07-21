import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function UserTableRow({
  selected,
  id,
  from,
  to,
  price,
  status,
  distance,
  duration,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox" />
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {from}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{to}</TableCell>
        <TableCell>#{price}</TableCell>
        <TableCell>
          <Label color={(status === 'cancelled' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell>{distance}</TableCell>
        <TableCell>{duration}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Cancel
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  to: PropTypes.any,
  handleClick: PropTypes.func,
  id: PropTypes.any,
  from: PropTypes.any,
  price: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  distance: PropTypes.string,
  duration: PropTypes.string,
};
