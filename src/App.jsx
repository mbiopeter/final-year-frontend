import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import UpBar from "./views/components/upBar/UpBar";
import Footer from "./views/components/footer/Footer";
import Home from "./views/pages/home/Home";
import Authentication from "./views/pages/authentication/Authentication";
import Cart from "./views/pages/cart/Cart";
import Abaut from "./views/pages/abaut/Abaut";
import Account from "./views/pages/account/Account";
import Contact from "./views/pages/contact/Contact";
import Orders from "./views/pages/orders/Orders";
import WishList from "./views/pages/wishList/WishList";
import Billing from "./views/pages/billing/Billing";
import Product from "./views/pages/product/Product";
import Error404 from "./views/pages/error/Error404";
import Category from "./views/pages/category/Category";
import SubCategory from "./views/subCategory/SubCategory";
import History from "./views/pages/history/History";
import { handleFetchCart } from "./model/cart/cart";
import { getUserId } from "./model/auth/token";
import AllOrders from "./views/pages/allOrders/AllOrders";

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return null;
};

const NotFound = () => <Error404 />;

function App() {
	const [userId, setUserId] = useState(getUserId());
	const [fetch, setFetch] = useState(false);

	useEffect(() => {
		setUserId(getUserId());
	},[fetch]);

	const [items, setItems] = useState([]);
	useEffect(() => {
		const handleCart = async () => {
			
			setItems(await handleFetchCart(userId) ||[])
		}
		handleCart();
	},[userId, fetch]);
	
	return (
		<PrimeReactProvider>
			<Router>
				<ScrollToTop  />
				<div>
					{/* upbar */}
					<UpBar cartItems={items} fetch={fetch} setFetch={setFetch}/>
					<Routes>
						{/* Pages routes */}
						<Route path="/" element={<Home />} />
						<Route path="/auth" element={<Authentication setFetch={setFetch} reload={fetch} />} />
						<Route path="/cart" element={<Cart items={items} setItems={setItems} setFetch={setFetch} reload={fetch} />}/>
						<Route path="/abaut" element={<Abaut />} />
						<Route path="/wishlist" element={<WishList />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/account" element={<Account />} />
						<Route path="/orders" element={<AllOrders />} />
						<Route path="/orders/:orderId" element={<Orders />} />
						<Route path="/history" element={<History />} />
						<Route path="/billing" element={<Billing billedItems={items} setFetch={setFetch} fetch={fetch} />} />
						<Route path="/product/:productId" element={<Product items={items} setItems={setItems} />}/>
						<Route path="/category/:categoryId" element={<Category />} />
						<Route path="/category/:categoryId/:subcategory" element={<SubCategory />}/>
						<Route path="*" element={<NotFound />} />
					</Routes>
					{/* footer */}
					<Footer />
				</div>
			</Router>
		</PrimeReactProvider>
	);
}

export default App;
