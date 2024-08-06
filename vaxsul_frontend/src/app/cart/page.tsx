"use client";
import { useState, useEffect } from "react";
import { useGetCartItemsMutation, useUpdateCartItemQuantityMutation, useRemoveCartItemMutation } from "@/service/vaxsul";
import { LoadingWidget } from "../components/LoadingWidget";
import { ErrorWidget } from "../components/ErrorWidget";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);
    const [updateQuantity, updateQuantityResult] = useUpdateCartItemQuantityMutation();
    const [removeItem, removeItemResult] = useRemoveCartItemMutation();
    const [getCartItems, getCartItemsResult] = useGetCartItemsMutation();
    const router = useRouter();

    useEffect(() => {
        getCartItems();
    }, [getCartItems]);

    useEffect(() => {
        if (getCartItemsResult.data) {
            setCartItems(getCartItemsResult.data);
        }
    }, [getCartItemsResult.data]);

    if (getCartItemsResult.isLoading || getCartItemsResult.isUninitialized) {
        return <LoadingWidget />;
    }

    if (getCartItemsResult.isError) {
        return (
            <ErrorWidget message="Erro ao carregar o carrinho. Por favor, tente novamente mais tarde ou contate o dev." />
        );
    }

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        try {
            await updateQuantity({ itemId, quantity: newQuantity });
            getCartItems();
        } catch (error) {
            console.error("Erro ao atualizar a quantidade:", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeItem({ itemId });
            getCartItems();
        } catch (error) {
            console.error("Erro ao remover o item:", error);
        }
    };

    const handleCheckout = () => {
        router.push("/checkout");
    };

    return (
        <div className="flex flex-col min-h-screen" onClick={() => {  }}>
            <div className="flex flex-1">
                <aside className="bg-gray-800 text-white w-32 h-screen flex flex-col items-center">
                    <div className="p-2 flex items-center justify-center">
                        <h2 className="text-lg font-semibold text-green-400 pb-2">
                            VaxSul
                        </h2>
                    </div>
                    <hr className="border-green-400 w-full mb-4" />
                    <nav className="mt-2 w-full flex-grow">
                        <Link href="/product_catalog">
                            <div className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer">
                                <span className="text-sm">Catálogo</span>
                            </div>
                        </Link>
                        <Link href="/shopping_cart">
                            <div className="flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 cursor-pointer">
                                <span className="text-sm">Carrinho</span>
                            </div>
                        </Link>
                    </nav>
                </aside>

                <div className="flex-1 bg-gray-200 relative pb-16">
                    <div className="bg-gray-700 bg-opacity-80 p-2 flex justify-between items-center w-full">
                        <h1 className="text-white text-xl font-semibold">Carrinho de Compras</h1>
                    </div>
                    <div className="p-4">
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-700">Seu carrinho está vazio.</p>
                        ) : (
                            <ul>
                                {cartItems.map((item) => (
                                    <li key={item.id} className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                            <div className="flex items-center mt-2">
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    Remover
                                                </button>
                                            </div>
                                        </div>
                                        <span className="text-lg font-semibold">{item.price.toFixed(2)} R$</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="text-right mt-4">
                            <button
                                onClick={handleCheckout}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-700 text-white text-center p-2">
                © 2024 VaxSul. Todos os direitos reservados.
            </footer>
        </div>
    );
}
