type Image = {
    image_id: number;
    image_one: string;
    image_two: string;
    image_three: string;
    image_four: string;
};

type ProductStorage = {
    id_storage: number;
    storage: number;
    storage_quatity: number;
    storage_price: number;
    product_id: number;
    color_id: number;
};

type ProductColor = {
    color_id: number;
    color: string;
    quality: number;
    image_id: number;
    product_id: number;
    image: Image;
    product_storages: ProductStorage[];
};

type InforProduct = {
    infor_product: number;
    infor_screen: string;
    infor_system: string;
    infor_cpu: string;
    infor_ram: string;
    infor_more: string;
};

type Product = {
    product_id: number;
    product_name: string;
    product_price: number;
    product_star: number;
    product_discount: number;
    product_hot: number;
    product_date: string;
    infor_product: number;
    category_id: number;
    comment_products: any[]; // assuming comment_products is an array of objects
    infor_product_infor_product: InforProduct;
    product_colors: ProductColor[];
};