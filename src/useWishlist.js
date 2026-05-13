import { useState, useEffect } from 'react';

const KEY = 'glcw_wishlist';

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export default function useWishlist(productId) {
  const [ids, setIds] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  const wished = ids.includes(productId);

  const toggle = () =>
    setIds(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );

  return [wished, toggle];
}
