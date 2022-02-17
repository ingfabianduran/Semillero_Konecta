import { Grid, Stack, Pagination } from '@mui/material';

function PaginationPersonaje({ page, numPages, changePage }) {
  return (
    <Grid
      item
      xs={10}
      sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack
        spacing={1}>
        <Pagination
          size='small'
          page={page}
          count={numPages}
          color='primary'
          onChange={changePage} />
      </Stack>
    </Grid>
  )
}

export { PaginationPersonaje };