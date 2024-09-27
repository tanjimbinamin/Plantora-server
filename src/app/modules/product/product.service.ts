import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createSingleProductIntoDB = async (data: TProduct) => {
  const result = await Product.create(data);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const prodctQuery = new QueryBuilder(Product.find(), query)
    .searchMethod(["title", "category"])
    .filterMethod()
    .sortMethod();
  const result = await prodctQuery.modelQuery;
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductFromDB = async (
  data: Partial<TProduct>,
  _id: string
) => {
  const { availability, ...remainData } = data;

  const modifiedData: Record<string, unknown> = { ...remainData };

  if (availability && Object.keys(availability).length) {
    for (const [key, value] of Object.entries(availability)) {
      modifiedData[`availability.${key}`] = value;
    }
  }
  const result = await Product.findByIdAndUpdate({ _id }, modifiedData, {
    new: true,
  });
  return result;
};

const deleteSingleProductFromDB = async (_id: string) => {
  const isExist = await Product.findById(_id);
  if (!isExist) {
    throw new AppError(404, "Item Not Found to Delete");
  }
  const result = await Product.findByIdAndDelete(_id);
  return result;
};

const getAllCategoryFromDB = async () => {
  const result = await Product.find();
  return result;
};

export const productService = {
  getAllProductFromDB,
  createSingleProductIntoDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
  getSingleProductFromDB,
  getAllCategoryFromDB,
};
