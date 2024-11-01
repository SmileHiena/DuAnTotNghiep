import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const PaymentQR = ({ totalAmount }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const url = `https://me.momo.vn/screentime/9wdLZD2KEwpwajP${totalAmount}`; // Đường dẫn thanh toán MoMo
                const canvas = canvasRef.current;
                if (canvas) {
                    const qrCodeUrl = await QRCode.toDataURL(url);
                    const context = canvas.getContext('2d');
                    const img = new Image();
                    img.src = qrCodeUrl;
                    img.onload = () => {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.drawImage(img, 0, 0);
                    };
                }
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        };

        generateQRCode();
    }, [totalAmount]);

    return (
        <div>
            <h2>QR Code cho thanh toán MoMo</h2>
            <canvas ref={canvasRef} width={200} height={200} />
        </div>
    );
};

export default PaymentQR;
