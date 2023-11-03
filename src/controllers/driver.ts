import { Request, Response } from "express";
import { EntityListResponse } from "../models/entity.list.response.model";
import Driver from "../models/driver";

const getDrivers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.limit as string) || 10;
  try {
    const totalDrivers = await Driver.countDocuments();
    const totalPages = Math.ceil(totalDrivers / perPage);
    const startIndex = (page - 1) * perPage;
    const drivers = await Driver.find().skip(startIndex).limit(perPage);
    return res.json(
      new EntityListResponse(drivers, totalDrivers, page, totalPages)
    );
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se obtuvo la lista de choferes" });
  }
};

const getDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Driver.findById(id);
    if (!data) {
      return res.status(404).json({ message: "ID no encontrado" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se obtuvo el chofer con ese id" });
  }
};

const createDriver = async (req: Request, res: Response) => {
  try {
    const data = await Driver.create(req.body);
    res.send({ data });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "El legajo ya existe" });
      }
    }
    return res.status(500).json({ message: "No se creo el chofer" });
  }
};

const updateDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Driver.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(200).json(data);
    }
    res.send({ data });
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "El legajo ya existe" });
      }
    }
    return res.status(500).json({ message: "No se edito el chofer" });
  }
};

const deleteDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Driver.deleteOne({ _id: id });
    res.send({ data });
  } catch (error) {
    return res.status(500).json({ message: "No se elimino el chofer" });
  }
};

export { getDrivers, getDriver, createDriver, updateDriver, deleteDriver };
