const { createService } = require("./services/create.service");
const { deleteService } = require("./services/delete.service");
const { editService } = require("./services/edit.service");
const { getAllService } = require("./services/getall.service");


const create = async (req: any, res: any) => {
    try {

        const {
            ticketId,
            fromStation,
            toStation,
            boardingStation,
            reservationUpto,
            journeyDate,
            journeyTime,
            arrivalDate,
            trainNumber,
            trainName,
            journeyClass,
            passengerCount,
            price
        } = req.body;


        if (
            !ticketId ||
            !fromStation ||
            !toStation ||
            !boardingStation ||
            !journeyDate ||
            !trainNumber ||
            !trainName ||
            !journeyClass ||
            !passengerCount ||
            !price
        ) {
            return res.status(400).json({
                success: false,
                message: "Required listing details are missing"
            });
        }
        const sellerId = req.user.id;
        
        const listing = await createService({
            sellerId,
            ticketId,
            fromStation,
            toStation,
            boardingStation,
            reservationUpto,
            journeyDate,
            journeyTime,
            arrivalDate,
            trainNumber,
            trainName,
            journeyClass,
            passengerCount,
            price
        });


        return res.status(201).json({
            success: true,
            message: "Listing created successfully",
            data: listing
        });

    } catch (error: any) {

        console.error("Create listing error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create listing",
            error: error.message
        });
    }
};


const deletelistening = async (req: any, res: any) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Listing id is required"
            });
        }


        const deletedListing = await deleteService(id);


        if (!deletedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Listing deleted successfully",
            data: deletedListing
        });

    } catch (error: any) {

        console.error("Delete listing error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete listing",
            error: error.message
        });
    }
};


const edit = async (req: any, res: any) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Listing id is required"
            });
        }


        const updatedListing = await editService(
            id,
            req.body
        );


        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            data: updatedListing
        });

    } catch (error: any) {

        console.error("Edit listing error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update listing",
            error: error.message
        });
    }
};


const getall = async (req: any, res: any) => {
    try {

        const listings = await getAllService();


        return res.status(200).json({
            success: true,
            message: "Listings fetched successfully",
            count: listings.length,
            data: listings
        });

    } catch (error: any) {

        console.error("Get all listings error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch listings",
            error: error.message
        });
    }
};


module.exports = {
    create,
    deletelistening,
    edit,
    getall
};