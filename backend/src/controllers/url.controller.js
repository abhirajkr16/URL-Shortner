import {
    createShortUrl,
    getUserUrls,
    getUrlById,
    updateUserUrl,
    deleteUserUrl,
} from "../services/url.service.js";

export const create = async (req, res, next) => {
    try {
        const url = await createShortUrl({
            userId: req.user.id,
            ...req.body,
        });

        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: url,
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const urls = await getUserUrls(req.user.id);

        return res.status(200).json({
            success: true,
            data: urls,
        });
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req, res, next) => {
    try {
        const url = await getUrlById(
            Number(req.params.id),
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: url,
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const url = await updateUserUrl({
            id: Number(req.params.id),
            userId: req.user.id,
            ...req.body,
        });

        return res.status(200).json({
            success: true,
            message: "URL updated successfully",
            data: url,
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        await deleteUserUrl({
            id: Number(req.params.id),
            userId: req.user.id,
        });

        return res.status(200).json({
            success: true,
            message: "URL deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};