const express = require('express');
const router = new express.Router();
const Book = require("../models/book");
var cors = require('cors');
let upload = require('../utils/multer');

router.post('/uploadImage', upload.single('image'),
    (req, res) => {
        const filedata = req.file.filename;
        const string = filedata.toString();
        res.send({
            data: string,
            status: true
        });
    });



router.post("/bookBanquet", cors(), async (req, res) => {
    try {
        const date = req.body.date;
        const day = Number(req.body.day);
        console.log(day);
        // if (req.body.shiftType) {
        let shift = Number(req.body.shiftType);
        // }
        // const hour = null
        console.log(shift);
        // if (req.body.hourType) {
        const hour = Number(req.body.hourType);
        // }
        // 1 full day check
        if (day === 1) {
            if (shift === 0 && hour === 0) {
                const bookDate = await Book.findOne({ date: date });
                console.log(bookDate);
                if (bookDate) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else {
                    const body = new Book(req.body);
                    const book = await body.save()
                    if (book) {
                        res.status(200).json({
                            message: "Congratulation , Banquet booked successfully",
                            status: true,
                            data: book
                        });
                    } else {
                        res.status(404).json({ message: "something went wrong", status: false });
                    }
                }
            } else {
                res.status(200).json({
                    message: "Please enter valid detail",
                    status: false
                });
            }

        }
        // 2 half day check
        if (day === 2) {
            if (hour === 0) {
                const fullDateCheck = await Book.findOne({ date: date, shiftType: 0, hourType: 0 });
                const shiftMorningCheck = await Book.findOne({ date: date, shiftType: shift });
                const shiftEveningCheck = await Book.findOne({ date: date, shiftType: shift });
                const shiftHourBase1 = await Book.findOne({ date: date, day: 3, hourType: 1 });
                const shiftHourBase2 = await Book.findOne({ date: date, day: 3, hourType: 2 });
                const shiftHourBase3 = await Book.findOne({ date: date, day: 3, hourType: 3 });
                const shiftHourBase4 = await Book.findOne({ date: date, day: 3, hourType: 4 });

                if (fullDateCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else if (shiftMorningCheck && shift === 1) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false,
                        data: shiftMorningCheck
                    });
                } else if (shiftEveningCheck && shift === 2) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false,

                    });
                } else if (shift === 1 && shiftHourBase1) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false,

                    });
                } else if (shift === 1 && shiftHourBase2) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false,

                    });
                } else if (shift === 2 && shiftHourBase3) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else if (shift === 2 && shiftHourBase4) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                }
                else {
                    // if (!fullDateCheck && !shiftMorningCheck && !shiftEveningCheck 
                    // && !shiftHourBase1 && !shiftHourBase2 && !shiftHourBase3 && !shiftHourBase4) {
                    const body = new Book(req.body);
                    const book = await body.save()
                    if (book) {
                        res.status(200).json({
                            message: "Congratulation , Banquet booked successfully",
                            status: true,
                            data: book
                        });
                    } else {
                        res.status(404).json({ message: "something went wrong", status: false });
                    }
                }
            } else {
                res.status(200).json({
                    message: "Please enter valid details",
                    status: false
                });
            }
        }
        // 3 hourly bases check 
        if (day === 3) {
            if (shift === 0) {
                const fullDateCheck = await Book.findOne({ date: date, shiftType: 0, hourType: 0 });
                const hourCheck = await Book.findOne({ date: date, shiftType: 0, hourType: hour });
                const morningShiftCheck = await Book.findOne({ date: date, day: 2, shiftType: 1, hourType: 0 });
                const eveningShiftCheck = await Book.findOne({ date: date, shiftType: 2, hourType: 0 });
                if (fullDateCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else if (hourCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else if (hour === 1 && morningShiftCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else if (hour === 2 && morningShiftCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                }
                else if (hour === 3 && eveningShiftCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else if (hour === 4 && eveningShiftCheck) {
                    res.status(200).json({
                        message: "Sorry, Banquet is fully booked this date",
                        status: false
                    });
                } else {
                    // if (!fullDateCheck) {
                    const body = new Book(req.body);
                    const book = await body.save()
                    if (book) {
                        res.status(200).json({
                            message: "Congratulation , Banquet booked successfully",
                            status: true,
                            data: book
                        });
                    } else {
                        res.status(404).json({ message: "something went wrong", status: false });
                    }
                }
            } else {
                res.status(200).json({
                    message: "Please enter valid details",
                    status: false
                });

            }
        }
    } catch (error) {
        res.status(400).json(error);
    }
})



module.exports = router;