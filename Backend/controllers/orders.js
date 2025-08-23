import { database } from "../Database-Connection/Firebase.js";

const handlePlaceOrder=async (req,res)=>{    
    try {
        const {items,address,phone,paymentMethod,subtotal,
            deliveryFee,totalAmount}=req.body;
            const orderStatus='pending';
            
            if(!items || !address || !phone || !paymentMethod || !subtotal || !deliveryFee || !totalAmount) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const orderRef=database.collection('orders').doc();
            await orderRef.set({
                items,
                address,
                phone,
                paymentMethod,
                subtotal,
                deliveryFee,
                totalAmount,
                orderStatus:orderStatus,
                createdAt: new Date()
            })

            res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to place order' });
    }

}


export {handlePlaceOrder};