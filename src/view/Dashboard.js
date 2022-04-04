import { Box } from '@chakra-ui/react';
import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
export default function Dashboard(props) {
    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <h1> thise is dashboard page</h1>
                </Box>
            </DashboardLayout>
        </React.Fragment>
    )
}