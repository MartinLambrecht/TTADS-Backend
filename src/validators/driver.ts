import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const validatorDriver: ((req: Request, res: Response, next: NextFunction) => void)[] = [
    (req, res, next) => {
        try {
            const schema = z.object({
                legajo: z.number().min(1, { message: "El campo legajo deber ser mayor a 0"}),
                name: z.string().regex(/^[A-Za-z\s]+$/, { message: "El campo nombre debe contener solo letras" }).min(1),
                surname: z.string().regex(/^[A-Za-z\s]+$/, { message: " El campo apellido debe contener solo letras" }).min(1),
            });

            const validatedData = schema.safeParse(req.body);

            if (validatedData.success) {
                next();
            } else {
                return res.status(400).json({ errors: validatedData.error.formErrors.fieldErrors });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
];

export default  validatorDriver;