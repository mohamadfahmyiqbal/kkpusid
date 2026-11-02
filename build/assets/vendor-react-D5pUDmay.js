import { o as __toESM, t as __commonJSMin } from "./rolldown-runtime-Cf1989ZW.js";
import { $ as useEventCallback, A as removeClass, An as stripBasename, B as useIsomorphicEffect_default, C as _typeof, Cn as getResolveToMatches, D as Tabs$1, Dn as matchRoutes, E as clsx, En as joinPaths, F as useCallbackRef, G as useDropdownToggle, H as useDropdownItem, I as scrollbarSize, J as DropdownContext$1, K as useDropdownMenu, L as Nav_default$1, M as Modal_default$1, Mn as require_react, N as NoopTransition, O as useTabPanel, On as parsePath, P as ModalManager, Q as useButtonProps, R as useNavItem, S as _defineProperty$1, Sn as createRouter, Tn as isRouteErrorResponse, U as SelectableContext, V as Dropdown$1, W as makeEventKey, X as useWillUnmount, Y as qsa, Z as Anchor, _ as _createClass, a as index, at as getChildRef, b as _slicedToArray, bn as createBrowserHistory, c as useInsertionEffectAlwaysWithSyncFallback, ct as _inheritsLoose, d as insertStyles, dt as _objectWithoutPropertiesLoose$2, et as useMergedRefs, f as registerStyles, ft as _extends$3, g as _inherits, gn as require_jsx_runtime, h as _createSuper, i as memoizeOne, it as canUseDOM_default, j as addClass, jn as require_react_dom, k as useBreakpoint, kn as resolveTo, l as serializeStyles, lt as useUncontrolled, m as _toConsumableArray, mt as require_prop_types, nt as removeEventListener, o as autoUpdate, ot as style, p as createCache, pt as require_classnames, q as require_warning, rt as addEventListener, s as _taggedTemplateLiteral, st as ownerDocument, tt as transitionEnd, u as getRegisteredStyles, ut as require_browser, v as _classCallCheck, vn as Action, wn as invariant$1, x as _objectSpread2, xn as createPath, y as _objectWithoutProperties$1, yn as ErrorResponseImpl, z as TabContext } from "./vendor-rpDlma0K.js";
//#region node_modules/react-dom/client.js
var require_client = /* @__PURE__ */ __commonJSMin(((exports) => {
	var m = require_react_dom();
	exports.createRoot = m.createRoot;
	exports.hydrateRoot = m.hydrateRoot;
}));
//#endregion
//#region node_modules/react-router/dist/index.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* React Router v6.30.3
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function _extends$2() {
	_extends$2 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$2.apply(this, arguments);
}
var DataRouterContext = /* @__PURE__ */ import_react.createContext(null);
var DataRouterStateContext = /* @__PURE__ */ import_react.createContext(null);
/**
* A Navigator is a "location changer"; it's how you get to different locations.
*
* Every history instance conforms to the Navigator interface, but the
* distinction is useful primarily when it comes to the low-level `<Router>` API
* where both the location and a navigator must be provided separately in order
* to avoid "tearing" that may occur in a suspense-enabled app if the action
* and/or location were to be read directly from the history instance.
*/
var NavigationContext = /* @__PURE__ */ import_react.createContext(null);
var LocationContext = /* @__PURE__ */ import_react.createContext(null);
var RouteContext = /* @__PURE__ */ import_react.createContext({
	outlet: null,
	matches: [],
	isDataRoute: false
});
var RouteErrorContext = /* @__PURE__ */ import_react.createContext(null);
/**
* Returns the full href for the given "to" value. This is useful for building
* custom links that are also accessible and preserve right-click behavior.
*
* @see https://reactrouter.com/v6/hooks/use-href
*/
function useHref(to, _temp) {
	let { relative } = _temp === void 0 ? {} : _temp;
	!useInRouterContext() && invariant$1(false);
	let { basename, navigator } = import_react.useContext(NavigationContext);
	let { hash, pathname, search } = useResolvedPath(to, { relative });
	let joinedPathname = pathname;
	if (basename !== "/") joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
	return navigator.createHref({
		pathname: joinedPathname,
		search,
		hash
	});
}
/**
* Returns true if this component is a descendant of a `<Router>`.
*
* @see https://reactrouter.com/v6/hooks/use-in-router-context
*/
function useInRouterContext() {
	return import_react.useContext(LocationContext) != null;
}
/**
* Returns the current location object, which represents the current URL in web
* browsers.
*
* Note: If you're using this it may mean you're doing some of your own
* "routing" in your app, and we'd like to know what your use case is. We may
* be able to provide something higher-level to better suit your needs.
*
* @see https://reactrouter.com/v6/hooks/use-location
*/
function useLocation() {
	!useInRouterContext() && invariant$1(false);
	return import_react.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb) {
	if (!import_react.useContext(NavigationContext).static) import_react.useLayoutEffect(cb);
}
/**
* Returns an imperative method for changing the location. Used by `<Link>`s, but
* may also be used by other elements to change the location.
*
* @see https://reactrouter.com/v6/hooks/use-navigate
*/
function useNavigate() {
	let { isDataRoute } = import_react.useContext(RouteContext);
	return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
	!useInRouterContext() && invariant$1(false);
	let dataRouterContext = import_react.useContext(DataRouterContext);
	let { basename, future, navigator } = import_react.useContext(NavigationContext);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
	let activeRef = import_react.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return import_react.useCallback(function(to, options) {
		if (options === void 0) options = {};
		if (!activeRef.current) return;
		if (typeof to === "number") {
			navigator.go(to);
			return;
		}
		let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
		if (dataRouterContext == null && basename !== "/") path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
		(!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
	}, [
		basename,
		navigator,
		routePathnamesJson,
		locationPathname,
		dataRouterContext
	]);
}
/**
* Returns an object of key/value pairs of the dynamic params from the current
* URL that were matched by the route path.
*
* @see https://reactrouter.com/v6/hooks/use-params
*/
function useParams() {
	let { matches } = import_react.useContext(RouteContext);
	let routeMatch = matches[matches.length - 1];
	return routeMatch ? routeMatch.params : {};
}
/**
* Resolves the pathname of the given `to` value against the current location.
*
* @see https://reactrouter.com/v6/hooks/use-resolved-path
*/
function useResolvedPath(to, _temp2) {
	let { relative } = _temp2 === void 0 ? {} : _temp2;
	let { future } = import_react.useContext(NavigationContext);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future.v7_relativeSplatPath));
	return import_react.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [
		to,
		routePathnamesJson,
		locationPathname,
		relative
	]);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
	!useInRouterContext() && invariant$1(false);
	let { navigator } = import_react.useContext(NavigationContext);
	let { matches: parentMatches } = import_react.useContext(RouteContext);
	let routeMatch = parentMatches[parentMatches.length - 1];
	let parentParams = routeMatch ? routeMatch.params : {};
	routeMatch && routeMatch.pathname;
	let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
	routeMatch && routeMatch.route;
	let locationFromContext = useLocation();
	let location;
	if (locationArg) {
		var _parsedLocationArg$pa;
		let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
		!(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) && invariant$1(false);
		location = parsedLocationArg;
	} else location = locationFromContext;
	let pathname = location.pathname || "/";
	let remainingPathname = pathname;
	if (parentPathnameBase !== "/") {
		let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
		remainingPathname = "/" + pathname.replace(/^\//, "").split("/").slice(parentSegments.length).join("/");
	}
	let matches = matchRoutes(routes, { pathname: remainingPathname });
	let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
		params: Object.assign({}, parentParams, match.params),
		pathname: joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
		pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([parentPathnameBase, navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
	})), parentMatches, dataRouterState, future);
	if (locationArg && renderedMatches) return /* @__PURE__ */ import_react.createElement(LocationContext.Provider, { value: {
		location: _extends$2({
			pathname: "/",
			search: "",
			hash: "",
			state: null,
			key: "default"
		}, location),
		navigationType: Action.Pop
	} }, renderedMatches);
	return renderedMatches;
}
function DefaultErrorComponent() {
	let error = useRouteError();
	let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
	let stack = error instanceof Error ? error.stack : null;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ import_react.createElement("h3", { style: { fontStyle: "italic" } }, message), stack ? /* @__PURE__ */ import_react.createElement("pre", { style: {
		padding: "0.5rem",
		backgroundColor: "rgba(200,200,200, 0.5)"
	} }, stack) : null, null);
}
var defaultErrorElement = /* @__PURE__ */ import_react.createElement(DefaultErrorComponent, null);
var RenderErrorBoundary = class extends import_react.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: props.location,
			revalidation: props.revalidation,
			error: props.error
		};
	}
	static getDerivedStateFromError(error) {
		return { error };
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") return {
			error: props.error,
			location: props.location,
			revalidation: props.revalidation
		};
		return {
			error: props.error !== void 0 ? props.error : state.error,
			location: state.location,
			revalidation: props.revalidation || state.revalidation
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("React Router caught the following error during render", error, errorInfo);
	}
	render() {
		return this.state.error !== void 0 ? /* @__PURE__ */ import_react.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ import_react.createElement(RouteErrorContext.Provider, {
			value: this.state.error,
			children: this.props.component
		})) : this.props.children;
	}
};
function RenderedRoute(_ref) {
	let { routeContext, match, children } = _ref;
	let dataRouterContext = import_react.useContext(DataRouterContext);
	if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
	return /* @__PURE__ */ import_react.createElement(RouteContext.Provider, { value: routeContext }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
	var _dataRouterState;
	if (parentMatches === void 0) parentMatches = [];
	if (dataRouterState === void 0) dataRouterState = null;
	if (future === void 0) future = null;
	if (matches == null) {
		var _future;
		if (!dataRouterState) return null;
		if (dataRouterState.errors) matches = dataRouterState.matches;
		else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) matches = dataRouterState.matches;
		else return null;
	}
	let renderedMatches = matches;
	let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
	if (errors != null) {
		let errorIndex = renderedMatches.findIndex((m) => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0);
		!(errorIndex >= 0) && invariant$1(false);
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
	}
	let renderFallback = false;
	let fallbackIndex = -1;
	if (dataRouterState && future && future.v7_partialHydration) for (let i = 0; i < renderedMatches.length; i++) {
		let match = renderedMatches[i];
		if (match.route.HydrateFallback || match.route.hydrateFallbackElement) fallbackIndex = i;
		if (match.route.id) {
			let { loaderData, errors } = dataRouterState;
			let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors || errors[match.route.id] === void 0);
			if (match.route.lazy || needsToRunLoader) {
				renderFallback = true;
				if (fallbackIndex >= 0) renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
				else renderedMatches = [renderedMatches[0]];
				break;
			}
		}
	}
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error;
		let shouldRenderHydrateFallback = false;
		let errorElement = null;
		let hydrateFallbackElement = null;
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0;
			errorElement = match.route.errorElement || defaultErrorElement;
			if (renderFallback) {
				if (fallbackIndex < 0 && index === 0) {
					warningOnce("route-fallback", false, "No `HydrateFallback` element provided to render during initial hydration");
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = null;
				} else if (fallbackIndex === index) {
					shouldRenderHydrateFallback = true;
					hydrateFallbackElement = match.route.hydrateFallbackElement || null;
				}
			}
		}
		let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
		let getChildren = () => {
			let children;
			if (error) children = errorElement;
			else if (shouldRenderHydrateFallback) children = hydrateFallbackElement;
			else if (match.route.Component) children = /* @__PURE__ */ import_react.createElement(match.route.Component, null);
			else if (match.route.element) children = match.route.element;
			else children = outlet;
			return /* @__PURE__ */ import_react.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches,
					isDataRoute: dataRouterState != null
				},
				children
			});
		};
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ import_react.createElement(RenderErrorBoundary, {
			location: dataRouterState.location,
			revalidation: dataRouterState.revalidation,
			component: errorElement,
			error,
			children: getChildren(),
			routeContext: {
				outlet: null,
				matches,
				isDataRoute: true
			}
		}) : getChildren();
	}, null);
}
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook) {
	DataRouterHook["UseBlocker"] = "useBlocker";
	DataRouterHook["UseRevalidator"] = "useRevalidator";
	DataRouterHook["UseNavigateStable"] = "useNavigate";
	return DataRouterHook;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook) {
	DataRouterStateHook["UseBlocker"] = "useBlocker";
	DataRouterStateHook["UseLoaderData"] = "useLoaderData";
	DataRouterStateHook["UseActionData"] = "useActionData";
	DataRouterStateHook["UseRouteError"] = "useRouteError";
	DataRouterStateHook["UseNavigation"] = "useNavigation";
	DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
	DataRouterStateHook["UseMatches"] = "useMatches";
	DataRouterStateHook["UseRevalidator"] = "useRevalidator";
	DataRouterStateHook["UseNavigateStable"] = "useNavigate";
	DataRouterStateHook["UseRouteId"] = "useRouteId";
	return DataRouterStateHook;
}(DataRouterStateHook$1 || {});
function useDataRouterContext(hookName) {
	let ctx = import_react.useContext(DataRouterContext);
	!ctx && invariant$1(false);
	return ctx;
}
function useDataRouterState(hookName) {
	let state = import_react.useContext(DataRouterStateContext);
	!state && invariant$1(false);
	return state;
}
function useRouteContext(hookName) {
	let route = import_react.useContext(RouteContext);
	!route && invariant$1(false);
	return route;
}
function useCurrentRouteId(hookName) {
	let route = useRouteContext(hookName);
	let thisRoute = route.matches[route.matches.length - 1];
	!thisRoute.route.id && invariant$1(false);
	return thisRoute.route.id;
}
/**
* Returns the nearest ancestor Route error, which could be a loader/action
* error or a render error.  This is intended to be called from your
* ErrorBoundary/errorElement to display a proper error message.
*/
function useRouteError() {
	var _state$errors;
	let error = import_react.useContext(RouteErrorContext);
	let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
	let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
	if (error !== void 0) return error;
	return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
/**
* Stable version of useNavigate that is used when we are in the context of
* a RouterProvider.
*/
function useNavigateStable() {
	let { router } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
	let id = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
	let activeRef = import_react.useRef(false);
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true;
	});
	return import_react.useCallback(function(to, options) {
		if (options === void 0) options = {};
		if (!activeRef.current) return;
		if (typeof to === "number") router.navigate(to);
		else router.navigate(to, _extends$2({ fromRouteId: id }, options));
	}, [router, id]);
}
var alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned$1[key]) alreadyWarned$1[key] = true;
}
var logDeprecation = (flag, msg, link) => ("" + msg + ("You can use the `" + flag + "` future flag to opt-in early. ") + ("For more information, see " + link + "."), void 0);
function logV6DeprecationWarnings(renderFuture, routerFuture) {
	if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) logDeprecation("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition");
	if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && (!routerFuture || routerFuture.v7_relativeSplatPath === void 0)) logDeprecation("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
	if (routerFuture) {
		if (routerFuture.v7_fetcherPersist === void 0) logDeprecation("v7_fetcherPersist", "The persistence behavior of fetchers is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_fetcherpersist");
		if (routerFuture.v7_normalizeFormMethod === void 0) logDeprecation("v7_normalizeFormMethod", "Casing of `formMethod` fields is being normalized to uppercase in v7", "https://reactrouter.com/v6/upgrading/future#v7_normalizeformmethod");
		if (routerFuture.v7_partialHydration === void 0) logDeprecation("v7_partialHydration", "`RouterProvider` hydration behavior is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_partialhydration");
		if (routerFuture.v7_skipActionErrorRevalidation === void 0) logDeprecation("v7_skipActionErrorRevalidation", "The revalidation behavior after 4xx/5xx `action` responses is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_skipactionerrorrevalidation");
	}
}
/**
* Changes the current location.
*
* Note: This API is mostly useful in React.Component subclasses that are not
* able to use hooks. In functional components, we recommend you use the
* `useNavigate` hook instead.
*
* @see https://reactrouter.com/v6/components/navigate
*/
function Navigate(_ref4) {
	let { to, replace, state, relative } = _ref4;
	!useInRouterContext() && invariant$1(false);
	let { future, static: isStatic } = import_react.useContext(NavigationContext);
	let { matches } = import_react.useContext(RouteContext);
	let { pathname: locationPathname } = useLocation();
	let navigate = useNavigate();
	let path = resolveTo(to, getResolveToMatches(matches, future.v7_relativeSplatPath), locationPathname, relative === "path");
	let jsonPath = JSON.stringify(path);
	import_react.useEffect(() => navigate(JSON.parse(jsonPath), {
		replace,
		state,
		relative
	}), [
		navigate,
		jsonPath,
		relative,
		replace,
		state
	]);
	return null;
}
/**
* Provides location context for the rest of the app.
*
* Note: You usually won't render a `<Router>` directly. Instead, you'll render a
* router that is more specific to your environment such as a `<BrowserRouter>`
* in web browsers or a `<StaticRouter>` for server rendering.
*
* @see https://reactrouter.com/v6/router-components/router
*/
function Router(_ref5) {
	let { basename: basenameProp = "/", children = null, location: locationProp, navigationType = Action.Pop, navigator, static: staticProp = false, future } = _ref5;
	useInRouterContext() && invariant$1(false);
	let basename = basenameProp.replace(/^\/*/, "/");
	let navigationContext = import_react.useMemo(() => ({
		basename,
		navigator,
		static: staticProp,
		future: _extends$2({ v7_relativeSplatPath: false }, future)
	}), [
		basename,
		future,
		navigator,
		staticProp
	]);
	if (typeof locationProp === "string") locationProp = parsePath(locationProp);
	let { pathname = "/", search = "", hash = "", state = null, key = "default" } = locationProp;
	let locationContext = import_react.useMemo(() => {
		let trailingPathname = stripBasename(pathname, basename);
		if (trailingPathname == null) return null;
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key
			},
			navigationType
		};
	}, [
		basename,
		pathname,
		search,
		hash,
		state,
		key,
		navigationType
	]);
	if (locationContext == null) return null;
	return /* @__PURE__ */ import_react.createElement(NavigationContext.Provider, { value: navigationContext }, /* @__PURE__ */ import_react.createElement(LocationContext.Provider, {
		children,
		value: locationContext
	}));
}
var AwaitRenderStatus = /* @__PURE__ */ function(AwaitRenderStatus) {
	AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
	AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
	AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
	return AwaitRenderStatus;
}(AwaitRenderStatus || {});
new Promise(() => {});
import_react.Component;
function mapRouteProperties(route) {
	let updates = { hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null };
	if (route.Component) Object.assign(updates, {
		element: /* @__PURE__ */ import_react.createElement(route.Component),
		Component: void 0
	});
	if (route.HydrateFallback) Object.assign(updates, {
		hydrateFallbackElement: /* @__PURE__ */ import_react.createElement(route.HydrateFallback),
		HydrateFallback: void 0
	});
	if (route.ErrorBoundary) Object.assign(updates, {
		errorElement: /* @__PURE__ */ import_react.createElement(route.ErrorBoundary),
		ErrorBoundary: void 0
	});
	return updates;
}
//#endregion
//#region node_modules/react-router-dom/dist/index.js
/**
* React Router DOM v6.30.3
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/
function _extends$1() {
	_extends$1 = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
		}
		return target;
	};
	return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i;
	for (i = 0; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
	return event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event);
}
var _excluded$8 = [
	"onClick",
	"relative",
	"reloadDocument",
	"replace",
	"state",
	"target",
	"to",
	"preventScrollReset",
	"viewTransition"
];
var REACT_ROUTER_VERSION = "6";
try {
	window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e) {}
function createBrowserRouter(routes, opts) {
	return createRouter({
		basename: opts == null ? void 0 : opts.basename,
		future: _extends$1({}, opts == null ? void 0 : opts.future, { v7_prependBasename: true }),
		history: createBrowserHistory({ window: opts == null ? void 0 : opts.window }),
		hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
		routes,
		mapRouteProperties,
		dataStrategy: opts == null ? void 0 : opts.dataStrategy,
		patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
		window: opts == null ? void 0 : opts.window
	}).initialize();
}
function parseHydrationData() {
	var _window;
	let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
	if (state && state.errors) state = _extends$1({}, state, { errors: deserializeErrors(state.errors) });
	return state;
}
function deserializeErrors(errors) {
	if (!errors) return null;
	let entries = Object.entries(errors);
	let serialized = {};
	for (let [key, val] of entries) if (val && val.__type === "RouteErrorResponse") serialized[key] = new ErrorResponseImpl(val.status, val.statusText, val.data, val.internal === true);
	else if (val && val.__type === "Error") {
		if (val.__subType) {
			let ErrorConstructor = window[val.__subType];
			if (typeof ErrorConstructor === "function") try {
				let error = new ErrorConstructor(val.message);
				error.stack = "";
				serialized[key] = error;
			} catch (e) {}
		}
		if (serialized[key] == null) {
			let error = new Error(val.message);
			error.stack = "";
			serialized[key] = error;
		}
	} else serialized[key] = val;
	return serialized;
}
var ViewTransitionContext = /* @__PURE__ */ import_react.createContext({ isTransitioning: false });
var FetchersContext = /* @__PURE__ */ import_react.createContext(/* @__PURE__ */ new Map());
var startTransitionImpl = import_react.startTransition;
var flushSyncImpl = import_react_dom.flushSync;
function startTransitionSafe(cb) {
	if (startTransitionImpl) startTransitionImpl(cb);
	else cb();
}
function flushSyncSafe(cb) {
	if (flushSyncImpl) flushSyncImpl(cb);
	else cb();
}
var Deferred = class {
	constructor() {
		this.status = "pending";
		this.promise = new Promise((resolve, reject) => {
			this.resolve = (value) => {
				if (this.status === "pending") {
					this.status = "resolved";
					resolve(value);
				}
			};
			this.reject = (reason) => {
				if (this.status === "pending") {
					this.status = "rejected";
					reject(reason);
				}
			};
		});
	}
};
/**
* Given a Remix Router instance, render the appropriate UI
*/
function RouterProvider(_ref) {
	let { fallbackElement, router, future } = _ref;
	let [state, setStateImpl] = import_react.useState(router.state);
	let [pendingState, setPendingState] = import_react.useState();
	let [vtContext, setVtContext] = import_react.useState({ isTransitioning: false });
	let [renderDfd, setRenderDfd] = import_react.useState();
	let [transition, setTransition] = import_react.useState();
	let [interruption, setInterruption] = import_react.useState();
	let fetcherData = import_react.useRef(/* @__PURE__ */ new Map());
	let { v7_startTransition } = future || {};
	let optInStartTransition = import_react.useCallback((cb) => {
		if (v7_startTransition) startTransitionSafe(cb);
		else cb();
	}, [v7_startTransition]);
	let setState = import_react.useCallback((newState, _ref2) => {
		let { deletedFetchers, flushSync, viewTransitionOpts } = _ref2;
		newState.fetchers.forEach((fetcher, key) => {
			if (fetcher.data !== void 0) fetcherData.current.set(key, fetcher.data);
		});
		deletedFetchers.forEach((key) => fetcherData.current.delete(key));
		let isViewTransitionUnavailable = router.window == null || router.window.document == null || typeof router.window.document.startViewTransition !== "function";
		if (!viewTransitionOpts || isViewTransitionUnavailable) {
			if (flushSync) flushSyncSafe(() => setStateImpl(newState));
			else optInStartTransition(() => setStateImpl(newState));
			return;
		}
		if (flushSync) {
			flushSyncSafe(() => {
				if (transition) {
					renderDfd && renderDfd.resolve();
					transition.skipTransition();
				}
				setVtContext({
					isTransitioning: true,
					flushSync: true,
					currentLocation: viewTransitionOpts.currentLocation,
					nextLocation: viewTransitionOpts.nextLocation
				});
			});
			let t = router.window.document.startViewTransition(() => {
				flushSyncSafe(() => setStateImpl(newState));
			});
			t.finished.finally(() => {
				flushSyncSafe(() => {
					setRenderDfd(void 0);
					setTransition(void 0);
					setPendingState(void 0);
					setVtContext({ isTransitioning: false });
				});
			});
			flushSyncSafe(() => setTransition(t));
			return;
		}
		if (transition) {
			renderDfd && renderDfd.resolve();
			transition.skipTransition();
			setInterruption({
				state: newState,
				currentLocation: viewTransitionOpts.currentLocation,
				nextLocation: viewTransitionOpts.nextLocation
			});
		} else {
			setPendingState(newState);
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: viewTransitionOpts.currentLocation,
				nextLocation: viewTransitionOpts.nextLocation
			});
		}
	}, [
		router.window,
		transition,
		renderDfd,
		fetcherData,
		optInStartTransition
	]);
	import_react.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
	import_react.useEffect(() => {
		if (vtContext.isTransitioning && !vtContext.flushSync) setRenderDfd(new Deferred());
	}, [vtContext]);
	import_react.useEffect(() => {
		if (renderDfd && pendingState && router.window) {
			let newState = pendingState;
			let renderPromise = renderDfd.promise;
			let transition = router.window.document.startViewTransition(async () => {
				optInStartTransition(() => setStateImpl(newState));
				await renderPromise;
			});
			transition.finished.finally(() => {
				setRenderDfd(void 0);
				setTransition(void 0);
				setPendingState(void 0);
				setVtContext({ isTransitioning: false });
			});
			setTransition(transition);
		}
	}, [
		optInStartTransition,
		pendingState,
		renderDfd,
		router.window
	]);
	import_react.useEffect(() => {
		if (renderDfd && pendingState && state.location.key === pendingState.location.key) renderDfd.resolve();
	}, [
		renderDfd,
		transition,
		state.location,
		pendingState
	]);
	import_react.useEffect(() => {
		if (!vtContext.isTransitioning && interruption) {
			setPendingState(interruption.state);
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: interruption.currentLocation,
				nextLocation: interruption.nextLocation
			});
			setInterruption(void 0);
		}
	}, [vtContext.isTransitioning, interruption]);
	import_react.useEffect(() => {}, []);
	let navigator = import_react.useMemo(() => {
		return {
			createHref: router.createHref,
			encodeLocation: router.encodeLocation,
			go: (n) => router.navigate(n),
			push: (to, state, opts) => router.navigate(to, {
				state,
				preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
			}),
			replace: (to, state, opts) => router.navigate(to, {
				replace: true,
				state,
				preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
			})
		};
	}, [router]);
	let basename = router.basename || "/";
	let dataRouterContext = import_react.useMemo(() => ({
		router,
		navigator,
		static: false,
		basename
	}), [
		router,
		navigator,
		basename
	]);
	let routerFuture = import_react.useMemo(() => ({ v7_relativeSplatPath: router.future.v7_relativeSplatPath }), [router.future.v7_relativeSplatPath]);
	import_react.useEffect(() => logV6DeprecationWarnings(future, router.future), [future, router.future]);
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(DataRouterContext.Provider, { value: dataRouterContext }, /* @__PURE__ */ import_react.createElement(DataRouterStateContext.Provider, { value: state }, /* @__PURE__ */ import_react.createElement(FetchersContext.Provider, { value: fetcherData.current }, /* @__PURE__ */ import_react.createElement(ViewTransitionContext.Provider, { value: vtContext }, /* @__PURE__ */ import_react.createElement(Router, {
		basename,
		location: state.location,
		navigationType: state.historyAction,
		navigator,
		future: routerFuture
	}, state.initialized || router.future.v7_partialHydration ? /* @__PURE__ */ import_react.createElement(MemoizedDataRoutes, {
		routes: router.routes,
		future: router.future,
		state
	}) : fallbackElement))))), null);
}
var MemoizedDataRoutes = /* @__PURE__ */ import_react.memo(DataRoutes);
function DataRoutes(_ref3) {
	let { routes, future, state } = _ref3;
	return useRoutesImpl(routes, void 0, state, future);
}
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
* The public API for rendering a history-aware `<a>`.
*/
var Link = /* @__PURE__ */ import_react.forwardRef(function LinkWithRef(_ref7, ref) {
	let { onClick, relative, reloadDocument, replace, state, target, to, preventScrollReset, viewTransition } = _ref7, rest = _objectWithoutPropertiesLoose$1(_ref7, _excluded$8);
	let { basename } = import_react.useContext(NavigationContext);
	let absoluteHref;
	let isExternal = false;
	if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
		absoluteHref = to;
		if (isBrowser) try {
			let currentUrl = new URL(window.location.href);
			let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
			let path = stripBasename(targetUrl.pathname, basename);
			if (targetUrl.origin === currentUrl.origin && path != null) to = path + targetUrl.search + targetUrl.hash;
			else isExternal = true;
		} catch (e) {}
	}
	let href = useHref(to, { relative });
	let internalOnClick = useLinkClickHandler(to, {
		replace,
		state,
		target,
		preventScrollReset,
		relative,
		viewTransition
	});
	function handleClick(event) {
		if (onClick) onClick(event);
		if (!event.defaultPrevented) internalOnClick(event);
	}
	return /* @__PURE__ */ import_react.createElement("a", _extends$1({}, rest, {
		href: absoluteHref || href,
		onClick: isExternal || reloadDocument ? onClick : handleClick,
		ref,
		target
	}));
});
var DataRouterHook;
(function(DataRouterHook) {
	DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
	DataRouterHook["UseSubmit"] = "useSubmit";
	DataRouterHook["UseSubmitFetcher"] = "useSubmitFetcher";
	DataRouterHook["UseFetcher"] = "useFetcher";
	DataRouterHook["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook) {
	DataRouterStateHook["UseFetcher"] = "useFetcher";
	DataRouterStateHook["UseFetchers"] = "useFetchers";
	DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
/**
* Handles the click behavior for router `<Link>` components. This is useful if
* you need to create custom `<Link>` components with the same click behavior we
* use in our exported `<Link>`.
*/
function useLinkClickHandler(to, _temp) {
	let { target, replace: replaceProp, state, preventScrollReset, relative, viewTransition } = _temp === void 0 ? {} : _temp;
	let navigate = useNavigate();
	let location = useLocation();
	let path = useResolvedPath(to, { relative });
	return import_react.useCallback((event) => {
		if (shouldProcessLinkClick(event, target)) {
			event.preventDefault();
			navigate(to, {
				replace: replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path),
				state,
				preventScrollReset,
				relative,
				viewTransition
			});
		}
	}, [
		location,
		navigate,
		path,
		replaceProp,
		state,
		target,
		to,
		preventScrollReset,
		relative,
		viewTransition
	]);
}
//#endregion
//#region node_modules/react-icons/lib/iconContext.mjs
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = import_react.createContext && /* @__PURE__ */ import_react.createContext(DefaultContext);
//#endregion
//#region node_modules/react-icons/lib/iconBase.mjs
var _excluded$7 = [
	"attr",
	"size",
	"title"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
	return tree && tree.map((node, i) => /* @__PURE__ */ import_react.createElement(node.tag, _objectSpread({ key: i }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
	return (props) => /* @__PURE__ */ import_react.createElement(IconBase, _extends({ attr: _objectSpread({}, data.attr) }, props), Tree2Element(data.child));
}
function IconBase(props) {
	var elem = (conf) => {
		var { attr, size, title } = props, svgProps = _objectWithoutProperties(props, _excluded$7);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return /* @__PURE__ */ import_react.createElement("svg", _extends({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: _objectSpread(_objectSpread({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && /* @__PURE__ */ import_react.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? /* @__PURE__ */ import_react.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
//#endregion
//#region node_modules/react-icons/fa/index.mjs
function FaWallet(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" },
			"child": []
		}]
	})(props);
}
function FaUtensils(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 416 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z" },
			"child": []
		}]
	})(props);
}
function FaUsers(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" },
			"child": []
		}]
	})(props);
}
function FaUser(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" },
			"child": []
		}]
	})(props);
}
function FaUserTie(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" },
			"child": []
		}]
	})(props);
}
function FaUserTag(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7.1-45.2zm-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24c0 13.2-10.7 24-24 24zm-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9zm127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9z" },
			"child": []
		}]
	})(props);
}
function FaUserShield(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M622.3 271.1l-115.2-45c-4.1-1.6-12.6-3.7-22.2 0l-115.2 45c-10.7 4.2-17.7 14-17.7 24.9 0 111.6 68.7 188.8 132.9 213.9 9.6 3.7 18 1.6 22.2 0C558.4 489.9 640 420.5 640 296c0-10.9-7-20.7-17.7-24.9zM496 462.4V273.3l95.5 37.3c-5.6 87.1-60.9 135.4-95.5 151.8zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm96 40c0-2.5.8-4.8 1.1-7.2-2.5-.1-4.9-.8-7.5-.8h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c6.8 0 13.3-1.5 19.2-4-54-42.9-99.2-116.7-99.2-212z" },
			"child": []
		}]
	})(props);
}
function FaUserPlus(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" },
			"child": []
		}]
	})(props);
}
function FaUserMinus(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" },
			"child": []
		}]
	})(props);
}
function FaUserFriends(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" },
			"child": []
		}]
	})(props);
}
function FaUserEdit(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z" },
			"child": []
		}]
	})(props);
}
function FaUserCog(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z" },
			"child": []
		}]
	})(props);
}
function FaUserCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 496 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" },
			"child": []
		}]
	})(props);
}
function FaUserCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z" },
			"child": []
		}]
	})(props);
}
function FaUpload(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" },
			"child": []
		}]
	})(props);
}
function FaUniversity(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z" },
			"child": []
		}]
	})(props);
}
function FaUndo(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" },
			"child": []
		}]
	})(props);
}
function FaTrophy(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" },
			"child": []
		}]
	})(props);
}
function FaTrash(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" },
			"child": []
		}]
	})(props);
}
function FaTrashAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" },
			"child": []
		}]
	})(props);
}
function FaTimes(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 352 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" },
			"child": []
		}]
	})(props);
}
function FaTimesCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" },
			"child": []
		}]
	})(props);
}
function FaTag(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z" },
			"child": []
		}]
	})(props);
}
function FaSync(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" },
			"child": []
		}]
	})(props);
}
function FaSyncAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z" },
			"child": []
		}]
	})(props);
}
function FaStore(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 616 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M602 118.6L537.1 15C531.3 5.7 521 0 510 0H106C95 0 84.7 5.7 78.9 15L14 118.6c-33.5 53.5-3.8 127.9 58.8 136.4 4.5.6 9.1.9 13.7.9 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18 20.1 44.3 33.1 73.8 33.1 29.6 0 55.8-13 73.8-33.1 18.1 20.1 44.3 33.1 73.8 33.1 4.7 0 9.2-.3 13.7-.9 62.8-8.4 92.6-82.8 59-136.4zM529.5 288c-10 0-19.9-1.5-29.5-3.8V384H116v-99.8c-9.6 2.2-19.5 3.8-29.5 3.8-6 0-12.1-.4-18-1.2-5.6-.8-11.1-2.1-16.4-3.6V480c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32V283.2c-5.4 1.6-10.8 2.9-16.4 3.6-6.1.8-12.1 1.2-18.2 1.2z" },
			"child": []
		}]
	})(props);
}
function FaStar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" },
			"child": []
		}]
	})(props);
}
function FaSquare(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z" },
			"child": []
		}]
	})(props);
}
function FaSignInAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z" },
			"child": []
		}]
	})(props);
}
function FaShoppingCart(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" },
			"child": []
		}]
	})(props);
}
function FaShieldAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z" },
			"child": []
		}]
	})(props);
}
function FaSearch(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" },
			"child": []
		}]
	})(props);
}
function FaSave(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z" },
			"child": []
		}]
	})(props);
}
function FaRedo(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z" },
			"child": []
		}]
	})(props);
}
function FaReceipt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z" },
			"child": []
		}]
	})(props);
}
function FaQuestionCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" },
			"child": []
		}]
	})(props);
}
function FaPrint(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z" },
			"child": []
		}]
	})(props);
}
function FaPowerOff(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z" },
			"child": []
		}]
	})(props);
}
function FaPlus(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" },
			"child": []
		}]
	})(props);
}
function FaPlusCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" },
			"child": []
		}]
	})(props);
}
function FaPiggyBank(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M560 224h-29.5c-8.8-20-21.6-37.7-37.4-52.5L512 96h-32c-29.4 0-55.4 13.5-73 34.3-7.6-1.1-15.1-2.3-23-2.3H256c-77.4 0-141.9 55-156.8 128H56c-14.8 0-26.5-13.5-23.5-28.8C34.7 215.8 45.4 208 57 208h1c3.3 0 6-2.7 6-6v-20c0-3.3-2.7-6-6-6-28.5 0-53.9 20.4-57.5 48.6C-3.9 258.8 22.7 288 56 288h40c0 52.2 25.4 98.1 64 127.3V496c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-48h128v48c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16v-80.7c11.8-8.9 22.3-19.4 31.3-31.3H560c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16zm-128 64c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM256 96h128c5.4 0 10.7.4 15.9.8 0-.3.1-.5.1-.8 0-53-43-96-96-96s-96 43-96 96c0 2.1.5 4.1.6 6.2 15.2-3.9 31-6.2 47.4-6.2z" },
			"child": []
		}]
	})(props);
}
function FaPhone(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" },
			"child": []
		}]
	})(props);
}
function FaPhoneAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" },
			"child": []
		}]
	})(props);
}
function FaPaperPlane(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" },
			"child": []
		}]
	})(props);
}
function FaMoneyBillWave(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M621.16 54.46C582.37 38.19 543.55 32 504.75 32c-123.17-.01-246.33 62.34-369.5 62.34-30.89 0-61.76-3.92-92.65-13.72-3.47-1.1-6.95-1.62-10.35-1.62C15.04 79 0 92.32 0 110.81v317.26c0 12.63 7.23 24.6 18.84 29.46C57.63 473.81 96.45 480 135.25 480c123.17 0 246.34-62.35 369.51-62.35 30.89 0 61.76 3.92 92.65 13.72 3.47 1.1 6.95 1.62 10.35 1.62 17.21 0 32.25-13.32 32.25-31.81V83.93c-.01-12.64-7.24-24.6-18.85-29.47zM48 132.22c20.12 5.04 41.12 7.57 62.72 8.93C104.84 170.54 79 192.69 48 192.69v-60.47zm0 285v-47.78c34.37 0 62.18 27.27 63.71 61.4-22.53-1.81-43.59-6.31-63.71-13.62zM320 352c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 27.78c-17.52-4.39-35.71-6.85-54.32-8.44 5.87-26.08 27.5-45.88 54.32-49.28v57.72zm0-236.11c-30.89-3.91-54.86-29.7-55.81-61.55 19.54 2.17 38.09 6.23 55.81 12.66v48.89z" },
			"child": []
		}]
	})(props);
}
function FaMedal(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z" },
			"child": []
		}]
	})(props);
}
function FaMapMarkerAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" },
			"child": []
		}]
	})(props);
}
function FaMapMarkedAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z" },
			"child": []
		}]
	})(props);
}
function FaLock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" },
			"child": []
		}]
	})(props);
}
function FaListAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z" },
			"child": []
		}]
	})(props);
}
function FaLink(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" },
			"child": []
		}]
	})(props);
}
function FaLightbulb(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 352 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M96.06 454.35c.01 6.29 1.87 12.45 5.36 17.69l17.09 25.69a31.99 31.99 0 0 0 26.64 14.28h61.71a31.99 31.99 0 0 0 26.64-14.28l17.09-25.69a31.989 31.989 0 0 0 5.36-17.69l.04-38.35H96.01l.05 38.35zM0 176c0 44.37 16.45 84.85 43.56 115.78 16.52 18.85 42.36 58.23 52.21 91.45.04.26.07.52.11.78h160.24c.04-.26.07-.51.11-.78 9.85-33.22 35.69-72.6 52.21-91.45C335.55 260.85 352 220.37 352 176 352 78.61 272.91-.3 175.45 0 73.44.31 0 82.97 0 176zm176-80c-44.11 0-80 35.89-80 80 0 8.84-7.16 16-16 16s-16-7.16-16-16c0-61.76 50.24-112 112-112 8.84 0 16 7.16 16 16s-7.16 16-16 16z" },
			"child": []
		}]
	})(props);
}
function FaLayerGroup(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 404.1c16.55-7.5 16.55-32.5 0-40z" },
			"child": []
		}]
	})(props);
}
function FaKey(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" },
			"child": []
		}]
	})(props);
}
function FaKaaba(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M554.12 83.51L318.36 4.93a95.962 95.962 0 0 0-60.71 0L21.88 83.51A32.006 32.006 0 0 0 0 113.87v49.01l265.02-79.51c15.03-4.5 30.92-4.5 45.98 0l265 79.51v-49.01c0-13.77-8.81-26-21.88-30.36zm-279.9 30.52L0 196.3v228.38c0 15 10.42 27.98 25.06 31.24l242.12 53.8a95.937 95.937 0 0 0 41.65 0l242.12-53.8c14.64-3.25 25.06-16.24 25.06-31.24V196.29l-274.2-82.26c-9.04-2.72-18.59-2.72-27.59 0zM128 230.11c0 3.61-2.41 6.77-5.89 7.72l-80 21.82C37.02 261.03 32 257.2 32 251.93v-16.58c0-3.61 2.41-6.77 5.89-7.72l80-21.82c5.09-1.39 10.11 2.44 10.11 7.72v16.58zm144-39.28c0 3.61-2.41 6.77-5.89 7.72l-96 26.18c-5.09 1.39-10.11-2.44-10.11-7.72v-16.58c0-3.61 2.41-6.77 5.89-7.72l96-26.18c5.09-1.39 10.11 2.44 10.11 7.72v16.58zm176 22.7c0-5.28 5.02-9.11 10.11-7.72l80 21.82c3.48.95 5.89 4.11 5.89 7.72v16.58c0 5.28-5.02 9.11-10.11 7.72l-80-21.82a7.997 7.997 0 0 1-5.89-7.72v-16.58zm-144-39.27c0-5.28 5.02-9.11 10.11-7.72l96 26.18c3.48.95 5.89 4.11 5.89 7.72v16.58c0 5.28-5.02 9.11-10.11 7.72l-96-26.18a7.997 7.997 0 0 1-5.89-7.72v-16.58z" },
			"child": []
		}]
	})(props);
}
function FaInfoCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" },
			"child": []
		}]
	})(props);
}
function FaIdCard(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M528 32H48C21.5 32 0 53.5 0 80v16h576V80c0-26.5-21.5-48-48-48zM0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V128H0v304zm352-232c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zm0 64c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16zM176 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zM67.1 396.2C75.5 370.5 99.6 352 128 352h8.2c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h8.2c28.4 0 52.5 18.5 60.9 44.2 3.2 9.9-5.2 19.8-15.6 19.8H82.7c-10.4 0-18.8-10-15.6-19.8z" },
			"child": []
		}]
	})(props);
}
function FaHourglassHalf(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M360 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24 0 90.965 51.016 167.734 120.842 192C75.016 280.266 24 357.035 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24 0-90.965-51.016-167.734-120.842-192C308.984 231.734 360 154.965 360 64c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24zm-75.078 384H99.08c17.059-46.797 52.096-80 92.92-80 40.821 0 75.862 33.196 92.922 80zm.019-256H99.078C91.988 108.548 88 86.748 88 64h208c0 22.805-3.987 44.587-11.059 64z" },
			"child": []
		}]
	})(props);
}
function FaHome(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" },
			"child": []
		}]
	})(props);
}
function FaHistory(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z" },
			"child": []
		}]
	})(props);
}
function FaHeadset(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z" },
			"child": []
		}]
	})(props);
}
function FaHeadphones(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z" },
			"child": []
		}]
	})(props);
}
function FaHandshake(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z" },
			"child": []
		}]
	})(props);
}
function FaHandHoldingUsd(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M271.06,144.3l54.27,14.3a8.59,8.59,0,0,1,6.63,8.1c0,4.6-4.09,8.4-9.12,8.4h-35.6a30,30,0,0,1-11.19-2.2c-5.24-2.2-11.28-1.7-15.3,2l-19,17.5a11.68,11.68,0,0,0-2.25,2.66,11.42,11.42,0,0,0,3.88,15.74,83.77,83.77,0,0,0,34.51,11.5V240c0,8.8,7.83,16,17.37,16h17.37c9.55,0,17.38-7.2,17.38-16V222.4c32.93-3.6,57.84-31,53.5-63-3.15-23-22.46-41.3-46.56-47.7L282.68,97.4a8.59,8.59,0,0,1-6.63-8.1c0-4.6,4.09-8.4,9.12-8.4h35.6A30,30,0,0,1,332,83.1c5.23,2.2,11.28,1.7,15.3-2l19-17.5A11.31,11.31,0,0,0,368.47,61a11.43,11.43,0,0,0-3.84-15.78,83.82,83.82,0,0,0-34.52-11.5V16c0-8.8-7.82-16-17.37-16H295.37C285.82,0,278,7.2,278,16V33.6c-32.89,3.6-57.85,31-53.51,63C227.63,119.6,247,137.9,271.06,144.3ZM565.27,328.1c-11.8-10.7-30.2-10-42.6,0L430.27,402a63.64,63.64,0,0,1-40,14H272a16,16,0,0,1,0-32h78.29c15.9,0,30.71-10.9,33.25-26.6a31.2,31.2,0,0,0,.46-5.46A32,32,0,0,0,352,320H192a117.66,117.66,0,0,0-74.1,26.29L71.4,384H16A16,16,0,0,0,0,400v96a16,16,0,0,0,16,16H372.77a64,64,0,0,0,40-14L564,377a32,32,0,0,0,1.28-48.9Z" },
			"child": []
		}]
	})(props);
}
function FaGraduationCap(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z" },
			"child": []
		}]
	})(props);
}
function FaGift(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z" },
			"child": []
		}]
	})(props);
}
function FaFilter(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z" },
			"child": []
		}]
	})(props);
}
function FaFileSignature(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M218.17 424.14c-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34c-6.37 12.78-25.03 11.37-29.48-2.09L144 386.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.75-16.19 54.06-9.7 66 14.16 1.89 3.78 5.49 5.95 9.36 6.26v-82.12l128-127.09V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24v-40l-128-.11c-16.12-.31-30.58-9.28-37.83-23.75zM384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1zm-96 225.06V416h68.99l161.68-162.78-67.88-67.88L288 346.96zm280.54-179.63l-31.87-31.87c-9.94-9.94-26.07-9.94-36.01 0l-27.25 27.25 67.88 67.88 27.25-27.25c9.95-9.94 9.95-26.07 0-36.01z" },
			"child": []
		}]
	})(props);
}
function FaFileInvoiceDollar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 80v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8zm144 263.88V440c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-24.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V232c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v24.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07z" },
			"child": []
		}]
	})(props);
}
function FaFileContract(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 64c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8v-16zm192.81 248H304c8.84 0 16 7.16 16 16s-7.16 16-16 16h-47.19c-16.45 0-31.27-9.14-38.64-23.86-2.95-5.92-8.09-6.52-10.17-6.52s-7.22.59-10.02 6.19l-7.67 15.34a15.986 15.986 0 0 1-14.31 8.84c-.38 0-.75-.02-1.14-.05-6.45-.45-12-4.75-14.03-10.89L144 354.59l-10.61 31.88c-5.89 17.66-22.38 29.53-41 29.53H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h12.39c4.83 0 9.11-3.08 10.64-7.66l18.19-54.64c3.3-9.81 12.44-16.41 22.78-16.41s19.48 6.59 22.77 16.41l13.88 41.64c19.77-16.19 54.05-9.7 66 14.16 2.02 4.06 5.96 6.5 10.16 6.5zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z" },
			"child": []
		}]
	})(props);
}
function FaFileAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" },
			"child": []
		}]
	})(props);
}
function FaEye(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" },
			"child": []
		}]
	})(props);
}
function FaEyeSlash(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" },
			"child": []
		}]
	})(props);
}
function FaExternalLinkAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" },
			"child": []
		}]
	})(props);
}
function FaExclamationTriangle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" },
			"child": []
		}]
	})(props);
}
function FaExclamationCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" },
			"child": []
		}]
	})(props);
}
function FaExchangeAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M0 168v-16c0-13.255 10.745-24 24-24h360V80c0-21.367 25.899-32.042 40.971-16.971l80 80c9.372 9.373 9.372 24.569 0 33.941l-80 80C409.956 271.982 384 261.456 384 240v-48H24c-13.255 0-24-10.745-24-24zm488 152H128v-48c0-21.314-25.862-32.08-40.971-16.971l-80 80c-9.372 9.373-9.372 24.569 0 33.941l80 80C102.057 463.997 128 453.437 128 432v-48h360c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24z" },
			"child": []
		}]
	})(props);
}
function FaEnvelope(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" },
			"child": []
		}]
	})(props);
}
function FaEnvelopeOpen(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256 .003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z" },
			"child": []
		}]
	})(props);
}
function FaEdit(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" },
			"child": []
		}]
	})(props);
}
function FaDownload(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" },
			"child": []
		}]
	})(props);
}
function FaDonate(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256 416c114.9 0 208-93.1 208-208S370.9 0 256 0 48 93.1 48 208s93.1 208 208 208zM233.8 97.4V80.6c0-9.2 7.4-16.6 16.6-16.6h11.1c9.2 0 16.6 7.4 16.6 16.6v17c15.5.8 30.5 6.1 43 15.4 5.6 4.1 6.2 12.3 1.2 17.1L306 145.6c-3.8 3.7-9.5 3.8-14 1-5.4-3.4-11.4-5.1-17.8-5.1h-38.9c-9 0-16.3 8.2-16.3 18.3 0 8.2 5 15.5 12.1 17.6l62.3 18.7c25.7 7.7 43.7 32.4 43.7 60.1 0 34-26.4 61.5-59.1 62.4v16.8c0 9.2-7.4 16.6-16.6 16.6h-11.1c-9.2 0-16.6-7.4-16.6-16.6v-17c-15.5-.8-30.5-6.1-43-15.4-5.6-4.1-6.2-12.3-1.2-17.1l16.3-15.5c3.8-3.7 9.5-3.8 14-1 5.4 3.4 11.4 5.1 17.8 5.1h38.9c9 0 16.3-8.2 16.3-18.3 0-8.2-5-15.5-12.1-17.6l-62.3-18.7c-25.7-7.7-43.7-32.4-43.7-60.1.1-34 26.4-61.5 59.1-62.4zM480 352h-32.5c-19.6 26-44.6 47.7-73 64h63.8c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8h63.8c-28.4-16.3-53.3-38-73-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h448c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32z" },
			"child": []
		}]
	})(props);
}
function FaCreditCard(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M0 432c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V256H0v176zm192-68c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H204c-6.6 0-12-5.4-12-12v-40zm-128 0c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM576 80v48H0V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48z" },
			"child": []
		}]
	})(props);
}
function FaCopy(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z" },
			"child": []
		}]
	})(props);
}
function FaComments(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z" },
			"child": []
		}]
	})(props);
}
function FaCoins(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" },
			"child": []
		}]
	})(props);
}
function FaClock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" },
			"child": []
		}]
	})(props);
}
function FaClipboardList(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z" },
			"child": []
		}]
	})(props);
}
function FaClipboardCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm121.2 231.8l-143 141.8c-4.7 4.7-12.3 4.6-17-.1l-82.6-83.3c-4.7-4.7-4.6-12.3.1-17L99.1 285c4.7-4.7 12.3-4.6 17 .1l46 46.4 106-105.2c4.7-4.7 12.3-4.6 17 .1l28.2 28.4c4.7 4.8 4.6 12.3-.1 17z" },
			"child": []
		}]
	})(props);
}
function FaChevronRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 320 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" },
			"child": []
		}]
	})(props);
}
function FaChevronLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 320 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" },
			"child": []
		}]
	})(props);
}
function FaChevronDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" },
			"child": []
		}]
	})(props);
}
function FaCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" },
			"child": []
		}]
	})(props);
}
function FaCheckSquare(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" },
			"child": []
		}]
	})(props);
}
function FaCheckDouble(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z" },
			"child": []
		}]
	})(props);
}
function FaCheckCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" },
			"child": []
		}]
	})(props);
}
function FaChartLine(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z" },
			"child": []
		}]
	})(props);
}
function FaChalkboardTeacher(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z" },
			"child": []
		}]
	})(props);
}
function FaCertificate(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M458.622 255.92l45.985-45.005c13.708-12.977 7.316-36.039-10.664-40.339l-62.65-15.99 17.661-62.015c4.991-17.838-11.829-34.663-29.661-29.671l-61.994 17.667-15.984-62.671C337.085.197 313.765-6.276 300.99 7.228L256 53.57 211.011 7.229c-12.63-13.351-36.047-7.234-40.325 10.668l-15.984 62.671-61.995-17.667C74.87 57.907 58.056 74.738 63.046 92.572l17.661 62.015-62.65 15.99C.069 174.878-6.31 197.944 7.392 210.915l45.985 45.005-45.985 45.004c-13.708 12.977-7.316 36.039 10.664 40.339l62.65 15.99-17.661 62.015c-4.991 17.838 11.829 34.663 29.661 29.671l61.994-17.667 15.984 62.671c4.439 18.575 27.696 24.018 40.325 10.668L256 458.61l44.989 46.001c12.5 13.488 35.987 7.486 40.325-10.668l15.984-62.671 61.994 17.667c17.836 4.994 34.651-11.837 29.661-29.671l-17.661-62.015 62.65-15.99c17.987-4.302 24.366-27.367 10.664-40.339l-45.984-45.004z" },
			"child": []
		}]
	})(props);
}
function FaCamera(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" },
			"child": []
		}]
	})(props);
}
function FaCalendarCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M436 160H12c-6.627 0-12-5.373-12-12v-36c0-26.51 21.49-48 48-48h48V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h128V12c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v52h48c26.51 0 48 21.49 48 48v36c0 6.627-5.373 12-12 12zM12 192h424c6.627 0 12 5.373 12 12v260c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V204c0-6.627 5.373-12 12-12zm333.296 95.947l-28.169-28.398c-4.667-4.705-12.265-4.736-16.97-.068L194.12 364.665l-45.98-46.352c-4.667-4.705-12.266-4.736-16.971-.068l-28.397 28.17c-4.705 4.667-4.736 12.265-.068 16.97l82.601 83.269c4.667 4.705 12.265 4.736 16.97.068l142.953-141.805c4.705-4.667 4.736-12.265.068-16.97z" },
			"child": []
		}]
	})(props);
}
function FaCalendarAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z" },
			"child": []
		}]
	})(props);
}
function FaCalculator(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z" },
			"child": []
		}]
	})(props);
}
function FaBullseye(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 496 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z" },
			"child": []
		}]
	})(props);
}
function FaBuilding(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z" },
			"child": []
		}]
	})(props);
}
function FaBriefcase(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M320 336c0 8.84-7.16 16-16 16h-96c-8.84 0-16-7.16-16-16v-48H0v144c0 25.6 22.4 48 48 48h416c25.6 0 48-22.4 48-48V288H320v48zm144-208h-80V80c0-25.6-22.4-48-48-48H176c-25.6 0-48 22.4-48 48v48H48c-25.6 0-48 22.4-48 48v80h512v-80c0-25.6-22.4-48-48-48zm-144 0H192V96h128v32z" },
			"child": []
		}]
	})(props);
}
function FaBook(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z" },
			"child": []
		}]
	})(props);
}
function FaBookOpen(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M542.22 32.05c-54.8 3.11-163.72 14.43-230.96 55.59-4.64 2.84-7.27 7.89-7.27 13.17v363.87c0 11.55 12.63 18.85 23.28 13.49 69.18-34.82 169.23-44.32 218.7-46.92 16.89-.89 30.02-14.43 30.02-30.66V62.75c.01-17.71-15.35-31.74-33.77-30.7zM264.73 87.64C197.5 46.48 88.58 35.17 33.78 32.05 15.36 31.01 0 45.04 0 62.75V400.6c0 16.24 13.13 29.78 30.02 30.66 49.49 2.6 149.59 12.11 218.77 46.95 10.62 5.35 23.21-1.94 23.21-13.46V100.63c0-5.29-2.62-10.14-7.27-12.99z" },
			"child": []
		}]
	})(props);
}
function FaBell(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z" },
			"child": []
		}]
	})(props);
}
function FaBellSlash(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M633.82 458.1l-90.62-70.05c.19-1.38.8-2.66.8-4.06.05-7.55-2.61-15.27-8.61-21.71-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84c-40.33 8.38-74.66 31.07-97.59 62.57L45.47 3.37C38.49-2.05 28.43-.8 23.01 6.18L3.37 31.45C-2.05 38.42-.8 48.47 6.18 53.9l588.35 454.73c6.98 5.43 17.03 4.17 22.46-2.81l19.64-25.27c5.42-6.97 4.17-17.02-2.81-22.45zM157.23 251.54c-8.61 67.96-36.41 93.33-52.62 110.75-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h241.92L157.23 251.54zM320 512c35.32 0 63.97-28.65 63.97-64H256.03c0 35.35 28.65 64 63.97 64z" },
			"child": []
		}]
	})(props);
}
function FaBan(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 512 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z" },
			"child": []
		}]
	})(props);
}
function FaArrowUp(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z" },
			"child": []
		}]
	})(props);
}
function FaArrowRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" },
			"child": []
		}]
	})(props);
}
function FaArrowLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" },
			"child": []
		}]
	})(props);
}
function FaRegMoneyBillAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 640 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M320 144c-53.02 0-96 50.14-96 112 0 61.85 42.98 112 96 112 53 0 96-50.13 96-112 0-61.86-42.98-112-96-112zm40 168c0 4.42-3.58 8-8 8h-64c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h16v-55.44l-.47.31a7.992 7.992 0 0 1-11.09-2.22l-8.88-13.31a7.992 7.992 0 0 1 2.22-11.09l15.33-10.22a23.99 23.99 0 0 1 13.31-4.03H328c4.42 0 8 3.58 8 8v88h16c4.42 0 8 3.58 8 8v16zM608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zm-16 272c-35.35 0-64 28.65-64 64H112c0-35.35-28.65-64-64-64V176c35.35 0 64-28.65 64-64h416c0 35.35 28.65 64 64 64v160z" },
			"child": []
		}]
	})(props);
}
function FaRegFilePdf(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" },
			"child": []
		}]
	})(props);
}
function FaRegFileAlt(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 384 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z" },
			"child": []
		}]
	})(props);
}
//#endregion
//#region node_modules/react-icons/md/index.mjs
function MdSchool(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z" },
			"child": []
		}]
	})(props);
}
function MdPerson(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
			"child": []
		}]
	})(props);
}
function MdPeople(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
			"child": []
		}]
	})(props);
}
function MdHandshake(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M16.48 10.41c-.39.39-1.04.39-1.43 0l-4.47-4.46-7.05 7.04-.66-.63a3 3 0 0 1 0-4.24l4.24-4.24a3 3 0 0 1 4.24 0L16.48 9c.39.39.39 1.02 0 1.41zm.7-2.12c.78.78.78 2.05 0 2.83-1.27 1.27-2.61.22-2.83 0l-3.76-3.76-5.57 5.57a.996.996 0 0 0 0 1.41c.39.39 1.02.39 1.42 0l4.62-4.62.71.71-4.62 4.62a.996.996 0 0 0 0 1.41c.39.39 1.02.39 1.42 0l4.62-4.62.71.71-4.62 4.62a.996.996 0 1 0 1.41 1.41l4.62-4.62.71.71-4.62 4.62a.996.996 0 1 0 1.41 1.41l8.32-8.34a3 3 0 0 0 0-4.24l-4.24-4.24a3.001 3.001 0 0 0-4.18-.06l4.47 4.47z" },
			"child": []
		}]
	})(props);
}
function MdGroup(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
			"child": []
		}]
	})(props);
}
function MdStorefront(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "m21.9 8.89-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zm-2.99-3.9 1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52 9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41a1.42 1.42 0 0 1-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM5 19v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19H5z" },
			"child": []
		}]
	})(props);
}
function MdRefresh(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" },
			"child": []
		}]
	})(props);
}
function MdPayments(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-6v11c0 1.1-.9 2-2 2H4v-2h17V7h2z" },
			"child": []
		}]
	})(props);
}
function MdChevronRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" },
			"child": []
		}]
	})(props);
}
function MdCancel(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" },
			"child": []
		}]
	})(props);
}
function MdArrowBack(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" },
			"child": []
		}]
	})(props);
}
function MdMenuBook(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0z"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99zM13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83zM17.5 14.33c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24z" },
				"child": []
			}
		]
	})(props);
}
function MdCategory(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0z"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "m12 2-5.5 9h11z" },
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "17.5",
					"cy": "17.5",
					"r": "4.5"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M3 13.5h8v8H3z" },
				"child": []
			}
		]
	})(props);
}
function MdReceiptLong(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0V0z"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M19.5 3.5 18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2v14H3v3c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V2l-1.5 1.5zM19 19c0 .55-.45 1-1 1s-1-.45-1-1v-3H8V5h11v14z" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M9 7h6v2H9zM16 7h2v2h-2zM9 10h6v2H9zM16 10h2v2h-2z" },
				"child": []
			}
		]
	})(props);
}
function MdCollectionsBookmark(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0V0z"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0V0z"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10-2.5-1.5L15 12V4h5v8z" },
				"child": []
			}
		]
	})(props);
}
function MdShield(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" },
			"child": []
		}]
	})(props);
}
function MdAddCircleOutline(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
			"child": []
		}]
	})(props);
}
function MdBarChart(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M4 9h4v11H4zM16 13h4v7h-4zM10 4h4v16h-4z" },
			"child": []
		}]
	})(props);
}
function MdAttachMoney(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" },
			"child": []
		}]
	})(props);
}
function MdAccessTime(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0z"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" },
				"child": []
			}
		]
	})(props);
}
function MdPlayArrow(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M8 5v14l11-7z" },
			"child": []
		}]
	})(props);
}
function MdVisibility(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" },
			"child": []
		}]
	})(props);
}
function MdVerified(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" },
			"child": []
		}]
	})(props);
}
function MdTrackChanges(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0V0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "m19.07 4.93-1.41 1.41A8.014 8.014 0 0 1 20 12c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-4.08 3.05-7.44 7-7.93v2.02C8.16 6.57 6 9.03 6 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.66-.67-3.16-1.76-4.24l-1.41 1.41C15.55 9.9 16 10.9 16 12c0 2.21-1.79 4-4 4s-4-1.79-4-4c0-1.86 1.28-3.41 3-3.86v2.14c-.6.35-1 .98-1 1.72 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.38-1-1.72V2h-1C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07z" },
			"child": []
		}]
	})(props);
}
function MdStars(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" },
			"child": []
		}]
	})(props);
}
function MdShoppingCart(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" },
			"child": []
		}]
	})(props);
}
function MdShoppingBag(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z" },
			"child": []
		}]
	})(props);
}
function MdSearch(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" },
			"child": []
		}]
	})(props);
}
function MdSavings(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "m19.83 7.5-2.27-2.27c.07-.42.18-.81.32-1.15A1.498 1.498 0 0 0 16.5 2c-1.64 0-3.09.79-4 2h-5C4.46 4 2 6.46 2 9.5S4.5 21 4.5 21H10v-2h2v2h5.5l1.68-5.59 2.82-.94V7.5h-2.17zM13 9H8V7h5v2zm3 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" },
			"child": []
		}]
	})(props);
}
function MdPets(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [
			{
				"tag": "path",
				"attr": {
					"fill": "none",
					"d": "M0 0h24v24H0z"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "4.5",
					"cy": "9.5",
					"r": "2.5"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "9",
					"cy": "5.5",
					"r": "2.5"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "15",
					"cy": "5.5",
					"r": "2.5"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "19.5",
					"cy": "9.5",
					"r": "2.5"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z" },
				"child": []
			}
		]
	})(props);
}
function MdPayment(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" },
			"child": []
		}]
	})(props);
}
function MdInfoOutline(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0V0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" },
			"child": []
		}]
	})(props);
}
function MdInfo(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" },
			"child": []
		}]
	})(props);
}
function MdHistory(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" },
			"child": []
		}]
	})(props);
}
function MdEvent(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" },
			"child": []
		}]
	})(props);
}
function MdDashboard(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" },
			"child": []
		}]
	})(props);
}
function MdCreditCard(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" },
			"child": []
		}]
	})(props);
}
function MdCheckCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" },
			"child": []
		}]
	})(props);
}
function MdCalendarToday(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" },
			"child": []
		}]
	})(props);
}
function MdCached(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "m19 8-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 0 1-2.8-.7l-1.46 1.46A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z" },
			"child": []
		}]
	})(props);
}
function MdArticle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" },
			"child": []
		}]
	})(props);
}
function MdAccountBalanceWallet(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" },
			"child": []
		}]
	})(props);
}
function MdAccountBalance(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1 2 6v2h20V6z" },
			"child": []
		}]
	})(props);
}
function MdOutlineDateRange(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0V0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" },
			"child": []
		}]
	})(props);
}
function MdOutlineAssignment(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 24 24" },
		"child": [{
			"tag": "path",
			"attr": {
				"fill": "none",
				"d": "M0 0h24v24H0V0z"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" },
			"child": []
		}]
	})(props);
}
//#endregion
//#region node_modules/react-bootstrap/esm/ThemeProvider.js
var import_classnames = /* @__PURE__ */ __toESM(require_classnames());
var import_jsx_runtime = require_jsx_runtime();
var ThemeContext$1 = /* @__PURE__ */ import_react.createContext({
	prefixes: {},
	breakpoints: [
		"xxl",
		"xl",
		"lg",
		"md",
		"sm",
		"xs"
	],
	minBreakpoint: "xs"
});
var { Consumer, Provider } = ThemeContext$1;
function useBootstrapPrefix(prefix, defaultPrefix) {
	const { prefixes } = (0, import_react.useContext)(ThemeContext$1);
	return prefix || prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
	const { breakpoints } = (0, import_react.useContext)(ThemeContext$1);
	return breakpoints;
}
function useBootstrapMinBreakpoint() {
	const { minBreakpoint } = (0, import_react.useContext)(ThemeContext$1);
	return minBreakpoint;
}
function useIsRTL() {
	const { dir } = (0, import_react.useContext)(ThemeContext$1);
	return dir === "rtl";
}
//#endregion
//#region node_modules/react-transition-group/esm/config.js
var config_default = { disabled: false };
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroupContext.js
var TransitionGroupContext_default = import_react.createContext(null);
//#endregion
//#region node_modules/react-transition-group/esm/utils/reflow.js
var forceReflow = function forceReflow(node) {
	return node.scrollTop;
};
//#endregion
//#region node_modules/react-transition-group/esm/Transition.js
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
/**
* The Transition component lets you describe a transition from one component
* state to another _over time_ with a simple declarative API. Most commonly
* it's used to animate the mounting and unmounting of a component, but can also
* be used to describe in-place transition states as well.
*
* ---
*
* **Note**: `Transition` is a platform-agnostic base component. If you're using
* transitions in CSS, you'll probably want to use
* [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
* instead. It inherits all the features of `Transition`, but contains
* additional features necessary to play nice with CSS transitions (hence the
* name of the component).
*
* ---
*
* By default the `Transition` component does not alter the behavior of the
* component it renders, it only tracks "enter" and "exit" states for the
* components. It's up to you to give meaning and effect to those states. For
* example we can add styles to a component when it enters or exits:
*
* ```jsx
* import { Transition } from 'react-transition-group';
*
* const duration = 300;
*
* const defaultStyle = {
*   transition: `opacity ${duration}ms ease-in-out`,
*   opacity: 0,
* }
*
* const transitionStyles = {
*   entering: { opacity: 1 },
*   entered:  { opacity: 1 },
*   exiting:  { opacity: 0 },
*   exited:  { opacity: 0 },
* };
*
* const Fade = ({ in: inProp }) => (
*   <Transition in={inProp} timeout={duration}>
*     {state => (
*       <div style={{
*         ...defaultStyle,
*         ...transitionStyles[state]
*       }}>
*         I'm a fade Transition!
*       </div>
*     )}
*   </Transition>
* );
* ```
*
* There are 4 main states a Transition can be in:
*  - `'entering'`
*  - `'entered'`
*  - `'exiting'`
*  - `'exited'`
*
* Transition state is toggled via the `in` prop. When `true` the component
* begins the "Enter" stage. During this stage, the component will shift from
* its current transition state, to `'entering'` for the duration of the
* transition and then to the `'entered'` stage once it's complete. Let's take
* the following example (we'll use the
* [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
*
* ```jsx
* function App() {
*   const [inProp, setInProp] = useState(false);
*   return (
*     <div>
*       <Transition in={inProp} timeout={500}>
*         {state => (
*           // ...
*         )}
*       </Transition>
*       <button onClick={() => setInProp(true)}>
*         Click to Enter
*       </button>
*     </div>
*   );
* }
* ```
*
* When the button is clicked the component will shift to the `'entering'` state
* and stay there for 500ms (the value of `timeout`) before it finally switches
* to `'entered'`.
*
* When `in` is `false` the same thing happens except the state moves from
* `'exiting'` to `'exited'`.
*/
var Transition = /* @__PURE__ */ function(_React$Component) {
	_inheritsLoose(Transition, _React$Component);
	function Transition(props, context) {
		var _this = _React$Component.call(this, props, context) || this;
		var parentGroup = context;
		var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
		var initialStatus;
		_this.appearStatus = null;
		if (props.in) if (appear) {
			initialStatus = EXITED;
			_this.appearStatus = ENTERING;
		} else initialStatus = ENTERED;
		else if (props.unmountOnExit || props.mountOnEnter) initialStatus = UNMOUNTED;
		else initialStatus = EXITED;
		_this.state = { status: initialStatus };
		_this.nextCallback = null;
		return _this;
	}
	Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
		if (_ref.in && prevState.status === "unmounted") return { status: EXITED };
		return null;
	};
	var _proto = Transition.prototype;
	_proto.componentDidMount = function componentDidMount() {
		this.updateStatus(true, this.appearStatus);
	};
	_proto.componentDidUpdate = function componentDidUpdate(prevProps) {
		var nextStatus = null;
		if (prevProps !== this.props) {
			var status = this.state.status;
			if (this.props.in) {
				if (status !== "entering" && status !== "entered") nextStatus = ENTERING;
			} else if (status === "entering" || status === "entered") nextStatus = EXITING;
		}
		this.updateStatus(false, nextStatus);
	};
	_proto.componentWillUnmount = function componentWillUnmount() {
		this.cancelNextCallback();
	};
	_proto.getTimeouts = function getTimeouts() {
		var timeout = this.props.timeout;
		var exit = enter = appear = timeout, enter, appear;
		if (timeout != null && typeof timeout !== "number") {
			exit = timeout.exit;
			enter = timeout.enter;
			appear = timeout.appear !== void 0 ? timeout.appear : enter;
		}
		return {
			exit,
			enter,
			appear
		};
	};
	_proto.updateStatus = function updateStatus(mounting, nextStatus) {
		if (mounting === void 0) mounting = false;
		if (nextStatus !== null) {
			this.cancelNextCallback();
			if (nextStatus === "entering") {
				if (this.props.unmountOnExit || this.props.mountOnEnter) {
					var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.findDOMNode(this);
					if (node) forceReflow(node);
				}
				this.performEnter(mounting);
			} else this.performExit();
		} else if (this.props.unmountOnExit && this.state.status === "exited") this.setState({ status: UNMOUNTED });
	};
	_proto.performEnter = function performEnter(mounting) {
		var _this2 = this;
		var enter = this.props.enter;
		var appearing = this.context ? this.context.isMounting : mounting;
		var _ref2 = this.props.nodeRef ? [appearing] : [import_react_dom.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
		var timeouts = this.getTimeouts();
		var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
		if (!mounting && !enter || config_default.disabled) {
			this.safeSetState({ status: ENTERED }, function() {
				_this2.props.onEntered(maybeNode);
			});
			return;
		}
		this.props.onEnter(maybeNode, maybeAppearing);
		this.safeSetState({ status: ENTERING }, function() {
			_this2.props.onEntering(maybeNode, maybeAppearing);
			_this2.onTransitionEnd(enterTimeout, function() {
				_this2.safeSetState({ status: ENTERED }, function() {
					_this2.props.onEntered(maybeNode, maybeAppearing);
				});
			});
		});
	};
	_proto.performExit = function performExit() {
		var _this3 = this;
		var exit = this.props.exit;
		var timeouts = this.getTimeouts();
		var maybeNode = this.props.nodeRef ? void 0 : import_react_dom.findDOMNode(this);
		if (!exit || config_default.disabled) {
			this.safeSetState({ status: EXITED }, function() {
				_this3.props.onExited(maybeNode);
			});
			return;
		}
		this.props.onExit(maybeNode);
		this.safeSetState({ status: EXITING }, function() {
			_this3.props.onExiting(maybeNode);
			_this3.onTransitionEnd(timeouts.exit, function() {
				_this3.safeSetState({ status: EXITED }, function() {
					_this3.props.onExited(maybeNode);
				});
			});
		});
	};
	_proto.cancelNextCallback = function cancelNextCallback() {
		if (this.nextCallback !== null) {
			this.nextCallback.cancel();
			this.nextCallback = null;
		}
	};
	_proto.safeSetState = function safeSetState(nextState, callback) {
		callback = this.setNextCallback(callback);
		this.setState(nextState, callback);
	};
	_proto.setNextCallback = function setNextCallback(callback) {
		var _this4 = this;
		var active = true;
		this.nextCallback = function(event) {
			if (active) {
				active = false;
				_this4.nextCallback = null;
				callback(event);
			}
		};
		this.nextCallback.cancel = function() {
			active = false;
		};
		return this.nextCallback;
	};
	_proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
		this.setNextCallback(handler);
		var node = this.props.nodeRef ? this.props.nodeRef.current : import_react_dom.findDOMNode(this);
		var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
		if (!node || doesNotHaveTimeoutOrListener) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
			this.props.addEndListener(maybeNode, maybeNextCallback);
		}
		if (timeout != null) setTimeout(this.nextCallback, timeout);
	};
	_proto.render = function render() {
		var status = this.state.status;
		if (status === "unmounted") return null;
		var _this$props = this.props, children = _this$props.children;
		_this$props.in;
		_this$props.mountOnEnter;
		_this$props.unmountOnExit;
		_this$props.appear;
		_this$props.enter;
		_this$props.exit;
		_this$props.timeout;
		_this$props.addEndListener;
		_this$props.onEnter;
		_this$props.onEntering;
		_this$props.onEntered;
		_this$props.onExit;
		_this$props.onExiting;
		_this$props.onExited;
		_this$props.nodeRef;
		var childProps = _objectWithoutPropertiesLoose$2(_this$props, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /* @__PURE__ */ import_react.createElement(TransitionGroupContext_default.Provider, { value: null }, typeof children === "function" ? children(status, childProps) : import_react.cloneElement(import_react.Children.only(children), childProps));
	};
	return Transition;
}(import_react.Component);
Transition.contextType = TransitionGroupContext_default;
Transition.propTypes = {};
function noop$2() {}
Transition.defaultProps = {
	in: false,
	mountOnEnter: false,
	unmountOnExit: false,
	appear: false,
	enter: true,
	exit: true,
	onEnter: noop$2,
	onEntering: noop$2,
	onEntered: noop$2,
	onExit: noop$2,
	onExiting: noop$2,
	onExited: noop$2
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
//#endregion
//#region node_modules/react-bootstrap/esm/transitionEndListener.js
function parseDuration(node, property) {
	const str = style(node, property) || "";
	const mult = str.indexOf("ms") === -1 ? 1e3 : 1;
	return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
	const remove = transitionEnd(element, (e) => {
		if (e.target === element) {
			remove();
			handler(e);
		}
	}, parseDuration(element, "transitionDuration") + parseDuration(element, "transitionDelay"));
}
require_browser();
/**
* Safe chained function
*
* Will only create a new function if needed,
* otherwise will pass back existing functions or null.
*
* @param {function} functions to chain
* @returns {function|null}
*/
function createChainedFunction(...funcs) {
	return funcs.filter((f) => f != null).reduce((acc, f) => {
		if (typeof f !== "function") throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");
		if (acc === null) return f;
		return function chainedFunction(...args) {
			acc.apply(this, args);
			f.apply(this, args);
		};
	}, null);
}
//#endregion
//#region node_modules/react-bootstrap/esm/triggerBrowserReflow.js
function triggerBrowserReflow(node) {
	node.offsetHeight;
}
//#endregion
//#region node_modules/react-bootstrap/esm/safeFindDOMNode.js
function safeFindDOMNode(componentOrElement) {
	if (componentOrElement && "setState" in componentOrElement) return import_react_dom.findDOMNode(componentOrElement);
	return componentOrElement != null ? componentOrElement : null;
}
//#endregion
//#region node_modules/react-bootstrap/esm/TransitionWrapper.js
var TransitionWrapper = /* @__PURE__ */ import_react.forwardRef(({ onEnter, onEntering, onEntered, onExit, onExiting, onExited, addEndListener, children, childRef, ...props }, ref) => {
	const nodeRef = (0, import_react.useRef)(null);
	const mergedRef = useMergedRefs(nodeRef, childRef);
	const attachRef = (r) => {
		mergedRef(safeFindDOMNode(r));
	};
	const normalize = (callback) => (param) => {
		if (callback && nodeRef.current) callback(nodeRef.current, param);
	};
	const handleEnter = (0, import_react.useCallback)(normalize(onEnter), [onEnter]);
	const handleEntering = (0, import_react.useCallback)(normalize(onEntering), [onEntering]);
	const handleEntered = (0, import_react.useCallback)(normalize(onEntered), [onEntered]);
	const handleExit = (0, import_react.useCallback)(normalize(onExit), [onExit]);
	const handleExiting = (0, import_react.useCallback)(normalize(onExiting), [onExiting]);
	const handleExited = (0, import_react.useCallback)(normalize(onExited), [onExited]);
	const handleAddEndListener = (0, import_react.useCallback)(normalize(addEndListener), [addEndListener]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
		ref,
		...props,
		onEnter: handleEnter,
		onEntered: handleEntered,
		onEntering: handleEntering,
		onExit: handleExit,
		onExited: handleExited,
		onExiting: handleExiting,
		addEndListener: handleAddEndListener,
		nodeRef,
		children: typeof children === "function" ? (status, innerProps) => children(status, {
			...innerProps,
			ref: attachRef
		}) : /* @__PURE__ */ import_react.cloneElement(children, { ref: attachRef })
	});
});
TransitionWrapper.displayName = "TransitionWrapper";
//#endregion
//#region node_modules/react-bootstrap/esm/Collapse.js
var MARGINS = {
	height: ["marginTop", "marginBottom"],
	width: ["marginLeft", "marginRight"]
};
function getDefaultDimensionValue(dimension, elem) {
	const value = elem[`offset${dimension[0].toUpperCase()}${dimension.slice(1)}`];
	const margins = MARGINS[dimension];
	return value + parseInt(style(elem, margins[0]), 10) + parseInt(style(elem, margins[1]), 10);
}
var collapseStyles = {
	[EXITED]: "collapse",
	[EXITING]: "collapsing",
	[ENTERING]: "collapsing",
	[ENTERED]: "collapse show"
};
var Collapse = /* @__PURE__ */ import_react.forwardRef(({ onEnter, onEntering, onEntered, onExit, onExiting, className, children, dimension = "height", in: inProp = false, timeout = 300, mountOnEnter = false, unmountOnExit = false, appear = false, getDimensionValue = getDefaultDimensionValue, ...props }, ref) => {
	const computedDimension = typeof dimension === "function" ? dimension() : dimension;
	const handleEnter = (0, import_react.useMemo)(() => createChainedFunction((elem) => {
		elem.style[computedDimension] = "0";
	}, onEnter), [computedDimension, onEnter]);
	const handleEntering = (0, import_react.useMemo)(() => createChainedFunction((elem) => {
		const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(1)}`;
		elem.style[computedDimension] = `${elem[scroll]}px`;
	}, onEntering), [computedDimension, onEntering]);
	const handleEntered = (0, import_react.useMemo)(() => createChainedFunction((elem) => {
		elem.style[computedDimension] = null;
	}, onEntered), [computedDimension, onEntered]);
	const handleExit = (0, import_react.useMemo)(() => createChainedFunction((elem) => {
		elem.style[computedDimension] = `${getDimensionValue(computedDimension, elem)}px`;
		triggerBrowserReflow(elem);
	}, onExit), [
		onExit,
		getDimensionValue,
		computedDimension
	]);
	const handleExiting = (0, import_react.useMemo)(() => createChainedFunction((elem) => {
		elem.style[computedDimension] = null;
	}, onExiting), [computedDimension, onExiting]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionWrapper, {
		ref,
		addEndListener: transitionEndListener,
		...props,
		"aria-expanded": props.role ? inProp : null,
		onEnter: handleEnter,
		onEntering: handleEntering,
		onEntered: handleEntered,
		onExit: handleExit,
		onExiting: handleExiting,
		childRef: getChildRef(children),
		in: inProp,
		timeout,
		mountOnEnter,
		unmountOnExit,
		appear,
		children: (state, innerProps) => /* @__PURE__ */ import_react.cloneElement(children, {
			...innerProps,
			className: (0, import_classnames.default)(className, children.props.className, collapseStyles[state], computedDimension === "width" && "collapse-horizontal")
		})
	});
});
Collapse.displayName = "Collapse";
//#endregion
//#region node_modules/react-bootstrap/esm/divWithClassName.js
var divWithClassName_default = ((className) => /* @__PURE__ */ import_react.forwardRef((p, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	...p,
	ref,
	className: (0, import_classnames.default)(p.className, className)
})));
//#endregion
//#region node_modules/react-bootstrap/esm/AlertHeading.js
var DivStyledAsH4$1 = divWithClassName_default("h4");
DivStyledAsH4$1.displayName = "DivStyledAsH4";
var AlertHeading = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = DivStyledAsH4$1, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "alert-heading");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
AlertHeading.displayName = "AlertHeading";
//#endregion
//#region node_modules/react-bootstrap/esm/AlertLink.js
var AlertLink = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = Anchor, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "alert-link");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
AlertLink.displayName = "AlertLink";
//#endregion
//#region node_modules/react-bootstrap/esm/Fade.js
var fadeStyles = {
	[ENTERING]: "show",
	[ENTERED]: "show"
};
var Fade = /* @__PURE__ */ import_react.forwardRef(({ className, children, transitionClasses = {}, onEnter, ...rest }, ref) => {
	const props = {
		in: false,
		timeout: 300,
		mountOnEnter: false,
		unmountOnExit: false,
		appear: false,
		...rest
	};
	const handleEnter = (0, import_react.useCallback)((node, isAppearing) => {
		triggerBrowserReflow(node);
		onEnter?.(node, isAppearing);
	}, [onEnter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionWrapper, {
		ref,
		addEndListener: transitionEndListener,
		...props,
		onEnter: handleEnter,
		childRef: getChildRef(children),
		children: (status, innerProps) => /* @__PURE__ */ import_react.cloneElement(children, {
			...innerProps,
			className: (0, import_classnames.default)("fade", className, children.props.className, fadeStyles[status], transitionClasses[status])
		})
	});
});
Fade.displayName = "Fade";
//#endregion
//#region node_modules/react-bootstrap/esm/CloseButton.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var propTypes$4 = {
	/** An accessible label indicating the relevant information about the Close Button. */
	"aria-label": import_prop_types.default.string,
	/** A callback fired after the Close Button is clicked. */
	onClick: import_prop_types.default.func,
	/**
	* Render different color variant for the button.
	*
	* Omitting this will render the default dark color.
	*/
	variant: import_prop_types.default.oneOf(["white"])
};
var CloseButton = /* @__PURE__ */ import_react.forwardRef(({ className, variant, "aria-label": ariaLabel = "Close", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type: "button",
	className: (0, import_classnames.default)("btn-close", variant && `btn-close-${variant}`, className),
	"aria-label": ariaLabel,
	...props
}));
CloseButton.displayName = "CloseButton";
CloseButton.propTypes = propTypes$4;
//#endregion
//#region node_modules/react-bootstrap/esm/Alert.js
var Alert = /* @__PURE__ */ import_react.forwardRef((uncontrolledProps, ref) => {
	const { bsPrefix, show = true, closeLabel = "Close alert", closeVariant, className, children, variant = "primary", onClose, dismissible, transition = Fade, ...props } = useUncontrolled(uncontrolledProps, { show: "onClose" });
	const prefix = useBootstrapPrefix(bsPrefix, "alert");
	const handleClose = useEventCallback((e) => {
		if (onClose) onClose(false, e);
	});
	const Transition = transition === true ? Fade : transition;
	const alert = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		...!Transition ? props : void 0,
		ref,
		className: (0, import_classnames.default)(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
		children: [dismissible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
			onClick: handleClose,
			"aria-label": closeLabel,
			variant: closeVariant
		}), children]
	});
	if (!Transition) return show ? alert : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
		unmountOnExit: true,
		...props,
		ref: void 0,
		in: show,
		children: alert
	});
});
Alert.displayName = "Alert";
var Alert_default = Object.assign(Alert, {
	Link: AlertLink,
	Heading: AlertHeading
});
//#endregion
//#region node_modules/react-bootstrap/esm/Badge.js
var Badge = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, bg = "primary", pill = false, text, className, as: Component = "span", ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "badge");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, prefix, pill && `rounded-pill`, text && `text-${text}`, bg && `bg-${bg}`)
	});
});
Badge.displayName = "Badge";
//#endregion
//#region node_modules/react-bootstrap/esm/Button.js
var Button = /* @__PURE__ */ import_react.forwardRef(({ as, bsPrefix, variant = "primary", size, active = false, disabled = false, className, ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "btn");
	const [buttonProps, { tagName }] = useButtonProps({
		tagName: as,
		disabled,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(tagName, {
		...buttonProps,
		...props,
		ref,
		disabled,
		className: (0, import_classnames.default)(className, prefix, active && "active", variant && `${prefix}-${variant}`, size && `${prefix}-${size}`, props.href && disabled && "disabled")
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/react-bootstrap/esm/CardBody.js
var CardBody = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-body");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardBody.displayName = "CardBody";
//#endregion
//#region node_modules/react-bootstrap/esm/CardFooter.js
var CardFooter = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-footer");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardFooter.displayName = "CardFooter";
//#endregion
//#region node_modules/react-bootstrap/esm/CardHeaderContext.js
var context$2 = /* @__PURE__ */ import_react.createContext(null);
context$2.displayName = "CardHeaderContext";
//#endregion
//#region node_modules/react-bootstrap/esm/CardHeader.js
var CardHeader = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, as: Component = "div", ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "card-header");
	const contextValue = (0, import_react.useMemo)(() => ({ cardHeaderBsPrefix: prefix }), [prefix]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(context$2.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			ref,
			...props,
			className: (0, import_classnames.default)(className, prefix)
		})
	});
});
CardHeader.displayName = "CardHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/CardImg.js
var CardImg = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, variant, as: Component = "img", ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "card-img");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(variant ? `${prefix}-${variant}` : prefix, className),
		...props
	});
});
CardImg.displayName = "CardImg";
//#endregion
//#region node_modules/react-bootstrap/esm/CardImgOverlay.js
var CardImgOverlay = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-img-overlay");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardImgOverlay.displayName = "CardImgOverlay";
//#endregion
//#region node_modules/react-bootstrap/esm/CardLink.js
var CardLink = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "a", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-link");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardLink.displayName = "CardLink";
//#endregion
//#region node_modules/react-bootstrap/esm/CardSubtitle.js
var DivStyledAsH6 = divWithClassName_default("h6");
var CardSubtitle = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = DivStyledAsH6, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-subtitle");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardSubtitle.displayName = "CardSubtitle";
//#endregion
//#region node_modules/react-bootstrap/esm/CardText.js
var CardText = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "p", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-text");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardText.displayName = "CardText";
//#endregion
//#region node_modules/react-bootstrap/esm/CardTitle.js
var DivStyledAsH5$1 = divWithClassName_default("h5");
var CardTitle = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = DivStyledAsH5$1, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "card-title");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
CardTitle.displayName = "CardTitle";
//#endregion
//#region node_modules/react-bootstrap/esm/Card.js
var Card = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, bg, text, border, body = false, children, as: Component = "div", ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "card");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
		children: body ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, { children }) : children
	});
});
Card.displayName = "Card";
var Card_default = Object.assign(Card, {
	Img: CardImg,
	Title: CardTitle,
	Subtitle: CardSubtitle,
	Body: CardBody,
	Link: CardLink,
	Text: CardText,
	Header: CardHeader,
	Footer: CardFooter,
	ImgOverlay: CardImgOverlay
});
//#endregion
//#region node_modules/react-bootstrap/esm/ElementChildren.js
/**
* Iterates through children that are typically specified as `props.children`,
* but only maps over children that are "valid elements".
*
* The mapFunction provided index will be normalised to the components mapped,
* so an invalid component would not increase the index.
*
*/
function map(children, func) {
	let index = 0;
	return import_react.Children.map(children, (child) => /* @__PURE__ */ import_react.isValidElement(child) ? func(child, index++) : child);
}
/**
* Iterates through children that are "valid elements".
*
* The provided forEachFunc(child, index) will be called for each
* leaf child with the index reflecting the position relative to "valid components".
*/
function forEach(children, func) {
	let index = 0;
	import_react.Children.forEach(children, (child) => {
		if (/* @__PURE__ */ import_react.isValidElement(child)) func(child, index++);
	});
}
/**
* Finds whether a component's `children` prop includes a React element of the
* specified type.
*/
function hasChildOfType(children, type) {
	return import_react.Children.toArray(children).some((child) => /* @__PURE__ */ import_react.isValidElement(child) && child.type === type);
}
//#endregion
//#region node_modules/react-bootstrap/esm/Col.js
function useCol({ as, bsPrefix, className, ...props }) {
	bsPrefix = useBootstrapPrefix(bsPrefix, "col");
	const breakpoints = useBootstrapBreakpoints();
	const minBreakpoint = useBootstrapMinBreakpoint();
	const spans = [];
	const classes = [];
	breakpoints.forEach((brkPoint) => {
		const propValue = props[brkPoint];
		delete props[brkPoint];
		let span;
		let offset;
		let order;
		if (typeof propValue === "object" && propValue != null) ({span, offset, order} = propValue);
		else span = propValue;
		const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : "";
		if (span) spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
		if (order != null) classes.push(`order${infix}-${order}`);
		if (offset != null) classes.push(`offset${infix}-${offset}`);
	});
	return [{
		...props,
		className: (0, import_classnames.default)(className, ...spans, ...classes)
	}, {
		as,
		bsPrefix,
		spans
	}];
}
var Col = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const [{ className, ...colProps }, { as: Component = "div", bsPrefix, spans }] = useCol(props);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...colProps,
		ref,
		className: (0, import_classnames.default)(className, !spans.length && bsPrefix)
	});
});
Col.displayName = "Col";
//#endregion
//#region node_modules/react-bootstrap/esm/Container.js
var Container = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, fluid = false, as: Component = "div", className, ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "container");
	const suffix = typeof fluid === "string" ? `-${fluid}` : "-fluid";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, fluid ? `${prefix}${suffix}` : prefix)
	});
});
Container.displayName = "Container";
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownContext.js
var DropdownContext = /* @__PURE__ */ import_react.createContext({});
DropdownContext.displayName = "DropdownContext";
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownDivider.js
var DropdownDivider = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "hr", role = "separator", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "dropdown-divider");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		role,
		...props
	});
});
DropdownDivider.displayName = "DropdownDivider";
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownHeader.js
var DropdownHeader = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", role = "heading", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "dropdown-header");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		role,
		...props
	});
});
DropdownHeader.displayName = "DropdownHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownItem.js
var DropdownItem = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, eventKey, disabled = false, onClick, active, as: Component = Anchor, ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "dropdown-item");
	const [dropdownItemProps, meta] = useDropdownItem({
		key: eventKey,
		href: props.href,
		disabled,
		onClick,
		active
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		...dropdownItemProps,
		ref,
		className: (0, import_classnames.default)(className, prefix, meta.isActive && "active", disabled && "disabled")
	});
});
DropdownItem.displayName = "DropdownItem";
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownItemText.js
var DropdownItemText = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "span", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "dropdown-item-text");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
DropdownItemText.displayName = "DropdownItemText";
require_warning();
var context$1 = /* @__PURE__ */ import_react.createContext(null);
context$1.displayName = "InputGroupContext";
//#endregion
//#region node_modules/react-bootstrap/esm/NavbarContext.js
var context = /* @__PURE__ */ import_react.createContext(null);
context.displayName = "NavbarContext";
//#endregion
//#region node_modules/react-bootstrap/esm/useWrappedRefWithWarning.js
function useWrappedRefWithWarning(ref, componentName) {
	return ref;
}
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownMenu.js
function getDropdownMenuPlacement(alignEnd, dropDirection, isRTL) {
	const topStart = isRTL ? "top-end" : "top-start";
	const topEnd = isRTL ? "top-start" : "top-end";
	const bottomStart = isRTL ? "bottom-end" : "bottom-start";
	const bottomEnd = isRTL ? "bottom-start" : "bottom-end";
	const leftStart = isRTL ? "right-start" : "left-start";
	const leftEnd = isRTL ? "right-end" : "left-end";
	const rightStart = isRTL ? "left-start" : "right-start";
	const rightEnd = isRTL ? "left-end" : "right-end";
	let placement = alignEnd ? bottomEnd : bottomStart;
	if (dropDirection === "up") placement = alignEnd ? topEnd : topStart;
	else if (dropDirection === "end") placement = alignEnd ? rightEnd : rightStart;
	else if (dropDirection === "start") placement = alignEnd ? leftEnd : leftStart;
	else if (dropDirection === "down-centered") placement = "bottom";
	else if (dropDirection === "up-centered") placement = "top";
	return placement;
}
var DropdownMenu = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, align, rootCloseEvent, flip = true, show: showProps, renderOnMount, as: Component = "div", popperConfig, variant, ...props }, ref) => {
	let alignEnd = false;
	const isNavbar = (0, import_react.useContext)(context);
	const prefix = useBootstrapPrefix(bsPrefix, "dropdown-menu");
	const { align: contextAlign, drop, isRTL } = (0, import_react.useContext)(DropdownContext);
	align = align || contextAlign;
	const isInputGroup = (0, import_react.useContext)(context$1);
	const alignClasses = [];
	if (align) {
		if (typeof align === "object") {
			const keys = Object.keys(align);
			if (keys.length) {
				const brkPoint = keys[0];
				const direction = align[brkPoint];
				alignEnd = direction === "start";
				alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
			}
		} else if (align === "end") alignEnd = true;
	}
	const placement = getDropdownMenuPlacement(alignEnd, drop, isRTL);
	const [menuProps, { hasShown, popper, show, toggle }] = useDropdownMenu({
		flip,
		rootCloseEvent,
		show: showProps,
		usePopper: !isNavbar && alignClasses.length === 0,
		offset: [0, 2],
		popperConfig,
		placement
	});
	menuProps.ref = useMergedRefs(useWrappedRefWithWarning(ref, "DropdownMenu"), menuProps.ref);
	useIsomorphicEffect_default(() => {
		if (show) popper?.update();
	}, [show]);
	if (!hasShown && !renderOnMount && !isInputGroup) return null;
	if (typeof Component !== "string") {
		menuProps.show = show;
		menuProps.close = () => toggle == null ? void 0 : toggle(false);
		menuProps.align = align;
	}
	let style = props.style;
	if (popper != null && popper.placement) {
		style = {
			...props.style,
			...menuProps.style
		};
		props["x-placement"] = popper.placement;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		...menuProps,
		style,
		...(alignClasses.length || isNavbar) && { "data-bs-popper": "static" },
		className: (0, import_classnames.default)(className, prefix, show && "show", alignEnd && `${prefix}-end`, variant && `${prefix}-${variant}`, ...alignClasses)
	});
});
DropdownMenu.displayName = "DropdownMenu";
//#endregion
//#region node_modules/react-bootstrap/esm/DropdownToggle.js
var DropdownToggle = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, split, className, childBsPrefix, as: Component = Button, ...props }, ref) => {
	const prefix = useBootstrapPrefix(bsPrefix, "dropdown-toggle");
	const dropdownContext = (0, import_react.useContext)(DropdownContext$1);
	if (childBsPrefix !== void 0) props.bsPrefix = childBsPrefix;
	const [toggleProps] = useDropdownToggle();
	toggleProps.ref = useMergedRefs(toggleProps.ref, useWrappedRefWithWarning(ref, "DropdownToggle"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		className: (0, import_classnames.default)(className, prefix, split && `${prefix}-split`, (dropdownContext == null ? void 0 : dropdownContext.show) && "show"),
		...toggleProps,
		...props
	});
});
DropdownToggle.displayName = "DropdownToggle";
//#endregion
//#region node_modules/react-bootstrap/esm/Dropdown.js
var Dropdown = /* @__PURE__ */ import_react.forwardRef((pProps, ref) => {
	const { bsPrefix, drop = "down", show, className, align = "start", onSelect, onToggle, focusFirstItemOnShow, as: Component = "div", navbar: _4, autoClose = true, ...props } = useUncontrolled(pProps, { show: "onToggle" });
	const isInputGroup = (0, import_react.useContext)(context$1);
	const prefix = useBootstrapPrefix(bsPrefix, "dropdown");
	const isRTL = useIsRTL();
	const isClosingPermitted = (source) => {
		if (autoClose === false) return source === "click";
		if (autoClose === "inside") return source !== "rootClose";
		if (autoClose === "outside") return source !== "select";
		return true;
	};
	const handleToggle = useEventCallback((nextShow, meta) => {
		var _meta$originalEvent;
		if (((_meta$originalEvent = meta.originalEvent) == null || (_meta$originalEvent = _meta$originalEvent.target) == null ? void 0 : _meta$originalEvent.classList.contains("dropdown-toggle")) && meta.source === "mousedown") return;
		if (meta.originalEvent.currentTarget === document && (meta.source !== "keydown" || meta.originalEvent.key === "Escape")) meta.source = "rootClose";
		if (isClosingPermitted(meta.source)) onToggle?.(nextShow, meta);
	});
	const placement = getDropdownMenuPlacement(align === "end", drop, isRTL);
	const contextValue = (0, import_react.useMemo)(() => ({
		align,
		drop,
		isRTL
	}), [
		align,
		drop,
		isRTL
	]);
	const directionClasses = {
		down: prefix,
		"down-centered": `${prefix}-center`,
		up: "dropup",
		"up-centered": "dropup-center dropup",
		end: "dropend",
		start: "dropstart"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dropdown$1, {
			placement,
			show,
			onSelect,
			onToggle: handleToggle,
			focusFirstItemOnShow,
			itemSelector: `.${prefix}-item:not(.disabled):not(:disabled)`,
			children: isInputGroup ? props.children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
				...props,
				ref,
				className: (0, import_classnames.default)(className, show && "show", directionClasses[drop])
			})
		})
	});
});
Dropdown.displayName = "Dropdown";
var Dropdown_default = Object.assign(Dropdown, {
	Toggle: DropdownToggle,
	Menu: DropdownMenu,
	Item: DropdownItem,
	ItemText: DropdownItemText,
	Divider: DropdownDivider,
	Header: DropdownHeader
});
import_prop_types.default.string, import_prop_types.default.bool, import_prop_types.default.bool, import_prop_types.default.bool, import_prop_types.default.bool;
var Image = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, fluid = false, rounded = false, roundedCircle = false, thumbnail = false, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "img");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		ref,
		...props,
		className: (0, import_classnames.default)(className, fluid && `${bsPrefix}-fluid`, rounded && `rounded`, roundedCircle && `rounded-circle`, thumbnail && `${bsPrefix}-thumbnail`)
	});
});
Image.displayName = "Image";
//#endregion
//#region node_modules/react-bootstrap/esm/Feedback.js
var propTypes$2 = {
	/**
	* Specify whether the feedback is for valid or invalid fields
	*
	* @type {('valid'|'invalid')}
	*/
	type: import_prop_types.default.string,
	/** Display feedback as a tooltip. */
	tooltip: import_prop_types.default.bool,
	as: import_prop_types.default.elementType
};
var Feedback = /* @__PURE__ */ import_react.forwardRef(({ as: Component = "div", className, type = "valid", tooltip = false, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
	...props,
	ref,
	className: (0, import_classnames.default)(className, `${type}-${tooltip ? "tooltip" : "feedback"}`)
}));
Feedback.displayName = "Feedback";
Feedback.propTypes = propTypes$2;
//#endregion
//#region node_modules/react-bootstrap/esm/FormContext.js
var FormContext = /* @__PURE__ */ import_react.createContext({});
//#endregion
//#region node_modules/react-bootstrap/esm/FormCheckInput.js
var FormCheckInput = /* @__PURE__ */ import_react.forwardRef(({ id, bsPrefix, className, type = "checkbox", isValid = false, isInvalid = false, as: Component = "input", ...props }, ref) => {
	const { controlId } = (0, import_react.useContext)(FormContext);
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-check-input");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		ref,
		type,
		id: id || controlId,
		className: (0, import_classnames.default)(className, bsPrefix, isValid && "is-valid", isInvalid && "is-invalid")
	});
});
FormCheckInput.displayName = "FormCheckInput";
//#endregion
//#region node_modules/react-bootstrap/esm/FormCheckLabel.js
var FormCheckLabel = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, htmlFor, ...props }, ref) => {
	const { controlId } = (0, import_react.useContext)(FormContext);
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-check-label");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		...props,
		ref,
		htmlFor: htmlFor || controlId,
		className: (0, import_classnames.default)(className, bsPrefix)
	});
});
FormCheckLabel.displayName = "FormCheckLabel";
//#endregion
//#region node_modules/react-bootstrap/esm/FormCheck.js
var FormCheck = /* @__PURE__ */ import_react.forwardRef(({ id, bsPrefix, bsSwitchPrefix, inline = false, reverse = false, disabled = false, isValid = false, isInvalid = false, feedbackTooltip = false, feedback, feedbackType, className, style, title = "", type = "checkbox", label, children, as = "input", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-check");
	bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, "form-switch");
	const { controlId } = (0, import_react.useContext)(FormContext);
	const innerFormContext = (0, import_react.useMemo)(() => ({ controlId: id || controlId }), [controlId, id]);
	const hasLabel = !children && label != null && label !== false || hasChildOfType(children, FormCheckLabel);
	const input = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCheckInput, {
		...props,
		type: type === "switch" ? "checkbox" : type,
		ref,
		isValid,
		isInvalid,
		disabled,
		as
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContext.Provider, {
		value: innerFormContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style,
			className: (0, import_classnames.default)(className, hasLabel && bsPrefix, inline && `${bsPrefix}-inline`, reverse && `${bsPrefix}-reverse`, type === "switch" && bsSwitchPrefix),
			children: children || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				input,
				hasLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCheckLabel, {
					title,
					children: label
				}),
				feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feedback, {
					type: feedbackType,
					tooltip: feedbackTooltip,
					children: feedback
				})
			] })
		})
	});
});
FormCheck.displayName = "FormCheck";
var FormCheck_default = Object.assign(FormCheck, {
	Input: FormCheckInput,
	Label: FormCheckLabel
});
//#endregion
//#region node_modules/react-bootstrap/esm/FormControl.js
var FormControl = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, type, size, htmlSize, id, className, isValid = false, isInvalid = false, plaintext, readOnly, as: Component = "input", ...props }, ref) => {
	const { controlId } = (0, import_react.useContext)(FormContext);
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-control");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		type,
		size: htmlSize,
		ref,
		readOnly,
		id: id || controlId,
		className: (0, import_classnames.default)(className, plaintext ? `${bsPrefix}-plaintext` : bsPrefix, size && `${bsPrefix}-${size}`, type === "color" && `${bsPrefix}-color`, isValid && "is-valid", isInvalid && "is-invalid")
	});
});
FormControl.displayName = "FormControl";
var FormControl_default = Object.assign(FormControl, { Feedback });
//#endregion
//#region node_modules/react-bootstrap/esm/FormFloating.js
var FormFloating = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-floating");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
FormFloating.displayName = "FormFloating";
//#endregion
//#region node_modules/react-bootstrap/esm/FormGroup.js
var FormGroup = /* @__PURE__ */ import_react.forwardRef(({ controlId, as: Component = "div", ...props }, ref) => {
	const context = (0, import_react.useMemo)(() => ({ controlId }), [controlId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormContext.Provider, {
		value: context,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			...props,
			ref
		})
	});
});
FormGroup.displayName = "FormGroup";
//#endregion
//#region node_modules/react-bootstrap/esm/FormLabel.js
var FormLabel = /* @__PURE__ */ import_react.forwardRef(({ as: Component = "label", bsPrefix, column = false, visuallyHidden = false, className, htmlFor, ...props }, ref) => {
	const { controlId } = (0, import_react.useContext)(FormContext);
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-label");
	let columnClass = "col-form-label";
	if (typeof column === "string") columnClass = `${columnClass} ${columnClass}-${column}`;
	const classes = (0, import_classnames.default)(className, bsPrefix, visuallyHidden && "visually-hidden", column && columnClass);
	htmlFor = htmlFor || controlId;
	if (column) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
		ref,
		as: "label",
		className: classes,
		htmlFor,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: classes,
		htmlFor,
		...props
	});
});
FormLabel.displayName = "FormLabel";
//#endregion
//#region node_modules/react-bootstrap/esm/FormRange.js
var FormRange = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, id, ...props }, ref) => {
	const { controlId } = (0, import_react.useContext)(FormContext);
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-range");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		type: "range",
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		id: id || controlId
	});
});
FormRange.displayName = "FormRange";
//#endregion
//#region node_modules/react-bootstrap/esm/FormSelect.js
var FormSelect = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, size, htmlSize, className, isValid = false, isInvalid = false, id, ...props }, ref) => {
	const { controlId } = (0, import_react.useContext)(FormContext);
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-select");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		size: htmlSize,
		ref,
		className: (0, import_classnames.default)(className, bsPrefix, size && `${bsPrefix}-${size}`, isValid && `is-valid`, isInvalid && `is-invalid`),
		id: id || controlId
	});
});
FormSelect.displayName = "FormSelect";
//#endregion
//#region node_modules/react-bootstrap/esm/FormText.js
var FormText = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, as: Component = "small", muted, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-text");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		ref,
		className: (0, import_classnames.default)(className, bsPrefix, muted && "text-muted")
	});
});
FormText.displayName = "FormText";
//#endregion
//#region node_modules/react-bootstrap/esm/Switch.js
var Switch = /* @__PURE__ */ import_react.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCheck_default, {
	...props,
	ref,
	type: "switch"
}));
Switch.displayName = "Switch";
var Switch_default = Object.assign(Switch, {
	Input: FormCheck_default.Input,
	Label: FormCheck_default.Label
});
//#endregion
//#region node_modules/react-bootstrap/esm/FloatingLabel.js
var FloatingLabel = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, children, controlId, label, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "form-floating");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormGroup, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		controlId,
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: controlId,
			children: label
		})]
	});
});
FloatingLabel.displayName = "FloatingLabel";
//#endregion
//#region node_modules/react-bootstrap/esm/Form.js
var propTypes$1 = {
	/**
	* The Form `ref` will be forwarded to the underlying element,
	* which means, unless it's rendered `as` a composite component,
	* it will be a DOM node, when resolved.
	*
	* @type {ReactRef}
	* @alias ref
	*/
	_ref: import_prop_types.default.any,
	/**
	* Mark a form as having been validated. Setting it to `true` will
	* toggle any validation styles on the forms elements.
	*/
	validated: import_prop_types.default.bool,
	as: import_prop_types.default.elementType
};
var Form = /* @__PURE__ */ import_react.forwardRef(({ className, validated, as: Component = "form", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
	...props,
	ref,
	className: (0, import_classnames.default)(className, validated && "was-validated")
}));
Form.displayName = "Form";
Form.propTypes = propTypes$1;
var Form_default = Object.assign(Form, {
	Group: FormGroup,
	Control: FormControl_default,
	Floating: FormFloating,
	Check: FormCheck_default,
	Switch: Switch_default,
	Label: FormLabel,
	Text: FormText,
	Range: FormRange,
	Select: FormSelect,
	FloatingLabel
});
//#endregion
//#region node_modules/react-bootstrap/esm/InputGroupText.js
var InputGroupText = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "span", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "input-group-text");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
InputGroupText.displayName = "InputGroupText";
//#endregion
//#region node_modules/react-bootstrap/esm/InputGroup.js
var InputGroupCheckbox = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCheckInput, {
	type: "checkbox",
	...props
}) });
var InputGroupRadio = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroupText, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormCheckInput, {
	type: "radio",
	...props
}) });
var InputGroup = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, size, hasValidation, className, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "input-group");
	const contextValue = (0, import_react.useMemo)(() => ({}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(context$1.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
			ref,
			...props,
			className: (0, import_classnames.default)(className, bsPrefix, size && `${bsPrefix}-${size}`, hasValidation && "has-validation")
		})
	});
});
InputGroup.displayName = "InputGroup";
var InputGroup_default = Object.assign(InputGroup, {
	Text: InputGroupText,
	Radio: InputGroupRadio,
	Checkbox: InputGroupCheckbox
});
//#endregion
//#region node_modules/react-bootstrap/esm/ListGroupItem.js
var ListGroupItem = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, active, disabled, eventKey, className, variant, action, as, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "list-group-item");
	const [navItemProps, meta] = useNavItem({
		key: makeEventKey(eventKey, props.href),
		active,
		...props
	});
	const handleClick = useEventCallback((event) => {
		if (disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		navItemProps.onClick(event);
	});
	if (disabled && props.tabIndex === void 0) {
		props.tabIndex = -1;
		props["aria-disabled"] = true;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(as || (action ? props.href ? "a" : "button" : "div"), {
		ref,
		...props,
		...navItemProps,
		onClick: handleClick,
		className: (0, import_classnames.default)(className, bsPrefix, meta.isActive && "active", disabled && "disabled", variant && `${bsPrefix}-${variant}`, action && `${bsPrefix}-action`)
	});
});
ListGroupItem.displayName = "ListGroupItem";
//#endregion
//#region node_modules/react-bootstrap/esm/ListGroup.js
var ListGroup = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { className, bsPrefix: initialBsPrefix, variant, horizontal, numbered, as = "div", ...controlledProps } = useUncontrolled(props, { activeKey: "onSelect" });
	const bsPrefix = useBootstrapPrefix(initialBsPrefix, "list-group");
	let horizontalVariant;
	if (horizontal) horizontalVariant = horizontal === true ? "horizontal" : `horizontal-${horizontal}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default$1, {
		ref,
		...controlledProps,
		as,
		className: (0, import_classnames.default)(className, bsPrefix, variant && `${bsPrefix}-${variant}`, horizontalVariant && `${bsPrefix}-${horizontalVariant}`, numbered && `${bsPrefix}-numbered`)
	});
});
ListGroup.displayName = "ListGroup";
var ListGroup_default = Object.assign(ListGroup, { Item: ListGroupItem });
//#endregion
//#region node_modules/react-bootstrap/esm/BootstrapModalManager.js
var Selector = {
	FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
	STICKY_CONTENT: ".sticky-top",
	NAVBAR_TOGGLER: ".navbar-toggler"
};
var BootstrapModalManager = class extends ModalManager {
	adjustAndStore(prop, element, adjust) {
		const actual = element.style[prop];
		element.dataset[prop] = actual;
		style(element, { [prop]: `${parseFloat(style(element, prop)) + adjust}px` });
	}
	restore(prop, element) {
		const value = element.dataset[prop];
		if (value !== void 0) {
			delete element.dataset[prop];
			style(element, { [prop]: value });
		}
	}
	setContainerStyle(containerState) {
		super.setContainerStyle(containerState);
		const container = this.getElement();
		addClass(container, "modal-open");
		if (!containerState.scrollBarWidth) return;
		const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
		const marginProp = this.isRTL ? "marginLeft" : "marginRight";
		qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
		qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
		qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
	}
	removeContainerStyle(containerState) {
		super.removeContainerStyle(containerState);
		const container = this.getElement();
		removeClass(container, "modal-open");
		const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
		const marginProp = this.isRTL ? "marginLeft" : "marginRight";
		qsa(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el));
		qsa(container, Selector.STICKY_CONTENT).forEach((el) => this.restore(marginProp, el));
		qsa(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.restore(marginProp, el));
	}
};
var sharedManager;
function getSharedManager(options) {
	if (!sharedManager) sharedManager = new BootstrapModalManager(options);
	return sharedManager;
}
//#endregion
//#region node_modules/react-bootstrap/esm/ModalBody.js
var ModalBody = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "modal-body");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
ModalBody.displayName = "ModalBody";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalContext.js
var ModalContext = /* @__PURE__ */ import_react.createContext({ onHide() {} });
//#endregion
//#region node_modules/react-bootstrap/esm/ModalDialog.js
var ModalDialog = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, contentClassName, centered, size, fullscreen, children, scrollable, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
	const dialogClass = `${bsPrefix}-dialog`;
	const fullScreenClass = typeof fullscreen === "string" ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...props,
		ref,
		className: (0, import_classnames.default)(dialogClass, className, size && `${bsPrefix}-${size}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: (0, import_classnames.default)(`${bsPrefix}-content`, contentClassName),
			children
		})
	});
});
ModalDialog.displayName = "ModalDialog";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalFooter.js
var ModalFooter = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "modal-footer");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
ModalFooter.displayName = "ModalFooter";
//#endregion
//#region node_modules/react-bootstrap/esm/AbstractModalHeader.js
var AbstractModalHeader = /* @__PURE__ */ import_react.forwardRef(({ closeLabel = "Close", closeVariant, closeButton = false, onHide, children, ...props }, ref) => {
	const context = (0, import_react.useContext)(ModalContext);
	const handleClick = useEventCallback(() => {
		context?.onHide();
		onHide?.();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		...props,
		children: [children, closeButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseButton, {
			"aria-label": closeLabel,
			variant: closeVariant,
			onClick: handleClick
		})]
	});
});
AbstractModalHeader.displayName = "AbstractModalHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalHeader.js
var ModalHeader = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, closeLabel = "Close", closeButton = false, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbstractModalHeader, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, bsPrefix),
		closeLabel,
		closeButton
	});
});
ModalHeader.displayName = "ModalHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalTitle.js
var DivStyledAsH4 = divWithClassName_default("h4");
var ModalTitle = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = DivStyledAsH4, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "modal-title");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
ModalTitle.displayName = "ModalTitle";
//#endregion
//#region node_modules/react-bootstrap/esm/Modal.js
function DialogTransition$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade, {
		...props,
		timeout: null
	});
}
function BackdropTransition$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade, {
		...props,
		timeout: null
	});
}
var Modal = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, style, dialogClassName, contentClassName, children, dialogAs: Dialog = ModalDialog, "data-bs-theme": dataBsTheme, "aria-labelledby": ariaLabelledby, "aria-describedby": ariaDescribedby, "aria-label": ariaLabel, show = false, animation = true, backdrop = true, keyboard = true, onEscapeKeyDown, onShow, onHide, container, autoFocus = true, enforceFocus = true, restoreFocus = true, restoreFocusOptions, onEntered, onExit, onExiting, onEnter, onEntering, onExited, backdropClassName, manager: propsManager, ...props }, ref) => {
	const [modalStyle, setStyle] = (0, import_react.useState)({});
	const [animateStaticModal, setAnimateStaticModal] = (0, import_react.useState)(false);
	const waitingForMouseUpRef = (0, import_react.useRef)(false);
	const ignoreBackdropClickRef = (0, import_react.useRef)(false);
	const removeStaticModalAnimationRef = (0, import_react.useRef)(null);
	const [modal, setModalRef] = useCallbackRef();
	const mergedRef = useMergedRefs(ref, setModalRef);
	const handleHide = useEventCallback(onHide);
	const isRTL = useIsRTL();
	bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
	const modalContext = (0, import_react.useMemo)(() => ({ onHide: handleHide }), [handleHide]);
	function getModalManager() {
		if (propsManager) return propsManager;
		return getSharedManager({ isRTL });
	}
	function updateDialogStyle(node) {
		if (!canUseDOM_default) return;
		const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
		const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
		setStyle({
			paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
			paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
		});
	}
	const handleWindowResize = useEventCallback(() => {
		if (modal) updateDialogStyle(modal.dialog);
	});
	useWillUnmount(() => {
		removeEventListener(window, "resize", handleWindowResize);
		removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
	});
	const handleDialogMouseDown = () => {
		waitingForMouseUpRef.current = true;
	};
	const handleMouseUp = (e) => {
		if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) ignoreBackdropClickRef.current = true;
		waitingForMouseUpRef.current = false;
	};
	const handleStaticModalAnimation = () => {
		setAnimateStaticModal(true);
		removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
			setAnimateStaticModal(false);
		});
	};
	const handleStaticBackdropClick = (e) => {
		if (e.target !== e.currentTarget) return;
		handleStaticModalAnimation();
	};
	const handleClick = (e) => {
		if (backdrop === "static") {
			handleStaticBackdropClick(e);
			return;
		}
		if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
			ignoreBackdropClickRef.current = false;
			return;
		}
		onHide?.();
	};
	const handleEscapeKeyDown = (e) => {
		if (keyboard) onEscapeKeyDown?.(e);
		else {
			e.preventDefault();
			if (backdrop === "static") handleStaticModalAnimation();
		}
	};
	const handleEnter = (node, isAppearing) => {
		if (node) updateDialogStyle(node);
		onEnter?.(node, isAppearing);
	};
	const handleExit = (node) => {
		removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
		onExit?.(node);
	};
	const handleEntering = (node, isAppearing) => {
		onEntering?.(node, isAppearing);
		addEventListener(window, "resize", handleWindowResize);
	};
	const handleExited = (node) => {
		if (node) node.style.display = "";
		onExited?.(node);
		removeEventListener(window, "resize", handleWindowResize);
	};
	const renderBackdrop = (0, import_react.useCallback)((backdropProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...backdropProps,
		className: (0, import_classnames.default)(`${bsPrefix}-backdrop`, backdropClassName, !animation && "show")
	}), [
		animation,
		backdropClassName,
		bsPrefix
	]);
	const baseModalStyle = {
		...style,
		...modalStyle
	};
	baseModalStyle.display = "block";
	const renderDialog = (dialogProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "dialog",
		...dialogProps,
		style: baseModalStyle,
		className: (0, import_classnames.default)(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`, !animation && "show"),
		onClick: backdrop ? handleClick : void 0,
		onMouseUp: handleMouseUp,
		"data-bs-theme": dataBsTheme,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby,
		"aria-describedby": ariaDescribedby,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			...props,
			onMouseDown: handleDialogMouseDown,
			className: dialogClassName,
			contentClassName,
			children
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalContext.Provider, {
		value: modalContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default$1, {
			show,
			ref: mergedRef,
			backdrop,
			container,
			keyboard: true,
			autoFocus,
			enforceFocus,
			restoreFocus,
			restoreFocusOptions,
			onEscapeKeyDown: handleEscapeKeyDown,
			onShow,
			onHide,
			onEnter: handleEnter,
			onEntering: handleEntering,
			onEntered,
			onExit: handleExit,
			onExiting,
			onExited: handleExited,
			manager: getModalManager(),
			transition: animation ? DialogTransition$1 : void 0,
			backdropTransition: animation ? BackdropTransition$1 : void 0,
			renderBackdrop,
			renderDialog
		})
	});
});
Modal.displayName = "Modal";
var Modal_default = Object.assign(Modal, {
	Body: ModalBody,
	Header: ModalHeader,
	Title: ModalTitle,
	Footer: ModalFooter,
	Dialog: ModalDialog,
	TRANSITION_DURATION: 300,
	BACKDROP_TRANSITION_DURATION: 150
});
//#endregion
//#region node_modules/react-bootstrap/esm/NavItem.js
var NavItem = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "nav-item");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
NavItem.displayName = "NavItem";
//#endregion
//#region node_modules/react-bootstrap/esm/NavLink.js
var NavLink = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, as: Component = Anchor, active, eventKey, disabled = false, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "nav-link");
	const [navItemProps, meta] = useNavItem({
		key: makeEventKey(eventKey, props.href),
		active,
		disabled,
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		...navItemProps,
		ref,
		disabled,
		className: (0, import_classnames.default)(className, bsPrefix, disabled && "disabled", meta.isActive && "active")
	});
});
NavLink.displayName = "NavLink";
//#endregion
//#region node_modules/react-bootstrap/esm/Nav.js
var Nav = /* @__PURE__ */ import_react.forwardRef((uncontrolledProps, ref) => {
	const { as = "div", bsPrefix: initialBsPrefix, variant, fill = false, justify = false, navbar, navbarScroll, className, activeKey, ...props } = useUncontrolled(uncontrolledProps, { activeKey: "onSelect" });
	const bsPrefix = useBootstrapPrefix(initialBsPrefix, "nav");
	let navbarBsPrefix;
	let cardHeaderBsPrefix;
	let isNavbar = false;
	const navbarContext = (0, import_react.useContext)(context);
	const cardHeaderContext = (0, import_react.useContext)(context$2);
	if (navbarContext) {
		navbarBsPrefix = navbarContext.bsPrefix;
		isNavbar = navbar == null ? true : navbar;
	} else if (cardHeaderContext) ({cardHeaderBsPrefix} = cardHeaderContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default$1, {
		as,
		ref,
		activeKey,
		className: (0, import_classnames.default)(className, {
			[bsPrefix]: !isNavbar,
			[`${navbarBsPrefix}-nav`]: isNavbar,
			[`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
			[`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
			[`${bsPrefix}-${variant}`]: !!variant,
			[`${bsPrefix}-fill`]: fill,
			[`${bsPrefix}-justified`]: justify
		}),
		...props
	});
});
Nav.displayName = "Nav";
var Nav_default = Object.assign(Nav, {
	Item: NavItem,
	Link: NavLink
});
//#endregion
//#region node_modules/react-bootstrap/esm/NavbarBrand.js
var NavbarBrand = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, as, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-brand");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(as || (props.href ? "a" : "span"), {
		...props,
		ref,
		className: (0, import_classnames.default)(className, bsPrefix)
	});
});
NavbarBrand.displayName = "NavbarBrand";
//#endregion
//#region node_modules/react-bootstrap/esm/NavbarCollapse.js
var NavbarCollapse = /* @__PURE__ */ import_react.forwardRef(({ children, bsPrefix, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-collapse");
	const context$4 = (0, import_react.useContext)(context);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
		in: !!(context$4 && context$4.expanded),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: bsPrefix,
			children
		})
	});
});
NavbarCollapse.displayName = "NavbarCollapse";
//#endregion
//#region node_modules/react-bootstrap/esm/NavbarToggle.js
var NavbarToggle = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, children, label = "Toggle navigation", as: Component = "button", onClick, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-toggler");
	const { onToggle, expanded } = (0, import_react.useContext)(context) || {};
	const handleClick = useEventCallback((e) => {
		if (onClick) onClick(e);
		if (onToggle) onToggle();
	});
	if (Component === "button") props.type = "button";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		...props,
		ref,
		onClick: handleClick,
		"aria-label": label,
		className: (0, import_classnames.default)(className, bsPrefix, !expanded && "collapsed"),
		children: children || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${bsPrefix}-icon` })
	});
});
NavbarToggle.displayName = "NavbarToggle";
//#endregion
//#region node_modules/react-bootstrap/esm/OffcanvasBody.js
var OffcanvasBody = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas-body");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
OffcanvasBody.displayName = "OffcanvasBody";
//#endregion
//#region node_modules/react-bootstrap/esm/OffcanvasToggling.js
var transitionStyles = {
	[ENTERING]: "show",
	[ENTERED]: "show"
};
var OffcanvasToggling = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, children, in: inProp = false, mountOnEnter = false, unmountOnExit = false, appear = false, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransitionWrapper, {
		ref,
		addEndListener: transitionEndListener,
		in: inProp,
		mountOnEnter,
		unmountOnExit,
		appear,
		...props,
		childRef: getChildRef(children),
		children: (status, innerProps) => /* @__PURE__ */ import_react.cloneElement(children, {
			...innerProps,
			className: (0, import_classnames.default)(className, children.props.className, (status === "entering" || status === "exiting") && `${bsPrefix}-toggling`, transitionStyles[status])
		})
	});
});
OffcanvasToggling.displayName = "OffcanvasToggling";
//#endregion
//#region node_modules/react-bootstrap/esm/OffcanvasHeader.js
var OffcanvasHeader = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, closeLabel = "Close", closeButton = false, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas-header");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AbstractModalHeader, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, bsPrefix),
		closeLabel,
		closeButton
	});
});
OffcanvasHeader.displayName = "OffcanvasHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/OffcanvasTitle.js
var DivStyledAsH5 = divWithClassName_default("h5");
var OffcanvasTitle = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = DivStyledAsH5, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas-title");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
OffcanvasTitle.displayName = "OffcanvasTitle";
//#endregion
//#region node_modules/react-bootstrap/esm/Offcanvas.js
function DialogTransition(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffcanvasToggling, { ...props });
}
function BackdropTransition(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fade, { ...props });
}
var Offcanvas = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, children, "aria-labelledby": ariaLabelledby, placement = "start", responsive, show = false, backdrop = true, keyboard = true, scroll = false, onEscapeKeyDown, onShow, onHide, container, autoFocus = true, enforceFocus = true, restoreFocus = true, restoreFocusOptions, onEntered, onExit, onExiting, onEnter, onEntering, onExited, backdropClassName, manager: propsManager, renderStaticNode = false, ...props }, ref) => {
	const modalManager = (0, import_react.useRef)();
	bsPrefix = useBootstrapPrefix(bsPrefix, "offcanvas");
	const [showOffcanvas, setShowOffcanvas] = (0, import_react.useState)(false);
	const handleHide = useEventCallback(onHide);
	const hideResponsiveOffcanvas = useBreakpoint(responsive || "xs", "up");
	(0, import_react.useEffect)(() => {
		setShowOffcanvas(responsive ? show && !hideResponsiveOffcanvas : show);
	}, [
		show,
		responsive,
		hideResponsiveOffcanvas
	]);
	const modalContext = (0, import_react.useMemo)(() => ({ onHide: handleHide }), [handleHide]);
	function getModalManager() {
		if (propsManager) return propsManager;
		if (scroll) {
			if (!modalManager.current) modalManager.current = new BootstrapModalManager({ handleContainerOverflow: false });
			return modalManager.current;
		}
		return getSharedManager();
	}
	const handleEnter = (node, ...args) => {
		if (node) node.style.visibility = "visible";
		onEnter?.(node, ...args);
	};
	const handleExited = (node, ...args) => {
		if (node) node.style.visibility = "";
		onExited?.(...args);
	};
	const renderBackdrop = (0, import_react.useCallback)((backdropProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...backdropProps,
		className: (0, import_classnames.default)(`${bsPrefix}-backdrop`, backdropClassName)
	}), [backdropClassName, bsPrefix]);
	const renderDialog = (dialogProps) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...dialogProps,
		...props,
		className: (0, import_classnames.default)(className, responsive ? `${bsPrefix}-${responsive}` : bsPrefix, `${bsPrefix}-${placement}`),
		"aria-labelledby": ariaLabelledby,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!showOffcanvas && (responsive || renderStaticNode) && renderDialog({}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalContext.Provider, {
		value: modalContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default$1, {
			show: showOffcanvas,
			ref,
			backdrop,
			container,
			keyboard,
			autoFocus,
			enforceFocus: enforceFocus && !scroll,
			restoreFocus,
			restoreFocusOptions,
			onEscapeKeyDown,
			onShow,
			onHide: handleHide,
			onEnter: handleEnter,
			onEntering,
			onEntered,
			onExit,
			onExiting,
			onExited: handleExited,
			manager: getModalManager(),
			transition: DialogTransition,
			backdropTransition: BackdropTransition,
			renderBackdrop,
			renderDialog
		})
	})] });
});
Offcanvas.displayName = "Offcanvas";
var Offcanvas_default = Object.assign(Offcanvas, {
	Body: OffcanvasBody,
	Header: OffcanvasHeader,
	Title: OffcanvasTitle
});
//#endregion
//#region node_modules/react-bootstrap/esm/NavbarOffcanvas.js
var NavbarOffcanvas = /* @__PURE__ */ import_react.forwardRef(({ onHide, ...props }, ref) => {
	const context$3 = (0, import_react.useContext)(context);
	const handleHide = useEventCallback(() => {
		context$3 == null || context$3.onToggle == null || context$3.onToggle();
		onHide?.();
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Offcanvas_default, {
		ref,
		show: !!(context$3 != null && context$3.expanded),
		...props,
		renderStaticNode: true,
		onHide: handleHide
	});
});
NavbarOffcanvas.displayName = "NavbarOffcanvas";
//#endregion
//#region node_modules/react-bootstrap/esm/NavbarText.js
var NavbarText = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "span", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "navbar-text");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
NavbarText.displayName = "NavbarText";
//#endregion
//#region node_modules/react-bootstrap/esm/Navbar.js
var Navbar = /* @__PURE__ */ import_react.forwardRef((props, ref) => {
	const { bsPrefix: initialBsPrefix, expand = true, variant = "light", bg, fixed, sticky, className, as: Component = "nav", expanded, onToggle, onSelect, collapseOnSelect = false, ...controlledProps } = useUncontrolled(props, { expanded: "onToggle" });
	const bsPrefix = useBootstrapPrefix(initialBsPrefix, "navbar");
	const handleCollapse = (0, import_react.useCallback)((...args) => {
		onSelect?.(...args);
		if (collapseOnSelect && expanded) onToggle?.(false);
	}, [
		onSelect,
		collapseOnSelect,
		expanded,
		onToggle
	]);
	if (controlledProps.role === void 0 && Component !== "nav") controlledProps.role = "navigation";
	let expandClass = `${bsPrefix}-expand`;
	if (typeof expand === "string") expandClass = `${expandClass}-${expand}`;
	const navbarContext = (0, import_react.useMemo)(() => ({
		onToggle: () => onToggle == null ? void 0 : onToggle(!expanded),
		bsPrefix,
		expanded: !!expanded,
		expand
	}), [
		bsPrefix,
		expanded,
		expand,
		onToggle
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(context.Provider, {
		value: navbarContext,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectableContext.Provider, {
			value: handleCollapse,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
				ref,
				...controlledProps,
				className: (0, import_classnames.default)(className, bsPrefix, expand && expandClass, variant && `${bsPrefix}-${variant}`, bg && `bg-${bg}`, sticky && `sticky-${sticky}`, fixed && `fixed-${fixed}`)
			})
		})
	});
});
Navbar.displayName = "Navbar";
var Navbar_default = Object.assign(Navbar, {
	Brand: NavbarBrand,
	Collapse: NavbarCollapse,
	Offcanvas: NavbarOffcanvas,
	Text: NavbarText,
	Toggle: NavbarToggle
});
//#endregion
//#region node_modules/react-bootstrap/esm/ProgressBar.js
var ROUND_PRECISION = 1e3;
function getPercentage(now, min, max) {
	const percentage = (now - min) / (max - min) * 100;
	return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}
function renderProgressBar({ min, now, max, label, visuallyHidden, striped, animated, className, style, variant, bsPrefix, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		...props,
		role: "progressbar",
		className: (0, import_classnames.default)(className, `${bsPrefix}-bar`, {
			[`bg-${variant}`]: variant,
			[`${bsPrefix}-bar-animated`]: animated,
			[`${bsPrefix}-bar-striped`]: animated || striped
		}),
		style: {
			width: `${getPercentage(now, min, max)}%`,
			...style
		},
		"aria-valuenow": now,
		"aria-valuemin": min,
		"aria-valuemax": max,
		children: visuallyHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "visually-hidden",
			children: label
		}) : label
	});
}
var ProgressBar = /* @__PURE__ */ import_react.forwardRef(({ isChild = false, ...rest }, ref) => {
	const props = {
		min: 0,
		max: 100,
		animated: false,
		visuallyHidden: false,
		striped: false,
		...rest
	};
	props.bsPrefix = useBootstrapPrefix(props.bsPrefix, "progress");
	if (isChild) return renderProgressBar(props, ref);
	const { min, now, max, label, visuallyHidden, striped, animated, bsPrefix, variant, className, children, ...wrapperProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		...wrapperProps,
		className: (0, import_classnames.default)(className, bsPrefix),
		children: children ? map(children, (child) => /* @__PURE__ */ (0, import_react.cloneElement)(child, { isChild: true })) : renderProgressBar({
			min,
			now,
			max,
			label,
			visuallyHidden,
			striped,
			animated,
			bsPrefix,
			variant
		}, ref)
	});
});
ProgressBar.displayName = "ProgressBar";
//#endregion
//#region node_modules/react-bootstrap/esm/Row.js
var Row = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, as: Component = "div", ...props }, ref) => {
	const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "row");
	const breakpoints = useBootstrapBreakpoints();
	const minBreakpoint = useBootstrapMinBreakpoint();
	const sizePrefix = `${decoratedBsPrefix}-cols`;
	const classes = [];
	breakpoints.forEach((brkPoint) => {
		const propValue = props[brkPoint];
		delete props[brkPoint];
		let cols;
		if (propValue != null && typeof propValue === "object") ({cols} = propValue);
		else cols = propValue;
		const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : "";
		if (cols != null) classes.push(`${sizePrefix}${infix}-${cols}`);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, decoratedBsPrefix, ...classes)
	});
});
Row.displayName = "Row";
//#endregion
//#region node_modules/react-bootstrap/esm/Spinner.js
var Spinner = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, variant, animation = "border", size, as: Component = "div", className, ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "spinner");
	const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		...props,
		className: (0, import_classnames.default)(className, bsSpinnerPrefix, size && `${bsSpinnerPrefix}-${size}`, variant && `text-${variant}`)
	});
});
Spinner.displayName = "Spinner";
//#endregion
//#region node_modules/react-bootstrap/esm/getTabTransitionComponent.js
function getTabTransitionComponent(transition) {
	if (typeof transition === "boolean") return transition ? Fade : NoopTransition;
	return transition;
}
//#endregion
//#region node_modules/react-bootstrap/esm/TabContainer.js
var TabContainer = ({ transition, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs$1, {
	...props,
	transition: getTabTransitionComponent(transition)
});
TabContainer.displayName = "TabContainer";
//#endregion
//#region node_modules/react-bootstrap/esm/TabContent.js
var TabContent = /* @__PURE__ */ import_react.forwardRef(({ className, bsPrefix, as: Component = "div", ...props }, ref) => {
	bsPrefix = useBootstrapPrefix(bsPrefix, "tab-content");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		className: (0, import_classnames.default)(className, bsPrefix),
		...props
	});
});
TabContent.displayName = "TabContent";
//#endregion
//#region node_modules/react-bootstrap/esm/TabPane.js
var TabPane = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, transition, ...props }, ref) => {
	const [{ className, as: Component = "div", ...rest }, { isActive, onEnter, onEntering, onEntered, onExit, onExiting, onExited, mountOnEnter, unmountOnExit, transition: Transition = Fade }] = useTabPanel({
		...props,
		transition: getTabTransitionComponent(transition)
	});
	const prefix = useBootstrapPrefix(bsPrefix, "tab-pane");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabContext.Provider, {
		value: null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectableContext.Provider, {
			value: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transition, {
				in: isActive,
				onEnter,
				onEntering,
				onEntered,
				onExit,
				onExiting,
				onExited,
				mountOnEnter,
				unmountOnExit,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
					...rest,
					ref,
					className: (0, import_classnames.default)(className, prefix, isActive && "active")
				})
			})
		})
	});
});
TabPane.displayName = "TabPane";
//#endregion
//#region node_modules/react-bootstrap/esm/Tab.js
var propTypes = {
	eventKey: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.number]),
	/**
	* Content for the tab title.
	*/
	title: import_prop_types.default.node.isRequired,
	/**
	* The disabled state of the tab.
	*/
	disabled: import_prop_types.default.bool,
	/**
	* Class to pass to the underlying nav link.
	*/
	tabClassName: import_prop_types.default.string,
	/**
	* Object containing attributes to pass to underlying nav link.
	*/
	tabAttrs: import_prop_types.default.object
};
var Tab = () => {
	throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly");
};
Tab.propTypes = propTypes;
var Tab_default = Object.assign(Tab, {
	Container: TabContainer,
	Content: TabContent,
	Pane: TabPane
});
//#endregion
//#region node_modules/react-bootstrap/esm/Table.js
var Table = /* @__PURE__ */ import_react.forwardRef(({ bsPrefix, className, striped, bordered, borderless, hover, size, variant, responsive, ...props }, ref) => {
	const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "table");
	const classes = (0, import_classnames.default)(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size && `${decoratedBsPrefix}-${size}`, striped && `${decoratedBsPrefix}-${typeof striped === "string" ? `striped-${striped}` : "striped"}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
	const table = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		...props,
		className: classes,
		ref
	});
	if (responsive) {
		let responsiveClass = `${decoratedBsPrefix}-responsive`;
		if (typeof responsive === "string") responsiveClass = `${responsiveClass}-${responsive}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: responsiveClass,
			children: table
		});
	}
	return table;
});
Table.displayName = "Table";
//#endregion
//#region node_modules/react-bootstrap/esm/Tabs.js
function getDefaultActiveKey(children) {
	let defaultActiveKey;
	forEach(children, (child) => {
		if (defaultActiveKey == null) defaultActiveKey = child.props.eventKey;
	});
	return defaultActiveKey;
}
function renderTab(child) {
	const { title, eventKey, disabled, tabClassName, tabAttrs, id } = child.props;
	if (title == null) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavItem, {
		as: "li",
		role: "presentation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
			as: "button",
			type: "button",
			eventKey,
			disabled,
			id,
			className: tabClassName,
			...tabAttrs,
			children: title
		})
	});
}
var Tabs = (props) => {
	const { id, onSelect, transition, mountOnEnter = false, unmountOnExit = false, variant = "tabs", children, activeKey = getDefaultActiveKey(children), ...controlledProps } = useUncontrolled(props, { activeKey: "onSelect" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs$1, {
		id,
		activeKey,
		onSelect,
		transition: getTabTransitionComponent(transition),
		mountOnEnter,
		unmountOnExit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default, {
			id,
			...controlledProps,
			role: "tablist",
			as: "ul",
			variant,
			children: map(children, renderTab)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabContent, { children: map(children, (child) => {
			const childProps = { ...child.props };
			delete childProps.title;
			delete childProps.disabled;
			delete childProps.tabClassName;
			delete childProps.tabAttrs;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPane, { ...childProps });
		}) })]
	});
};
Tabs.displayName = "Tabs";
//#endregion
//#region node_modules/react-toastify/dist/index.mjs
var L = (t) => typeof t == "number" && !isNaN(t), N = (t) => typeof t == "string", P = (t) => typeof t == "function", ut = (t) => N(t) || L(t), z = (t) => N(t) || P(t) ? t : null, yt = (t, o) => t === !1 || L(t) && t > 0 ? t : o, F = (t) => (0, import_react.isValidElement)(t) || N(t) || P(t) || L(t);
function J(t, o, e = 300) {
	let { scrollHeight: r, style: a } = t;
	requestAnimationFrame(() => {
		a.minHeight = "initial", a.height = r + "px", a.transition = `all ${e}ms`, requestAnimationFrame(() => {
			a.height = "0", a.padding = "0", a.margin = "0", setTimeout(o, e);
		});
	});
}
function R({ enter: t, exit: o, appendPosition: e = !1, collapse: r = !0, collapseDuration: a = 300 }) {
	return function({ children: s, position: f, preventExitTransition: c, done: T, nodeRef: g, isIn: v, playToast: x }) {
		let C = e ? `${t}--${f}` : t, S = e ? `${o}--${f}` : o, E = (0, import_react.useRef)(0);
		return (0, import_react.useLayoutEffect)(() => {
			let d = g.current, p = C.split(" "), b = (n) => {
				n.target === g.current && (x(), d.removeEventListener("animationend", b), d.removeEventListener("animationcancel", b), E.current === 0 && n.type !== "animationcancel" && d.classList.remove(...p));
			};
			d.classList.add(...p), d.addEventListener("animationend", b), d.addEventListener("animationcancel", b);
		}, []), (0, import_react.useEffect)(() => {
			let d = g.current, p = () => {
				d.removeEventListener("animationend", p), r ? J(d, T, a) : T();
			};
			v || (c ? p() : (E.current = 1, d.className += ` ${S}`, d.addEventListener("animationend", p)));
		}, [v]), import_react.createElement(import_react.Fragment, null, s);
	};
}
function tt(t, o) {
	return {
		content: ot(t.content, t.props),
		containerId: t.props.containerId,
		id: t.props.toastId,
		theme: t.props.theme,
		type: t.props.type,
		data: t.props.data || {},
		isLoading: t.props.isLoading,
		icon: t.props.icon,
		reason: t.removalReason,
		status: o
	};
}
function ot(t, o, e = !1) {
	return (0, import_react.isValidElement)(t) && !N(t.type) ? (0, import_react.cloneElement)(t, {
		closeToast: o.closeToast,
		toastProps: o,
		data: o.data,
		isPaused: e
	}) : P(t) ? t({
		closeToast: o.closeToast,
		toastProps: o,
		data: o.data,
		isPaused: e
	}) : t;
}
function gt({ closeToast: t, theme: o, ariaLabel: e = "close" }) {
	return import_react.createElement("button", {
		className: `Toastify__close-button Toastify__close-button--${o}`,
		type: "button",
		onClick: (r) => {
			r.stopPropagation(), t(!0);
		},
		"aria-label": e
	}, import_react.createElement("svg", {
		"aria-hidden": "true",
		viewBox: "0 0 14 16"
	}, import_react.createElement("path", {
		fillRule: "evenodd",
		d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
	})));
}
function bt({ delay: t, isRunning: o, closeToast: e, type: r = "default", hide: a, className: l, controlledProgress: s, progress: f, rtl: c, isIn: T, theme: g }) {
	let v = a || s && f === 0, x = {
		animationDuration: `${t}ms`,
		animationPlayState: o ? "running" : "paused"
	};
	s && (x.transform = `scaleX(${f})`);
	let C = clsx("Toastify__progress-bar", s ? "Toastify__progress-bar--controlled" : "Toastify__progress-bar--animated", `Toastify__progress-bar-theme--${g}`, `Toastify__progress-bar--${r}`, { ["Toastify__progress-bar--rtl"]: c }), S = P(l) ? l({
		rtl: c,
		type: r,
		defaultClassName: C
	}) : clsx(C, l), E = { [s && f >= 1 ? "onTransitionEnd" : "onAnimationEnd"]: s && f < 1 ? null : () => {
		T && e();
	} };
	return import_react.createElement("div", {
		className: "Toastify__progress-bar--wrp",
		"data-hidden": v
	}, import_react.createElement("div", { className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${g} Toastify__progress-bar--${r}` }), import_react.createElement("div", {
		role: "progressbar",
		"aria-hidden": v ? "true" : "false",
		"aria-label": "notification timer",
		"aria-valuenow": s ? Math.round(f * 100) : void 0,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		className: S,
		style: x,
		...E
	}));
}
var Qt = 1, st = () => `${Qt++}`;
function vt(t, o, e) {
	let r = 1, a = 0, l = [], s = [], f = o, c = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Set(), g = (i) => (T.add(i), () => T.delete(i)), v = () => {
		s = Array.from(c.values()), T.forEach((i) => i());
	}, x = ({ containerId: i, toastId: n, updateId: u }) => {
		let h = i ? i !== t : t !== 1, m = c.has(n) && u == null;
		return h || m;
	}, C = (i, n) => {
		c.forEach((u) => {
			var h;
			(n == null || n === u.props.toastId) && ((h = u.toggle) == null || h.call(u, i));
		});
	}, S = (i) => {
		var n, u;
		i.isActive && ((u = (n = i.props) == null ? void 0 : n.onClose) == null || u.call(n, i.removalReason), i.isActive = !1, e(tt(i, "removed")));
	}, E = (i) => {
		if (i == null) c.forEach(S);
		else {
			let n = c.get(i);
			n && S(n);
		}
		v();
	}, d = () => {
		a -= l.length, l = [];
	}, p = (i) => {
		var m, _;
		let { toastId: n, updateId: u } = i.props, h = u == null;
		i.staleId && c.delete(i.staleId), i.isActive = !0, c.set(n, i), v(), e(tt(i, h ? "added" : "updated")), h && ((_ = (m = i.props).onOpen) == null || _.call(m));
	};
	return {
		id: t,
		props: f,
		observe: g,
		toggle: C,
		removeToast: E,
		toasts: c,
		clearQueue: d,
		buildToast: (i, n) => {
			if (x(n)) return;
			let { toastId: u, updateId: h, data: m, staleId: _, delay: k } = n, D = h == null;
			D && a++;
			let A = {
				...f,
				style: f.toastStyle,
				key: r++,
				...Object.fromEntries(Object.entries(n).filter(([M, $]) => $ != null)),
				toastId: u,
				updateId: h,
				data: m,
				isIn: !1,
				className: z(n.className || f.toastClassName),
				progressClassName: z(n.progressClassName || f.progressClassName),
				autoClose: n.isLoading ? !1 : yt(n.autoClose, f.autoClose),
				closeToast(M) {
					let $ = c.get(u);
					$ && ($.removalReason = M, E(u));
				},
				deleteToast() {
					if (c.get(u) != null) {
						if (c.delete(u), a--, a < 0 && (a = 0), l.length > 0) {
							p(l.shift());
							return;
						}
						v();
					}
				}
			};
			A.closeButton = f.closeButton, n.closeButton === !1 || F(n.closeButton) ? A.closeButton = n.closeButton : n.closeButton === !0 && (A.closeButton = F(f.closeButton) ? f.closeButton : !0);
			let B = {
				content: i,
				props: A,
				staleId: _
			};
			f.limit && f.limit > 0 && a > f.limit && D ? l.push(B) : L(k) ? setTimeout(() => {
				p(B);
			}, k) : p(B);
		},
		setProps(i) {
			f = i;
		},
		setToggle: (i, n) => {
			let u = c.get(i);
			u && (u.toggle = n);
		},
		isToastActive: (i) => {
			var n;
			return (n = c.get(i)) == null ? void 0 : n.isActive;
		},
		getSnapshot: () => s
	};
}
var I = /* @__PURE__ */ new Map(), U = [], rt = /* @__PURE__ */ new Set(), Wt = (t) => rt.forEach((o) => o(t)), ht = () => I.size > 0;
function Gt() {
	U.forEach((t) => nt(t.content, t.options)), U = [];
}
var Ct = (t, { containerId: o }) => {
	var e;
	return (e = I.get(o || 1)) == null ? void 0 : e.toasts.get(t);
};
function X(t, o) {
	var r;
	if (o) return !!((r = I.get(o)) != null && r.isToastActive(t));
	let e = !1;
	return I.forEach((a) => {
		a.isToastActive(t) && (e = !0);
	}), e;
}
function xt(t) {
	if (!ht()) {
		U = U.filter((o) => t != null && o.options.toastId !== t);
		return;
	}
	if (t == null || ut(t)) I.forEach((o) => {
		o.removeToast(t);
	});
	else if (t && ("containerId" in t || "id" in t)) {
		let o = I.get(t.containerId);
		o ? o.removeToast(t.id) : I.forEach((e) => {
			e.removeToast(t.id);
		});
	}
}
var Et = (t = {}) => {
	I.forEach((o) => {
		o.props.limit && (!t.containerId || o.id === t.containerId) && o.clearQueue();
	});
};
function nt(t, o) {
	F(t) && (ht() || U.push({
		content: t,
		options: o
	}), I.forEach((e) => {
		e.buildToast(t, o);
	}));
}
function Pt(t) {
	var o;
	(o = I.get(t.containerId || 1)) == null || o.setToggle(t.id, t.fn);
}
function it(t, o) {
	I.forEach((e) => {
		(o == null || !(o != null && o.containerId) || (o == null ? void 0 : o.containerId) === e.id) && e.toggle(t, o == null ? void 0 : o.id);
	});
}
function It(t) {
	let o = t.containerId || 1;
	return {
		subscribe(e) {
			let r = vt(o, t, Wt);
			I.set(o, r);
			let a = r.observe(e);
			return Gt(), () => {
				a(), I.delete(o);
			};
		},
		setProps(e) {
			var r;
			(r = I.get(o)) == null || r.setProps(e);
		},
		getSnapshot() {
			var e;
			return (e = I.get(o)) == null ? void 0 : e.getSnapshot();
		}
	};
}
function St(t) {
	return rt.add(t), () => {
		rt.delete(t);
	};
}
function qt(t) {
	return t && (N(t.toastId) || L(t.toastId)) ? t.toastId : st();
}
function H(t, o) {
	return nt(t, o), o.toastId;
}
function Q(t, o) {
	return {
		...o,
		type: o && o.type || t,
		toastId: qt(o)
	};
}
function W(t) {
	return (o, e) => H(o, Q(t, e));
}
function y(t, o) {
	return H(t, Q("default", o));
}
y.loading = (t, o) => H(t, Q("default", {
	isLoading: !0,
	autoClose: !1,
	closeOnClick: !1,
	closeButton: !1,
	draggable: !1,
	...o
}));
function Kt(t, { pending: o, error: e, success: r }, a) {
	let l;
	o && (l = N(o) ? y.loading(o, a) : y.loading(o.render, {
		...a,
		...o
	}));
	let s = {
		isLoading: null,
		autoClose: null,
		closeOnClick: null,
		closeButton: null,
		draggable: null
	}, f = (T, g, v) => {
		if (g == null) {
			y.dismiss(l);
			return;
		}
		let x = {
			type: T,
			...s,
			...a,
			data: v
		}, C = N(g) ? { render: g } : g;
		return l ? y.update(l, {
			...x,
			...C
		}) : y(C.render, {
			...x,
			...C
		}), v;
	}, c = P(t) ? t() : t;
	return c.then((T) => f("success", r, T)).catch((T) => f("error", e, T)), c;
}
y.promise = Kt;
y.success = W("success");
y.info = W("info");
y.error = W("error");
y.warning = W("warning");
y.warn = y.warning;
y.dark = (t, o) => H(t, Q("default", {
	theme: "dark",
	...o
}));
function Yt(t) {
	xt(t);
}
y.dismiss = Yt;
y.clearWaitingQueue = Et;
y.isActive = X;
y.update = (t, o = {}) => {
	let e = Ct(t, o);
	if (e) {
		let { props: r, content: a } = e, l = {
			delay: 100,
			...r,
			...o,
			toastId: o.toastId || t,
			updateId: st()
		};
		l.toastId !== t && (l.staleId = t);
		let s = l.render || a;
		delete l.render, H(s, l);
	}
};
y.done = (t) => {
	y.update(t, { progress: 1 });
};
y.onChange = St;
y.play = (t) => it(!0, t);
y.pause = (t) => it(!1, t);
function kt(t) {
	var s;
	let { subscribe: o, getSnapshot: e, setProps: r } = (0, import_react.useRef)(It(t)).current;
	r(t);
	let a = (s = (0, import_react.useSyncExternalStore)(o, e, e)) == null ? void 0 : s.slice();
	function l(f) {
		if (!a) return [];
		let c = /* @__PURE__ */ new Map();
		return t.newestOnTop && a.reverse(), a.forEach((T) => {
			let { position: g } = T.props;
			c.has(g) || c.set(g, []), c.get(g).push(T);
		}), Array.from(c, (T) => f(T[0], T[1]));
	}
	return {
		getToastToRender: l,
		isToastActive: X,
		count: a == null ? void 0 : a.length
	};
}
function Nt(t) {
	let [o, e] = (0, import_react.useState)(!1), [r, a] = (0, import_react.useState)(!1), l = (0, import_react.useRef)(null), s = (0, import_react.useRef)({
		start: 0,
		delta: 0,
		removalDistance: 0,
		canCloseOnClick: !0,
		canDrag: !1,
		didMove: !1
	}).current, { autoClose: f, pauseOnHover: c, closeToast: T, onClick: g, closeOnClick: v } = t;
	Pt({
		id: t.toastId,
		containerId: t.containerId,
		fn: e
	}), (0, import_react.useEffect)(() => {
		if (t.pauseOnFocusLoss) return x(), () => {
			C();
		};
	}, [t.pauseOnFocusLoss]);
	function x() {
		document.hasFocus() || p(), window.addEventListener("focus", d), window.addEventListener("blur", p);
	}
	function C() {
		window.removeEventListener("focus", d), window.removeEventListener("blur", p);
	}
	function S(m) {
		if (t.draggable === !0 || t.draggable === m.pointerType) {
			b();
			let _ = l.current;
			s.canCloseOnClick = !0, s.canDrag = !0, _.style.transition = "none", t.draggableDirection === "x" ? (s.start = m.clientX, s.removalDistance = _.offsetWidth * (t.draggablePercent / 100)) : (s.start = m.clientY, s.removalDistance = _.offsetHeight * (t.draggablePercent === 80 ? t.draggablePercent * 1.5 : t.draggablePercent) / 100);
		}
	}
	function E(m) {
		let { top: _, bottom: k, left: D, right: A } = l.current.getBoundingClientRect();
		m.pointerType === "mouse" && t.pauseOnHover && m.clientX >= D && m.clientX <= A && m.clientY >= _ && m.clientY <= k ? p() : d();
	}
	function d() {
		e(!0);
	}
	function p() {
		e(!1);
	}
	function b() {
		s.didMove = !1, document.addEventListener("pointermove", n), document.addEventListener("pointerup", u);
	}
	function i() {
		document.removeEventListener("pointermove", n), document.removeEventListener("pointerup", u);
	}
	function n(m) {
		let _ = l.current;
		if (s.canDrag && _) {
			s.didMove = !0, o && p(), t.draggableDirection === "x" ? s.delta = m.clientX - s.start : s.delta = m.clientY - s.start, s.start !== m.clientX && (s.canCloseOnClick = !1);
			let k = t.draggableDirection === "x" ? `${s.delta}px, var(--y)` : `0, calc(${s.delta}px + var(--y))`;
			_.style.transform = `translate3d(${k},0)`, _.style.opacity = `${1 - Math.abs(s.delta / s.removalDistance)}`;
		}
	}
	function u() {
		i();
		let m = l.current;
		if (s.canDrag && s.didMove && m) {
			if (s.canDrag = !1, Math.abs(s.delta) > s.removalDistance) {
				a(!0), t.closeToast(!0), t.collapseAll();
				return;
			}
			m.style.transition = "transform 0.2s, opacity 0.2s", m.style.removeProperty("transform"), m.style.removeProperty("opacity");
		}
	}
	let h = {
		onPointerDown: S,
		onPointerUp: E
	};
	return f && c && (h.onMouseEnter = p, t.stacked || (h.onMouseLeave = d)), v && (h.onClick = (m) => {
		g && g(m), s.canCloseOnClick && T(!0);
	}), {
		playToast: d,
		pauseToast: p,
		isRunning: o,
		preventExitTransition: r,
		toastRef: l,
		eventHandlers: h
	};
}
var G = typeof window != "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var K = ({ theme: t, type: o, isLoading: e, ...r }) => import_react.createElement("svg", {
	viewBox: "0 0 24 24",
	width: "100%",
	height: "100%",
	fill: t === "colored" ? "currentColor" : `var(--toastify-icon-color-${o})`,
	...r
});
function ro(t) {
	return import_react.createElement(K, { ...t }, import_react.createElement("path", { d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z" }));
}
function no(t) {
	return import_react.createElement(K, { ...t }, import_react.createElement("path", { d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z" }));
}
function io(t) {
	return import_react.createElement(K, { ...t }, import_react.createElement("path", { d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z" }));
}
function lo(t) {
	return import_react.createElement(K, { ...t }, import_react.createElement("path", { d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z" }));
}
function fo() {
	return import_react.createElement("div", { className: "Toastify__spinner" });
}
var q = {
	info: no,
	warning: ro,
	success: io,
	error: lo,
	spinner: fo
}, co = (t) => t in q;
function wt({ theme: t, type: o, isLoading: e, icon: r }) {
	let a = null, l = {
		theme: t,
		type: o
	};
	return r === !1 || (P(r) ? a = r({
		...l,
		isLoading: e
	}) : (0, import_react.isValidElement)(r) ? a = (0, import_react.cloneElement)(r, l) : e ? a = q.spinner() : co(o) && (a = q[o](l))), a;
}
var Dt = (t) => {
	let { isRunning: o, preventExitTransition: e, toastRef: r, eventHandlers: a, playToast: l } = Nt(t), { closeButton: s, children: f, autoClose: c, onClick: T, type: g, hideProgressBar: v, closeToast: x, transition: C, position: S, className: E, style: d, progressClassName: p, updateId: b, role: i, progress: n, rtl: u, toastId: h, deleteToast: m, isIn: _, isLoading: k, closeOnClick: D, theme: A, ariaLabel: B } = t, M = clsx("Toastify__toast", `Toastify__toast-theme--${A}`, `Toastify__toast--${g}`, { ["Toastify__toast--rtl"]: u }, { ["Toastify__toast--close-on-click"]: D }), $ = P(E) ? E({
		rtl: u,
		position: S,
		type: g,
		defaultClassName: M
	}) : clsx(M, E), mt = wt(t), pt = !!n || !c, Z = {
		closeToast: x,
		type: g,
		theme: A
	}, V = null;
	return s === !1 || (P(s) ? V = s(Z) : (0, import_react.isValidElement)(s) ? V = (0, import_react.cloneElement)(s, Z) : V = gt(Z)), import_react.createElement(C, {
		isIn: _,
		done: m,
		position: S,
		preventExitTransition: e,
		nodeRef: r,
		playToast: l
	}, import_react.createElement("div", {
		id: h,
		tabIndex: 0,
		onClick: T,
		"data-in": _,
		className: $,
		...a,
		style: d,
		ref: r,
		..._ && {
			role: i,
			"aria-label": B
		}
	}, mt != null && import_react.createElement("div", { className: clsx("Toastify__toast-icon", { ["Toastify--animate-icon Toastify__zoom-enter"]: !k }) }, mt), ot(f, t, !o), V, !t.customProgressBar && import_react.createElement(bt, {
		...b && !pt ? { key: `p-${b}` } : {},
		rtl: u,
		theme: A,
		delay: c,
		isRunning: o,
		isIn: _,
		closeToast: x,
		hide: v,
		type: g,
		className: p,
		controlledProgress: pt,
		progress: n || 0
	})));
}, j$1 = (t, o = !1) => ({
	enter: `Toastify--animate Toastify__${t}-enter`,
	exit: `Toastify--animate Toastify__${t}-exit`,
	appendPosition: o
}), ft = R(j$1("bounce", !0));
R(j$1("slide", !0));
R(j$1("zoom"));
R(j$1("flip"));
var vo = {
	position: "top-right",
	transition: ft,
	autoClose: 5e3,
	closeButton: !0,
	pauseOnHover: !0,
	pauseOnFocusLoss: !0,
	draggable: "touch",
	draggablePercent: 80,
	draggableDirection: "x",
	role: "alert",
	theme: "light",
	"aria-label": "Notifications Alt+T",
	hotKeys: (t) => t.altKey && t.code === "KeyT"
};
function dt(t) {
	let o = {
		...vo,
		...t
	}, e = t.stacked, [r, a] = (0, import_react.useState)(!0), l = (0, import_react.useRef)(null), { getToastToRender: s, isToastActive: f, count: c } = kt(o), { className: T, style: g, rtl: v, containerId: x, hotKeys: C } = o;
	function S(d) {
		let p = clsx("Toastify__toast-container", `Toastify__toast-container--${d}`, { ["Toastify__toast-container--rtl"]: v });
		return P(T) ? T({
			position: d,
			rtl: v,
			defaultClassName: p
		}) : clsx(p, z(T));
	}
	function E() {
		e && (a(!0), y.play());
	}
	return G(() => {
		var d;
		if (e) {
			let p = l.current.querySelectorAll("[data-in=\"true\"]"), b = 12, i = (d = o.position) == null ? void 0 : d.includes("top"), n = 0, u = 0;
			Array.from(p).reverse().forEach((h, m) => {
				let _ = h;
				_.classList.add("Toastify__toast--stacked"), m > 0 && (_.dataset.collapsed = `${r}`), _.dataset.pos || (_.dataset.pos = i ? "top" : "bot");
				let k = n * (r ? .2 : 1) + (r ? 0 : b * m), D = Math.max(.5, 1 - (r ? u : 0));
				_.style.setProperty("--y", `${i ? k : k * -1}px`), _.style.setProperty("--g", `${b}`), _.style.setProperty("--s", `${D}`), n += _.offsetHeight, u += .025;
			});
		}
	}, [
		r,
		c,
		e
	]), (0, import_react.useEffect)(() => {
		function d(p) {
			var i;
			let b = l.current;
			C(p) && ((i = b == null ? void 0 : b.querySelector("[tabIndex=\"0\"]")) == null || i.focus(), a(!1), y.pause()), p.key === "Escape" && (document.activeElement === b || b != null && b.contains(document.activeElement)) && (a(!0), y.play());
		}
		return document.addEventListener("keydown", d), () => {
			document.removeEventListener("keydown", d);
		};
	}, [C]), import_react.createElement("section", {
		ref: l,
		className: "Toastify",
		id: x,
		onMouseEnter: () => {
			e && (a(!1), y.pause());
		},
		onMouseLeave: E,
		"aria-live": "polite",
		"aria-atomic": "false",
		"aria-relevant": "additions text",
		"aria-label": o["aria-label"]
	}, s((d, p) => {
		let b = p.length ? { ...g } : {
			...g,
			pointerEvents: "none"
		};
		return import_react.createElement("div", {
			tabIndex: -1,
			className: S(d),
			"data-stacked": e,
			style: b,
			key: `c-${d}`
		}, p.map(({ content: i, props: n }) => import_react.createElement(Dt, {
			...n,
			stacked: e,
			collapseAll: E,
			isIn: f(n.toastId, n.containerId),
			key: `t-${n.key}`
		}, i)));
	}));
}
var Mt = `:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;
var $t = /* @__PURE__ */ new Map(), Rt = (t, o) => {
	G(() => {
		if (!t || typeof document == "undefined") return;
		let e = document, r = $t.get(e);
		if (r) {
			o && r.setAttribute("nonce", o);
			return;
		}
		let a = e.createElement("style");
		a.textContent = t, o && a.setAttribute("nonce", o), e.head.appendChild(a), $t.set(e, a);
	}, [o]);
};
function xo(t) {
	return Rt(Mt, t.nonce), import_react.createElement(dt, { ...t });
}
//#endregion
//#region node_modules/react-select/dist/useStateManager-7e1e8489.esm.js
var _excluded$6 = [
	"defaultInputValue",
	"defaultMenuIsOpen",
	"defaultValue",
	"inputValue",
	"menuIsOpen",
	"onChange",
	"onInputChange",
	"onMenuClose",
	"onMenuOpen",
	"value"
];
function useStateManager(_ref) {
	var _ref$defaultInputValu = _ref.defaultInputValue, defaultInputValue = _ref$defaultInputValu === void 0 ? "" : _ref$defaultInputValu, _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen, defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe, _ref$defaultValue = _ref.defaultValue, defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue, propsInputValue = _ref.inputValue, propsMenuIsOpen = _ref.menuIsOpen, propsOnChange = _ref.onChange, propsOnInputChange = _ref.onInputChange, propsOnMenuClose = _ref.onMenuClose, propsOnMenuOpen = _ref.onMenuOpen, propsValue = _ref.value, restSelectProps = _objectWithoutProperties$1(_ref, _excluded$6);
	var _useState2 = _slicedToArray((0, import_react.useState)(propsInputValue !== void 0 ? propsInputValue : defaultInputValue), 2), stateInputValue = _useState2[0], setStateInputValue = _useState2[1];
	var _useState4 = _slicedToArray((0, import_react.useState)(propsMenuIsOpen !== void 0 ? propsMenuIsOpen : defaultMenuIsOpen), 2), stateMenuIsOpen = _useState4[0], setStateMenuIsOpen = _useState4[1];
	var _useState6 = _slicedToArray((0, import_react.useState)(propsValue !== void 0 ? propsValue : defaultValue), 2), stateValue = _useState6[0], setStateValue = _useState6[1];
	var onChange = (0, import_react.useCallback)(function(value, actionMeta) {
		if (typeof propsOnChange === "function") propsOnChange(value, actionMeta);
		setStateValue(value);
	}, [propsOnChange]);
	var onInputChange = (0, import_react.useCallback)(function(value, actionMeta) {
		var newValue;
		if (typeof propsOnInputChange === "function") newValue = propsOnInputChange(value, actionMeta);
		setStateInputValue(newValue !== void 0 ? newValue : value);
	}, [propsOnInputChange]);
	var onMenuOpen = (0, import_react.useCallback)(function() {
		if (typeof propsOnMenuOpen === "function") propsOnMenuOpen();
		setStateMenuIsOpen(true);
	}, [propsOnMenuOpen]);
	var onMenuClose = (0, import_react.useCallback)(function() {
		if (typeof propsOnMenuClose === "function") propsOnMenuClose();
		setStateMenuIsOpen(false);
	}, [propsOnMenuClose]);
	var inputValue = propsInputValue !== void 0 ? propsInputValue : stateInputValue;
	var menuIsOpen = propsMenuIsOpen !== void 0 ? propsMenuIsOpen : stateMenuIsOpen;
	var value = propsValue !== void 0 ? propsValue : stateValue;
	return _objectSpread2(_objectSpread2({}, restSelectProps), {}, {
		inputValue,
		menuIsOpen,
		onChange,
		onInputChange,
		onMenuClose,
		onMenuOpen,
		value
	});
}
//#endregion
//#region node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js
/** @license React v17.0.2
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var b = 60103, c = 60106, d = 60107, e = 60108, f = 60114, g = 60109, h = 60110, k = 60112, l = 60113, m = 60120, n = 60115, p = 60116, q = 60121, r = 60122, u = 60117, v = 60129, w = 60131;
	if ("function" === typeof Symbol && Symbol.for) {
		var x = Symbol.for;
		b = x("react.element");
		c = x("react.portal");
		d = x("react.fragment");
		e = x("react.strict_mode");
		f = x("react.profiler");
		g = x("react.provider");
		h = x("react.context");
		k = x("react.forward_ref");
		l = x("react.suspense");
		m = x("react.suspense_list");
		n = x("react.memo");
		p = x("react.lazy");
		q = x("react.block");
		r = x("react.server.block");
		u = x("react.fundamental");
		v = x("react.debug_trace_mode");
		w = x("react.legacy_hidden");
	}
	function y(a) {
		if ("object" === typeof a && null !== a) {
			var t = a.$$typeof;
			switch (t) {
				case b: switch (a = a.type, a) {
					case d:
					case f:
					case e:
					case l:
					case m: return a;
					default: switch (a = a && a.$$typeof, a) {
						case h:
						case k:
						case p:
						case n:
						case g: return a;
						default: return t;
					}
				}
				case c: return t;
			}
		}
	}
	var z = g, A = b, B = k, C = d, D = p, E = n, F = c, G = f, H = e, I = l;
	exports.ContextConsumer = h;
	exports.ContextProvider = z;
	exports.Element = A;
	exports.ForwardRef = B;
	exports.Fragment = C;
	exports.Lazy = D;
	exports.Memo = E;
	exports.Portal = F;
	exports.Profiler = G;
	exports.StrictMode = H;
	exports.Suspense = I;
	exports.isAsyncMode = function() {
		return !1;
	};
	exports.isConcurrentMode = function() {
		return !1;
	};
	exports.isContextConsumer = function(a) {
		return y(a) === h;
	};
	exports.isContextProvider = function(a) {
		return y(a) === g;
	};
	exports.isElement = function(a) {
		return "object" === typeof a && null !== a && a.$$typeof === b;
	};
	exports.isForwardRef = function(a) {
		return y(a) === k;
	};
	exports.isFragment = function(a) {
		return y(a) === d;
	};
	exports.isLazy = function(a) {
		return y(a) === p;
	};
	exports.isMemo = function(a) {
		return y(a) === n;
	};
	exports.isPortal = function(a) {
		return y(a) === c;
	};
	exports.isProfiler = function(a) {
		return y(a) === f;
	};
	exports.isStrictMode = function(a) {
		return y(a) === e;
	};
	exports.isSuspense = function(a) {
		return y(a) === l;
	};
	exports.isValidElementType = function(a) {
		return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e || a === l || a === m || a === w || "object" === typeof a && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? !0 : !1;
	};
	exports.typeOf = y;
}));
//#endregion
//#region node_modules/hoist-non-react-statics/node_modules/react-is/index.js
var require_react_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_is_production_min();
}));
//#endregion
//#region node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reactIs = require_react_is();
	/**
	* Copyright 2015, Yahoo! Inc.
	* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	*/
	var REACT_STATICS = {
		childContextTypes: true,
		contextType: true,
		contextTypes: true,
		defaultProps: true,
		displayName: true,
		getDefaultProps: true,
		getDerivedStateFromError: true,
		getDerivedStateFromProps: true,
		mixins: true,
		propTypes: true,
		type: true
	};
	var KNOWN_STATICS = {
		name: true,
		length: true,
		prototype: true,
		caller: true,
		callee: true,
		arguments: true,
		arity: true
	};
	var FORWARD_REF_STATICS = {
		"$$typeof": true,
		render: true,
		defaultProps: true,
		displayName: true,
		propTypes: true
	};
	var MEMO_STATICS = {
		"$$typeof": true,
		compare: true,
		defaultProps: true,
		displayName: true,
		propTypes: true,
		type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
	function getStatics(component) {
		if (reactIs.isMemo(component)) return MEMO_STATICS;
		return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
	}
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
		if (typeof sourceComponent !== "string") {
			if (objectPrototype) {
				var inheritedComponent = getPrototypeOf(sourceComponent);
				if (inheritedComponent && inheritedComponent !== objectPrototype) hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
			}
			var keys = getOwnPropertyNames(sourceComponent);
			if (getOwnPropertySymbols) keys = keys.concat(getOwnPropertySymbols(sourceComponent));
			var targetStatics = getStatics(targetComponent);
			var sourceStatics = getStatics(sourceComponent);
			for (var i = 0; i < keys.length; ++i) {
				var key = keys[i];
				if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
					var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
					try {
						defineProperty(targetComponent, key, descriptor);
					} catch (e) {}
				}
			}
		}
		return targetComponent;
	}
	module.exports = hoistNonReactStatics;
}));
var EmotionCacheContext = /* @__PURE__ */ import_react.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({ key: "css" }) : null);
EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache(func) {
	return /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
		return func(props, (0, import_react.useContext)(EmotionCacheContext), ref);
	});
};
var ThemeContext = /* @__PURE__ */ import_react.createContext({});
var hasOwn = {}.hasOwnProperty;
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps(type, props) {
	var newProps = {};
	for (var _key in props) if (hasOwn.call(props, _key)) newProps[_key] = props[_key];
	newProps[typePropName] = type;
	return newProps;
};
var Insertion = function Insertion(_ref) {
	var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
	registerStyles(cache, serialized, isStringTag);
	useInsertionEffectAlwaysWithSyncFallback(function() {
		return insertStyles(cache, serialized, isStringTag);
	});
	return null;
};
var Emotion$1 = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
	var cssProp = props.css;
	if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) cssProp = cache.registered[cssProp];
	var WrappedComponent = props[typePropName];
	var registeredStyles = [cssProp];
	var className = "";
	if (typeof props.className === "string") className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
	else if (props.className != null) className = props.className + " ";
	var serialized = serializeStyles(registeredStyles, void 0, import_react.useContext(ThemeContext));
	className += cache.key + "-" + serialized.name;
	var newProps = {};
	for (var _key2 in props) if (hasOwn.call(props, _key2) && _key2 !== "css" && _key2 !== typePropName && true) newProps[_key2] = props[_key2];
	newProps.className = className;
	if (ref) newProps.ref = ref;
	return /* @__PURE__ */ import_react.createElement(import_react.Fragment, null, /* @__PURE__ */ import_react.createElement(Insertion, {
		cache,
		serialized,
		isStringTag: typeof WrappedComponent === "string"
	}), /* @__PURE__ */ import_react.createElement(WrappedComponent, newProps));
});
require_hoist_non_react_statics_cjs();
var jsx = function jsx(type, props) {
	var args = arguments;
	if (props == null || !hasOwn.call(props, "css")) return import_react.createElement.apply(void 0, args);
	var argsLength = args.length;
	var createElementArgArray = new Array(argsLength);
	createElementArgArray[0] = Emotion$1;
	createElementArgArray[1] = createEmotionProps(type, props);
	for (var i = 2; i < argsLength; i++) createElementArgArray[i] = args[i];
	return import_react.createElement.apply(null, createElementArgArray);
};
(function(_jsx) {
	var JSX;
	(function(_JSX) {})(JSX || (JSX = _jsx.JSX || (_jsx.JSX = {})));
})(jsx || (jsx = {}));
function css$2() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return serializeStyles(args);
}
function keyframes() {
	var insertable = css$2.apply(void 0, arguments);
	var name = "animation-" + insertable.name;
	return {
		name,
		styles: "@keyframes " + name + "{" + insertable.styles + "}",
		anim: 1,
		toString: function toString() {
			return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
		}
	};
}
//#endregion
//#region node_modules/react-select/dist/index-641ee5b8.esm.js
var _excluded$4 = [
	"className",
	"clearValue",
	"cx",
	"getStyles",
	"getClassNames",
	"getValue",
	"hasValue",
	"isMulti",
	"isRtl",
	"options",
	"selectOption",
	"selectProps",
	"setValue",
	"theme"
];
var noop$1 = function noop() {};
/**
String representation of component state for styling with class names.

Expects an array of strings OR a string/object pair:
- className(['comp', 'comp-arg', 'comp-arg-2'])
@returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
- className('comp', { some: true, state: false })
@returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix, name) {
	if (!name) return prefix;
	else if (name[0] === "-") return prefix + name;
	else return prefix + "__" + name;
}
function classNames(prefix, state) {
	for (var _len = arguments.length, classNameList = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) classNameList[_key - 2] = arguments[_key];
	var arr = [].concat(classNameList);
	if (state && prefix) {
		for (var key in state) if (state.hasOwnProperty(key) && state[key]) arr.push("".concat(applyPrefixToName(prefix, key)));
	}
	return arr.filter(function(i) {
		return i;
	}).map(function(i) {
		return String(i).trim();
	}).join(" ");
}
var cleanValue = function cleanValue(value) {
	if (isArray(value)) return value.filter(Boolean);
	if (_typeof(value) === "object" && value !== null) return [value];
	return [];
};
var cleanCommonProps = function cleanCommonProps(props) {
	props.className;
	props.clearValue;
	props.cx;
	props.getStyles;
	props.getClassNames;
	props.getValue;
	props.hasValue;
	props.isMulti;
	props.isRtl;
	props.options;
	props.selectOption;
	props.selectProps;
	props.setValue;
	props.theme;
	return _objectSpread2({}, _objectWithoutProperties$1(props, _excluded$4));
};
var getStyleProps = function getStyleProps(props, name, classNamesState) {
	var cx = props.cx, getStyles = props.getStyles, getClassNames = props.getClassNames, className = props.className;
	return {
		css: getStyles(name, props),
		className: cx(classNamesState !== null && classNamesState !== void 0 ? classNamesState : {}, getClassNames(name, props), className)
	};
};
function isDocumentElement(el) {
	return [
		document.documentElement,
		document.body,
		window
	].indexOf(el) > -1;
}
function normalizedHeight(el) {
	if (isDocumentElement(el)) return window.innerHeight;
	return el.clientHeight;
}
function getScrollTop(el) {
	if (isDocumentElement(el)) return window.pageYOffset;
	return el.scrollTop;
}
function scrollTo(el, top) {
	if (isDocumentElement(el)) {
		window.scrollTo(0, top);
		return;
	}
	el.scrollTop = top;
}
function getScrollParent(element) {
	var style = getComputedStyle(element);
	var excludeStaticParent = style.position === "absolute";
	var overflowRx = /(auto|scroll)/;
	if (style.position === "fixed") return document.documentElement;
	for (var parent = element; parent = parent.parentElement;) {
		style = getComputedStyle(parent);
		if (excludeStaticParent && style.position === "static") continue;
		if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) return parent;
	}
	return document.documentElement;
}
/**
@param t: time (elapsed)
@param b: initial value
@param c: amount of change
@param d: duration
*/
function easeOutCubic(t, b, c, d) {
	return c * ((t = t / d - 1) * t * t + 1) + b;
}
function animatedScrollTo(element, to) {
	var duration = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 200;
	var callback = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : noop$1;
	var start = getScrollTop(element);
	var change = to - start;
	var increment = 10;
	var currentTime = 0;
	function animateScroll() {
		currentTime += increment;
		scrollTo(element, easeOutCubic(currentTime, start, change, duration));
		if (currentTime < duration) window.requestAnimationFrame(animateScroll);
		else callback(element);
	}
	animateScroll();
}
function scrollIntoView(menuEl, focusedEl) {
	var menuRect = menuEl.getBoundingClientRect();
	var focusedRect = focusedEl.getBoundingClientRect();
	var overScroll = focusedEl.offsetHeight / 3;
	if (focusedRect.bottom + overScroll > menuRect.bottom) scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
	else if (focusedRect.top - overScroll < menuRect.top) scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
}
function getBoundingClientObj(element) {
	var rect = element.getBoundingClientRect();
	return {
		bottom: rect.bottom,
		height: rect.height,
		left: rect.left,
		right: rect.right,
		top: rect.top,
		width: rect.width
	};
}
function isTouchCapable() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}
function isMobileDevice() {
	try {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	} catch (e) {
		return false;
	}
}
var passiveOptionAccessed = false;
var options = { get passive() {
	return passiveOptionAccessed = true;
} };
var w = typeof window !== "undefined" ? window : {};
if (w.addEventListener && w.removeEventListener) {
	w.addEventListener("p", noop$1, options);
	w.removeEventListener("p", noop$1, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
	return item != null;
}
function isArray(arg) {
	return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
	return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
	return singleValue;
}
function multiValueAsValue(multiValue) {
	return multiValue;
}
var removeProps = function removeProps(propsObj) {
	for (var _len2 = arguments.length, properties = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) properties[_key2 - 1] = arguments[_key2];
	return Object.entries(propsObj).filter(function(_ref) {
		var key = _slicedToArray(_ref, 1)[0];
		return !properties.includes(key);
	}).reduce(function(newProps, _ref3) {
		var _ref4 = _slicedToArray(_ref3, 2), key = _ref4[0];
		newProps[key] = _ref4[1];
		return newProps;
	}, {});
};
var _excluded$3 = ["children", "innerProps"], _excluded2$1 = ["children", "innerProps"];
function getMenuPlacement(_ref) {
	var preferredMaxHeight = _ref.maxHeight, menuEl = _ref.menuEl, minHeight = _ref.minHeight, preferredPlacement = _ref.placement, shouldScroll = _ref.shouldScroll, isFixedPosition = _ref.isFixedPosition, controlHeight = _ref.controlHeight;
	var scrollParent = getScrollParent(menuEl);
	var defaultState = {
		placement: "bottom",
		maxHeight: preferredMaxHeight
	};
	if (!menuEl || !menuEl.offsetParent) return defaultState;
	var scrollHeight = scrollParent.getBoundingClientRect().height;
	var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(), menuBottom = _menuEl$getBoundingCl.bottom, menuHeight = _menuEl$getBoundingCl.height, menuTop = _menuEl$getBoundingCl.top;
	var containerTop = menuEl.offsetParent.getBoundingClientRect().top;
	var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
	var scrollTop = getScrollTop(scrollParent);
	var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
	var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
	var viewSpaceAbove = containerTop - marginTop;
	var viewSpaceBelow = viewHeight - menuTop;
	var scrollSpaceAbove = viewSpaceAbove + scrollTop;
	var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
	var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
	var scrollUp = scrollTop + menuTop - marginTop;
	var scrollDuration = 160;
	switch (preferredPlacement) {
		case "auto":
		case "bottom":
			if (viewSpaceBelow >= menuHeight) return {
				placement: "bottom",
				maxHeight: preferredMaxHeight
			};
			if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
				if (shouldScroll) animatedScrollTo(scrollParent, scrollDown, scrollDuration);
				return {
					placement: "bottom",
					maxHeight: preferredMaxHeight
				};
			}
			if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
				if (shouldScroll) animatedScrollTo(scrollParent, scrollDown, scrollDuration);
				return {
					placement: "bottom",
					maxHeight: isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom
				};
			}
			if (preferredPlacement === "auto" || isFixedPosition) {
				var _constrainedHeight = preferredMaxHeight;
				var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
				if (spaceAbove >= minHeight) _constrainedHeight = Math.min(spaceAbove - marginBottom - controlHeight, preferredMaxHeight);
				return {
					placement: "top",
					maxHeight: _constrainedHeight
				};
			}
			if (preferredPlacement === "bottom") {
				if (shouldScroll) scrollTo(scrollParent, scrollDown);
				return {
					placement: "bottom",
					maxHeight: preferredMaxHeight
				};
			}
			break;
		case "top":
			if (viewSpaceAbove >= menuHeight) return {
				placement: "top",
				maxHeight: preferredMaxHeight
			};
			if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
				if (shouldScroll) animatedScrollTo(scrollParent, scrollUp, scrollDuration);
				return {
					placement: "top",
					maxHeight: preferredMaxHeight
				};
			}
			if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
				var _constrainedHeight2 = preferredMaxHeight;
				if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
				if (shouldScroll) animatedScrollTo(scrollParent, scrollUp, scrollDuration);
				return {
					placement: "top",
					maxHeight: _constrainedHeight2
				};
			}
			return {
				placement: "bottom",
				maxHeight: preferredMaxHeight
			};
		default: throw new Error("Invalid placement provided \"".concat(preferredPlacement, "\"."));
	}
	return defaultState;
}
function alignToControl(placement) {
	return placement ? {
		bottom: "top",
		top: "bottom"
	}[placement] : "bottom";
}
var coercePlacement = function coercePlacement(p) {
	return p === "auto" ? "bottom" : p;
};
var menuCSS = function menuCSS(_ref2, unstyled) {
	var _objectSpread2$1;
	var placement = _ref2.placement, _ref2$theme = _ref2.theme, borderRadius = _ref2$theme.borderRadius, spacing = _ref2$theme.spacing, colors = _ref2$theme.colors;
	return _objectSpread2((_objectSpread2$1 = { label: "menu" }, _defineProperty$1(_objectSpread2$1, alignToControl(placement), "100%"), _defineProperty$1(_objectSpread2$1, "position", "absolute"), _defineProperty$1(_objectSpread2$1, "width", "100%"), _defineProperty$1(_objectSpread2$1, "zIndex", 1), _objectSpread2$1), unstyled ? {} : {
		backgroundColor: colors.neutral0,
		borderRadius,
		boxShadow: "0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)",
		marginBottom: spacing.menuGutter,
		marginTop: spacing.menuGutter
	});
};
var PortalPlacementContext = /* @__PURE__ */ (0, import_react.createContext)(null);
var MenuPlacer = function MenuPlacer(props) {
	var children = props.children, minMenuHeight = props.minMenuHeight, maxMenuHeight = props.maxMenuHeight, menuPlacement = props.menuPlacement, menuPosition = props.menuPosition, menuShouldScrollIntoView = props.menuShouldScrollIntoView, theme = props.theme;
	var setPortalPlacement = ((0, import_react.useContext)(PortalPlacementContext) || {}).setPortalPlacement;
	var ref = (0, import_react.useRef)(null);
	var _useState2 = _slicedToArray((0, import_react.useState)(maxMenuHeight), 2), maxHeight = _useState2[0], setMaxHeight = _useState2[1];
	var _useState4 = _slicedToArray((0, import_react.useState)(null), 2), placement = _useState4[0], setPlacement = _useState4[1];
	var controlHeight = theme.spacing.controlHeight;
	index(function() {
		var menuEl = ref.current;
		if (!menuEl) return;
		var isFixedPosition = menuPosition === "fixed";
		var state = getMenuPlacement({
			maxHeight: maxMenuHeight,
			menuEl,
			minHeight: minMenuHeight,
			placement: menuPlacement,
			shouldScroll: menuShouldScrollIntoView && !isFixedPosition,
			isFixedPosition,
			controlHeight
		});
		setMaxHeight(state.maxHeight);
		setPlacement(state.placement);
		setPortalPlacement === null || setPortalPlacement === void 0 || setPortalPlacement(state.placement);
	}, [
		maxMenuHeight,
		menuPlacement,
		menuPosition,
		menuShouldScrollIntoView,
		minMenuHeight,
		setPortalPlacement,
		controlHeight
	]);
	return children({
		ref,
		placerProps: _objectSpread2(_objectSpread2({}, props), {}, {
			placement: placement || coercePlacement(menuPlacement),
			maxHeight
		})
	});
};
var Menu$1 = function Menu(props) {
	var children = props.children, innerRef = props.innerRef, innerProps = props.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "menu", { menu: true }), { ref: innerRef }, innerProps), children);
};
var menuListCSS = function menuListCSS(_ref4, unstyled) {
	var maxHeight = _ref4.maxHeight, baseUnit = _ref4.theme.spacing.baseUnit;
	return _objectSpread2({
		maxHeight,
		overflowY: "auto",
		position: "relative",
		WebkitOverflowScrolling: "touch"
	}, unstyled ? {} : {
		paddingBottom: baseUnit,
		paddingTop: baseUnit
	});
};
var MenuList = function MenuList(props) {
	var children = props.children, innerProps = props.innerProps, innerRef = props.innerRef, isMulti = props.isMulti;
	return jsx("div", _extends$3({}, getStyleProps(props, "menuList", {
		"menu-list": true,
		"menu-list--is-multi": isMulti
	}), { ref: innerRef }, innerProps), children);
};
var noticeCSS = function noticeCSS(_ref5, unstyled) {
	var _ref5$theme = _ref5.theme, baseUnit = _ref5$theme.spacing.baseUnit, colors = _ref5$theme.colors;
	return _objectSpread2({ textAlign: "center" }, unstyled ? {} : {
		color: colors.neutral40,
		padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px")
	});
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(_ref6) {
	var _ref6$children = _ref6.children, children = _ref6$children === void 0 ? "No options" : _ref6$children, innerProps = _ref6.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(_objectSpread2(_objectSpread2({}, _objectWithoutProperties$1(_ref6, _excluded$3)), {}, {
		children,
		innerProps
	}), "noOptionsMessage", {
		"menu-notice": true,
		"menu-notice--no-options": true
	}), innerProps), children);
};
var LoadingMessage = function LoadingMessage(_ref7) {
	var _ref7$children = _ref7.children, children = _ref7$children === void 0 ? "Loading..." : _ref7$children, innerProps = _ref7.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(_objectSpread2(_objectSpread2({}, _objectWithoutProperties$1(_ref7, _excluded2$1)), {}, {
		children,
		innerProps
	}), "loadingMessage", {
		"menu-notice": true,
		"menu-notice--loading": true
	}), innerProps), children);
};
var menuPortalCSS = function menuPortalCSS(_ref8) {
	var rect = _ref8.rect, offset = _ref8.offset, position = _ref8.position;
	return {
		left: rect.left,
		position,
		top: offset,
		width: rect.width,
		zIndex: 1
	};
};
var MenuPortal = function MenuPortal(props) {
	var appendTo = props.appendTo, children = props.children, controlElement = props.controlElement, innerProps = props.innerProps, menuPlacement = props.menuPlacement, menuPosition = props.menuPosition;
	var menuPortalRef = (0, import_react.useRef)(null);
	var cleanupRef = (0, import_react.useRef)(null);
	var _useState6 = _slicedToArray((0, import_react.useState)(coercePlacement(menuPlacement)), 2), placement = _useState6[0], setPortalPlacement = _useState6[1];
	var portalPlacementContext = (0, import_react.useMemo)(function() {
		return { setPortalPlacement };
	}, []);
	var _useState8 = _slicedToArray((0, import_react.useState)(null), 2), computedPosition = _useState8[0], setComputedPosition = _useState8[1];
	var updateComputedPosition = (0, import_react.useCallback)(function() {
		if (!controlElement) return;
		var rect = getBoundingClientObj(controlElement);
		var scrollDistance = menuPosition === "fixed" ? 0 : window.pageYOffset;
		var offset = rect[placement] + scrollDistance;
		if (offset !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) || rect.left !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) || rect.width !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)) setComputedPosition({
			offset,
			rect
		});
	}, [
		controlElement,
		menuPosition,
		placement,
		computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset,
		computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left,
		computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width
	]);
	index(function() {
		updateComputedPosition();
	}, [updateComputedPosition]);
	var runAutoUpdate = (0, import_react.useCallback)(function() {
		if (typeof cleanupRef.current === "function") {
			cleanupRef.current();
			cleanupRef.current = null;
		}
		if (controlElement && menuPortalRef.current) cleanupRef.current = autoUpdate(controlElement, menuPortalRef.current, updateComputedPosition, { elementResize: "ResizeObserver" in window });
	}, [controlElement, updateComputedPosition]);
	index(function() {
		runAutoUpdate();
	}, [runAutoUpdate]);
	var setMenuPortalElement = (0, import_react.useCallback)(function(menuPortalElement) {
		menuPortalRef.current = menuPortalElement;
		runAutoUpdate();
	}, [runAutoUpdate]);
	if (!appendTo && menuPosition !== "fixed" || !computedPosition) return null;
	var menuWrapper = jsx("div", _extends$3({ ref: setMenuPortalElement }, getStyleProps(_objectSpread2(_objectSpread2({}, props), {}, {
		offset: computedPosition.offset,
		position: menuPosition,
		rect: computedPosition.rect
	}), "menuPortal", { "menu-portal": true }), innerProps), children);
	return jsx(PortalPlacementContext.Provider, { value: portalPlacementContext }, appendTo ? /* @__PURE__ */ (0, import_react_dom.createPortal)(menuWrapper, appendTo) : menuWrapper);
};
var containerCSS = function containerCSS(_ref) {
	var isDisabled = _ref.isDisabled;
	return {
		label: "container",
		direction: _ref.isRtl ? "rtl" : void 0,
		pointerEvents: isDisabled ? "none" : void 0,
		position: "relative"
	};
};
var SelectContainer = function SelectContainer(props) {
	var children = props.children, innerProps = props.innerProps, isDisabled = props.isDisabled, isRtl = props.isRtl;
	return jsx("div", _extends$3({}, getStyleProps(props, "container", {
		"--is-disabled": isDisabled,
		"--is-rtl": isRtl
	}), innerProps), children);
};
var valueContainerCSS = function valueContainerCSS(_ref2, unstyled) {
	var spacing = _ref2.theme.spacing, isMulti = _ref2.isMulti, hasValue = _ref2.hasValue, controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
	return _objectSpread2({
		alignItems: "center",
		display: isMulti && hasValue && controlShouldRenderValue ? "flex" : "grid",
		flex: 1,
		flexWrap: "wrap",
		WebkitOverflowScrolling: "touch",
		position: "relative",
		overflow: "hidden"
	}, unstyled ? {} : { padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px") });
};
var ValueContainer = function ValueContainer(props) {
	var children = props.children, innerProps = props.innerProps, isMulti = props.isMulti, hasValue = props.hasValue;
	return jsx("div", _extends$3({}, getStyleProps(props, "valueContainer", {
		"value-container": true,
		"value-container--is-multi": isMulti,
		"value-container--has-value": hasValue
	}), innerProps), children);
};
var indicatorsContainerCSS = function indicatorsContainerCSS() {
	return {
		alignItems: "center",
		alignSelf: "stretch",
		display: "flex",
		flexShrink: 0
	};
};
var IndicatorsContainer = function IndicatorsContainer(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "indicatorsContainer", { indicators: true }), innerProps), children);
};
var _templateObject;
var _excluded$2 = ["size"], _excluded2 = [
	"innerProps",
	"isRtl",
	"size"
];
var _ref2$2 = {
	name: "8mmkcg",
	styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0"
};
var Svg = function Svg(_ref) {
	var size = _ref.size, props = _objectWithoutProperties$1(_ref, _excluded$2);
	return jsx("svg", _extends$3({
		height: size,
		width: size,
		viewBox: "0 0 20 20",
		"aria-hidden": "true",
		focusable: "false",
		css: _ref2$2
	}, props));
};
var CrossIcon = function CrossIcon(props) {
	return jsx(Svg, _extends$3({ size: 20 }, props), jsx("path", { d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" }));
};
var DownChevron = function DownChevron(props) {
	return jsx(Svg, _extends$3({ size: 20 }, props), jsx("path", { d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" }));
};
var baseCSS = function baseCSS(_ref3, unstyled) {
	var isFocused = _ref3.isFocused, _ref3$theme = _ref3.theme, baseUnit = _ref3$theme.spacing.baseUnit, colors = _ref3$theme.colors;
	return _objectSpread2({
		label: "indicatorContainer",
		display: "flex",
		transition: "color 150ms"
	}, unstyled ? {} : {
		color: isFocused ? colors.neutral60 : colors.neutral20,
		padding: baseUnit * 2,
		":hover": { color: isFocused ? colors.neutral80 : colors.neutral40 }
	});
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "dropdownIndicator", {
		indicator: true,
		"dropdown-indicator": true
	}), innerProps), children || jsx(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "clearIndicator", {
		indicator: true,
		"clear-indicator": true
	}), innerProps), children || jsx(CrossIcon, null));
};
var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4, unstyled) {
	var isDisabled = _ref4.isDisabled, _ref4$theme = _ref4.theme, baseUnit = _ref4$theme.spacing.baseUnit, colors = _ref4$theme.colors;
	return _objectSpread2({
		label: "indicatorSeparator",
		alignSelf: "stretch",
		width: 1
	}, unstyled ? {} : {
		backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
		marginBottom: baseUnit * 2,
		marginTop: baseUnit * 2
	});
};
var IndicatorSeparator = function IndicatorSeparator(props) {
	var innerProps = props.innerProps;
	return jsx("span", _extends$3({}, innerProps, getStyleProps(props, "indicatorSeparator", { "indicator-separator": true })));
};
var loadingDotAnimations = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5, unstyled) {
	var isFocused = _ref5.isFocused, size = _ref5.size, _ref5$theme = _ref5.theme, colors = _ref5$theme.colors, baseUnit = _ref5$theme.spacing.baseUnit;
	return _objectSpread2({
		label: "loadingIndicator",
		display: "flex",
		transition: "color 150ms",
		alignSelf: "center",
		fontSize: size,
		lineHeight: 1,
		marginRight: size,
		textAlign: "center",
		verticalAlign: "middle"
	}, unstyled ? {} : {
		color: isFocused ? colors.neutral60 : colors.neutral20,
		padding: baseUnit * 2
	});
};
var LoadingDot = function LoadingDot(_ref6) {
	var delay = _ref6.delay, offset = _ref6.offset;
	return jsx("span", { css: /* @__PURE__ */ css$2({
		animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
		backgroundColor: "currentColor",
		borderRadius: "1em",
		display: "inline-block",
		marginLeft: offset ? "1em" : void 0,
		height: "1em",
		verticalAlign: "top",
		width: "1em"
	}, "", "") });
};
var LoadingIndicator = function LoadingIndicator(_ref7) {
	var innerProps = _ref7.innerProps, isRtl = _ref7.isRtl, _ref7$size = _ref7.size, size = _ref7$size === void 0 ? 4 : _ref7$size;
	return jsx("div", _extends$3({}, getStyleProps(_objectSpread2(_objectSpread2({}, _objectWithoutProperties$1(_ref7, _excluded2)), {}, {
		innerProps,
		isRtl,
		size
	}), "loadingIndicator", {
		indicator: true,
		"loading-indicator": true
	}), innerProps), jsx(LoadingDot, {
		delay: 0,
		offset: isRtl
	}), jsx(LoadingDot, {
		delay: 160,
		offset: true
	}), jsx(LoadingDot, {
		delay: 320,
		offset: !isRtl
	}));
};
var css$1 = function css(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, isFocused = _ref.isFocused, _ref$theme = _ref.theme, colors = _ref$theme.colors, borderRadius = _ref$theme.borderRadius, spacing = _ref$theme.spacing;
	return _objectSpread2({
		label: "control",
		alignItems: "center",
		cursor: "default",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		minHeight: spacing.controlHeight,
		outline: "0 !important",
		position: "relative",
		transition: "all 100ms"
	}, unstyled ? {} : {
		backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
		borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
		borderRadius,
		borderStyle: "solid",
		borderWidth: 1,
		boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : void 0,
		"&:hover": { borderColor: isFocused ? colors.primary : colors.neutral30 }
	});
};
var Control$1 = function Control(props) {
	var children = props.children, isDisabled = props.isDisabled, isFocused = props.isFocused, innerRef = props.innerRef, innerProps = props.innerProps, menuIsOpen = props.menuIsOpen;
	return jsx("div", _extends$3({ ref: innerRef }, getStyleProps(props, "control", {
		control: true,
		"control--is-disabled": isDisabled,
		"control--is-focused": isFocused,
		"control--menu-is-open": menuIsOpen
	}), innerProps, { "aria-disabled": isDisabled || void 0 }), children);
};
var _excluded$1 = ["data"];
var groupCSS = function groupCSS(_ref, unstyled) {
	var spacing = _ref.theme.spacing;
	return unstyled ? {} : {
		paddingBottom: spacing.baseUnit * 2,
		paddingTop: spacing.baseUnit * 2
	};
};
var Group = function Group(props) {
	var children = props.children, cx = props.cx, getStyles = props.getStyles, getClassNames = props.getClassNames, Heading = props.Heading, headingProps = props.headingProps, innerProps = props.innerProps, label = props.label, theme = props.theme, selectProps = props.selectProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "group", { group: true }), innerProps), jsx(Heading, _extends$3({}, headingProps, {
		selectProps,
		theme,
		getStyles,
		getClassNames,
		cx
	}), label), jsx("div", null, children));
};
var groupHeadingCSS = function groupHeadingCSS(_ref2, unstyled) {
	var _ref2$theme = _ref2.theme, colors = _ref2$theme.colors, spacing = _ref2$theme.spacing;
	return _objectSpread2({
		label: "group",
		cursor: "default",
		display: "block"
	}, unstyled ? {} : {
		color: colors.neutral40,
		fontSize: "75%",
		fontWeight: 500,
		marginBottom: "0.25em",
		paddingLeft: spacing.baseUnit * 3,
		paddingRight: spacing.baseUnit * 3,
		textTransform: "uppercase"
	});
};
var GroupHeading = function GroupHeading(props) {
	var _cleanCommonProps = cleanCommonProps(props);
	_cleanCommonProps.data;
	var innerProps = _objectWithoutProperties$1(_cleanCommonProps, _excluded$1);
	return jsx("div", _extends$3({}, getStyleProps(props, "groupHeading", { "group-heading": true }), innerProps));
};
var Group$1 = Group;
var _excluded$5 = [
	"innerRef",
	"isDisabled",
	"isHidden",
	"inputClassName"
];
var inputCSS = function inputCSS(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, value = _ref.value, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2(_objectSpread2({
		visibility: isDisabled ? "hidden" : "visible",
		transform: value ? "translateZ(0)" : ""
	}, containerStyle), unstyled ? {} : {
		margin: spacing.baseUnit / 2,
		paddingBottom: spacing.baseUnit / 2,
		paddingTop: spacing.baseUnit / 2,
		color: colors.neutral80
	});
};
var spacingStyle = {
	gridArea: "1 / 2",
	font: "inherit",
	minWidth: "2px",
	border: 0,
	margin: 0,
	outline: 0,
	padding: 0
};
var containerStyle = {
	flex: "1 1 auto",
	display: "inline-grid",
	gridArea: "1 / 1 / 2 / 3",
	gridTemplateColumns: "0 min-content",
	"&:after": _objectSpread2({
		content: "attr(data-value) \" \"",
		visibility: "hidden",
		whiteSpace: "pre"
	}, spacingStyle)
};
var inputStyle = function inputStyle(isHidden) {
	return _objectSpread2({
		label: "input",
		color: "inherit",
		background: 0,
		opacity: isHidden ? 0 : 1,
		width: "100%"
	}, spacingStyle);
};
var Input$1 = function Input(props) {
	var cx = props.cx, value = props.value;
	var _cleanCommonProps = cleanCommonProps(props), innerRef = _cleanCommonProps.innerRef, isDisabled = _cleanCommonProps.isDisabled, isHidden = _cleanCommonProps.isHidden, inputClassName = _cleanCommonProps.inputClassName, innerProps = _objectWithoutProperties$1(_cleanCommonProps, _excluded$5);
	return jsx("div", _extends$3({}, getStyleProps(props, "input", { "input-container": true }), { "data-value": value || "" }), jsx("input", _extends$3({
		className: cx({ input: true }, inputClassName),
		ref: innerRef,
		style: inputStyle(isHidden),
		disabled: isDisabled
	}, innerProps)));
};
var multiValueCSS = function multiValueCSS(_ref, unstyled) {
	var _ref$theme = _ref.theme, spacing = _ref$theme.spacing, borderRadius = _ref$theme.borderRadius, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "multiValue",
		display: "flex",
		minWidth: 0
	}, unstyled ? {} : {
		backgroundColor: colors.neutral10,
		borderRadius: borderRadius / 2,
		margin: spacing.baseUnit / 2
	});
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2, unstyled) {
	var _ref2$theme = _ref2.theme, borderRadius = _ref2$theme.borderRadius, colors = _ref2$theme.colors, cropWithEllipsis = _ref2.cropWithEllipsis;
	return _objectSpread2({
		overflow: "hidden",
		textOverflow: cropWithEllipsis || cropWithEllipsis === void 0 ? "ellipsis" : void 0,
		whiteSpace: "nowrap"
	}, unstyled ? {} : {
		borderRadius: borderRadius / 2,
		color: colors.neutral80,
		fontSize: "85%",
		padding: 3,
		paddingLeft: 6
	});
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3, unstyled) {
	var _ref3$theme = _ref3.theme, spacing = _ref3$theme.spacing, borderRadius = _ref3$theme.borderRadius, colors = _ref3$theme.colors, isFocused = _ref3.isFocused;
	return _objectSpread2({
		alignItems: "center",
		display: "flex"
	}, unstyled ? {} : {
		borderRadius: borderRadius / 2,
		backgroundColor: isFocused ? colors.dangerLight : void 0,
		paddingLeft: spacing.baseUnit,
		paddingRight: spacing.baseUnit,
		":hover": {
			backgroundColor: colors.dangerLight,
			color: colors.danger
		}
	});
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
	var children = _ref4.children, innerProps = _ref4.innerProps;
	return jsx("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
	var children = _ref5.children, innerProps = _ref5.innerProps;
	return jsx("div", _extends$3({ role: "button" }, innerProps), children || jsx(CrossIcon, { size: 14 }));
}
var MultiValue$1 = function MultiValue(props) {
	var children = props.children, components = props.components, data = props.data, innerProps = props.innerProps, isDisabled = props.isDisabled, removeProps = props.removeProps, selectProps = props.selectProps;
	var Container = components.Container, Label = components.Label, Remove = components.Remove;
	return jsx(Container, {
		data,
		innerProps: _objectSpread2(_objectSpread2({}, getStyleProps(props, "multiValue", {
			"multi-value": true,
			"multi-value--is-disabled": isDisabled
		})), innerProps),
		selectProps
	}, jsx(Label, {
		data,
		innerProps: _objectSpread2({}, getStyleProps(props, "multiValueLabel", { "multi-value__label": true })),
		selectProps
	}, children), jsx(Remove, {
		data,
		innerProps: _objectSpread2(_objectSpread2({}, getStyleProps(props, "multiValueRemove", { "multi-value__remove": true })), {}, { "aria-label": "Remove ".concat(children || "option") }, removeProps),
		selectProps
	}));
};
var optionCSS = function optionCSS(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, isFocused = _ref.isFocused, isSelected = _ref.isSelected, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "option",
		cursor: "default",
		display: "block",
		fontSize: "inherit",
		width: "100%",
		userSelect: "none",
		WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
	}, unstyled ? {} : {
		backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : "transparent",
		color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : "inherit",
		padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
		":active": { backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : void 0 }
	});
};
var Option$1 = function Option(props) {
	var children = props.children, isDisabled = props.isDisabled, isFocused = props.isFocused, isSelected = props.isSelected, innerRef = props.innerRef, innerProps = props.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "option", {
		option: true,
		"option--is-disabled": isDisabled,
		"option--is-focused": isFocused,
		"option--is-selected": isSelected
	}), {
		ref: innerRef,
		"aria-disabled": isDisabled
	}, innerProps), children);
};
var placeholderCSS = function placeholderCSS(_ref, unstyled) {
	var _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "placeholder",
		gridArea: "1 / 1 / 2 / 3"
	}, unstyled ? {} : {
		color: colors.neutral50,
		marginLeft: spacing.baseUnit / 2,
		marginRight: spacing.baseUnit / 2
	});
};
var Placeholder$1 = function Placeholder(props) {
	var children = props.children, innerProps = props.innerProps;
	return jsx("div", _extends$3({}, getStyleProps(props, "placeholder", { placeholder: true }), innerProps), children);
};
var css = function css(_ref, unstyled) {
	var isDisabled = _ref.isDisabled, _ref$theme = _ref.theme, spacing = _ref$theme.spacing, colors = _ref$theme.colors;
	return _objectSpread2({
		label: "singleValue",
		gridArea: "1 / 1 / 2 / 3",
		maxWidth: "100%",
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	}, unstyled ? {} : {
		color: isDisabled ? colors.neutral40 : colors.neutral80,
		marginLeft: spacing.baseUnit / 2,
		marginRight: spacing.baseUnit / 2
	});
};
var components = {
	ClearIndicator,
	Control: Control$1,
	DropdownIndicator,
	DownChevron,
	CrossIcon,
	Group: Group$1,
	GroupHeading,
	IndicatorsContainer,
	IndicatorSeparator,
	Input: Input$1,
	LoadingIndicator,
	Menu: Menu$1,
	MenuList,
	MenuPortal,
	LoadingMessage,
	NoOptionsMessage,
	MultiValue: MultiValue$1,
	MultiValueContainer,
	MultiValueLabel,
	MultiValueRemove,
	Option: Option$1,
	Placeholder: Placeholder$1,
	SelectContainer,
	SingleValue: function SingleValue(props) {
		var children = props.children, isDisabled = props.isDisabled, innerProps = props.innerProps;
		return jsx("div", _extends$3({}, getStyleProps(props, "singleValue", {
			"single-value": true,
			"single-value--is-disabled": isDisabled
		}), innerProps), children);
	},
	ValueContainer
};
var defaultComponents = function defaultComponents(props) {
	return _objectSpread2(_objectSpread2({}, components), props.components);
};
//#endregion
//#region node_modules/react-select/dist/Select-ef7c0426.esm.js
var _ref = {
	name: "7pg0cj-a11yText",
	styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap"
};
var A11yText$1 = function A11yText(props) {
	return jsx("span", _extends$3({ css: _ref }, props));
};
var defaultAriaLiveMessages = {
	guidance: function guidance(props) {
		var isSearchable = props.isSearchable, isMulti = props.isMulti, tabSelectsValue = props.tabSelectsValue, context = props.context, isInitialFocus = props.isInitialFocus;
		switch (context) {
			case "menu": return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(tabSelectsValue ? ", press Tab to select the option and exit the menu" : "", ".");
			case "input": return isInitialFocus ? "".concat(props["aria-label"] || "Select", " is focused ").concat(isSearchable ? ",type to refine list" : "", ", press Down to open the menu, ").concat(isMulti ? " press left to focus selected values" : "") : "";
			case "value": return "Use left and right to toggle between focused values, press Backspace to remove the currently focused value";
			default: return "";
		}
	},
	onChange: function onChange(props) {
		var action = props.action, _props$label = props.label, label = _props$label === void 0 ? "" : _props$label, labels = props.labels, isDisabled = props.isDisabled;
		switch (action) {
			case "deselect-option":
			case "pop-value":
			case "remove-value": return "option ".concat(label, ", deselected.");
			case "clear": return "All selected options have been cleared.";
			case "initial-input-focus": return "option".concat(labels.length > 1 ? "s" : "", " ").concat(labels.join(","), ", selected.");
			case "select-option": return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
			default: return "";
		}
	},
	onFocus: function onFocus(props) {
		var context = props.context, focused = props.focused, options = props.options, _props$label2 = props.label, label = _props$label2 === void 0 ? "" : _props$label2, selectValue = props.selectValue, isDisabled = props.isDisabled, isSelected = props.isSelected, isAppleDevice = props.isAppleDevice;
		var getArrayIndex = function getArrayIndex(arr, item) {
			return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : "";
		};
		if (context === "value" && selectValue) return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
		if (context === "menu" && isAppleDevice) {
			var disabled = isDisabled ? " disabled" : "";
			var status = "".concat(isSelected ? " selected" : "").concat(disabled);
			return "".concat(label).concat(status, ", ").concat(getArrayIndex(options, focused), ".");
		}
		return "";
	},
	onFilter: function onFilter(props) {
		var inputValue = props.inputValue, resultsMessage = props.resultsMessage;
		return "".concat(resultsMessage).concat(inputValue ? " for search term " + inputValue : "", ".");
	}
};
var LiveRegion$1 = function LiveRegion(props) {
	var ariaSelection = props.ariaSelection, focusedOption = props.focusedOption, focusedValue = props.focusedValue, focusableOptions = props.focusableOptions, isFocused = props.isFocused, selectValue = props.selectValue, selectProps = props.selectProps, id = props.id, isAppleDevice = props.isAppleDevice;
	var ariaLiveMessages = selectProps.ariaLiveMessages, getOptionLabel = selectProps.getOptionLabel, inputValue = selectProps.inputValue, isMulti = selectProps.isMulti, isOptionDisabled = selectProps.isOptionDisabled, isSearchable = selectProps.isSearchable, menuIsOpen = selectProps.menuIsOpen, options = selectProps.options, screenReaderStatus = selectProps.screenReaderStatus, tabSelectsValue = selectProps.tabSelectsValue, isLoading = selectProps.isLoading;
	var ariaLabel = selectProps["aria-label"];
	var ariaLive = selectProps["aria-live"];
	var messages = (0, import_react.useMemo)(function() {
		return _objectSpread2(_objectSpread2({}, defaultAriaLiveMessages), ariaLiveMessages || {});
	}, [ariaLiveMessages]);
	var ariaSelected = (0, import_react.useMemo)(function() {
		var message = "";
		if (ariaSelection && messages.onChange) {
			var option = ariaSelection.option, selectedOptions = ariaSelection.options, removedValue = ariaSelection.removedValue, removedValues = ariaSelection.removedValues, value = ariaSelection.value;
			var selected = removedValue || option || function asOption(val) {
				return !Array.isArray(val) ? val : null;
			}(value);
			var label = selected ? getOptionLabel(selected) : "";
			var multiSelected = selectedOptions || removedValues || void 0;
			var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];
			var onChangeProps = _objectSpread2({
				isDisabled: selected && isOptionDisabled(selected, selectValue),
				label,
				labels
			}, ariaSelection);
			message = messages.onChange(onChangeProps);
		}
		return message;
	}, [
		ariaSelection,
		messages,
		isOptionDisabled,
		selectValue,
		getOptionLabel
	]);
	var ariaFocused = (0, import_react.useMemo)(function() {
		var focusMsg = "";
		var focused = focusedOption || focusedValue;
		var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
		if (focused && messages.onFocus) {
			var onFocusProps = {
				focused,
				label: getOptionLabel(focused),
				isDisabled: isOptionDisabled(focused, selectValue),
				isSelected,
				options: focusableOptions,
				context: focused === focusedOption ? "menu" : "value",
				selectValue,
				isAppleDevice
			};
			focusMsg = messages.onFocus(onFocusProps);
		}
		return focusMsg;
	}, [
		focusedOption,
		focusedValue,
		getOptionLabel,
		isOptionDisabled,
		messages,
		focusableOptions,
		selectValue,
		isAppleDevice
	]);
	var ariaResults = (0, import_react.useMemo)(function() {
		var resultsMsg = "";
		if (menuIsOpen && options.length && !isLoading && messages.onFilter) {
			var resultsMessage = screenReaderStatus({ count: focusableOptions.length });
			resultsMsg = messages.onFilter({
				inputValue,
				resultsMessage
			});
		}
		return resultsMsg;
	}, [
		focusableOptions,
		inputValue,
		menuIsOpen,
		messages,
		options,
		screenReaderStatus,
		isLoading
	]);
	var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus";
	var ariaGuidance = (0, import_react.useMemo)(function() {
		var guidanceMsg = "";
		if (messages.guidance) {
			var context = focusedValue ? "value" : menuIsOpen ? "menu" : "input";
			guidanceMsg = messages.guidance({
				"aria-label": ariaLabel,
				context,
				isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
				isMulti,
				isSearchable,
				tabSelectsValue,
				isInitialFocus
			});
		}
		return guidanceMsg;
	}, [
		ariaLabel,
		focusedOption,
		focusedValue,
		isMulti,
		isOptionDisabled,
		isSearchable,
		menuIsOpen,
		messages,
		selectValue,
		tabSelectsValue,
		isInitialFocus
	]);
	var ScreenReaderText = jsx(import_react.Fragment, null, jsx("span", { id: "aria-selection" }, ariaSelected), jsx("span", { id: "aria-focused" }, ariaFocused), jsx("span", { id: "aria-results" }, ariaResults), jsx("span", { id: "aria-guidance" }, ariaGuidance));
	return jsx(import_react.Fragment, null, jsx(A11yText$1, { id }, isInitialFocus && ScreenReaderText), jsx(A11yText$1, {
		"aria-live": ariaLive,
		"aria-atomic": "false",
		"aria-relevant": "additions text",
		role: "log"
	}, isFocused && !isInitialFocus && ScreenReaderText));
};
var diacritics = [
	{
		base: "A",
		letters: "AⒶＡÀÁÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺǍȀȂẠẬẶḀĄȺⱯ"
	},
	{
		base: "AA",
		letters: "Ꜳ"
	},
	{
		base: "AE",
		letters: "ÆǼǢ"
	},
	{
		base: "AO",
		letters: "Ꜵ"
	},
	{
		base: "AU",
		letters: "Ꜷ"
	},
	{
		base: "AV",
		letters: "ꜸꜺ"
	},
	{
		base: "AY",
		letters: "Ꜽ"
	},
	{
		base: "B",
		letters: "BⒷＢḂḄḆɃƂƁ"
	},
	{
		base: "C",
		letters: "CⒸＣĆĈĊČÇḈƇȻꜾ"
	},
	{
		base: "D",
		letters: "DⒹＤḊĎḌḐḒḎĐƋƊƉꝹ"
	},
	{
		base: "DZ",
		letters: "ǱǄ"
	},
	{
		base: "Dz",
		letters: "ǲǅ"
	},
	{
		base: "E",
		letters: "EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚƐƎ"
	},
	{
		base: "F",
		letters: "FⒻＦḞƑꝻ"
	},
	{
		base: "G",
		letters: "GⒼＧǴĜḠĞĠǦĢǤƓꞠꝽꝾ"
	},
	{
		base: "H",
		letters: "HⒽＨĤḢḦȞḤḨḪĦⱧⱵꞍ"
	},
	{
		base: "I",
		letters: "IⒾＩÌÍÎĨĪĬİÏḮỈǏȈȊỊĮḬƗ"
	},
	{
		base: "J",
		letters: "JⒿＪĴɈ"
	},
	{
		base: "K",
		letters: "KⓀＫḰǨḲĶḴƘⱩꝀꝂꝄꞢ"
	},
	{
		base: "L",
		letters: "LⓁＬĿĹĽḶḸĻḼḺŁȽⱢⱠꝈꝆꞀ"
	},
	{
		base: "LJ",
		letters: "Ǉ"
	},
	{
		base: "Lj",
		letters: "ǈ"
	},
	{
		base: "M",
		letters: "MⓂＭḾṀṂⱮƜ"
	},
	{
		base: "N",
		letters: "NⓃＮǸŃÑṄŇṆŅṊṈȠƝꞐꞤ"
	},
	{
		base: "NJ",
		letters: "Ǌ"
	},
	{
		base: "Nj",
		letters: "ǋ"
	},
	{
		base: "O",
		letters: "OⓄＯÒÓÔỒỐỖỔÕṌȬṎŌṐṒŎȮȰÖȪỎŐǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟꝊꝌ"
	},
	{
		base: "OI",
		letters: "Ƣ"
	},
	{
		base: "OO",
		letters: "Ꝏ"
	},
	{
		base: "OU",
		letters: "Ȣ"
	},
	{
		base: "P",
		letters: "PⓅＰṔṖƤⱣꝐꝒꝔ"
	},
	{
		base: "Q",
		letters: "QⓆＱꝖꝘɊ"
	},
	{
		base: "R",
		letters: "RⓇＲŔṘŘȐȒṚṜŖṞɌⱤꝚꞦꞂ"
	},
	{
		base: "S",
		letters: "SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"
	},
	{
		base: "T",
		letters: "TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"
	},
	{
		base: "TZ",
		letters: "Ꜩ"
	},
	{
		base: "U",
		letters: "UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"
	},
	{
		base: "V",
		letters: "VⓋＶṼṾƲꝞɅ"
	},
	{
		base: "VY",
		letters: "Ꝡ"
	},
	{
		base: "W",
		letters: "WⓌＷẀẂŴẆẄẈⱲ"
	},
	{
		base: "X",
		letters: "XⓍＸẊẌ"
	},
	{
		base: "Y",
		letters: "YⓎＹỲÝŶỸȲẎŸỶỴƳɎỾ"
	},
	{
		base: "Z",
		letters: "ZⓏＺŹẐŻŽẒẔƵȤⱿⱫꝢ"
	},
	{
		base: "a",
		letters: "aⓐａẚàáâầấẫẩãāăằắẵẳȧǡäǟảåǻǎȁȃạậặḁąⱥɐ"
	},
	{
		base: "aa",
		letters: "ꜳ"
	},
	{
		base: "ae",
		letters: "æǽǣ"
	},
	{
		base: "ao",
		letters: "ꜵ"
	},
	{
		base: "au",
		letters: "ꜷ"
	},
	{
		base: "av",
		letters: "ꜹꜻ"
	},
	{
		base: "ay",
		letters: "ꜽ"
	},
	{
		base: "b",
		letters: "bⓑｂḃḅḇƀƃɓ"
	},
	{
		base: "c",
		letters: "cⓒｃćĉċčçḉƈȼꜿↄ"
	},
	{
		base: "d",
		letters: "dⓓｄḋďḍḑḓḏđƌɖɗꝺ"
	},
	{
		base: "dz",
		letters: "ǳǆ"
	},
	{
		base: "e",
		letters: "eⓔｅèéêềếễểẽēḕḗĕėëẻěȅȇẹệȩḝęḙḛɇɛǝ"
	},
	{
		base: "f",
		letters: "fⓕｆḟƒꝼ"
	},
	{
		base: "g",
		letters: "gⓖｇǵĝḡğġǧģǥɠꞡᵹꝿ"
	},
	{
		base: "h",
		letters: "hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"
	},
	{
		base: "hv",
		letters: "ƕ"
	},
	{
		base: "i",
		letters: "iⓘｉìíîĩīĭïḯỉǐȉȋịįḭɨı"
	},
	{
		base: "j",
		letters: "jⓙｊĵǰɉ"
	},
	{
		base: "k",
		letters: "kⓚｋḱǩḳķḵƙⱪꝁꝃꝅꞣ"
	},
	{
		base: "l",
		letters: "lⓛｌŀĺľḷḹļḽḻſłƚɫⱡꝉꞁꝇ"
	},
	{
		base: "lj",
		letters: "ǉ"
	},
	{
		base: "m",
		letters: "mⓜｍḿṁṃɱɯ"
	},
	{
		base: "n",
		letters: "nⓝｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"
	},
	{
		base: "nj",
		letters: "ǌ"
	},
	{
		base: "o",
		letters: "oⓞｏòóôồốỗổõṍȭṏōṑṓŏȯȱöȫỏőǒȍȏơờớỡởợọộǫǭøǿɔꝋꝍɵ"
	},
	{
		base: "oi",
		letters: "ƣ"
	},
	{
		base: "ou",
		letters: "ȣ"
	},
	{
		base: "oo",
		letters: "ꝏ"
	},
	{
		base: "p",
		letters: "pⓟｐṕṗƥᵽꝑꝓꝕ"
	},
	{
		base: "q",
		letters: "qⓠｑɋꝗꝙ"
	},
	{
		base: "r",
		letters: "rⓡｒŕṙřȑȓṛṝŗṟɍɽꝛꞧꞃ"
	},
	{
		base: "s",
		letters: "sⓢｓßśṥŝṡšṧṣṩșşȿꞩꞅẛ"
	},
	{
		base: "t",
		letters: "tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"
	},
	{
		base: "tz",
		letters: "ꜩ"
	},
	{
		base: "u",
		letters: "uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"
	},
	{
		base: "v",
		letters: "vⓥｖṽṿʋꝟʌ"
	},
	{
		base: "vy",
		letters: "ꝡ"
	},
	{
		base: "w",
		letters: "wⓦｗẁẃŵẇẅẘẉⱳ"
	},
	{
		base: "x",
		letters: "xⓧｘẋẍ"
	},
	{
		base: "y",
		letters: "yⓨｙỳýŷỹȳẏÿỷẙỵƴɏỿ"
	},
	{
		base: "z",
		letters: "zⓩｚźẑżžẓẕƶȥɀⱬꝣ"
	}
];
var anyDiacritic = new RegExp("[" + diacritics.map(function(d) {
	return d.letters;
}).join("") + "]", "g");
var diacriticToBase = {};
for (var i = 0; i < diacritics.length; i++) {
	var diacritic = diacritics[i];
	for (var j = 0; j < diacritic.letters.length; j++) diacriticToBase[diacritic.letters[j]] = diacritic.base;
}
var stripDiacritics = function stripDiacritics(str) {
	return str.replace(anyDiacritic, function(match) {
		return diacriticToBase[match];
	});
};
var memoizedStripDiacriticsForInput = memoizeOne(stripDiacritics);
var trimString = function trimString(str) {
	return str.replace(/^\s+|\s+$/g, "");
};
var defaultStringify = function defaultStringify(option) {
	return "".concat(option.label, " ").concat(option.value);
};
var createFilter = function createFilter(config) {
	return function(option, rawInput) {
		if (option.data.__isNew__) return true;
		var _ignoreCase$ignoreAcc = _objectSpread2({
			ignoreCase: true,
			ignoreAccents: true,
			stringify: defaultStringify,
			trim: true,
			matchFrom: "any"
		}, config), ignoreCase = _ignoreCase$ignoreAcc.ignoreCase, ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents, stringify = _ignoreCase$ignoreAcc.stringify, trim = _ignoreCase$ignoreAcc.trim, matchFrom = _ignoreCase$ignoreAcc.matchFrom;
		var input = trim ? trimString(rawInput) : rawInput;
		var candidate = trim ? trimString(stringify(option)) : stringify(option);
		if (ignoreCase) {
			input = input.toLowerCase();
			candidate = candidate.toLowerCase();
		}
		if (ignoreAccents) {
			input = memoizedStripDiacriticsForInput(input);
			candidate = stripDiacritics(candidate);
		}
		return matchFrom === "start" ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
	};
};
var _excluded = ["innerRef"];
function DummyInput(_ref) {
	var innerRef = _ref.innerRef;
	var filteredProps = removeProps(_objectWithoutProperties$1(_ref, _excluded), "onExited", "in", "enter", "exit", "appear");
	return jsx("input", _extends$3({ ref: innerRef }, filteredProps, { css: /* @__PURE__ */ css$2({
		label: "dummyInput",
		background: 0,
		border: 0,
		caretColor: "transparent",
		fontSize: "inherit",
		gridArea: "1 / 1 / 2 / 3",
		outline: 0,
		padding: 0,
		width: 1,
		color: "transparent",
		left: -100,
		opacity: 0,
		position: "relative",
		transform: "scale(.01)"
	}, "", "") }));
}
var cancelScroll = function cancelScroll(event) {
	if (event.cancelable) event.preventDefault();
	event.stopPropagation();
};
function useScrollCapture(_ref) {
	var isEnabled = _ref.isEnabled, onBottomArrive = _ref.onBottomArrive, onBottomLeave = _ref.onBottomLeave, onTopArrive = _ref.onTopArrive, onTopLeave = _ref.onTopLeave;
	var isBottom = (0, import_react.useRef)(false);
	var isTop = (0, import_react.useRef)(false);
	var touchStart = (0, import_react.useRef)(0);
	var scrollTarget = (0, import_react.useRef)(null);
	var handleEventDelta = (0, import_react.useCallback)(function(event, delta) {
		if (scrollTarget.current === null) return;
		var _scrollTarget$current = scrollTarget.current, scrollTop = _scrollTarget$current.scrollTop, scrollHeight = _scrollTarget$current.scrollHeight, clientHeight = _scrollTarget$current.clientHeight;
		var target = scrollTarget.current;
		var isDeltaPositive = delta > 0;
		var availableScroll = scrollHeight - clientHeight - scrollTop;
		var shouldCancelScroll = false;
		if (availableScroll > delta && isBottom.current) {
			if (onBottomLeave) onBottomLeave(event);
			isBottom.current = false;
		}
		if (isDeltaPositive && isTop.current) {
			if (onTopLeave) onTopLeave(event);
			isTop.current = false;
		}
		if (isDeltaPositive && delta > availableScroll) {
			if (onBottomArrive && !isBottom.current) onBottomArrive(event);
			target.scrollTop = scrollHeight;
			shouldCancelScroll = true;
			isBottom.current = true;
		} else if (!isDeltaPositive && -delta > scrollTop) {
			if (onTopArrive && !isTop.current) onTopArrive(event);
			target.scrollTop = 0;
			shouldCancelScroll = true;
			isTop.current = true;
		}
		if (shouldCancelScroll) cancelScroll(event);
	}, [
		onBottomArrive,
		onBottomLeave,
		onTopArrive,
		onTopLeave
	]);
	var onWheel = (0, import_react.useCallback)(function(event) {
		handleEventDelta(event, event.deltaY);
	}, [handleEventDelta]);
	var onTouchStart = (0, import_react.useCallback)(function(event) {
		touchStart.current = event.changedTouches[0].clientY;
	}, []);
	var onTouchMove = (0, import_react.useCallback)(function(event) {
		handleEventDelta(event, touchStart.current - event.changedTouches[0].clientY);
	}, [handleEventDelta]);
	var startListening = (0, import_react.useCallback)(function(el) {
		if (!el) return;
		var notPassive = supportsPassiveEvents ? { passive: false } : false;
		el.addEventListener("wheel", onWheel, notPassive);
		el.addEventListener("touchstart", onTouchStart, notPassive);
		el.addEventListener("touchmove", onTouchMove, notPassive);
	}, [
		onTouchMove,
		onTouchStart,
		onWheel
	]);
	var stopListening = (0, import_react.useCallback)(function(el) {
		if (!el) return;
		el.removeEventListener("wheel", onWheel, false);
		el.removeEventListener("touchstart", onTouchStart, false);
		el.removeEventListener("touchmove", onTouchMove, false);
	}, [
		onTouchMove,
		onTouchStart,
		onWheel
	]);
	(0, import_react.useEffect)(function() {
		if (!isEnabled) return;
		var element = scrollTarget.current;
		startListening(element);
		return function() {
			stopListening(element);
		};
	}, [
		isEnabled,
		startListening,
		stopListening
	]);
	return function(element) {
		scrollTarget.current = element;
	};
}
var STYLE_KEYS = [
	"boxSizing",
	"height",
	"overflow",
	"paddingRight",
	"position"
];
var LOCK_STYLES = {
	boxSizing: "border-box",
	overflow: "hidden",
	position: "relative",
	height: "100%"
};
function preventTouchMove(e) {
	if (e.cancelable) e.preventDefault();
}
function allowTouchMove(e) {
	e.stopPropagation();
}
function preventInertiaScroll() {
	var top = this.scrollTop;
	var totalScroll = this.scrollHeight;
	var currentScroll = top + this.offsetHeight;
	if (top === 0) this.scrollTop = 1;
	else if (currentScroll === totalScroll) this.scrollTop = top - 1;
}
function isTouchDevice() {
	return "ontouchstart" in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
	capture: false,
	passive: false
};
function useScrollLock(_ref) {
	var isEnabled = _ref.isEnabled, _ref$accountForScroll = _ref.accountForScrollbars, accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
	var originalStyles = (0, import_react.useRef)({});
	var scrollTarget = (0, import_react.useRef)(null);
	var addScrollLock = (0, import_react.useCallback)(function(touchScrollTarget) {
		if (!canUseDOM) return;
		var target = document.body;
		var targetStyle = target && target.style;
		if (accountForScrollbars) STYLE_KEYS.forEach(function(key) {
			var val = targetStyle && targetStyle[key];
			originalStyles.current[key] = val;
		});
		if (accountForScrollbars && activeScrollLocks < 1) {
			var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
			var clientWidth = document.body ? document.body.clientWidth : 0;
			var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
			Object.keys(LOCK_STYLES).forEach(function(key) {
				var val = LOCK_STYLES[key];
				if (targetStyle) targetStyle[key] = val;
			});
			if (targetStyle) targetStyle.paddingRight = "".concat(adjustedPadding, "px");
		}
		if (target && isTouchDevice()) {
			target.addEventListener("touchmove", preventTouchMove, listenerOptions);
			if (touchScrollTarget) {
				touchScrollTarget.addEventListener("touchstart", preventInertiaScroll, listenerOptions);
				touchScrollTarget.addEventListener("touchmove", allowTouchMove, listenerOptions);
			}
		}
		activeScrollLocks += 1;
	}, [accountForScrollbars]);
	var removeScrollLock = (0, import_react.useCallback)(function(touchScrollTarget) {
		if (!canUseDOM) return;
		var target = document.body;
		var targetStyle = target && target.style;
		activeScrollLocks = Math.max(activeScrollLocks - 1, 0);
		if (accountForScrollbars && activeScrollLocks < 1) STYLE_KEYS.forEach(function(key) {
			var val = originalStyles.current[key];
			if (targetStyle) targetStyle[key] = val;
		});
		if (target && isTouchDevice()) {
			target.removeEventListener("touchmove", preventTouchMove, listenerOptions);
			if (touchScrollTarget) {
				touchScrollTarget.removeEventListener("touchstart", preventInertiaScroll, listenerOptions);
				touchScrollTarget.removeEventListener("touchmove", allowTouchMove, listenerOptions);
			}
		}
	}, [accountForScrollbars]);
	(0, import_react.useEffect)(function() {
		if (!isEnabled) return;
		var element = scrollTarget.current;
		addScrollLock(element);
		return function() {
			removeScrollLock(element);
		};
	}, [
		isEnabled,
		addScrollLock,
		removeScrollLock
	]);
	return function(element) {
		scrollTarget.current = element;
	};
}
var blurSelectInput = function blurSelectInput(event) {
	var element = event.target;
	return element.ownerDocument.activeElement && element.ownerDocument.activeElement.blur();
};
var _ref2$1 = {
	name: "1kfdb0e",
	styles: "position:fixed;left:0;bottom:0;right:0;top:0"
};
function ScrollManager(_ref) {
	var children = _ref.children, lockEnabled = _ref.lockEnabled, _ref$captureEnabled = _ref.captureEnabled, captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled, onBottomArrive = _ref.onBottomArrive, onBottomLeave = _ref.onBottomLeave, onTopArrive = _ref.onTopArrive, onTopLeave = _ref.onTopLeave;
	var setScrollCaptureTarget = useScrollCapture({
		isEnabled: captureEnabled,
		onBottomArrive,
		onBottomLeave,
		onTopArrive,
		onTopLeave
	});
	var setScrollLockTarget = useScrollLock({ isEnabled: lockEnabled });
	return jsx(import_react.Fragment, null, lockEnabled && jsx("div", {
		onClick: blurSelectInput,
		css: _ref2$1
	}), children(function targetRef(element) {
		setScrollCaptureTarget(element);
		setScrollLockTarget(element);
	}));
}
var _ref2 = {
	name: "1a0ro4n-requiredInput",
	styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%"
};
var RequiredInput$1 = function RequiredInput(_ref) {
	var name = _ref.name, onFocus = _ref.onFocus;
	return jsx("input", {
		required: true,
		name,
		tabIndex: -1,
		"aria-hidden": "true",
		onFocus,
		css: _ref2,
		value: "",
		onChange: function onChange() {}
	});
};
function testPlatform(re) {
	var _window$navigator$use;
	return typeof window !== "undefined" && window.navigator != null ? re.test(((_window$navigator$use = window.navigator["userAgentData"]) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.platform) || window.navigator.platform) : false;
}
function isIPhone() {
	return testPlatform(/^iPhone/i);
}
function isMac() {
	return testPlatform(/^Mac/i);
}
function isIPad() {
	return testPlatform(/^iPad/i) || isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
	return isIPhone() || isIPad();
}
function isAppleDevice() {
	return isMac() || isIOS();
}
var formatGroupLabel = function formatGroupLabel(group) {
	return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
	return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
	return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
	return !!option.isDisabled;
};
var defaultStyles = {
	clearIndicator: clearIndicatorCSS,
	container: containerCSS,
	control: css$1,
	dropdownIndicator: dropdownIndicatorCSS,
	group: groupCSS,
	groupHeading: groupHeadingCSS,
	indicatorsContainer: indicatorsContainerCSS,
	indicatorSeparator: indicatorSeparatorCSS,
	input: inputCSS,
	loadingIndicator: loadingIndicatorCSS,
	loadingMessage: loadingMessageCSS,
	menu: menuCSS,
	menuList: menuListCSS,
	menuPortal: menuPortalCSS,
	multiValue: multiValueCSS,
	multiValueLabel: multiValueLabelCSS,
	multiValueRemove: multiValueRemoveCSS,
	noOptionsMessage: noOptionsMessageCSS,
	option: optionCSS,
	placeholder: placeholderCSS,
	singleValue: css,
	valueContainer: valueContainerCSS
};
var colors = {
	primary: "#2684FF",
	primary75: "#4C9AFF",
	primary50: "#B2D4FF",
	primary25: "#DEEBFF",
	danger: "#DE350B",
	dangerLight: "#FFBDAD",
	neutral0: "hsl(0, 0%, 100%)",
	neutral5: "hsl(0, 0%, 95%)",
	neutral10: "hsl(0, 0%, 90%)",
	neutral20: "hsl(0, 0%, 80%)",
	neutral30: "hsl(0, 0%, 70%)",
	neutral40: "hsl(0, 0%, 60%)",
	neutral50: "hsl(0, 0%, 50%)",
	neutral60: "hsl(0, 0%, 40%)",
	neutral70: "hsl(0, 0%, 30%)",
	neutral80: "hsl(0, 0%, 20%)",
	neutral90: "hsl(0, 0%, 10%)"
};
var borderRadius = 4;
var baseUnit = 4;
var defaultTheme = {
	borderRadius,
	colors,
	spacing: {
		baseUnit,
		controlHeight: 38,
		menuGutter: baseUnit * 2
	}
};
var defaultProps = {
	"aria-live": "polite",
	backspaceRemovesValue: true,
	blurInputOnSelect: isTouchCapable(),
	captureMenuScroll: !isTouchCapable(),
	classNames: {},
	closeMenuOnSelect: true,
	closeMenuOnScroll: false,
	components: {},
	controlShouldRenderValue: true,
	escapeClearsValue: false,
	filterOption: createFilter(),
	formatGroupLabel,
	getOptionLabel: getOptionLabel$1,
	getOptionValue: getOptionValue$1,
	isDisabled: false,
	isLoading: false,
	isMulti: false,
	isRtl: false,
	isSearchable: true,
	isOptionDisabled,
	loadingMessage: function loadingMessage() {
		return "Loading...";
	},
	maxMenuHeight: 300,
	minMenuHeight: 140,
	menuIsOpen: false,
	menuPlacement: "bottom",
	menuPosition: "absolute",
	menuShouldBlockScroll: false,
	menuShouldScrollIntoView: !isMobileDevice(),
	noOptionsMessage: function noOptionsMessage() {
		return "No options";
	},
	openMenuOnFocus: false,
	openMenuOnClick: true,
	options: [],
	pageSize: 5,
	placeholder: "Select...",
	screenReaderStatus: function screenReaderStatus(_ref) {
		var count = _ref.count;
		return "".concat(count, " result").concat(count !== 1 ? "s" : "", " available");
	},
	styles: {},
	tabIndex: 0,
	tabSelectsValue: true,
	unstyled: false
};
function toCategorizedOption(props, option, selectValue, index) {
	return {
		type: "option",
		data: option,
		isDisabled: _isOptionDisabled(props, option, selectValue),
		isSelected: _isOptionSelected(props, option, selectValue),
		label: getOptionLabel(props, option),
		value: getOptionValue(props, option),
		index
	};
}
function buildCategorizedOptions(props, selectValue) {
	return props.options.map(function(groupOrOption, groupOrOptionIndex) {
		if ("options" in groupOrOption) {
			var categorizedOptions = groupOrOption.options.map(function(option, optionIndex) {
				return toCategorizedOption(props, option, selectValue, optionIndex);
			}).filter(function(categorizedOption) {
				return isFocusable(props, categorizedOption);
			});
			return categorizedOptions.length > 0 ? {
				type: "group",
				data: groupOrOption,
				options: categorizedOptions,
				index: groupOrOptionIndex
			} : void 0;
		}
		var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
		return isFocusable(props, categorizedOption) ? categorizedOption : void 0;
	}).filter(notNullish);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
	return categorizedOptions.reduce(function(optionsAccumulator, categorizedOption) {
		if (categorizedOption.type === "group") optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray(categorizedOption.options.map(function(option) {
			return option.data;
		})));
		else optionsAccumulator.push(categorizedOption.data);
		return optionsAccumulator;
	}, []);
}
function buildFocusableOptionsWithIds(categorizedOptions, optionId) {
	return categorizedOptions.reduce(function(optionsAccumulator, categorizedOption) {
		if (categorizedOption.type === "group") optionsAccumulator.push.apply(optionsAccumulator, _toConsumableArray(categorizedOption.options.map(function(option) {
			return {
				data: option.data,
				id: "".concat(optionId, "-").concat(categorizedOption.index, "-").concat(option.index)
			};
		})));
		else optionsAccumulator.push({
			data: categorizedOption.data,
			id: "".concat(optionId, "-").concat(categorizedOption.index)
		});
		return optionsAccumulator;
	}, []);
}
function buildFocusableOptions(props, selectValue) {
	return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
	var _props$inputValue = props.inputValue, inputValue = _props$inputValue === void 0 ? "" : _props$inputValue;
	var data = categorizedOption.data, isSelected = categorizedOption.isSelected, label = categorizedOption.label, value = categorizedOption.value;
	return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
		label,
		value,
		data
	}, inputValue);
}
function getNextFocusedValue(state, nextSelectValue) {
	var focusedValue = state.focusedValue;
	var lastFocusedIndex = state.selectValue.indexOf(focusedValue);
	if (lastFocusedIndex > -1) {
		if (nextSelectValue.indexOf(focusedValue) > -1) return focusedValue;
		else if (lastFocusedIndex < nextSelectValue.length) return nextSelectValue[lastFocusedIndex];
	}
	return null;
}
function getNextFocusedOption(state, options) {
	var lastFocusedOption = state.focusedOption;
	return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}
var getFocusedOptionId = function getFocusedOptionId(focusableOptionsWithIds, focusedOption) {
	var _focusableOptionsWith;
	return ((_focusableOptionsWith = focusableOptionsWithIds.find(function(option) {
		return option.data === focusedOption;
	})) === null || _focusableOptionsWith === void 0 ? void 0 : _focusableOptionsWith.id) || null;
};
var getOptionLabel = function getOptionLabel(props, data) {
	return props.getOptionLabel(data);
};
var getOptionValue = function getOptionValue(props, data) {
	return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
	return typeof props.isOptionDisabled === "function" ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
	if (selectValue.indexOf(option) > -1) return true;
	if (typeof props.isOptionSelected === "function") return props.isOptionSelected(option, selectValue);
	var candidate = getOptionValue(props, option);
	return selectValue.some(function(i) {
		return getOptionValue(props, i) === candidate;
	});
}
function _filterOption(props, option, inputValue) {
	return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
	var hideSelectedOptions = props.hideSelectedOptions, isMulti = props.isMulti;
	if (hideSelectedOptions === void 0) return isMulti;
	return hideSelectedOptions;
};
var instanceId = 1;
var Select = /* @__PURE__ */ function(_Component) {
	_inherits(Select, _Component);
	var _super = _createSuper(Select);
	function Select(_props) {
		var _this;
		_classCallCheck(this, Select);
		_this = _super.call(this, _props);
		_this.state = {
			ariaSelection: null,
			focusedOption: null,
			focusedOptionId: null,
			focusableOptionsWithIds: [],
			focusedValue: null,
			inputIsHidden: false,
			isFocused: false,
			selectValue: [],
			clearFocusValueOnUpdate: false,
			prevWasFocused: false,
			inputIsHiddenAfterUpdate: void 0,
			prevProps: void 0,
			instancePrefix: "",
			isAppleDevice: false
		};
		_this.blockOptionHover = false;
		_this.isComposing = false;
		_this.commonProps = void 0;
		_this.initialTouchX = 0;
		_this.initialTouchY = 0;
		_this.openAfterFocus = false;
		_this.scrollToFocusedOptionOnUpdate = false;
		_this.userIsDragging = void 0;
		_this.controlRef = null;
		_this.getControlRef = function(ref) {
			_this.controlRef = ref;
		};
		_this.focusedOptionRef = null;
		_this.getFocusedOptionRef = function(ref) {
			_this.focusedOptionRef = ref;
		};
		_this.menuListRef = null;
		_this.getMenuListRef = function(ref) {
			_this.menuListRef = ref;
		};
		_this.inputRef = null;
		_this.getInputRef = function(ref) {
			_this.inputRef = ref;
		};
		_this.focus = _this.focusInput;
		_this.blur = _this.blurInput;
		_this.onChange = function(newValue, actionMeta) {
			var _this$props = _this.props, onChange = _this$props.onChange;
			actionMeta.name = _this$props.name;
			_this.ariaOnChange(newValue, actionMeta);
			onChange(newValue, actionMeta);
		};
		_this.setValue = function(newValue, action, option) {
			var _this$props2 = _this.props, closeMenuOnSelect = _this$props2.closeMenuOnSelect, isMulti = _this$props2.isMulti, inputValue = _this$props2.inputValue;
			_this.onInputChange("", {
				action: "set-value",
				prevInputValue: inputValue
			});
			if (closeMenuOnSelect) {
				_this.setState({ inputIsHiddenAfterUpdate: !isMulti });
				_this.onMenuClose();
			}
			_this.setState({ clearFocusValueOnUpdate: true });
			_this.onChange(newValue, {
				action,
				option
			});
		};
		_this.selectOption = function(newValue) {
			var _this$props3 = _this.props, blurInputOnSelect = _this$props3.blurInputOnSelect, isMulti = _this$props3.isMulti, name = _this$props3.name;
			var selectValue = _this.state.selectValue;
			var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
			var isDisabled = _this.isOptionDisabled(newValue, selectValue);
			if (deselected) {
				var candidate = _this.getOptionValue(newValue);
				_this.setValue(multiValueAsValue(selectValue.filter(function(i) {
					return _this.getOptionValue(i) !== candidate;
				})), "deselect-option", newValue);
			} else if (!isDisabled) if (isMulti) _this.setValue(multiValueAsValue([].concat(_toConsumableArray(selectValue), [newValue])), "select-option", newValue);
			else _this.setValue(singleValueAsValue(newValue), "select-option");
			else {
				_this.ariaOnChange(singleValueAsValue(newValue), {
					action: "select-option",
					option: newValue,
					name
				});
				return;
			}
			if (blurInputOnSelect) _this.blurInput();
		};
		_this.removeValue = function(removedValue) {
			var isMulti = _this.props.isMulti;
			var selectValue = _this.state.selectValue;
			var candidate = _this.getOptionValue(removedValue);
			var newValueArray = selectValue.filter(function(i) {
				return _this.getOptionValue(i) !== candidate;
			});
			var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
			_this.onChange(newValue, {
				action: "remove-value",
				removedValue
			});
			_this.focusInput();
		};
		_this.clearValue = function() {
			var selectValue = _this.state.selectValue;
			_this.onChange(valueTernary(_this.props.isMulti, [], null), {
				action: "clear",
				removedValues: selectValue
			});
		};
		_this.popValue = function() {
			var isMulti = _this.props.isMulti;
			var selectValue = _this.state.selectValue;
			var lastSelectedValue = selectValue[selectValue.length - 1];
			var newValueArray = selectValue.slice(0, selectValue.length - 1);
			var newValue = valueTernary(isMulti, newValueArray, newValueArray[0] || null);
			if (lastSelectedValue) _this.onChange(newValue, {
				action: "pop-value",
				removedValue: lastSelectedValue
			});
		};
		_this.getFocusedOptionId = function(focusedOption) {
			return getFocusedOptionId(_this.state.focusableOptionsWithIds, focusedOption);
		};
		_this.getFocusableOptionsWithIds = function() {
			return buildFocusableOptionsWithIds(buildCategorizedOptions(_this.props, _this.state.selectValue), _this.getElementId("option"));
		};
		_this.getValue = function() {
			return _this.state.selectValue;
		};
		_this.cx = function() {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			return classNames.apply(void 0, [_this.props.classNamePrefix].concat(args));
		};
		_this.getOptionLabel = function(data) {
			return getOptionLabel(_this.props, data);
		};
		_this.getOptionValue = function(data) {
			return getOptionValue(_this.props, data);
		};
		_this.getStyles = function(key, props) {
			var unstyled = _this.props.unstyled;
			var base = defaultStyles[key](props, unstyled);
			base.boxSizing = "border-box";
			var custom = _this.props.styles[key];
			return custom ? custom(base, props) : base;
		};
		_this.getClassNames = function(key, props) {
			var _this$props$className, _this$props$className2;
			return (_this$props$className = (_this$props$className2 = _this.props.classNames)[key]) === null || _this$props$className === void 0 ? void 0 : _this$props$className.call(_this$props$className2, props);
		};
		_this.getElementId = function(element) {
			return "".concat(_this.state.instancePrefix, "-").concat(element);
		};
		_this.getComponents = function() {
			return defaultComponents(_this.props);
		};
		_this.buildCategorizedOptions = function() {
			return buildCategorizedOptions(_this.props, _this.state.selectValue);
		};
		_this.getCategorizedOptions = function() {
			return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
		};
		_this.buildFocusableOptions = function() {
			return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
		};
		_this.getFocusableOptions = function() {
			return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
		};
		_this.ariaOnChange = function(value, actionMeta) {
			_this.setState({ ariaSelection: _objectSpread2({ value }, actionMeta) });
		};
		_this.onMenuMouseDown = function(event) {
			if (event.button !== 0) return;
			event.stopPropagation();
			event.preventDefault();
			_this.focusInput();
		};
		_this.onMenuMouseMove = function(event) {
			_this.blockOptionHover = false;
		};
		_this.onControlMouseDown = function(event) {
			if (event.defaultPrevented) return;
			var openMenuOnClick = _this.props.openMenuOnClick;
			if (!_this.state.isFocused) {
				if (openMenuOnClick) _this.openAfterFocus = true;
				_this.focusInput();
			} else if (!_this.props.menuIsOpen) {
				if (openMenuOnClick) _this.openMenu("first");
			} else if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") _this.onMenuClose();
			if (event.target.tagName !== "INPUT" && event.target.tagName !== "TEXTAREA") event.preventDefault();
		};
		_this.onDropdownIndicatorMouseDown = function(event) {
			if (event && event.type === "mousedown" && event.button !== 0) return;
			if (_this.props.isDisabled) return;
			var _this$props4 = _this.props, isMulti = _this$props4.isMulti, menuIsOpen = _this$props4.menuIsOpen;
			_this.focusInput();
			if (menuIsOpen) {
				_this.setState({ inputIsHiddenAfterUpdate: !isMulti });
				_this.onMenuClose();
			} else _this.openMenu("first");
			event.preventDefault();
		};
		_this.onClearIndicatorMouseDown = function(event) {
			if (event && event.type === "mousedown" && event.button !== 0) return;
			_this.clearValue();
			event.preventDefault();
			_this.openAfterFocus = false;
			if (event.type === "touchend") _this.focusInput();
			else setTimeout(function() {
				return _this.focusInput();
			});
		};
		_this.onScroll = function(event) {
			if (typeof _this.props.closeMenuOnScroll === "boolean") {
				if (event.target instanceof HTMLElement && isDocumentElement(event.target)) _this.props.onMenuClose();
			} else if (typeof _this.props.closeMenuOnScroll === "function") {
				if (_this.props.closeMenuOnScroll(event)) _this.props.onMenuClose();
			}
		};
		_this.onCompositionStart = function() {
			_this.isComposing = true;
		};
		_this.onCompositionEnd = function() {
			_this.isComposing = false;
		};
		_this.onTouchStart = function(_ref2) {
			var touches = _ref2.touches;
			var touch = touches && touches.item(0);
			if (!touch) return;
			_this.initialTouchX = touch.clientX;
			_this.initialTouchY = touch.clientY;
			_this.userIsDragging = false;
		};
		_this.onTouchMove = function(_ref3) {
			var touches = _ref3.touches;
			var touch = touches && touches.item(0);
			if (!touch) return;
			var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
			var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
			var moveThreshold = 5;
			_this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
		};
		_this.onTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) _this.blurInput();
			_this.initialTouchX = 0;
			_this.initialTouchY = 0;
		};
		_this.onControlTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			_this.onControlMouseDown(event);
		};
		_this.onClearIndicatorTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			_this.onClearIndicatorMouseDown(event);
		};
		_this.onDropdownIndicatorTouchEnd = function(event) {
			if (_this.userIsDragging) return;
			_this.onDropdownIndicatorMouseDown(event);
		};
		_this.handleInputChange = function(event) {
			var prevInputValue = _this.props.inputValue;
			var inputValue = event.currentTarget.value;
			_this.setState({ inputIsHiddenAfterUpdate: false });
			_this.onInputChange(inputValue, {
				action: "input-change",
				prevInputValue
			});
			if (!_this.props.menuIsOpen) _this.onMenuOpen();
		};
		_this.onInputFocus = function(event) {
			if (_this.props.onFocus) _this.props.onFocus(event);
			_this.setState({
				inputIsHiddenAfterUpdate: false,
				isFocused: true
			});
			if (_this.openAfterFocus || _this.props.openMenuOnFocus) _this.openMenu("first");
			_this.openAfterFocus = false;
		};
		_this.onInputBlur = function(event) {
			var prevInputValue = _this.props.inputValue;
			if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
				_this.inputRef.focus();
				return;
			}
			if (_this.props.onBlur) _this.props.onBlur(event);
			_this.onInputChange("", {
				action: "input-blur",
				prevInputValue
			});
			_this.onMenuClose();
			_this.setState({
				focusedValue: null,
				isFocused: false
			});
		};
		_this.onOptionHover = function(focusedOption) {
			if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) return;
			var focusedOptionIndex = _this.getFocusableOptions().indexOf(focusedOption);
			_this.setState({
				focusedOption,
				focusedOptionId: focusedOptionIndex > -1 ? _this.getFocusedOptionId(focusedOption) : null
			});
		};
		_this.shouldHideSelectedOptions = function() {
			return shouldHideSelectedOptions(_this.props);
		};
		_this.onValueInputFocus = function(e) {
			e.preventDefault();
			e.stopPropagation();
			_this.focus();
		};
		_this.onKeyDown = function(event) {
			var _this$props5 = _this.props, isMulti = _this$props5.isMulti, backspaceRemovesValue = _this$props5.backspaceRemovesValue, escapeClearsValue = _this$props5.escapeClearsValue, inputValue = _this$props5.inputValue, isClearable = _this$props5.isClearable, isDisabled = _this$props5.isDisabled, menuIsOpen = _this$props5.menuIsOpen, onKeyDown = _this$props5.onKeyDown, tabSelectsValue = _this$props5.tabSelectsValue, openMenuOnFocus = _this$props5.openMenuOnFocus;
			var _this$state = _this.state, focusedOption = _this$state.focusedOption, focusedValue = _this$state.focusedValue, selectValue = _this$state.selectValue;
			if (isDisabled) return;
			if (typeof onKeyDown === "function") {
				onKeyDown(event);
				if (event.defaultPrevented) return;
			}
			_this.blockOptionHover = true;
			switch (event.key) {
				case "ArrowLeft":
					if (!isMulti || inputValue) return;
					_this.focusValue("previous");
					break;
				case "ArrowRight":
					if (!isMulti || inputValue) return;
					_this.focusValue("next");
					break;
				case "Delete":
				case "Backspace":
					if (inputValue) return;
					if (focusedValue) _this.removeValue(focusedValue);
					else {
						if (!backspaceRemovesValue) return;
						if (isMulti) _this.popValue();
						else if (isClearable) _this.clearValue();
					}
					break;
				case "Tab":
					if (_this.isComposing) return;
					if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) return;
					_this.selectOption(focusedOption);
					break;
				case "Enter":
					if (event.keyCode === 229) break;
					if (menuIsOpen) {
						if (!focusedOption) return;
						if (_this.isComposing) return;
						_this.selectOption(focusedOption);
						break;
					}
					return;
				case "Escape":
					if (menuIsOpen) {
						_this.setState({ inputIsHiddenAfterUpdate: false });
						_this.onInputChange("", {
							action: "menu-close",
							prevInputValue: inputValue
						});
						_this.onMenuClose();
					} else if (isClearable && escapeClearsValue) _this.clearValue();
					break;
				case " ":
					if (inputValue) return;
					if (!menuIsOpen) {
						_this.openMenu("first");
						break;
					}
					if (!focusedOption) return;
					_this.selectOption(focusedOption);
					break;
				case "ArrowUp":
					if (menuIsOpen) _this.focusOption("up");
					else _this.openMenu("last");
					break;
				case "ArrowDown":
					if (menuIsOpen) _this.focusOption("down");
					else _this.openMenu("first");
					break;
				case "PageUp":
					if (!menuIsOpen) return;
					_this.focusOption("pageup");
					break;
				case "PageDown":
					if (!menuIsOpen) return;
					_this.focusOption("pagedown");
					break;
				case "Home":
					if (!menuIsOpen) return;
					_this.focusOption("first");
					break;
				case "End":
					if (!menuIsOpen) return;
					_this.focusOption("last");
					break;
				default: return;
			}
			event.preventDefault();
		};
		_this.state.instancePrefix = "react-select-" + (_this.props.instanceId || ++instanceId);
		_this.state.selectValue = cleanValue(_props.value);
		if (_props.menuIsOpen && _this.state.selectValue.length) {
			var focusableOptionsWithIds = _this.getFocusableOptionsWithIds();
			var focusableOptions = _this.buildFocusableOptions();
			var optionIndex = focusableOptions.indexOf(_this.state.selectValue[0]);
			_this.state.focusableOptionsWithIds = focusableOptionsWithIds;
			_this.state.focusedOption = focusableOptions[optionIndex];
			_this.state.focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusableOptions[optionIndex]);
		}
		return _this;
	}
	_createClass(Select, [
		{
			key: "componentDidMount",
			value: function componentDidMount() {
				this.startListeningComposition();
				this.startListeningToTouch();
				if (this.props.closeMenuOnScroll && document && document.addEventListener) document.addEventListener("scroll", this.onScroll, true);
				if (this.props.autoFocus) this.focusInput();
				if (this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef) scrollIntoView(this.menuListRef, this.focusedOptionRef);
				if (isAppleDevice()) this.setState({ isAppleDevice: true });
			}
		},
		{
			key: "componentDidUpdate",
			value: function componentDidUpdate(prevProps) {
				var _this$props6 = this.props, isDisabled = _this$props6.isDisabled, menuIsOpen = _this$props6.menuIsOpen;
				var isFocused = this.state.isFocused;
				if (isFocused && !isDisabled && prevProps.isDisabled || isFocused && menuIsOpen && !prevProps.menuIsOpen) this.focusInput();
				if (isFocused && isDisabled && !prevProps.isDisabled) this.setState({ isFocused: false }, this.onMenuClose);
				else if (!isFocused && !isDisabled && prevProps.isDisabled && this.inputRef === document.activeElement) this.setState({ isFocused: true });
				if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
					scrollIntoView(this.menuListRef, this.focusedOptionRef);
					this.scrollToFocusedOptionOnUpdate = false;
				}
			}
		},
		{
			key: "componentWillUnmount",
			value: function componentWillUnmount() {
				this.stopListeningComposition();
				this.stopListeningToTouch();
				document.removeEventListener("scroll", this.onScroll, true);
			}
		},
		{
			key: "onMenuOpen",
			value: function onMenuOpen() {
				this.props.onMenuOpen();
			}
		},
		{
			key: "onMenuClose",
			value: function onMenuClose() {
				this.onInputChange("", {
					action: "menu-close",
					prevInputValue: this.props.inputValue
				});
				this.props.onMenuClose();
			}
		},
		{
			key: "onInputChange",
			value: function onInputChange(newValue, actionMeta) {
				this.props.onInputChange(newValue, actionMeta);
			}
		},
		{
			key: "focusInput",
			value: function focusInput() {
				if (!this.inputRef) return;
				this.inputRef.focus();
			}
		},
		{
			key: "blurInput",
			value: function blurInput() {
				if (!this.inputRef) return;
				this.inputRef.blur();
			}
		},
		{
			key: "openMenu",
			value: function openMenu(focusOption) {
				var _this2 = this;
				var _this$state2 = this.state, selectValue = _this$state2.selectValue, isFocused = _this$state2.isFocused;
				var focusableOptions = this.buildFocusableOptions();
				var openAtIndex = focusOption === "first" ? 0 : focusableOptions.length - 1;
				if (!this.props.isMulti) {
					var selectedIndex = focusableOptions.indexOf(selectValue[0]);
					if (selectedIndex > -1) openAtIndex = selectedIndex;
				}
				this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
				this.setState({
					inputIsHiddenAfterUpdate: false,
					focusedValue: null,
					focusedOption: focusableOptions[openAtIndex],
					focusedOptionId: this.getFocusedOptionId(focusableOptions[openAtIndex])
				}, function() {
					return _this2.onMenuOpen();
				});
			}
		},
		{
			key: "focusValue",
			value: function focusValue(direction) {
				var _this$state3 = this.state, selectValue = _this$state3.selectValue, focusedValue = _this$state3.focusedValue;
				if (!this.props.isMulti) return;
				this.setState({ focusedOption: null });
				var focusedIndex = selectValue.indexOf(focusedValue);
				if (!focusedValue) focusedIndex = -1;
				var lastIndex = selectValue.length - 1;
				var nextFocus = -1;
				if (!selectValue.length) return;
				switch (direction) {
					case "previous":
						if (focusedIndex === 0) nextFocus = 0;
						else if (focusedIndex === -1) nextFocus = lastIndex;
						else nextFocus = focusedIndex - 1;
						break;
					case "next":
						if (focusedIndex > -1 && focusedIndex < lastIndex) nextFocus = focusedIndex + 1;
						break;
				}
				this.setState({
					inputIsHidden: nextFocus !== -1,
					focusedValue: selectValue[nextFocus]
				});
			}
		},
		{
			key: "focusOption",
			value: function focusOption() {
				var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "first";
				var pageSize = this.props.pageSize;
				var focusedOption = this.state.focusedOption;
				var options = this.getFocusableOptions();
				if (!options.length) return;
				var nextFocus = 0;
				var focusedIndex = options.indexOf(focusedOption);
				if (!focusedOption) focusedIndex = -1;
				if (direction === "up") nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
				else if (direction === "down") nextFocus = (focusedIndex + 1) % options.length;
				else if (direction === "pageup") {
					nextFocus = focusedIndex - pageSize;
					if (nextFocus < 0) nextFocus = 0;
				} else if (direction === "pagedown") {
					nextFocus = focusedIndex + pageSize;
					if (nextFocus > options.length - 1) nextFocus = options.length - 1;
				} else if (direction === "last") nextFocus = options.length - 1;
				this.scrollToFocusedOptionOnUpdate = true;
				this.setState({
					focusedOption: options[nextFocus],
					focusedValue: null,
					focusedOptionId: this.getFocusedOptionId(options[nextFocus])
				});
			}
		},
		{
			key: "getTheme",
			value: function getTheme() {
				if (!this.props.theme) return defaultTheme;
				if (typeof this.props.theme === "function") return this.props.theme(defaultTheme);
				return _objectSpread2(_objectSpread2({}, defaultTheme), this.props.theme);
			}
		},
		{
			key: "getCommonProps",
			value: function getCommonProps() {
				var clearValue = this.clearValue, cx = this.cx, getStyles = this.getStyles, getClassNames = this.getClassNames, getValue = this.getValue, selectOption = this.selectOption, setValue = this.setValue, props = this.props;
				var isMulti = props.isMulti, isRtl = props.isRtl, options = props.options;
				return {
					clearValue,
					cx,
					getStyles,
					getClassNames,
					getValue,
					hasValue: this.hasValue(),
					isMulti,
					isRtl,
					options,
					selectOption,
					selectProps: props,
					setValue,
					theme: this.getTheme()
				};
			}
		},
		{
			key: "hasValue",
			value: function hasValue() {
				return this.state.selectValue.length > 0;
			}
		},
		{
			key: "hasOptions",
			value: function hasOptions() {
				return !!this.getFocusableOptions().length;
			}
		},
		{
			key: "isClearable",
			value: function isClearable() {
				var _this$props7 = this.props, isClearable = _this$props7.isClearable, isMulti = _this$props7.isMulti;
				if (isClearable === void 0) return isMulti;
				return isClearable;
			}
		},
		{
			key: "isOptionDisabled",
			value: function isOptionDisabled(option, selectValue) {
				return _isOptionDisabled(this.props, option, selectValue);
			}
		},
		{
			key: "isOptionSelected",
			value: function isOptionSelected(option, selectValue) {
				return _isOptionSelected(this.props, option, selectValue);
			}
		},
		{
			key: "filterOption",
			value: function filterOption(option, inputValue) {
				return _filterOption(this.props, option, inputValue);
			}
		},
		{
			key: "formatOptionLabel",
			value: function formatOptionLabel(data, context) {
				if (typeof this.props.formatOptionLabel === "function") {
					var _inputValue = this.props.inputValue;
					var _selectValue = this.state.selectValue;
					return this.props.formatOptionLabel(data, {
						context,
						inputValue: _inputValue,
						selectValue: _selectValue
					});
				} else return this.getOptionLabel(data);
			}
		},
		{
			key: "formatGroupLabel",
			value: function formatGroupLabel(data) {
				return this.props.formatGroupLabel(data);
			}
		},
		{
			key: "startListeningComposition",
			value: function startListeningComposition() {
				if (document && document.addEventListener) {
					document.addEventListener("compositionstart", this.onCompositionStart, false);
					document.addEventListener("compositionend", this.onCompositionEnd, false);
				}
			}
		},
		{
			key: "stopListeningComposition",
			value: function stopListeningComposition() {
				if (document && document.removeEventListener) {
					document.removeEventListener("compositionstart", this.onCompositionStart);
					document.removeEventListener("compositionend", this.onCompositionEnd);
				}
			}
		},
		{
			key: "startListeningToTouch",
			value: function startListeningToTouch() {
				if (document && document.addEventListener) {
					document.addEventListener("touchstart", this.onTouchStart, false);
					document.addEventListener("touchmove", this.onTouchMove, false);
					document.addEventListener("touchend", this.onTouchEnd, false);
				}
			}
		},
		{
			key: "stopListeningToTouch",
			value: function stopListeningToTouch() {
				if (document && document.removeEventListener) {
					document.removeEventListener("touchstart", this.onTouchStart);
					document.removeEventListener("touchmove", this.onTouchMove);
					document.removeEventListener("touchend", this.onTouchEnd);
				}
			}
		},
		{
			key: "renderInput",
			value: function renderInput() {
				var _this$props8 = this.props, isDisabled = _this$props8.isDisabled, isSearchable = _this$props8.isSearchable, inputId = _this$props8.inputId, inputValue = _this$props8.inputValue, tabIndex = _this$props8.tabIndex, form = _this$props8.form, menuIsOpen = _this$props8.menuIsOpen, required = _this$props8.required;
				var Input = this.getComponents().Input;
				var _this$state4 = this.state, inputIsHidden = _this$state4.inputIsHidden, ariaSelection = _this$state4.ariaSelection;
				var commonProps = this.commonProps;
				var id = inputId || this.getElementId("input");
				var ariaAttributes = _objectSpread2(_objectSpread2(_objectSpread2({
					"aria-autocomplete": "list",
					"aria-expanded": menuIsOpen,
					"aria-haspopup": true,
					"aria-errormessage": this.props["aria-errormessage"],
					"aria-invalid": this.props["aria-invalid"],
					"aria-label": this.props["aria-label"],
					"aria-labelledby": this.props["aria-labelledby"],
					"aria-required": required,
					role: "combobox",
					"aria-activedescendant": this.state.isAppleDevice ? void 0 : this.state.focusedOptionId || ""
				}, menuIsOpen && { "aria-controls": this.getElementId("listbox") }), !isSearchable && { "aria-readonly": true }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus" && { "aria-describedby": this.getElementId("live-region") } : { "aria-describedby": this.getElementId("placeholder") });
				if (!isSearchable) return /* @__PURE__ */ import_react.createElement(DummyInput, _extends$3({
					id,
					innerRef: this.getInputRef,
					onBlur: this.onInputBlur,
					onChange: noop$1,
					onFocus: this.onInputFocus,
					disabled: isDisabled,
					tabIndex,
					inputMode: "none",
					form,
					value: ""
				}, ariaAttributes));
				return /* @__PURE__ */ import_react.createElement(Input, _extends$3({}, commonProps, {
					autoCapitalize: "none",
					autoComplete: "off",
					autoCorrect: "off",
					id,
					innerRef: this.getInputRef,
					isDisabled,
					isHidden: inputIsHidden,
					onBlur: this.onInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.onInputFocus,
					spellCheck: "false",
					tabIndex,
					form,
					type: "text",
					value: inputValue
				}, ariaAttributes));
			}
		},
		{
			key: "renderPlaceholderOrValue",
			value: function renderPlaceholderOrValue() {
				var _this3 = this;
				var _this$getComponents2 = this.getComponents(), MultiValue = _this$getComponents2.MultiValue, MultiValueContainer = _this$getComponents2.MultiValueContainer, MultiValueLabel = _this$getComponents2.MultiValueLabel, MultiValueRemove = _this$getComponents2.MultiValueRemove, SingleValue = _this$getComponents2.SingleValue, Placeholder = _this$getComponents2.Placeholder;
				var commonProps = this.commonProps;
				var _this$props9 = this.props, controlShouldRenderValue = _this$props9.controlShouldRenderValue, isDisabled = _this$props9.isDisabled, isMulti = _this$props9.isMulti, inputValue = _this$props9.inputValue, placeholder = _this$props9.placeholder;
				var _this$state5 = this.state, selectValue = _this$state5.selectValue, focusedValue = _this$state5.focusedValue, isFocused = _this$state5.isFocused;
				if (!this.hasValue() || !controlShouldRenderValue) return inputValue ? null : /* @__PURE__ */ import_react.createElement(Placeholder, _extends$3({}, commonProps, {
					key: "placeholder",
					isDisabled,
					isFocused,
					innerProps: { id: this.getElementId("placeholder") }
				}), placeholder);
				if (isMulti) return selectValue.map(function(opt, index) {
					var isOptionFocused = opt === focusedValue;
					var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
					return /* @__PURE__ */ import_react.createElement(MultiValue, _extends$3({}, commonProps, {
						components: {
							Container: MultiValueContainer,
							Label: MultiValueLabel,
							Remove: MultiValueRemove
						},
						isFocused: isOptionFocused,
						isDisabled,
						key,
						index,
						removeProps: {
							onClick: function onClick() {
								return _this3.removeValue(opt);
							},
							onTouchEnd: function onTouchEnd() {
								return _this3.removeValue(opt);
							},
							onMouseDown: function onMouseDown(e) {
								e.preventDefault();
							}
						},
						data: opt
					}), _this3.formatOptionLabel(opt, "value"));
				});
				if (inputValue) return null;
				var singleValue = selectValue[0];
				return /* @__PURE__ */ import_react.createElement(SingleValue, _extends$3({}, commonProps, {
					data: singleValue,
					isDisabled
				}), this.formatOptionLabel(singleValue, "value"));
			}
		},
		{
			key: "renderClearIndicator",
			value: function renderClearIndicator() {
				var ClearIndicator = this.getComponents().ClearIndicator;
				var commonProps = this.commonProps;
				var _this$props10 = this.props, isDisabled = _this$props10.isDisabled, isLoading = _this$props10.isLoading;
				var isFocused = this.state.isFocused;
				if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) return null;
				var innerProps = {
					onMouseDown: this.onClearIndicatorMouseDown,
					onTouchEnd: this.onClearIndicatorTouchEnd,
					"aria-hidden": "true"
				};
				return /* @__PURE__ */ import_react.createElement(ClearIndicator, _extends$3({}, commonProps, {
					innerProps,
					isFocused
				}));
			}
		},
		{
			key: "renderLoadingIndicator",
			value: function renderLoadingIndicator() {
				var LoadingIndicator = this.getComponents().LoadingIndicator;
				var commonProps = this.commonProps;
				var _this$props11 = this.props, isDisabled = _this$props11.isDisabled, isLoading = _this$props11.isLoading;
				var isFocused = this.state.isFocused;
				if (!LoadingIndicator || !isLoading) return null;
				return /* @__PURE__ */ import_react.createElement(LoadingIndicator, _extends$3({}, commonProps, {
					innerProps: { "aria-hidden": "true" },
					isDisabled,
					isFocused
				}));
			}
		},
		{
			key: "renderIndicatorSeparator",
			value: function renderIndicatorSeparator() {
				var _this$getComponents5 = this.getComponents(), DropdownIndicator = _this$getComponents5.DropdownIndicator, IndicatorSeparator = _this$getComponents5.IndicatorSeparator;
				if (!DropdownIndicator || !IndicatorSeparator) return null;
				var commonProps = this.commonProps;
				var isDisabled = this.props.isDisabled;
				var isFocused = this.state.isFocused;
				return /* @__PURE__ */ import_react.createElement(IndicatorSeparator, _extends$3({}, commonProps, {
					isDisabled,
					isFocused
				}));
			}
		},
		{
			key: "renderDropdownIndicator",
			value: function renderDropdownIndicator() {
				var DropdownIndicator = this.getComponents().DropdownIndicator;
				if (!DropdownIndicator) return null;
				var commonProps = this.commonProps;
				var isDisabled = this.props.isDisabled;
				var isFocused = this.state.isFocused;
				var innerProps = {
					onMouseDown: this.onDropdownIndicatorMouseDown,
					onTouchEnd: this.onDropdownIndicatorTouchEnd,
					"aria-hidden": "true"
				};
				return /* @__PURE__ */ import_react.createElement(DropdownIndicator, _extends$3({}, commonProps, {
					innerProps,
					isDisabled,
					isFocused
				}));
			}
		},
		{
			key: "renderMenu",
			value: function renderMenu() {
				var _this4 = this;
				var _this$getComponents7 = this.getComponents(), Group = _this$getComponents7.Group, GroupHeading = _this$getComponents7.GroupHeading, Menu = _this$getComponents7.Menu, MenuList = _this$getComponents7.MenuList, MenuPortal = _this$getComponents7.MenuPortal, LoadingMessage = _this$getComponents7.LoadingMessage, NoOptionsMessage = _this$getComponents7.NoOptionsMessage, Option = _this$getComponents7.Option;
				var commonProps = this.commonProps;
				var focusedOption = this.state.focusedOption;
				var _this$props12 = this.props, captureMenuScroll = _this$props12.captureMenuScroll, inputValue = _this$props12.inputValue, isLoading = _this$props12.isLoading, loadingMessage = _this$props12.loadingMessage, minMenuHeight = _this$props12.minMenuHeight, maxMenuHeight = _this$props12.maxMenuHeight, menuIsOpen = _this$props12.menuIsOpen, menuPlacement = _this$props12.menuPlacement, menuPosition = _this$props12.menuPosition, menuPortalTarget = _this$props12.menuPortalTarget, menuShouldBlockScroll = _this$props12.menuShouldBlockScroll, menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView, noOptionsMessage = _this$props12.noOptionsMessage, onMenuScrollToTop = _this$props12.onMenuScrollToTop, onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
				if (!menuIsOpen) return null;
				var render = function render(props, id) {
					var type = props.type, data = props.data, isDisabled = props.isDisabled, isSelected = props.isSelected, label = props.label, value = props.value;
					var isFocused = focusedOption === data;
					var onHover = isDisabled ? void 0 : function() {
						return _this4.onOptionHover(data);
					};
					var onSelect = isDisabled ? void 0 : function() {
						return _this4.selectOption(data);
					};
					var optionId = "".concat(_this4.getElementId("option"), "-").concat(id);
					var innerProps = {
						id: optionId,
						onClick: onSelect,
						onMouseMove: onHover,
						onMouseOver: onHover,
						tabIndex: -1,
						role: "option",
						"aria-selected": _this4.state.isAppleDevice ? void 0 : isSelected
					};
					return /* @__PURE__ */ import_react.createElement(Option, _extends$3({}, commonProps, {
						innerProps,
						data,
						isDisabled,
						isSelected,
						key: optionId,
						label,
						type,
						value,
						isFocused,
						innerRef: isFocused ? _this4.getFocusedOptionRef : void 0
					}), _this4.formatOptionLabel(props.data, "menu"));
				};
				var menuUI;
				if (this.hasOptions()) menuUI = this.getCategorizedOptions().map(function(item) {
					if (item.type === "group") {
						var _data = item.data, options = item.options, groupIndex = item.index;
						var groupId = "".concat(_this4.getElementId("group"), "-").concat(groupIndex);
						var headingId = "".concat(groupId, "-heading");
						return /* @__PURE__ */ import_react.createElement(Group, _extends$3({}, commonProps, {
							key: groupId,
							data: _data,
							options,
							Heading: GroupHeading,
							headingProps: {
								id: headingId,
								data: item.data
							},
							label: _this4.formatGroupLabel(item.data)
						}), item.options.map(function(option) {
							return render(option, "".concat(groupIndex, "-").concat(option.index));
						}));
					} else if (item.type === "option") return render(item, "".concat(item.index));
				});
				else if (isLoading) {
					var message = loadingMessage({ inputValue });
					if (message === null) return null;
					menuUI = /* @__PURE__ */ import_react.createElement(LoadingMessage, commonProps, message);
				} else {
					var _message = noOptionsMessage({ inputValue });
					if (_message === null) return null;
					menuUI = /* @__PURE__ */ import_react.createElement(NoOptionsMessage, commonProps, _message);
				}
				var menuPlacementProps = {
					minMenuHeight,
					maxMenuHeight,
					menuPlacement,
					menuPosition,
					menuShouldScrollIntoView
				};
				var menuElement = /* @__PURE__ */ import_react.createElement(MenuPlacer, _extends$3({}, commonProps, menuPlacementProps), function(_ref4) {
					var ref = _ref4.ref, _ref4$placerProps = _ref4.placerProps, placement = _ref4$placerProps.placement, maxHeight = _ref4$placerProps.maxHeight;
					return /* @__PURE__ */ import_react.createElement(Menu, _extends$3({}, commonProps, menuPlacementProps, {
						innerRef: ref,
						innerProps: {
							onMouseDown: _this4.onMenuMouseDown,
							onMouseMove: _this4.onMenuMouseMove
						},
						isLoading,
						placement
					}), /* @__PURE__ */ import_react.createElement(ScrollManager, {
						captureEnabled: captureMenuScroll,
						onTopArrive: onMenuScrollToTop,
						onBottomArrive: onMenuScrollToBottom,
						lockEnabled: menuShouldBlockScroll
					}, function(scrollTargetRef) {
						return /* @__PURE__ */ import_react.createElement(MenuList, _extends$3({}, commonProps, {
							innerRef: function innerRef(instance) {
								_this4.getMenuListRef(instance);
								scrollTargetRef(instance);
							},
							innerProps: {
								role: "listbox",
								"aria-multiselectable": commonProps.isMulti,
								id: _this4.getElementId("listbox")
							},
							isLoading,
							maxHeight,
							focusedOption
						}), menuUI);
					}));
				});
				return menuPortalTarget || menuPosition === "fixed" ? /* @__PURE__ */ import_react.createElement(MenuPortal, _extends$3({}, commonProps, {
					appendTo: menuPortalTarget,
					controlElement: this.controlRef,
					menuPlacement,
					menuPosition
				}), menuElement) : menuElement;
			}
		},
		{
			key: "renderFormField",
			value: function renderFormField() {
				var _this5 = this;
				var _this$props13 = this.props, delimiter = _this$props13.delimiter, isDisabled = _this$props13.isDisabled, isMulti = _this$props13.isMulti, name = _this$props13.name, required = _this$props13.required;
				var selectValue = this.state.selectValue;
				if (required && !this.hasValue() && !isDisabled) return /* @__PURE__ */ import_react.createElement(RequiredInput$1, {
					name,
					onFocus: this.onValueInputFocus
				});
				if (!name || isDisabled) return;
				if (isMulti) if (delimiter) {
					var value = selectValue.map(function(opt) {
						return _this5.getOptionValue(opt);
					}).join(delimiter);
					return /* @__PURE__ */ import_react.createElement("input", {
						name,
						type: "hidden",
						value
					});
				} else {
					var input = selectValue.length > 0 ? selectValue.map(function(opt, i) {
						return /* @__PURE__ */ import_react.createElement("input", {
							key: "i-".concat(i),
							name,
							type: "hidden",
							value: _this5.getOptionValue(opt)
						});
					}) : /* @__PURE__ */ import_react.createElement("input", {
						name,
						type: "hidden",
						value: ""
					});
					return /* @__PURE__ */ import_react.createElement("div", null, input);
				}
				else {
					var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : "";
					return /* @__PURE__ */ import_react.createElement("input", {
						name,
						type: "hidden",
						value: _value
					});
				}
			}
		},
		{
			key: "renderLiveRegion",
			value: function renderLiveRegion() {
				var commonProps = this.commonProps;
				var _this$state6 = this.state, ariaSelection = _this$state6.ariaSelection, focusedOption = _this$state6.focusedOption, focusedValue = _this$state6.focusedValue, isFocused = _this$state6.isFocused, selectValue = _this$state6.selectValue;
				var focusableOptions = this.getFocusableOptions();
				return /* @__PURE__ */ import_react.createElement(LiveRegion$1, _extends$3({}, commonProps, {
					id: this.getElementId("live-region"),
					ariaSelection,
					focusedOption,
					focusedValue,
					isFocused,
					selectValue,
					focusableOptions,
					isAppleDevice: this.state.isAppleDevice
				}));
			}
		},
		{
			key: "render",
			value: function render() {
				var _this$getComponents8 = this.getComponents(), Control = _this$getComponents8.Control, IndicatorsContainer = _this$getComponents8.IndicatorsContainer, SelectContainer = _this$getComponents8.SelectContainer, ValueContainer = _this$getComponents8.ValueContainer;
				var _this$props14 = this.props, className = _this$props14.className, id = _this$props14.id, isDisabled = _this$props14.isDisabled, menuIsOpen = _this$props14.menuIsOpen;
				var isFocused = this.state.isFocused;
				var commonProps = this.commonProps = this.getCommonProps();
				return /* @__PURE__ */ import_react.createElement(SelectContainer, _extends$3({}, commonProps, {
					className,
					innerProps: {
						id,
						onKeyDown: this.onKeyDown
					},
					isDisabled,
					isFocused
				}), this.renderLiveRegion(), /* @__PURE__ */ import_react.createElement(Control, _extends$3({}, commonProps, {
					innerRef: this.getControlRef,
					innerProps: {
						onMouseDown: this.onControlMouseDown,
						onTouchEnd: this.onControlTouchEnd
					},
					isDisabled,
					isFocused,
					menuIsOpen
				}), /* @__PURE__ */ import_react.createElement(ValueContainer, _extends$3({}, commonProps, { isDisabled }), this.renderPlaceholderOrValue(), this.renderInput()), /* @__PURE__ */ import_react.createElement(IndicatorsContainer, _extends$3({}, commonProps, { isDisabled }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
			}
		}
	], [{
		key: "getDerivedStateFromProps",
		value: function getDerivedStateFromProps(props, state) {
			var prevProps = state.prevProps, clearFocusValueOnUpdate = state.clearFocusValueOnUpdate, inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate, ariaSelection = state.ariaSelection, isFocused = state.isFocused, prevWasFocused = state.prevWasFocused, instancePrefix = state.instancePrefix;
			var options = props.options, value = props.value, menuIsOpen = props.menuIsOpen, inputValue = props.inputValue, isMulti = props.isMulti;
			var selectValue = cleanValue(value);
			var newMenuOptionsState = {};
			if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
				var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
				var focusableOptionsWithIds = menuIsOpen ? buildFocusableOptionsWithIds(buildCategorizedOptions(props, selectValue), "".concat(instancePrefix, "-option")) : [];
				var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
				var focusedOption = getNextFocusedOption(state, focusableOptions);
				newMenuOptionsState = {
					selectValue,
					focusedOption,
					focusedOptionId: getFocusedOptionId(focusableOptionsWithIds, focusedOption),
					focusableOptionsWithIds,
					focusedValue,
					clearFocusValueOnUpdate: false
				};
			}
			var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
				inputIsHidden: inputIsHiddenAfterUpdate,
				inputIsHiddenAfterUpdate: void 0
			} : {};
			var newAriaSelection = ariaSelection;
			var hasKeptFocus = isFocused && prevWasFocused;
			if (isFocused && !hasKeptFocus) {
				newAriaSelection = {
					value: valueTernary(isMulti, selectValue, selectValue[0] || null),
					options: selectValue,
					action: "initial-input-focus"
				};
				hasKeptFocus = !prevWasFocused;
			}
			if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === "initial-input-focus") newAriaSelection = null;
			return _objectSpread2(_objectSpread2(_objectSpread2({}, newMenuOptionsState), newInputIsHiddenState), {}, {
				prevProps: props,
				ariaSelection: newAriaSelection,
				prevWasFocused: hasKeptFocus
			});
		}
	}]);
	return Select;
}(import_react.Component);
Select.defaultProps = defaultProps;
//#endregion
//#region node_modules/react-select/dist/react-select.esm.js
var StateManagedSelect$1 = /* @__PURE__ */ (0, import_react.forwardRef)(function(props, ref) {
	var baseSelectProps = useStateManager(props);
	return /* @__PURE__ */ import_react.createElement(Select, _extends$3({ ref }, baseSelectProps));
});
//#endregion
//#region node_modules/react-webcam/dist/react-webcam.js
var require_react_webcam = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function webpackUniversalModuleDefinition(root, factory) {
		if (typeof exports === "object" && typeof module === "object") module.exports = factory(require_react());
		else if (typeof define === "function" && define.amd) define(["react"], factory);
		else if (typeof exports === "object") exports["Webcam"] = factory(require_react());
		else root["Webcam"] = factory(root["React"]);
	})(exports, function(__WEBPACK_EXTERNAL_MODULE_react__) {
		return (function(modules) {
			var installedModules = {};
			function __webpack_require__(moduleId) {
				if (installedModules[moduleId]) return installedModules[moduleId].exports;
				var module$1 = installedModules[moduleId] = {
					i: moduleId,
					l: false,
					exports: {}
				};
				modules[moduleId].call(module$1.exports, module$1, module$1.exports, __webpack_require__);
				module$1.l = true;
				return module$1.exports;
			}
			__webpack_require__.m = modules;
			__webpack_require__.c = installedModules;
			__webpack_require__.d = function(exports$1, name, getter) {
				if (!__webpack_require__.o(exports$1, name)) Object.defineProperty(exports$1, name, {
					enumerable: true,
					get: getter
				});
			};
			__webpack_require__.r = function(exports$2) {
				if (typeof Symbol !== "undefined" && Symbol.toStringTag) Object.defineProperty(exports$2, Symbol.toStringTag, { value: "Module" });
				Object.defineProperty(exports$2, "__esModule", { value: true });
			};
			__webpack_require__.t = function(value, mode) {
				if (mode & 1) value = __webpack_require__(value);
				if (mode & 8) return value;
				if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
				var ns = Object.create(null);
				__webpack_require__.r(ns);
				Object.defineProperty(ns, "default", {
					enumerable: true,
					value
				});
				if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, function(key) {
					return value[key];
				}.bind(null, key));
				return ns;
			};
			__webpack_require__.n = function(module$2) {
				var getter = module$2 && module$2.__esModule ? function getDefault() {
					return module$2["default"];
				} : function getModuleExports() {
					return module$2;
				};
				__webpack_require__.d(getter, "a", getter);
				return getter;
			};
			__webpack_require__.o = function(object, property) {
				return Object.prototype.hasOwnProperty.call(object, property);
			};
			__webpack_require__.p = "";
			return __webpack_require__(__webpack_require__.s = "./src/react-webcam.tsx");
		})({
			"./src/react-webcam.tsx": (function(module$3, __webpack_exports__, __webpack_require__) {
				"use strict";
				/*!******************************!*\
				!*** ./src/react-webcam.tsx ***!
				\******************************/
				/*! exports provided: default */
				__webpack_require__.r(__webpack_exports__);
				var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
					/*! react */
					"react"
				);
				var __extends = (function() {
					var extendStatics = function(d, b) {
						extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
							d.__proto__ = b;
						} || function(d, b) {
							for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
						};
						return extendStatics(d, b);
					};
					return function(d, b) {
						extendStatics(d, b);
						function __() {
							this.constructor = d;
						}
						d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
					};
				})();
				var __assign = function() {
					__assign = Object.assign || function(t) {
						for (var s, i = 1, n = arguments.length; i < n; i++) {
							s = arguments[i];
							for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
						}
						return t;
					};
					return __assign.apply(this, arguments);
				};
				var __rest = function(s, e) {
					var t = {};
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
					if (s != null && typeof Object.getOwnPropertySymbols === "function") {
						for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
					}
					return t;
				};
				(function polyfillGetUserMedia() {
					if (typeof window === "undefined") return;
					if (navigator.mediaDevices === void 0) navigator.mediaDevices = {};
					if (navigator.mediaDevices.getUserMedia === void 0) navigator.mediaDevices.getUserMedia = function(constraints) {
						var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
						if (!getUserMedia) return Promise.reject(/* @__PURE__ */ new Error("getUserMedia is not implemented in this browser"));
						return new Promise(function(resolve, reject) {
							getUserMedia.call(navigator, constraints, resolve, reject);
						});
					};
				})();
				function hasGetUserMedia() {
					return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
				}
				__webpack_exports__["default"] = function(_super) {
					__extends(Webcam, _super);
					function Webcam(props) {
						var _this = _super.call(this, props) || this;
						_this.canvas = null;
						_this.ctx = null;
						_this.requestUserMediaId = 0;
						_this.unmounted = false;
						_this.state = { hasUserMedia: false };
						return _this;
					}
					Webcam.prototype.componentDidMount = function() {
						var _a = this, state = _a.state, props = _a.props;
						this.unmounted = false;
						if (!hasGetUserMedia()) {
							props.onUserMediaError("getUserMedia not supported");
							return;
						}
						if (!state.hasUserMedia) this.requestUserMedia();
						if (props.children && typeof props.children != "function") console.warn("children must be a function");
					};
					Webcam.prototype.componentDidUpdate = function(nextProps) {
						var props = this.props;
						if (!hasGetUserMedia()) {
							props.onUserMediaError("getUserMedia not supported");
							return;
						}
						var audioConstraintsChanged = JSON.stringify(nextProps.audioConstraints) !== JSON.stringify(props.audioConstraints);
						var videoConstraintsChanged = JSON.stringify(nextProps.videoConstraints) !== JSON.stringify(props.videoConstraints);
						var minScreenshotWidthChanged = nextProps.minScreenshotWidth !== props.minScreenshotWidth;
						var minScreenshotHeightChanged = nextProps.minScreenshotHeight !== props.minScreenshotHeight;
						if (videoConstraintsChanged || minScreenshotWidthChanged || minScreenshotHeightChanged) {
							this.canvas = null;
							this.ctx = null;
						}
						if (audioConstraintsChanged || videoConstraintsChanged) {
							this.stopAndCleanup();
							this.requestUserMedia();
						}
					};
					Webcam.prototype.componentWillUnmount = function() {
						this.unmounted = true;
						this.stopAndCleanup();
					};
					Webcam.stopMediaStream = function(stream) {
						if (stream) if (stream.getVideoTracks && stream.getAudioTracks) {
							stream.getVideoTracks().map(function(track) {
								stream.removeTrack(track);
								track.stop();
							});
							stream.getAudioTracks().map(function(track) {
								stream.removeTrack(track);
								track.stop();
							});
						} else stream.stop();
					};
					Webcam.prototype.stopAndCleanup = function() {
						var state = this.state;
						if (state.hasUserMedia) {
							Webcam.stopMediaStream(this.stream);
							if (state.src) window.URL.revokeObjectURL(state.src);
						}
					};
					Webcam.prototype.getScreenshot = function(screenshotDimensions) {
						var _a = this, state = _a.state, props = _a.props;
						if (!state.hasUserMedia) return null;
						var canvas = this.getCanvas(screenshotDimensions);
						return canvas && canvas.toDataURL(props.screenshotFormat, props.screenshotQuality);
					};
					Webcam.prototype.getCanvas = function(screenshotDimensions) {
						var _a = this, state = _a.state, props = _a.props;
						if (!this.video) return null;
						if (!state.hasUserMedia || !this.video.videoHeight) return null;
						if (!this.ctx) {
							var canvasWidth = this.video.videoWidth;
							var canvasHeight = this.video.videoHeight;
							if (!this.props.forceScreenshotSourceSize) {
								var aspectRatio = canvasWidth / canvasHeight;
								canvasWidth = props.minScreenshotWidth || this.video.clientWidth;
								canvasHeight = canvasWidth / aspectRatio;
								if (props.minScreenshotHeight && canvasHeight < props.minScreenshotHeight) {
									canvasHeight = props.minScreenshotHeight;
									canvasWidth = canvasHeight * aspectRatio;
								}
							}
							this.canvas = document.createElement("canvas");
							this.canvas.width = (screenshotDimensions === null || screenshotDimensions === void 0 ? void 0 : screenshotDimensions.width) || canvasWidth;
							this.canvas.height = (screenshotDimensions === null || screenshotDimensions === void 0 ? void 0 : screenshotDimensions.height) || canvasHeight;
							this.ctx = this.canvas.getContext("2d");
						}
						var _b = this, ctx = _b.ctx, canvas = _b.canvas;
						if (ctx && canvas) {
							canvas.width = (screenshotDimensions === null || screenshotDimensions === void 0 ? void 0 : screenshotDimensions.width) || canvas.width;
							canvas.height = (screenshotDimensions === null || screenshotDimensions === void 0 ? void 0 : screenshotDimensions.height) || canvas.height;
							if (props.mirrored) {
								ctx.translate(canvas.width, 0);
								ctx.scale(-1, 1);
							}
							ctx.imageSmoothingEnabled = props.imageSmoothing;
							ctx.drawImage(this.video, 0, 0, (screenshotDimensions === null || screenshotDimensions === void 0 ? void 0 : screenshotDimensions.width) || canvas.width, (screenshotDimensions === null || screenshotDimensions === void 0 ? void 0 : screenshotDimensions.height) || canvas.height);
							if (props.mirrored) {
								ctx.scale(-1, 1);
								ctx.translate(-canvas.width, 0);
							}
						}
						return canvas;
					};
					Webcam.prototype.requestUserMedia = function() {
						var _this = this;
						var props = this.props;
						var sourceSelected = function(audioConstraints, videoConstraints) {
							var constraints = { video: typeof videoConstraints !== "undefined" ? videoConstraints : true };
							if (props.audio) constraints.audio = typeof audioConstraints !== "undefined" ? audioConstraints : true;
							_this.requestUserMediaId++;
							var myRequestUserMediaId = _this.requestUserMediaId;
							navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
								if (_this.unmounted || myRequestUserMediaId !== _this.requestUserMediaId) Webcam.stopMediaStream(stream);
								else _this.handleUserMedia(null, stream);
							}).catch(function(e) {
								_this.handleUserMedia(e);
							});
						};
						if ("mediaDevices" in navigator) sourceSelected(props.audioConstraints, props.videoConstraints);
						else {
							var optionalSource_1 = function(id) {
								return { optional: [{ sourceId: id }] };
							};
							var constraintToSourceId_1 = function(constraint) {
								var deviceId = constraint.deviceId;
								if (typeof deviceId === "string") return deviceId;
								if (Array.isArray(deviceId) && deviceId.length > 0) return deviceId[0];
								if (typeof deviceId === "object" && deviceId.ideal) return deviceId.ideal;
								return null;
							};
							MediaStreamTrack.getSources(function(sources) {
								var audioSource = null;
								var videoSource = null;
								sources.forEach(function(source) {
									if (source.kind === "audio") audioSource = source.id;
									else if (source.kind === "video") videoSource = source.id;
								});
								var audioSourceId = constraintToSourceId_1(props.audioConstraints);
								if (audioSourceId) audioSource = audioSourceId;
								var videoSourceId = constraintToSourceId_1(props.videoConstraints);
								if (videoSourceId) videoSource = videoSourceId;
								sourceSelected(optionalSource_1(audioSource), optionalSource_1(videoSource));
							});
						}
					};
					Webcam.prototype.handleUserMedia = function(err, stream) {
						var props = this.props;
						if (err || !stream) {
							this.setState({ hasUserMedia: false });
							props.onUserMediaError(err);
							return;
						}
						this.stream = stream;
						try {
							if (this.video) this.video.srcObject = stream;
							this.setState({ hasUserMedia: true });
						} catch (error) {
							this.setState({
								hasUserMedia: true,
								src: window.URL.createObjectURL(stream)
							});
						}
						props.onUserMedia(stream);
					};
					Webcam.prototype.render = function() {
						var _this = this;
						var _a = this, state = _a.state, props = _a.props, audio = props.audio;
						props.forceScreenshotSourceSize;
						var disablePictureInPicture = props.disablePictureInPicture;
						props.onUserMedia;
						props.onUserMediaError;
						props.screenshotFormat;
						props.screenshotQuality;
						props.minScreenshotWidth;
						props.minScreenshotHeight;
						props.audioConstraints;
						props.videoConstraints;
						props.imageSmoothing;
						var mirrored = props.mirrored, _b = props.style, style = _b === void 0 ? {} : _b, children = props.children, rest = __rest(props, [
							"audio",
							"forceScreenshotSourceSize",
							"disablePictureInPicture",
							"onUserMedia",
							"onUserMediaError",
							"screenshotFormat",
							"screenshotQuality",
							"minScreenshotWidth",
							"minScreenshotHeight",
							"audioConstraints",
							"videoConstraints",
							"imageSmoothing",
							"mirrored",
							"style",
							"children"
						]);
						var videoStyle = mirrored ? __assign(__assign({}, style), { transform: (style.transform || "") + " scaleX(-1)" }) : style;
						var childrenProps = { getScreenshot: this.getScreenshot.bind(this) };
						return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("video", __assign({
							autoPlay: true,
							disablePictureInPicture,
							src: state.src,
							muted: !audio,
							playsInline: true,
							ref: function(ref) {
								_this.video = ref;
							},
							style: videoStyle
						}, rest)), children && children(childrenProps));
					};
					Webcam.defaultProps = {
						audio: false,
						disablePictureInPicture: false,
						forceScreenshotSourceSize: false,
						imageSmoothing: true,
						mirrored: false,
						onUserMedia: function() {},
						onUserMediaError: function() {},
						screenshotFormat: "image/webp",
						screenshotQuality: .92
					};
					return Webcam;
				}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);
			}),
			"react": (function(module$4, exports$3) {
				/*!**************************************************************************************!*\
				!*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
				\**************************************************************************************/
				/*! no static exports found */
				module$4.exports = __WEBPACK_EXTERNAL_MODULE_react__;
			})
		})["default"];
	});
}));
//#endregion
//#region node_modules/react-number-format/dist/react-number-format.es.js
/**
* react-number-format - 5.4.5
* Author : Sudhanshu Yadav
* Copyright (c) 2016, 2026 to Sudhanshu Yadav, released under the MIT license.
* https://github.com/s-yadav/react-number-format
*/
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
var SourceType;
(function(SourceType) {
	SourceType["event"] = "event";
	SourceType["props"] = "prop";
})(SourceType || (SourceType = {}));
function noop() {}
function memoizeOnce(cb) {
	var lastArgs;
	var lastValue = void 0;
	return function() {
		var args = [], len = arguments.length;
		while (len--) args[len] = arguments[len];
		if (lastArgs && args.length === lastArgs.length && args.every(function(value, index) {
			return value === lastArgs[index];
		})) return lastValue;
		lastArgs = args;
		lastValue = cb.apply(void 0, args);
		return lastValue;
	};
}
function charIsNumber(char) {
	return !!(char || "").match(/\d/);
}
function isNil(val) {
	return val === null || val === void 0;
}
function isNanValue(val) {
	return typeof val === "number" && isNaN(val);
}
function isNotValidValue(val) {
	return isNil(val) || isNanValue(val) || typeof val === "number" && !isFinite(val);
}
function escapeRegExp(str) {
	return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function getThousandsGroupRegex(thousandsGroupStyle) {
	switch (thousandsGroupStyle) {
		case "lakh": return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
		case "wan": return /(\d)(?=(\d{4})+(?!\d))/g;
		default: return /(\d)(?=(\d{3})+(?!\d))/g;
	}
}
function applyThousandSeparator(str, thousandSeparator, thousandsGroupStyle) {
	var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
	var index = str.search(/[1-9]/);
	index = index === -1 ? str.length : index;
	return str.substring(0, index) + str.substring(index, str.length).replace(thousandsGroupRegex, "$1" + thousandSeparator);
}
function usePersistentCallback(cb) {
	var callbackRef = (0, import_react.useRef)(cb);
	callbackRef.current = cb;
	return (0, import_react.useRef)(function() {
		var args = [], len = arguments.length;
		while (len--) args[len] = arguments[len];
		return callbackRef.current.apply(callbackRef, args);
	}).current;
}
function splitDecimal(numStr, allowNegative) {
	if (allowNegative === void 0) allowNegative = true;
	var hasNegation = numStr[0] === "-";
	var addNegation = hasNegation && allowNegative;
	numStr = numStr.replace("-", "");
	var parts = numStr.split(".");
	return {
		beforeDecimal: parts[0],
		afterDecimal: parts[1] || "",
		hasNegation,
		addNegation
	};
}
function fixLeadingZero(numStr) {
	if (!numStr) return numStr;
	var isNegative = numStr[0] === "-";
	if (isNegative) numStr = numStr.substring(1, numStr.length);
	var parts = numStr.split(".");
	var beforeDecimal = parts[0].replace(/^0+/, "") || "0";
	var afterDecimal = parts[1] || "";
	return (isNegative ? "-" : "") + beforeDecimal + (afterDecimal ? "." + afterDecimal : "");
}
/**
* limit decimal numbers to given scale
* Not used .fixedTo because that will break with big numbers
*/
function limitToScale(numStr, scale, fixedDecimalScale) {
	var str = "";
	var filler = fixedDecimalScale ? "0" : "";
	for (var i = 0; i <= scale - 1; i++) str += numStr[i] || filler;
	return str;
}
function repeat(str, count) {
	return Array(count + 1).join(str);
}
function toNumericString(num) {
	var _num = num + "";
	var sign = _num[0] === "-" ? "-" : "";
	if (sign) _num = _num.substring(1);
	var ref = _num.split(/[eE]/g);
	var coefficient = ref[0];
	var exponent = ref[1];
	exponent = Number(exponent);
	if (!exponent) return sign + coefficient;
	coefficient = coefficient.replace(".", "");
	/**
	* for scientific notation the current decimal index will be after first number (index 0)
	* So effective decimal index will always be 1 + exponent value
	*/
	var decimalIndex = 1 + exponent;
	var coffiecientLn = coefficient.length;
	if (decimalIndex < 0) coefficient = "0." + repeat("0", Math.abs(decimalIndex)) + coefficient;
	else if (decimalIndex >= coffiecientLn) coefficient = coefficient + repeat("0", decimalIndex - coffiecientLn);
	else coefficient = (coefficient.substring(0, decimalIndex) || "0") + "." + coefficient.substring(decimalIndex);
	return sign + coefficient;
}
/**
* This method is required to round prop value to given scale.
* Not used .round or .fixedTo because that will break with big numbers
*/
function roundToPrecision(numStr, scale, fixedDecimalScale) {
	if (["", "-"].indexOf(numStr) !== -1) return numStr;
	var shouldHaveDecimalSeparator = (numStr.indexOf(".") !== -1 || fixedDecimalScale) && scale;
	var ref = splitDecimal(numStr);
	var beforeDecimal = ref.beforeDecimal;
	var afterDecimal = ref.afterDecimal;
	var hasNegation = ref.hasNegation;
	var floatValue = parseFloat("0." + (afterDecimal || "0"));
	var roundedDecimalParts = (afterDecimal.length <= scale ? "0." + afterDecimal : floatValue.toFixed(scale)).split(".");
	var intPart = beforeDecimal;
	if (beforeDecimal && Number(roundedDecimalParts[0])) intPart = beforeDecimal.split("").reverse().reduce(function(roundedStr, current, idx) {
		if (roundedStr.length > idx) return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
		return current + roundedStr;
	}, roundedDecimalParts[0]);
	var decimalPart = limitToScale(roundedDecimalParts[1] || "", scale, fixedDecimalScale);
	var negation = hasNegation ? "-" : "";
	var decimalSeparator = shouldHaveDecimalSeparator ? "." : "";
	return "" + negation + intPart + decimalSeparator + decimalPart;
}
/** set the caret positon in an input field **/
function setCaretPosition(el, caretPos) {
	el.value = el.value;
	if (el !== null) {
		if (el.createTextRange) {
			var range = el.createTextRange();
			range.move("character", caretPos);
			range.select();
			return true;
		}
		if (el.selectionStart || el.selectionStart === 0) {
			el.focus();
			el.setSelectionRange(caretPos, caretPos);
			return true;
		}
		el.focus();
		return false;
	}
}
/**
* TODO: remove dependency of findChangeRange, findChangedRangeFromCaretPositions is better way to find what is changed
* currently this is mostly required by test and isCharacterSame util
* Given previous value and newValue it returns the index
* start - end to which values have changed.
* This function makes assumption about only consecutive
* characters are changed which is correct assumption for caret input.
*/
var findChangeRange = memoizeOnce(function(prevValue, newValue) {
	var i = 0, j = 0;
	var prevLength = prevValue.length;
	var newLength = newValue.length;
	while (prevValue[i] === newValue[i] && i < prevLength) i++;
	while (prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] && newLength - j > i && prevLength - j > i) j++;
	return {
		from: {
			start: i,
			end: prevLength - j
		},
		to: {
			start: i,
			end: newLength - j
		}
	};
});
var findChangedRangeFromCaretPositions = function(lastCaretPositions, currentCaretPosition) {
	var startPosition = Math.min(lastCaretPositions.selectionStart, currentCaretPosition);
	return {
		from: {
			start: startPosition,
			end: lastCaretPositions.selectionEnd
		},
		to: {
			start: startPosition,
			end: currentCaretPosition
		}
	};
};
function clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
}
function geInputCaretPosition(el) {
	return Math.max(el.selectionStart, el.selectionEnd);
}
function addInputMode() {
	return typeof navigator !== "undefined" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function getDefaultChangeMeta(value) {
	return {
		from: {
			start: 0,
			end: 0
		},
		to: {
			start: 0,
			end: value.length
		},
		lastValue: ""
	};
}
function defaultIsCharacterSame(ref) {
	var currentValue = ref.currentValue;
	var formattedValue = ref.formattedValue;
	var currentValueIndex = ref.currentValueIndex;
	var formattedValueIndex = ref.formattedValueIndex;
	return currentValue[currentValueIndex] === formattedValue[formattedValueIndex];
}
function getCaretPosition(newFormattedValue, lastFormattedValue, curValue, curCaretPos, boundary, isValidInputCharacter, isCharacterSame) {
	if (isCharacterSame === void 0) isCharacterSame = defaultIsCharacterSame;
	/**
	* if something got inserted on empty value, add the formatted character before the current value,
	* This is to avoid the case where typed character is present on format characters
	*/
	var firstAllowedPosition = boundary.findIndex(function(b) {
		return b;
	});
	var prefixFormat = newFormattedValue.slice(0, firstAllowedPosition);
	if (!lastFormattedValue && !curValue.startsWith(prefixFormat)) {
		lastFormattedValue = prefixFormat;
		curValue = prefixFormat + curValue;
		curCaretPos = curCaretPos + prefixFormat.length;
	}
	var curValLn = curValue.length;
	var formattedValueLn = newFormattedValue.length;
	var addedIndexMap = {};
	var indexMap = new Array(curValLn);
	for (var i = 0; i < curValLn; i++) {
		indexMap[i] = -1;
		for (var j = 0, jLn = formattedValueLn; j < jLn; j++) if (isCharacterSame({
			currentValue: curValue,
			lastValue: lastFormattedValue,
			formattedValue: newFormattedValue,
			currentValueIndex: i,
			formattedValueIndex: j
		}) && addedIndexMap[j] !== true) {
			indexMap[i] = j;
			addedIndexMap[j] = true;
			break;
		}
	}
	/**
	* For current caret position find closest characters (left and right side)
	* which are properly mapped to formatted value.
	* The idea is that the new caret position will exist always in the boundary of
	* that mapped index
	*/
	var pos = curCaretPos;
	while (pos < curValLn && (indexMap[pos] === -1 || !isValidInputCharacter(curValue[pos]))) pos++;
	var endIndex = pos === curValLn || indexMap[pos] === -1 ? formattedValueLn : indexMap[pos];
	pos = curCaretPos - 1;
	while (pos > 0 && indexMap[pos] === -1) pos--;
	var startIndex = pos === -1 || indexMap[pos] === -1 ? 0 : indexMap[pos] + 1;
	/**
	* case where a char is added on suffix and removed from middle, example 2sq345 becoming $2,345 sq
	* there is still a mapping but the order of start index and end index is changed
	*/
	if (startIndex > endIndex) return endIndex;
	/**
	* given the current caret position if it closer to startIndex
	* keep the new caret position on start index or keep it closer to endIndex
	*/
	return curCaretPos - startIndex < endIndex - curCaretPos ? startIndex : endIndex;
}
function getCaretPosInBoundary(value, caretPos, boundary, direction) {
	var valLn = value.length;
	caretPos = clamp(caretPos, 0, valLn);
	if (direction === "left") {
		while (caretPos >= 0 && !boundary[caretPos]) caretPos--;
		if (caretPos === -1) caretPos = boundary.indexOf(true);
	} else {
		while (caretPos <= valLn && !boundary[caretPos]) caretPos++;
		if (caretPos > valLn) caretPos = boundary.lastIndexOf(true);
	}
	if (caretPos === -1) caretPos = valLn;
	return caretPos;
}
function caretUnknownFormatBoundary(formattedValue) {
	var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function() {
		return true;
	});
	for (var i = 0, ln = boundaryAry.length; i < ln; i++) boundaryAry[i] = Boolean(charIsNumber(formattedValue[i]) || charIsNumber(formattedValue[i - 1]));
	return boundaryAry;
}
function useInternalValues(value, defaultValue, valueIsNumericString, format, removeFormatting, onValueChange) {
	if (onValueChange === void 0) onValueChange = noop;
	var getValues = usePersistentCallback(function(value, valueIsNumericString) {
		var formattedValue, numAsString;
		if (isNotValidValue(value)) {
			numAsString = "";
			formattedValue = "";
		} else if (typeof value === "number" || valueIsNumericString) {
			numAsString = typeof value === "number" ? toNumericString(value) : value;
			formattedValue = format(numAsString);
		} else {
			numAsString = removeFormatting(value, void 0);
			formattedValue = format(numAsString);
		}
		return {
			formattedValue,
			numAsString
		};
	});
	var ref = (0, import_react.useState)(function() {
		return getValues(isNil(value) ? defaultValue : value, valueIsNumericString);
	});
	var values = ref[0];
	var setValues = ref[1];
	var _onValueChange = usePersistentCallback(function(newValues, sourceInfo) {
		if (newValues.formattedValue !== values.formattedValue) setValues({
			formattedValue: newValues.formattedValue,
			numAsString: newValues.value
		});
		onValueChange(newValues, sourceInfo);
	});
	var _value = value;
	var _valueIsNumericString = valueIsNumericString;
	if (isNil(value)) {
		_value = values.numAsString;
		_valueIsNumericString = true;
	}
	var newValues = getValues(_value, _valueIsNumericString);
	(0, import_react.useMemo)(function() {
		setValues(newValues);
	}, [newValues.formattedValue]);
	/**
	* When only a defaultValue is provided (value prop is nil), the initial formatted value is
	* derived by the library — the parent has not yet been informed of this formatted result.
	* Fire onValueChange once on mount so the parent can sync to the formatted value.
	*/
	(0, import_react.useEffect)(function() {
		if (!isNil(defaultValue) && isNil(value) && values.formattedValue !== "") {
			var floatValue = parseFloat(values.numAsString);
			_onValueChange({
				formattedValue: values.formattedValue,
				value: values.numAsString,
				floatValue: isNaN(floatValue) ? void 0 : floatValue
			}, {
				event: void 0,
				source: SourceType.props
			});
		}
	}, []);
	return [values, _onValueChange];
}
function defaultRemoveFormatting(value) {
	return value.replace(/[^0-9]/g, "");
}
function defaultFormat(value) {
	return value;
}
function NumberFormatBase(props) {
	var type = props.type;
	if (type === void 0) type = "text";
	var displayType = props.displayType;
	if (displayType === void 0) displayType = "input";
	var customInput = props.customInput;
	var renderText = props.renderText;
	var getInputRef = props.getInputRef;
	var format = props.format;
	if (format === void 0) format = defaultFormat;
	var removeFormatting = props.removeFormatting;
	if (removeFormatting === void 0) removeFormatting = defaultRemoveFormatting;
	var defaultValue = props.defaultValue;
	var valueIsNumericString = props.valueIsNumericString;
	var onValueChange = props.onValueChange;
	var isAllowed = props.isAllowed;
	var onChange = props.onChange;
	if (onChange === void 0) onChange = noop;
	var onKeyDown = props.onKeyDown;
	if (onKeyDown === void 0) onKeyDown = noop;
	var onMouseUp = props.onMouseUp;
	if (onMouseUp === void 0) onMouseUp = noop;
	var onFocus = props.onFocus;
	if (onFocus === void 0) onFocus = noop;
	var onBlur = props.onBlur;
	if (onBlur === void 0) onBlur = noop;
	var propValue = props.value;
	var getCaretBoundary = props.getCaretBoundary;
	if (getCaretBoundary === void 0) getCaretBoundary = caretUnknownFormatBoundary;
	var isValidInputCharacter = props.isValidInputCharacter;
	if (isValidInputCharacter === void 0) isValidInputCharacter = charIsNumber;
	var isCharacterSame = props.isCharacterSame;
	var otherProps = __rest(props, [
		"type",
		"displayType",
		"customInput",
		"renderText",
		"getInputRef",
		"format",
		"removeFormatting",
		"defaultValue",
		"valueIsNumericString",
		"onValueChange",
		"isAllowed",
		"onChange",
		"onKeyDown",
		"onMouseUp",
		"onFocus",
		"onBlur",
		"value",
		"getCaretBoundary",
		"isValidInputCharacter",
		"isCharacterSame"
	]);
	var ref = useInternalValues(propValue, defaultValue, Boolean(valueIsNumericString), format, removeFormatting, onValueChange);
	var ref_0 = ref[0];
	var formattedValue = ref_0.formattedValue;
	var numAsString = ref_0.numAsString;
	var onFormattedValueChange = ref[1];
	var caretPositionBeforeChange = (0, import_react.useRef)();
	var lastUpdatedValue = (0, import_react.useRef)({
		formattedValue,
		numAsString
	});
	var _onValueChange = function(values, source) {
		lastUpdatedValue.current = {
			formattedValue: values.formattedValue,
			numAsString: values.value
		};
		onFormattedValueChange(values, source);
	};
	var ref$1 = (0, import_react.useState)(false);
	var mounted = ref$1[0];
	var setMounted = ref$1[1];
	var focusedElm = (0, import_react.useRef)(null);
	var timeout = (0, import_react.useRef)({
		setCaretTimeout: null,
		focusTimeout: null
	});
	(0, import_react.useEffect)(function() {
		setMounted(true);
		return function() {
			clearTimeout(timeout.current.setCaretTimeout);
			clearTimeout(timeout.current.focusTimeout);
		};
	}, []);
	var _format = format;
	var getValueObject = function(formattedValue, numAsString) {
		var floatValue = parseFloat(numAsString);
		return {
			formattedValue,
			value: numAsString,
			floatValue: isNaN(floatValue) ? void 0 : floatValue
		};
	};
	var setPatchedCaretPosition = function(el, caretPos, currentValue) {
		if (el.selectionStart === 0 && el.selectionEnd === el.value.length) return;
		setCaretPosition(el, caretPos);
		timeout.current.setCaretTimeout = setTimeout(function() {
			if (el.value === currentValue && el.selectionStart !== caretPos) setCaretPosition(el, caretPos);
		}, 0);
	};
	var correctCaretPosition = function(value, caretPos, direction) {
		return getCaretPosInBoundary(value, caretPos, getCaretBoundary(value), direction);
	};
	var getNewCaretPosition = function(inputValue, newFormattedValue, caretPos) {
		var caretBoundary = getCaretBoundary(newFormattedValue);
		var updatedCaretPos = getCaretPosition(newFormattedValue, formattedValue, inputValue, caretPos, caretBoundary, isValidInputCharacter, isCharacterSame);
		updatedCaretPos = getCaretPosInBoundary(newFormattedValue, updatedCaretPos, caretBoundary);
		return updatedCaretPos;
	};
	var updateValueAndCaretPosition = function(params) {
		var newFormattedValue = params.formattedValue;
		if (newFormattedValue === void 0) newFormattedValue = "";
		var input = params.input;
		var source = params.source;
		var event = params.event;
		var numAsString = params.numAsString;
		var caretPos;
		if (input) {
			var inputValue = params.inputValue || input.value;
			var currentCaretPosition = geInputCaretPosition(input);
			/**
			* set the value imperatively, this is required for IE fix
			* This is also required as if new caret position is beyond the previous value.
			* Caret position will not be set correctly
			*/
			input.value = newFormattedValue;
			caretPos = getNewCaretPosition(inputValue, newFormattedValue, currentCaretPosition);
			if (caretPos !== void 0) setPatchedCaretPosition(input, caretPos, newFormattedValue);
		}
		if (newFormattedValue !== formattedValue) _onValueChange(getValueObject(newFormattedValue, numAsString), {
			event,
			source
		});
	};
	/**
	* if the formatted value is not synced to parent, or if the formatted value is different from last synced value sync it
	* if the formatting props is removed, in which case last formatted value will be different from the numeric string value
	* in such case we need to inform the parent.
	*/
	(0, import_react.useEffect)(function() {
		var ref = lastUpdatedValue.current;
		var lastFormattedValue = ref.formattedValue;
		var lastNumAsString = ref.numAsString;
		if (formattedValue !== lastFormattedValue || numAsString !== lastNumAsString) _onValueChange(getValueObject(formattedValue, numAsString), {
			event: void 0,
			source: SourceType.props
		});
	}, [formattedValue, numAsString]);
	var currentCaretPosition = focusedElm.current ? geInputCaretPosition(focusedElm.current) : void 0;
	(typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect)(function() {
		var input = focusedElm.current;
		if (formattedValue !== lastUpdatedValue.current.formattedValue && input) {
			var caretPos = getNewCaretPosition(lastUpdatedValue.current.formattedValue, formattedValue, currentCaretPosition);
			/**
			* set the value imperatively, as we set the caret position as well imperatively.
			* This is to keep value and caret position in sync
			*/
			input.value = formattedValue;
			setPatchedCaretPosition(input, caretPos, formattedValue);
		}
	}, [formattedValue]);
	var formatInputValue = function(inputValue, event, source) {
		var input = event.target;
		var changeRange = caretPositionBeforeChange.current ? findChangedRangeFromCaretPositions(caretPositionBeforeChange.current, input.selectionEnd) : findChangeRange(formattedValue, inputValue);
		var changeMeta = Object.assign(Object.assign({}, changeRange), { lastValue: formattedValue });
		var _numAsString = removeFormatting(inputValue, changeMeta);
		var _formattedValue = _format(_numAsString);
		_numAsString = removeFormatting(_formattedValue, void 0);
		if (isAllowed && !isAllowed(getValueObject(_formattedValue, _numAsString))) {
			var input$1 = event.target;
			var caretPos = getNewCaretPosition(inputValue, formattedValue, geInputCaretPosition(input$1));
			input$1.value = formattedValue;
			setPatchedCaretPosition(input$1, caretPos, formattedValue);
			return false;
		}
		updateValueAndCaretPosition({
			formattedValue: _formattedValue,
			numAsString: _numAsString,
			inputValue,
			event,
			source,
			input: event.target
		});
		return true;
	};
	var setCaretPositionInfoBeforeChange = function(el, endOffset) {
		if (endOffset === void 0) endOffset = 0;
		caretPositionBeforeChange.current = {
			selectionStart: el.selectionStart,
			selectionEnd: el.selectionEnd + endOffset
		};
	};
	var _onChange = function(e) {
		var inputValue = e.target.value;
		if (formatInputValue(inputValue, e, SourceType.event)) onChange(e);
		caretPositionBeforeChange.current = void 0;
	};
	var _onKeyDown = function(e) {
		var el = e.target;
		var key = e.key;
		var selectionStart = el.selectionStart;
		var selectionEnd = el.selectionEnd;
		var value = el.value;
		if (value === void 0) value = "";
		var expectedCaretPosition;
		if (key === "ArrowLeft" || key === "Backspace") expectedCaretPosition = Math.max(selectionStart - 1, 0);
		else if (key === "ArrowRight") expectedCaretPosition = Math.min(selectionStart + 1, value.length);
		else if (key === "Delete") expectedCaretPosition = selectionStart;
		var endOffset = 0;
		if (key === "Delete" && selectionStart === selectionEnd) endOffset = 1;
		var isArrowKey = key === "ArrowLeft" || key === "ArrowRight";
		if (expectedCaretPosition === void 0 || selectionStart !== selectionEnd && !isArrowKey) {
			onKeyDown(e);
			setCaretPositionInfoBeforeChange(el, endOffset);
			return;
		}
		var newCaretPosition = expectedCaretPosition;
		if (isArrowKey) {
			newCaretPosition = correctCaretPosition(value, expectedCaretPosition, key === "ArrowLeft" ? "left" : "right");
			if (newCaretPosition !== expectedCaretPosition) e.preventDefault();
		} else if (key === "Delete" && !isValidInputCharacter(value[expectedCaretPosition])) newCaretPosition = correctCaretPosition(value, expectedCaretPosition, "right");
		else if (key === "Backspace" && !isValidInputCharacter(value[expectedCaretPosition])) newCaretPosition = correctCaretPosition(value, expectedCaretPosition, "left");
		if (newCaretPosition !== expectedCaretPosition) setPatchedCaretPosition(el, newCaretPosition, value);
		onKeyDown(e);
		setCaretPositionInfoBeforeChange(el, endOffset);
	};
	/** required to handle the caret position when click anywhere within the input **/
	var _onMouseUp = function(e) {
		var el = e.target;
		/**
		* NOTE: we have to give default value for value as in case when custom input is provided
		* value can come as undefined when nothing is provided on value prop.
		*/
		var correctCaretPositionIfRequired = function() {
			var selectionStart = el.selectionStart;
			var selectionEnd = el.selectionEnd;
			var value = el.value;
			if (value === void 0) value = "";
			if (selectionStart === selectionEnd) {
				var caretPosition = correctCaretPosition(value, selectionStart);
				if (caretPosition !== selectionStart) setPatchedCaretPosition(el, caretPosition, value);
			}
		};
		correctCaretPositionIfRequired();
		requestAnimationFrame(function() {
			correctCaretPositionIfRequired();
		});
		onMouseUp(e);
		setCaretPositionInfoBeforeChange(el);
	};
	var _onFocus = function(e) {
		if (e.persist) e.persist();
		var el = e.target;
		var currentTarget = e.currentTarget;
		focusedElm.current = el;
		timeout.current.focusTimeout = setTimeout(function() {
			var selectionStart = el.selectionStart;
			var selectionEnd = el.selectionEnd;
			var value = el.value;
			if (value === void 0) value = "";
			var caretPosition = correctCaretPosition(value, selectionStart);
			if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) setPatchedCaretPosition(el, caretPosition, value);
			onFocus(Object.assign(Object.assign({}, e), { currentTarget }));
		}, 0);
	};
	var _onBlur = function(e) {
		focusedElm.current = null;
		clearTimeout(timeout.current.focusTimeout);
		clearTimeout(timeout.current.setCaretTimeout);
		onBlur(e);
	};
	var inputMode = mounted && addInputMode() ? "numeric" : void 0;
	var inputProps = Object.assign({ inputMode }, otherProps, {
		type,
		value: formattedValue,
		onChange: _onChange,
		onKeyDown: _onKeyDown,
		onMouseUp: _onMouseUp,
		onFocus: _onFocus,
		onBlur: _onBlur
	});
	if (displayType === "text") return renderText ? import_react.createElement(import_react.Fragment, null, renderText(formattedValue, otherProps) || null) : import_react.createElement("span", Object.assign({}, otherProps, { ref: getInputRef }), formattedValue);
	else if (customInput) {
		var CustomInput = customInput;
		return import_react.createElement(CustomInput, Object.assign({}, inputProps, { ref: getInputRef }));
	}
	return import_react.createElement("input", Object.assign({}, inputProps, { ref: getInputRef }));
}
function format(numStr, props) {
	var decimalScale = props.decimalScale;
	var fixedDecimalScale = props.fixedDecimalScale;
	var prefix = props.prefix;
	if (prefix === void 0) prefix = "";
	var suffix = props.suffix;
	if (suffix === void 0) suffix = "";
	var allowNegative = props.allowNegative;
	var thousandsGroupStyle = props.thousandsGroupStyle;
	if (thousandsGroupStyle === void 0) thousandsGroupStyle = "thousand";
	if (numStr === "" || numStr === "-") return numStr;
	var ref = getSeparators(props);
	var thousandSeparator = ref.thousandSeparator;
	var decimalSeparator = ref.decimalSeparator;
	/**
	* Keep the decimal separator
	* when decimalScale is not defined or non zero and the numStr has decimal in it
	* Or if decimalScale is > 0 and fixeDecimalScale is true (even if numStr has no decimal)
	*/
	var hasDecimalSeparator = decimalScale !== 0 && numStr.indexOf(".") !== -1 || decimalScale && fixedDecimalScale;
	var ref$1 = splitDecimal(numStr, allowNegative);
	var beforeDecimal = ref$1.beforeDecimal;
	var afterDecimal = ref$1.afterDecimal;
	var addNegation = ref$1.addNegation;
	if (decimalScale !== void 0) afterDecimal = limitToScale(afterDecimal, decimalScale, !!fixedDecimalScale);
	if (thousandSeparator) beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
	if (prefix) beforeDecimal = prefix + beforeDecimal;
	if (suffix) afterDecimal = afterDecimal + suffix;
	if (addNegation) beforeDecimal = "-" + beforeDecimal;
	numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || "") + afterDecimal;
	return numStr;
}
function getSeparators(props) {
	var decimalSeparator = props.decimalSeparator;
	if (decimalSeparator === void 0) decimalSeparator = ".";
	var thousandSeparator = props.thousandSeparator;
	var allowedDecimalSeparators = props.allowedDecimalSeparators;
	if (thousandSeparator === true) thousandSeparator = ",";
	if (!allowedDecimalSeparators) allowedDecimalSeparators = [decimalSeparator, "."];
	return {
		decimalSeparator,
		thousandSeparator,
		allowedDecimalSeparators
	};
}
function handleNegation(value, allowNegative) {
	if (value === void 0) value = "";
	var negationRegex = /* @__PURE__ */ new RegExp("(-)");
	var doubleNegationRegex = /* @__PURE__ */ new RegExp("(-)(.)*(-)");
	var hasNegation = negationRegex.test(value);
	var removeNegation = doubleNegationRegex.test(value);
	value = value.replace(/-/g, "");
	if (hasNegation && !removeNegation && allowNegative) value = "-" + value;
	return value;
}
function getNumberRegex(decimalSeparator, global) {
	return new RegExp("(^-)|[0-9]|" + escapeRegExp(decimalSeparator), global ? "g" : void 0);
}
function isNumericString(val, prefix, suffix) {
	if (val === "") return true;
	return !(prefix === null || prefix === void 0 ? void 0 : prefix.match(/\d/)) && !(suffix === null || suffix === void 0 ? void 0 : suffix.match(/\d/)) && typeof val === "string" && !isNaN(Number(val));
}
function removeFormatting(value, changeMeta, props) {
	var assign;
	if (changeMeta === void 0) changeMeta = getDefaultChangeMeta(value);
	var allowNegative = props.allowNegative;
	var prefix = props.prefix;
	if (prefix === void 0) prefix = "";
	var suffix = props.suffix;
	if (suffix === void 0) suffix = "";
	var decimalScale = props.decimalScale;
	var from = changeMeta.from;
	var to = changeMeta.to;
	var start = to.start;
	var end = to.end;
	var ref = getSeparators(props);
	var allowedDecimalSeparators = ref.allowedDecimalSeparators;
	var decimalSeparator = ref.decimalSeparator;
	var isBeforeDecimalSeparator = value[end] === decimalSeparator;
	/**
	* If only a number is added on empty input which matches with the prefix or suffix,
	* then don't remove it, just return the same
	*/
	if (charIsNumber(value) && (value === prefix || value === suffix) && changeMeta.lastValue === "") return value;
	/** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
	if (end - start === 1 && allowedDecimalSeparators.indexOf(value[start]) !== -1) {
		var separator = decimalScale === 0 ? "" : decimalSeparator;
		value = value.substring(0, start) + separator + value.substring(start + 1, value.length);
	}
	var stripNegation = function(value, start, end) {
		/**
		* if prefix starts with - we don't allow negative number to avoid confusion
		* if suffix starts with - and the value length is same as suffix length, then the - sign is from the suffix
		* In other cases, if the value starts with - then it is a negation
		*/
		var hasNegation = false;
		var hasDoubleNegation = false;
		if (prefix.startsWith("-")) hasNegation = false;
		else if (value.startsWith("--")) {
			hasNegation = false;
			hasDoubleNegation = true;
		} else if (suffix.startsWith("-") && value.length === suffix.length) hasNegation = false;
		else if (value[0] === "-") hasNegation = true;
		var charsToRemove = hasNegation ? 1 : 0;
		if (hasDoubleNegation) charsToRemove = 2;
		if (charsToRemove) {
			value = value.substring(charsToRemove);
			start -= charsToRemove;
			end -= charsToRemove;
		}
		return {
			value,
			start,
			end,
			hasNegation
		};
	};
	var toMetadata = stripNegation(value, start, end);
	var hasNegation = toMetadata.hasNegation;
	assign = toMetadata, value = assign.value, start = assign.start, end = assign.end;
	var ref$1 = stripNegation(changeMeta.lastValue, from.start, from.end);
	var fromStart = ref$1.start;
	var fromEnd = ref$1.end;
	var lastValue = ref$1.value;
	var updatedSuffixPart = value.substring(start, end);
	if (value.length && lastValue.length && (fromStart > lastValue.length - suffix.length || fromEnd < prefix.length) && !(updatedSuffixPart && suffix.startsWith(updatedSuffixPart))) value = lastValue;
	/**
	* remove prefix
	* Remove whole prefix part if its present on the value
	* If the prefix is partially deleted (in which case change start index will be less the prefix length)
	* Remove only partial part of prefix.
	*/
	var startIndex = 0;
	if (value.startsWith(prefix)) startIndex += prefix.length;
	else if (start < prefix.length) startIndex = start;
	value = value.substring(startIndex);
	end -= startIndex;
	/**
	* Remove suffix
	* Remove whole suffix part if its present on the value
	* If the suffix is partially deleted (in which case change end index will be greater than the suffixStartIndex)
	* remove the partial part of suffix
	*/
	var endIndex = value.length;
	var suffixStartIndex = value.length - suffix.length;
	if (value.endsWith(suffix)) endIndex = suffixStartIndex;
	else if (end > suffixStartIndex) endIndex = end;
	else if (end > value.length - suffix.length) endIndex = end;
	value = value.substring(0, endIndex);
	value = handleNegation(hasNegation ? "-" + value : value, allowNegative);
	value = (value.match(getNumberRegex(decimalSeparator, true)) || []).join("");
	var firstIndex = value.indexOf(decimalSeparator);
	value = value.replace(new RegExp(escapeRegExp(decimalSeparator), "g"), function(match, index) {
		return index === firstIndex ? "." : "";
	});
	var ref$2 = splitDecimal(value, allowNegative);
	var beforeDecimal = ref$2.beforeDecimal;
	var afterDecimal = ref$2.afterDecimal;
	var addNegation = ref$2.addNegation;
	if (to.end - to.start < from.end - from.start && beforeDecimal === "" && isBeforeDecimalSeparator && !parseFloat(afterDecimal)) value = addNegation ? "-" : "";
	return value;
}
function getCaretBoundary(formattedValue, props) {
	var prefix = props.prefix;
	if (prefix === void 0) prefix = "";
	var suffix = props.suffix;
	if (suffix === void 0) suffix = "";
	var boundaryAry = Array.from({ length: formattedValue.length + 1 }).map(function() {
		return true;
	});
	var hasNegation = formattedValue[0] === "-";
	boundaryAry.fill(false, 0, Math.min(prefix.length + (hasNegation ? 1 : 0), formattedValue.length));
	var valLn = formattedValue.length;
	boundaryAry.fill(false, valLn - suffix.length + 1, valLn + 1);
	return boundaryAry;
}
function validateAndUpdateProps(props) {
	var ref = getSeparators(props);
	var thousandSeparator = ref.thousandSeparator;
	var decimalSeparator = ref.decimalSeparator;
	var prefix = props.prefix;
	if (prefix === void 0) prefix = "";
	var allowNegative = props.allowNegative;
	if (allowNegative === void 0) allowNegative = true;
	if (thousandSeparator === decimalSeparator) throw new Error("\n        Decimal separator can't be same as thousand separator.\n        thousandSeparator: " + thousandSeparator + " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n        decimalSeparator: " + decimalSeparator + " (default value for decimalSeparator is .)\n     ");
	if (prefix.startsWith("-") && allowNegative) {
		console.error("\n      Prefix can't start with '-' when allowNegative is true.\n      prefix: " + prefix + "\n      allowNegative: " + allowNegative + "\n    ");
		allowNegative = false;
	}
	return Object.assign(Object.assign({}, props), { allowNegative });
}
function useNumericFormat(props) {
	props = validateAndUpdateProps(props);
	props.decimalSeparator;
	props.allowedDecimalSeparators;
	props.thousandsGroupStyle;
	var suffix = props.suffix;
	var allowNegative = props.allowNegative;
	var allowLeadingZeros = props.allowLeadingZeros;
	var onKeyDown = props.onKeyDown;
	if (onKeyDown === void 0) onKeyDown = noop;
	var onBlur = props.onBlur;
	if (onBlur === void 0) onBlur = noop;
	var thousandSeparator = props.thousandSeparator;
	var decimalScale = props.decimalScale;
	var fixedDecimalScale = props.fixedDecimalScale;
	var prefix = props.prefix;
	if (prefix === void 0) prefix = "";
	var defaultValue = props.defaultValue;
	var value = props.value;
	var valueIsNumericString = props.valueIsNumericString;
	var onValueChange = props.onValueChange;
	var restProps = __rest(props, [
		"decimalSeparator",
		"allowedDecimalSeparators",
		"thousandsGroupStyle",
		"suffix",
		"allowNegative",
		"allowLeadingZeros",
		"onKeyDown",
		"onBlur",
		"thousandSeparator",
		"decimalScale",
		"fixedDecimalScale",
		"prefix",
		"defaultValue",
		"value",
		"valueIsNumericString",
		"onValueChange"
	]);
	var ref = getSeparators(props);
	var decimalSeparator = ref.decimalSeparator;
	var allowedDecimalSeparators = ref.allowedDecimalSeparators;
	var _format = function(numStr) {
		return format(numStr, props);
	};
	var _removeFormatting = function(inputValue, changeMeta) {
		return removeFormatting(inputValue, changeMeta, props);
	};
	var _value = isNil(value) ? defaultValue : value;
	var _valueIsNumericString = valueIsNumericString !== null && valueIsNumericString !== void 0 ? valueIsNumericString : isNumericString(_value, prefix, suffix);
	if (!isNil(value)) _valueIsNumericString = _valueIsNumericString || typeof value === "number";
	else if (!isNil(defaultValue)) _valueIsNumericString = _valueIsNumericString || typeof defaultValue === "number";
	var roundIncomingValueToPrecision = function(value) {
		if (isNotValidValue(value)) return value;
		if (typeof value === "number") value = toNumericString(value);
		/**
		* only round numeric or float string values coming through props,
		* we don't need to do it for onChange events, as we want to prevent typing there
		*/
		if (_valueIsNumericString && typeof decimalScale === "number") return roundToPrecision(value, decimalScale, Boolean(fixedDecimalScale));
		return value;
	};
	var ref$1 = useInternalValues(roundIncomingValueToPrecision(value), roundIncomingValueToPrecision(defaultValue), Boolean(_valueIsNumericString), _format, _removeFormatting, onValueChange);
	var ref$1_0 = ref$1[0];
	var numAsString = ref$1_0.numAsString;
	var formattedValue = ref$1_0.formattedValue;
	var _onValueChange = ref$1[1];
	var _onKeyDown = function(e) {
		var el = e.target;
		var key = e.key;
		var selectionStart = el.selectionStart;
		var selectionEnd = el.selectionEnd;
		var value = el.value;
		if (value === void 0) value = "";
		if ((key === "Backspace" || key === "Delete") && selectionEnd < prefix.length && value !== "-") {
			e.preventDefault();
			return;
		}
		if (selectionStart !== selectionEnd) {
			onKeyDown(e);
			return;
		}
		if (key === "Backspace" && value[0] === "-" && selectionStart === prefix.length + 1 && allowNegative) setCaretPosition(el, 1);
		if (decimalScale && fixedDecimalScale) {
			if (key === "Backspace" && value[selectionStart - 1] === decimalSeparator) {
				setCaretPosition(el, selectionStart - 1);
				e.preventDefault();
			} else if (key === "Delete" && value[selectionStart] === decimalSeparator) e.preventDefault();
		}
		if ((allowedDecimalSeparators === null || allowedDecimalSeparators === void 0 ? void 0 : allowedDecimalSeparators.includes(key)) && value[selectionStart] === decimalSeparator) setCaretPosition(el, selectionStart + 1);
		var _thousandSeparator = thousandSeparator === true ? "," : thousandSeparator;
		if (key === "Backspace" && value[selectionStart - 1] === _thousandSeparator) setCaretPosition(el, selectionStart - 1);
		if (key === "Delete" && value[selectionStart] === _thousandSeparator) setCaretPosition(el, selectionStart + 1);
		onKeyDown(e);
	};
	var _onBlur = function(e) {
		var _value = numAsString;
		if (!_value.match(/\d/g)) _value = "";
		if (!allowLeadingZeros) _value = fixLeadingZero(_value);
		if (fixedDecimalScale && decimalScale) _value = roundToPrecision(_value, decimalScale, fixedDecimalScale);
		if (_value !== numAsString) _onValueChange({
			formattedValue: format(_value, props),
			value: _value,
			floatValue: parseFloat(_value)
		}, {
			event: e,
			source: SourceType.event
		});
		onBlur(e);
	};
	var isValidInputCharacter = function(inputChar) {
		if (inputChar === decimalSeparator) return true;
		return charIsNumber(inputChar);
	};
	var isCharacterSame = function(ref) {
		var currentValue = ref.currentValue;
		var lastValue = ref.lastValue;
		var formattedValue = ref.formattedValue;
		var currentValueIndex = ref.currentValueIndex;
		var formattedValueIndex = ref.formattedValueIndex;
		var curChar = currentValue[currentValueIndex];
		var newChar = formattedValue[formattedValueIndex];
		var to = findChangeRange(lastValue, currentValue).to;
		var getDecimalSeparatorIndex = function(value) {
			return _removeFormatting(value).indexOf(".") + prefix.length;
		};
		if (value === 0 && fixedDecimalScale && decimalScale && currentValue[to.start] === decimalSeparator && getDecimalSeparatorIndex(currentValue) < currentValueIndex && getDecimalSeparatorIndex(formattedValue) > formattedValueIndex) return false;
		if (currentValueIndex >= to.start && currentValueIndex < to.end && allowedDecimalSeparators && allowedDecimalSeparators.includes(curChar) && newChar === decimalSeparator) return true;
		return curChar === newChar;
	};
	return Object.assign(Object.assign({}, restProps), {
		value: formattedValue,
		valueIsNumericString: false,
		isValidInputCharacter,
		isCharacterSame,
		onValueChange: _onValueChange,
		format: _format,
		removeFormatting: _removeFormatting,
		getCaretBoundary: function(formattedValue) {
			return getCaretBoundary(formattedValue, props);
		},
		onKeyDown: _onKeyDown,
		onBlur: _onBlur
	});
}
function NumericFormat(props) {
	var numericFormatProps = useNumericFormat(props);
	return import_react.createElement(NumberFormatBase, Object.assign({}, numericFormatProps));
}
//#endregion
export { MdOutlineAssignment as $, FaShoppingCart as $n, FaDownload as $t, MdAccountBalance as A, FaListAlt as An, RouterProvider as Ar, FaBullseye as At, MdCategory as B, FaPlus as Bn, FaCheckDouble as Bt, CardTitle as C, FaIdCard as Cn, FaUserShield as Cr, FaBan as Ct, Badge as D, FaLayerGroup as Dn, FaUtensils as Dr, FaBookOpen as Dt, Button as E, FaKey as En, FaUsers as Er, FaBook as Et, MdAttachMoney as F, FaMoneyBillWave as Fn, useParams as Fr, FaCertificate as Ft, MdDashboard as G, FaReceipt as Gn, FaClipboardCheck as Gt, MdChevronRight as H, FaPowerOff as Hn, FaChevronDown as Ht, MdBarChart as I, FaPaperPlane as In, require_client as Ir, FaChalkboardTeacher as It, MdHandshake as J, FaRegFilePdf as Jn, FaCoins as Jt, MdEvent as K, FaRedo as Kn, FaClipboardList as Kt, MdCached as L, FaPhone as Ln, FaChartLine as Lt, MdAddCircleOutline as M, FaMapMarkedAlt as Mn, Navigate as Mr, FaCalendarAlt as Mt, MdArrowBack as N, FaMapMarkerAlt as Nn, useLocation as Nr, FaCalendarCheck as Nt, Alert_default as O, FaLightbulb as On, FaWallet as Or, FaBriefcase as Ot, MdArticle as P, FaMedal as Pn, useNavigate as Pr, FaCamera as Pt, MdMenuBook as Q, FaShieldAlt as Qn, FaDonate as Qt, MdCalendarToday as R, FaPhoneAlt as Rn, FaCheck as Rt, Card_default as S, FaHourglassHalf as Sn, FaUserPlus as Sr, FaArrowUp as St, CardBody as T, FaKaaba as Tn, FaUserTie as Tr, FaBellSlash as Tt, MdCollectionsBookmark as U, FaPrint as Un, FaChevronLeft as Ut, MdCheckCircle as V, FaPlusCircle as Vn, FaCheckSquare as Vt, MdCreditCard as W, FaQuestionCircle as Wn, FaChevronRight as Wt, MdInfo as X, FaSave as Xn, FaCopy as Xt, MdHistory as Y, FaRegMoneyBillAlt as Yn, FaComments as Yt, MdInfoOutline as Z, FaSearch as Zn, FaCreditCard as Zt, FloatingLabel as _, FaHandshake as _n, FaUserCircle as _r, MdTrackChanges as _t, Tabs as a, FaExclamationTriangle as an, FaSyncAlt as ar, MdPets as at, Container as b, FaHistory as bn, FaUserFriends as br, FaArrowLeft as bt, Spinner as c, FaEyeSlash as cn, FaTimesCircle as cr, MdRefresh as ct, Navbar_default as d, FaFileInvoiceDollar as dn, FaTrophy as dr, MdSearch as dt, FaEdit as en, FaSignInAlt as er, MdOutlineDateRange as et, Nav_default as f, FaFileSignature as fn, FaUndo as fr, MdShield as ft, Form_default as g, FaHandHoldingUsd as gn, FaUserCheck as gr, MdStorefront as gt, InputGroup_default as h, FaGraduationCap as hn, FaUser as hr, MdStars as ht, xo as i, FaExclamationCircle as in, FaSync as ir, MdPerson as it, MdAccountBalanceWallet as j, FaLock as jn, createBrowserRouter as jr, FaCalculator as jt, MdAccessTime as k, FaLink as kn, Link as kr, FaBuilding as kt, Row as l, FaFileAlt as ln, FaTrash as lr, MdSavings as lt, ListGroup_default as m, FaGift as mn, FaUpload as mr, MdShoppingCart as mt, require_react_webcam as n, FaEnvelopeOpen as nn, FaStar as nr, MdPayments as nt, Table as o, FaExternalLinkAlt as on, FaTag as or, MdPlayArrow as ot, Modal_default as p, FaFilter as pn, FaUniversity as pr, MdShoppingBag as pt, MdGroup as q, FaRegFileAlt as qn, FaClock as qt, StateManagedSelect$1 as r, FaExchangeAlt as rn, FaStore as rr, MdPeople as rt, Tab_default as s, FaEye as sn, FaTimes as sr, MdReceiptLong as st, NumericFormat as t, FaEnvelope as tn, FaSquare as tr, MdPayment as tt, ProgressBar as u, FaFileContract as un, FaTrashAlt as ur, MdSchool as ut, Image as v, FaHeadphones as vn, FaUserCog as vr, MdVerified as vt, CardHeader as w, FaInfoCircle as wn, FaUserTag as wr, FaBell as wt, Col as x, FaHome as xn, FaUserMinus as xr, FaArrowRight as xt, Dropdown_default as y, FaHeadset as yn, FaUserEdit as yr, MdVisibility as yt, MdCancel as z, FaPiggyBank as zn, FaCheckCircle as zt };
