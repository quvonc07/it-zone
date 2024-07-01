import React from 'react';
import { Drawer } from 'antd';
const DrawerApp = ({ title,open, setOpen, children }) => {
    return (
        <>
            <Drawer
                closable
                destroyOnClose
                title={<p>{title}</p>}
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
            >
                {
                    children
                }
            </Drawer>
        </>
    );
};
export default DrawerApp;