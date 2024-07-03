import { Box, Modal } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    open: boolean
    onClose(): void
}

export default function CustomModal(props: Props) {
    return <Modal
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
    >
        <Box
            sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '85vw',
                background: 'white',
                border: 2,
                boxShadow: 24,
                p: 2,
                borderRadius: 2
            }}
        >
            {props.children}
        </Box>
    </Modal>
}