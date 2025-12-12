import { Card, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  heading?: string;
  icon?: ReactNode
  children: ReactNode;
}

const CardContainer = ({ heading, icon, children }: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: { xs: 3, sm: 4 },
        width: { xs: '100%', sm: 'fit-content' },
        minWidth: { sm: '420px' },
        mx: 'auto',
        my: 4,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {icon}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {heading}
      </Typography>
      {children}
    </Card>
  );
};

export default CardContainer;
