export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API || 'http://localhost:5000/api';
export const routes = {
    // Auth routes
    signUp: `${BASE_URL}/signup`,
    signIn: `${BASE_URL}/signin`,
    userDetails: `${BASE_URL}/user-details`,
    userLogout: `${BASE_URL}/userLogout`,

    // Admin panel routes
    allUsers: `${BASE_URL}/all-user`,
    updateUser: `${BASE_URL}/update-user`,

    // Category routes
    addCategory: `${BASE_URL}/add-category`,
    getAllCategories: `${BASE_URL}/categories`,

    // Product routes
    uploadProduct: `${BASE_URL}/upload-product`,
    getProduct: `${BASE_URL}/get-product`,
    updateProduct: `${BASE_URL}/update-product`,
    getCategoryProduct: `${BASE_URL}/get-categoryProduct`,
    getCategoryWiseProduct: `${BASE_URL}/category-product`,
    getProductDetails: `${BASE_URL}/product-details`,
    searchProduct: `${BASE_URL}/search`,
    filterProduct: `${BASE_URL}/filter-product`,

    // Cart routes
    addToCart: `${BASE_URL}/addtocart`,
    getAllCartItems: `${BASE_URL}/get-all-cart-items`,
    countAddToCartProduct: `${BASE_URL}/countAddToCartProduct`,
    // viewCartProduct: `${BASE_URL}/view-card-product`, // Uncomment if needed
    // updateCartProduct: `${BASE_URL}/update-cart-product`, // Uncomment if needed
    // deleteCartProduct: `${BASE_URL}/delete-cart-product`, // Uncomment if needed
};

export default routes;
