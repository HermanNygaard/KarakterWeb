import db from '../../lib/db';

export default async (req, res) => {
    console.log("req", req)


    try {
        await db.collection('search').add(
            JSON.parse(req.body)
        );
        return res.status(200).json({
            msg: "ok"
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: e })
    }
};