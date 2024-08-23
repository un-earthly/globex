import axios from "axios";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const loadCartFromLocalStorage = () => {
  try {
    if (typeof window !== 'undefined') {

      const serializedCart = localStorage.getItem('cart');
      return serializedCart ? JSON.parse(serializedCart) : { items: [], total: 0, discountedTotal: 0 };
    }
    return null;
  } catch (e) {
    console.error('Could not load cart from local storage', e);
    return { items: [], total: 0, discountedTotal: 0 };
  }
};
export const saveCartToLocalStorage = (state) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedCart = JSON.stringify(state);
      localStorage.setItem('cart', serializedCart);
    }
    return null;
  } catch (e) {
    console.error('Could not save cart to local storage', e);
  }
};


 const imageBBKey = '8df99c2ddfe4a2510f423bacf6e99ac2';

export const uploadImages = async (files) => {
  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${imageBBKey}`, formData);
        return res.data.data.url;
      } catch (err) {
        console.error('Image upload failed:', err);
        return null;
      }
    })
  );

  return uploadedImages.filter((url) => url !== null);
};


export const generatePaginationButtons = (
  currentPage,
  totalPages,
  paginate,
  Button
) => {
  const buttons = [];
  const maxVisibleButtons = 5;

  if (totalPages <= maxVisibleButtons) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => paginate(i)}
        >
          {i}
        </Button>
      );
    }
  } else {
    buttons.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => paginate(1)}
      >
        1
      </Button>
    );

    if (currentPage > 3) {
      buttons.push(<span key="ellipsis1">...</span>);
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => paginate(i)}
        >
          {i}
        </Button>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(<span key="ellipsis2">...</span>);
    }

    buttons.push(
      <Button
        key={totalPages}
        variant={currentPage === totalPages ? "default" : "outline"}
        size="sm"
        onClick={() => paginate(totalPages)}
      >
        {totalPages}
      </Button>
    );
  }

  return buttons;
};