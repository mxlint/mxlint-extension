var Im = { exports: {} }, Xp = {}, Qm = { exports: {} }, ht = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qR;
function Xb() {
  if (qR) return ht;
  qR = 1;
  var Z = Symbol.for("react.element"), X = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), wt = Symbol.for("react.strict_mode"), Je = Symbol.for("react.profiler"), mt = Symbol.for("react.provider"), S = Symbol.for("react.context"), Vt = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), ve = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), ee = Symbol.iterator;
  function Ce(b) {
    return b === null || typeof b != "object" ? null : (b = ee && b[ee] || b["@@iterator"], typeof b == "function" ? b : null);
  }
  var ue = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ye = Object.assign, yt = {};
  function dt(b, P, je) {
    this.props = b, this.context = P, this.refs = yt, this.updater = je || ue;
  }
  dt.prototype.isReactComponent = {}, dt.prototype.setState = function(b, P) {
    if (typeof b != "object" && typeof b != "function" && b != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, b, P, "setState");
  }, dt.prototype.forceUpdate = function(b) {
    this.updater.enqueueForceUpdate(this, b, "forceUpdate");
  };
  function cn() {
  }
  cn.prototype = dt.prototype;
  function ft(b, P, je) {
    this.props = b, this.context = P, this.refs = yt, this.updater = je || ue;
  }
  var Ie = ft.prototype = new cn();
  Ie.constructor = ft, Ye(Ie, dt.prototype), Ie.isPureReactComponent = !0;
  var pt = Array.isArray, _e = Object.prototype.hasOwnProperty, ot = { current: null }, Fe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function rn(b, P, je) {
    var Ue, rt = {}, Ze = null, Xe = null;
    if (P != null) for (Ue in P.ref !== void 0 && (Xe = P.ref), P.key !== void 0 && (Ze = "" + P.key), P) _e.call(P, Ue) && !Fe.hasOwnProperty(Ue) && (rt[Ue] = P[Ue]);
    var et = arguments.length - 2;
    if (et === 1) rt.children = je;
    else if (1 < et) {
      for (var at = Array(et), Pt = 0; Pt < et; Pt++) at[Pt] = arguments[Pt + 2];
      rt.children = at;
    }
    if (b && b.defaultProps) for (Ue in et = b.defaultProps, et) rt[Ue] === void 0 && (rt[Ue] = et[Ue]);
    return { $$typeof: Z, type: b, key: Ze, ref: Xe, props: rt, _owner: ot.current };
  }
  function Ft(b, P) {
    return { $$typeof: Z, type: b.type, key: P, ref: b.ref, props: b.props, _owner: b._owner };
  }
  function Kt(b) {
    return typeof b == "object" && b !== null && b.$$typeof === Z;
  }
  function an(b) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + b.replace(/[=:]/g, function(je) {
      return P[je];
    });
  }
  var xt = /\/+/g;
  function ke(b, P) {
    return typeof b == "object" && b !== null && b.key != null ? an("" + b.key) : P.toString(36);
  }
  function Ut(b, P, je, Ue, rt) {
    var Ze = typeof b;
    (Ze === "undefined" || Ze === "boolean") && (b = null);
    var Xe = !1;
    if (b === null) Xe = !0;
    else switch (Ze) {
      case "string":
      case "number":
        Xe = !0;
        break;
      case "object":
        switch (b.$$typeof) {
          case Z:
          case X:
            Xe = !0;
        }
    }
    if (Xe) return Xe = b, rt = rt(Xe), b = Ue === "" ? "." + ke(Xe, 0) : Ue, pt(rt) ? (je = "", b != null && (je = b.replace(xt, "$&/") + "/"), Ut(rt, P, je, "", function(Pt) {
      return Pt;
    })) : rt != null && (Kt(rt) && (rt = Ft(rt, je + (!rt.key || Xe && Xe.key === rt.key ? "" : ("" + rt.key).replace(xt, "$&/") + "/") + b)), P.push(rt)), 1;
    if (Xe = 0, Ue = Ue === "" ? "." : Ue + ":", pt(b)) for (var et = 0; et < b.length; et++) {
      Ze = b[et];
      var at = Ue + ke(Ze, et);
      Xe += Ut(Ze, P, je, at, rt);
    }
    else if (at = Ce(b), typeof at == "function") for (b = at.call(b), et = 0; !(Ze = b.next()).done; ) Ze = Ze.value, at = Ue + ke(Ze, et++), Xe += Ut(Ze, P, je, at, rt);
    else if (Ze === "object") throw P = String(b), Error("Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(b).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead.");
    return Xe;
  }
  function _t(b, P, je) {
    if (b == null) return b;
    var Ue = [], rt = 0;
    return Ut(b, Ue, "", "", function(Ze) {
      return P.call(je, Ze, rt++);
    }), Ue;
  }
  function Dt(b) {
    if (b._status === -1) {
      var P = b._result;
      P = P(), P.then(function(je) {
        (b._status === 0 || b._status === -1) && (b._status = 1, b._result = je);
      }, function(je) {
        (b._status === 0 || b._status === -1) && (b._status = 2, b._result = je);
      }), b._status === -1 && (b._status = 0, b._result = P);
    }
    if (b._status === 1) return b._result.default;
    throw b._result;
  }
  var Ee = { current: null }, K = { transition: null }, Re = { ReactCurrentDispatcher: Ee, ReactCurrentBatchConfig: K, ReactCurrentOwner: ot };
  function ne() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ht.Children = { map: _t, forEach: function(b, P, je) {
    _t(b, function() {
      P.apply(this, arguments);
    }, je);
  }, count: function(b) {
    var P = 0;
    return _t(b, function() {
      P++;
    }), P;
  }, toArray: function(b) {
    return _t(b, function(P) {
      return P;
    }) || [];
  }, only: function(b) {
    if (!Kt(b)) throw Error("React.Children.only expected to receive a single React element child.");
    return b;
  } }, ht.Component = dt, ht.Fragment = A, ht.Profiler = Je, ht.PureComponent = ft, ht.StrictMode = wt, ht.Suspense = de, ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re, ht.act = ne, ht.cloneElement = function(b, P, je) {
    if (b == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + b + ".");
    var Ue = Ye({}, b.props), rt = b.key, Ze = b.ref, Xe = b._owner;
    if (P != null) {
      if (P.ref !== void 0 && (Ze = P.ref, Xe = ot.current), P.key !== void 0 && (rt = "" + P.key), b.type && b.type.defaultProps) var et = b.type.defaultProps;
      for (at in P) _e.call(P, at) && !Fe.hasOwnProperty(at) && (Ue[at] = P[at] === void 0 && et !== void 0 ? et[at] : P[at]);
    }
    var at = arguments.length - 2;
    if (at === 1) Ue.children = je;
    else if (1 < at) {
      et = Array(at);
      for (var Pt = 0; Pt < at; Pt++) et[Pt] = arguments[Pt + 2];
      Ue.children = et;
    }
    return { $$typeof: Z, type: b.type, key: rt, ref: Ze, props: Ue, _owner: Xe };
  }, ht.createContext = function(b) {
    return b = { $$typeof: S, _currentValue: b, _currentValue2: b, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, b.Provider = { $$typeof: mt, _context: b }, b.Consumer = b;
  }, ht.createElement = rn, ht.createFactory = function(b) {
    var P = rn.bind(null, b);
    return P.type = b, P;
  }, ht.createRef = function() {
    return { current: null };
  }, ht.forwardRef = function(b) {
    return { $$typeof: Vt, render: b };
  }, ht.isValidElement = Kt, ht.lazy = function(b) {
    return { $$typeof: ut, _payload: { _status: -1, _result: b }, _init: Dt };
  }, ht.memo = function(b, P) {
    return { $$typeof: ve, type: b, compare: P === void 0 ? null : P };
  }, ht.startTransition = function(b) {
    var P = K.transition;
    K.transition = {};
    try {
      b();
    } finally {
      K.transition = P;
    }
  }, ht.unstable_act = ne, ht.useCallback = function(b, P) {
    return Ee.current.useCallback(b, P);
  }, ht.useContext = function(b) {
    return Ee.current.useContext(b);
  }, ht.useDebugValue = function() {
  }, ht.useDeferredValue = function(b) {
    return Ee.current.useDeferredValue(b);
  }, ht.useEffect = function(b, P) {
    return Ee.current.useEffect(b, P);
  }, ht.useId = function() {
    return Ee.current.useId();
  }, ht.useImperativeHandle = function(b, P, je) {
    return Ee.current.useImperativeHandle(b, P, je);
  }, ht.useInsertionEffect = function(b, P) {
    return Ee.current.useInsertionEffect(b, P);
  }, ht.useLayoutEffect = function(b, P) {
    return Ee.current.useLayoutEffect(b, P);
  }, ht.useMemo = function(b, P) {
    return Ee.current.useMemo(b, P);
  }, ht.useReducer = function(b, P, je) {
    return Ee.current.useReducer(b, P, je);
  }, ht.useRef = function(b) {
    return Ee.current.useRef(b);
  }, ht.useState = function(b) {
    return Ee.current.useState(b);
  }, ht.useSyncExternalStore = function(b, P, je) {
    return Ee.current.useSyncExternalStore(b, P, je);
  }, ht.useTransition = function() {
    return Ee.current.useTransition();
  }, ht.version = "18.3.1", ht;
}
var Jp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Jp.exports;
var XR;
function Kb() {
  return XR || (XR = 1, function(Z, X) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var A = "18.3.1", wt = Symbol.for("react.element"), Je = Symbol.for("react.portal"), mt = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), Vt = Symbol.for("react.profiler"), de = Symbol.for("react.provider"), ve = Symbol.for("react.context"), ut = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), Ce = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), Ye = Symbol.for("react.lazy"), yt = Symbol.for("react.offscreen"), dt = Symbol.iterator, cn = "@@iterator";
      function ft(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = dt && h[dt] || h[cn];
        return typeof C == "function" ? C : null;
      }
      var Ie = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, pt = {
        transition: null
      }, _e = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ot = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Fe = {}, rn = null;
      function Ft(h) {
        rn = h;
      }
      Fe.setExtraStackFrame = function(h) {
        rn = h;
      }, Fe.getCurrentStack = null, Fe.getStackAddendum = function() {
        var h = "";
        rn && (h += rn);
        var C = Fe.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Kt = !1, an = !1, xt = !1, ke = !1, Ut = !1, _t = {
        ReactCurrentDispatcher: Ie,
        ReactCurrentBatchConfig: pt,
        ReactCurrentOwner: ot
      };
      _t.ReactDebugCurrentFrame = Fe, _t.ReactCurrentActQueue = _e;
      function Dt(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          K("warn", h, N);
        }
      }
      function Ee(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          K("error", h, N);
        }
      }
      function K(h, C, N) {
        {
          var F = _t.ReactDebugCurrentFrame, q = F.getStackAddendum();
          q !== "" && (C += "%s", N = N.concat([q]));
          var Oe = N.map(function(re) {
            return String(re);
          });
          Oe.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Oe);
        }
      }
      var Re = {};
      function ne(h, C) {
        {
          var N = h.constructor, F = N && (N.displayName || N.name) || "ReactClass", q = F + "." + C;
          if (Re[q])
            return;
          Ee("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, F), Re[q] = !0;
        }
      }
      var b = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, N) {
          ne(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, N, F) {
          ne(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, N, F) {
          ne(h, "setState");
        }
      }, P = Object.assign, je = {};
      Object.freeze(je);
      function Ue(h, C, N) {
        this.props = h, this.context = C, this.refs = je, this.updater = N || b;
      }
      Ue.prototype.isReactComponent = {}, Ue.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Ue.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var rt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ze = function(h, C) {
          Object.defineProperty(Ue.prototype, h, {
            get: function() {
              Dt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var Xe in rt)
          rt.hasOwnProperty(Xe) && Ze(Xe, rt[Xe]);
      }
      function et() {
      }
      et.prototype = Ue.prototype;
      function at(h, C, N) {
        this.props = h, this.context = C, this.refs = je, this.updater = N || b;
      }
      var Pt = at.prototype = new et();
      Pt.constructor = at, P(Pt, Ue.prototype), Pt.isPureReactComponent = !0;
      function kn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var wr = Array.isArray;
      function En(h) {
        return wr(h);
      }
      function tr(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, N = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return N;
        }
      }
      function Pn(h) {
        try {
          return Vn(h), !1;
        } catch {
          return !0;
        }
      }
      function Vn(h) {
        return "" + h;
      }
      function $r(h) {
        if (Pn(h))
          return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(h)), Vn(h);
      }
      function oi(h, C, N) {
        var F = h.displayName;
        if (F)
          return F;
        var q = C.displayName || C.name || "";
        return q !== "" ? N + "(" + q + ")" : N;
      }
      function ua(h) {
        return h.displayName || "Context";
      }
      function Gn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case mt:
            return "Fragment";
          case Je:
            return "Portal";
          case Vt:
            return "Profiler";
          case S:
            return "StrictMode";
          case ee:
            return "Suspense";
          case Ce:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ve:
              var C = h;
              return ua(C) + ".Consumer";
            case de:
              var N = h;
              return ua(N._context) + ".Provider";
            case ut:
              return oi(h, h.render, "ForwardRef");
            case ue:
              var F = h.displayName || null;
              return F !== null ? F : Gn(h.type) || "Memo";
            case Ye: {
              var q = h, Oe = q._payload, re = q._init;
              try {
                return Gn(re(Oe));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, Bn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, yr, $a, On;
      On = {};
      function gr(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function oa(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Ya(h, C) {
        var N = function() {
          yr || (yr = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: N,
          configurable: !0
        });
      }
      function si(h, C) {
        var N = function() {
          $a || ($a = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: N,
          configurable: !0
        });
      }
      function J(h) {
        if (typeof h.ref == "string" && ot.current && h.__self && ot.current.stateNode !== h.__self) {
          var C = Gn(ot.current.type);
          On[C] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), On[C] = !0);
        }
      }
      var Te = function(h, C, N, F, q, Oe, re) {
        var Ne = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: wt,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: N,
          props: re,
          // Record the component responsible for creating this element.
          _owner: Oe
        };
        return Ne._store = {}, Object.defineProperty(Ne._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ne, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: F
        }), Object.defineProperty(Ne, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: q
        }), Object.freeze && (Object.freeze(Ne.props), Object.freeze(Ne)), Ne;
      };
      function tt(h, C, N) {
        var F, q = {}, Oe = null, re = null, Ne = null, ct = null;
        if (C != null) {
          gr(C) && (re = C.ref, J(C)), oa(C) && ($r(C.key), Oe = "" + C.key), Ne = C.__self === void 0 ? null : C.__self, ct = C.__source === void 0 ? null : C.__source;
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (q[F] = C[F]);
        }
        var Tt = arguments.length - 2;
        if (Tt === 1)
          q.children = N;
        else if (Tt > 1) {
          for (var tn = Array(Tt), It = 0; It < Tt; It++)
            tn[It] = arguments[It + 2];
          Object.freeze && Object.freeze(tn), q.children = tn;
        }
        if (h && h.defaultProps) {
          var nt = h.defaultProps;
          for (F in nt)
            q[F] === void 0 && (q[F] = nt[F]);
        }
        if (Oe || re) {
          var Qt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Oe && Ya(q, Qt), re && si(q, Qt);
        }
        return Te(h, Oe, re, Ne, ct, ot.current, q);
      }
      function At(h, C) {
        var N = Te(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return N;
      }
      function Jt(h, C, N) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var F, q = P({}, h.props), Oe = h.key, re = h.ref, Ne = h._self, ct = h._source, Tt = h._owner;
        if (C != null) {
          gr(C) && (re = C.ref, Tt = ot.current), oa(C) && ($r(C.key), Oe = "" + C.key);
          var tn;
          h.type && h.type.defaultProps && (tn = h.type.defaultProps);
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (C[F] === void 0 && tn !== void 0 ? q[F] = tn[F] : q[F] = C[F]);
        }
        var It = arguments.length - 2;
        if (It === 1)
          q.children = N;
        else if (It > 1) {
          for (var nt = Array(It), Qt = 0; Qt < It; Qt++)
            nt[Qt] = arguments[Qt + 2];
          q.children = nt;
        }
        return Te(h.type, Oe, re, Ne, ct, Tt, q);
      }
      function pn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === wt;
      }
      var ln = ".", qn = ":";
      function Zt(h) {
        var C = /[=:]/g, N = {
          "=": "=0",
          ":": "=2"
        }, F = h.replace(C, function(q) {
          return N[q];
        });
        return "$" + F;
      }
      var Bt = !1, $t = /\/+/g;
      function sa(h) {
        return h.replace($t, "$&/");
      }
      function Sr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? ($r(h.key), Zt("" + h.key)) : C.toString(36);
      }
      function Ra(h, C, N, F, q) {
        var Oe = typeof h;
        (Oe === "undefined" || Oe === "boolean") && (h = null);
        var re = !1;
        if (h === null)
          re = !0;
        else
          switch (Oe) {
            case "string":
            case "number":
              re = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case wt:
                case Je:
                  re = !0;
              }
          }
        if (re) {
          var Ne = h, ct = q(Ne), Tt = F === "" ? ln + Sr(Ne, 0) : F;
          if (En(ct)) {
            var tn = "";
            Tt != null && (tn = sa(Tt) + "/"), Ra(ct, C, tn, "", function(Gf) {
              return Gf;
            });
          } else ct != null && (pn(ct) && (ct.key && (!Ne || Ne.key !== ct.key) && $r(ct.key), ct = At(
            ct,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            N + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (ct.key && (!Ne || Ne.key !== ct.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              sa("" + ct.key) + "/"
            ) : "") + Tt
          )), C.push(ct));
          return 1;
        }
        var It, nt, Qt = 0, vn = F === "" ? ln : F + qn;
        if (En(h))
          for (var El = 0; El < h.length; El++)
            It = h[El], nt = vn + Sr(It, El), Qt += Ra(It, C, N, nt, q);
        else {
          var Wo = ft(h);
          if (typeof Wo == "function") {
            var Pi = h;
            Wo === Pi.entries && (Bt || Dt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Bt = !0);
            for (var Go = Wo.call(Pi), lu, Wf = 0; !(lu = Go.next()).done; )
              It = lu.value, nt = vn + Sr(It, Wf++), Qt += Ra(It, C, N, nt, q);
          } else if (Oe === "object") {
            var lc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (lc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : lc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Qt;
      }
      function Fi(h, C, N) {
        if (h == null)
          return h;
        var F = [], q = 0;
        return Ra(h, F, "", "", function(Oe) {
          return C.call(N, Oe, q++);
        }), F;
      }
      function Kl(h) {
        var C = 0;
        return Fi(h, function() {
          C++;
        }), C;
      }
      function Jl(h, C, N) {
        Fi(h, function() {
          C.apply(this, arguments);
        }, N);
      }
      function fl(h) {
        return Fi(h, function(C) {
          return C;
        }) || [];
      }
      function dl(h) {
        if (!pn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function Zl(h) {
        var C = {
          $$typeof: ve,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: de,
          _context: C
        };
        var N = !1, F = !1, q = !1;
        {
          var Oe = {
            $$typeof: ve,
            _context: C
          };
          Object.defineProperties(Oe, {
            Provider: {
              get: function() {
                return F || (F = !0, Ee("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(re) {
                C.Provider = re;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(re) {
                C._currentValue = re;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(re) {
                C._currentValue2 = re;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(re) {
                C._threadCount = re;
              }
            },
            Consumer: {
              get: function() {
                return N || (N = !0, Ee("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(re) {
                q || (Dt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", re), q = !0);
              }
            }
          }), C.Consumer = Oe;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var xr = -1, _r = 0, nr = 1, ci = 2;
      function Ia(h) {
        if (h._status === xr) {
          var C = h._result, N = C();
          if (N.then(function(Oe) {
            if (h._status === _r || h._status === xr) {
              var re = h;
              re._status = nr, re._result = Oe;
            }
          }, function(Oe) {
            if (h._status === _r || h._status === xr) {
              var re = h;
              re._status = ci, re._result = Oe;
            }
          }), h._status === xr) {
            var F = h;
            F._status = _r, F._result = N;
          }
        }
        if (h._status === nr) {
          var q = h._result;
          return q === void 0 && Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, q), "default" in q || Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, q), q.default;
        } else
          throw h._result;
      }
      function fi(h) {
        var C = {
          // We use these fields to store the result.
          _status: xr,
          _result: h
        }, N = {
          $$typeof: Ye,
          _payload: C,
          _init: Ia
        };
        {
          var F, q;
          Object.defineProperties(N, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return F;
              },
              set: function(Oe) {
                Ee("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Oe, Object.defineProperty(N, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return q;
              },
              set: function(Oe) {
                Ee("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), q = Oe, Object.defineProperty(N, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return N;
      }
      function di(h) {
        h != null && h.$$typeof === ue ? Ee("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? Ee("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && Ee("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && Ee("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: ut,
          render: h
        };
        {
          var N;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return N;
            },
            set: function(F) {
              N = F, !h.name && !h.displayName && (h.displayName = F);
            }
          });
        }
        return C;
      }
      var R;
      R = Symbol.for("react.module.reference");
      function B(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === mt || h === Vt || Ut || h === S || h === ee || h === Ce || ke || h === yt || Kt || an || xt || typeof h == "object" && h !== null && (h.$$typeof === Ye || h.$$typeof === ue || h.$$typeof === de || h.$$typeof === ve || h.$$typeof === ut || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === R || h.getModuleId !== void 0));
      }
      function ae(h, C) {
        B(h) || Ee("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var N = {
          $$typeof: ue,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var F;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(q) {
              F = q, !h.name && !h.displayName && (h.displayName = q);
            }
          });
        }
        return N;
      }
      function he() {
        var h = Ie.current;
        return h === null && Ee(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function We(h) {
        var C = he();
        if (h._context !== void 0) {
          var N = h._context;
          N.Consumer === h ? Ee("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : N.Provider === h && Ee("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function Be(h) {
        var C = he();
        return C.useState(h);
      }
      function st(h, C, N) {
        var F = he();
        return F.useReducer(h, C, N);
      }
      function it(h) {
        var C = he();
        return C.useRef(h);
      }
      function Rn(h, C) {
        var N = he();
        return N.useEffect(h, C);
      }
      function en(h, C) {
        var N = he();
        return N.useInsertionEffect(h, C);
      }
      function un(h, C) {
        var N = he();
        return N.useLayoutEffect(h, C);
      }
      function rr(h, C) {
        var N = he();
        return N.useCallback(h, C);
      }
      function Qa(h, C) {
        var N = he();
        return N.useMemo(h, C);
      }
      function Wa(h, C, N) {
        var F = he();
        return F.useImperativeHandle(h, C, N);
      }
      function Ge(h, C) {
        {
          var N = he();
          return N.useDebugValue(h, C);
        }
      }
      function Ke() {
        var h = he();
        return h.useTransition();
      }
      function Ga(h) {
        var C = he();
        return C.useDeferredValue(h);
      }
      function eu() {
        var h = he();
        return h.useId();
      }
      function tu(h, C, N) {
        var F = he();
        return F.useSyncExternalStore(h, C, N);
      }
      var pl = 0, Iu, vl, Yr, $o, br, ac, ic;
      function Qu() {
      }
      Qu.__reactDisabledLog = !0;
      function hl() {
        {
          if (pl === 0) {
            Iu = console.log, vl = console.info, Yr = console.warn, $o = console.error, br = console.group, ac = console.groupCollapsed, ic = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Qu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          pl++;
        }
      }
      function ca() {
        {
          if (pl--, pl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: P({}, h, {
                value: Iu
              }),
              info: P({}, h, {
                value: vl
              }),
              warn: P({}, h, {
                value: Yr
              }),
              error: P({}, h, {
                value: $o
              }),
              group: P({}, h, {
                value: br
              }),
              groupCollapsed: P({}, h, {
                value: ac
              }),
              groupEnd: P({}, h, {
                value: ic
              })
            });
          }
          pl < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var qa = _t.ReactCurrentDispatcher, Xa;
      function Wu(h, C, N) {
        {
          if (Xa === void 0)
            try {
              throw Error();
            } catch (q) {
              var F = q.stack.trim().match(/\n( *(at )?)/);
              Xa = F && F[1] || "";
            }
          return `
` + Xa + h;
        }
      }
      var nu = !1, ml;
      {
        var Gu = typeof WeakMap == "function" ? WeakMap : Map;
        ml = new Gu();
      }
      function qu(h, C) {
        if (!h || nu)
          return "";
        {
          var N = ml.get(h);
          if (N !== void 0)
            return N;
        }
        var F;
        nu = !0;
        var q = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Oe;
        Oe = qa.current, qa.current = null, hl();
        try {
          if (C) {
            var re = function() {
              throw Error();
            };
            if (Object.defineProperty(re.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(re, []);
              } catch (vn) {
                F = vn;
              }
              Reflect.construct(h, [], re);
            } else {
              try {
                re.call();
              } catch (vn) {
                F = vn;
              }
              h.call(re.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vn) {
              F = vn;
            }
            h();
          }
        } catch (vn) {
          if (vn && F && typeof vn.stack == "string") {
            for (var Ne = vn.stack.split(`
`), ct = F.stack.split(`
`), Tt = Ne.length - 1, tn = ct.length - 1; Tt >= 1 && tn >= 0 && Ne[Tt] !== ct[tn]; )
              tn--;
            for (; Tt >= 1 && tn >= 0; Tt--, tn--)
              if (Ne[Tt] !== ct[tn]) {
                if (Tt !== 1 || tn !== 1)
                  do
                    if (Tt--, tn--, tn < 0 || Ne[Tt] !== ct[tn]) {
                      var It = `
` + Ne[Tt].replace(" at new ", " at ");
                      return h.displayName && It.includes("<anonymous>") && (It = It.replace("<anonymous>", h.displayName)), typeof h == "function" && ml.set(h, It), It;
                    }
                  while (Tt >= 1 && tn >= 0);
                break;
              }
          }
        } finally {
          nu = !1, qa.current = Oe, ca(), Error.prepareStackTrace = q;
        }
        var nt = h ? h.displayName || h.name : "", Qt = nt ? Wu(nt) : "";
        return typeof h == "function" && ml.set(h, Qt), Qt;
      }
      function ji(h, C, N) {
        return qu(h, !1);
      }
      function If(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function Hi(h, C, N) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return qu(h, If(h));
        if (typeof h == "string")
          return Wu(h);
        switch (h) {
          case ee:
            return Wu("Suspense");
          case Ce:
            return Wu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ut:
              return ji(h.render);
            case ue:
              return Hi(h.type, C, N);
            case Ye: {
              var F = h, q = F._payload, Oe = F._init;
              try {
                return Hi(Oe(q), C, N);
              } catch {
              }
            }
          }
        return "";
      }
      var kt = {}, Xu = _t.ReactDebugCurrentFrame;
      function Rt(h) {
        if (h) {
          var C = h._owner, N = Hi(h.type, h._source, C ? C.type : null);
          Xu.setExtraStackFrame(N);
        } else
          Xu.setExtraStackFrame(null);
      }
      function Yo(h, C, N, F, q) {
        {
          var Oe = Function.call.bind(Cn);
          for (var re in h)
            if (Oe(h, re)) {
              var Ne = void 0;
              try {
                if (typeof h[re] != "function") {
                  var ct = Error((F || "React class") + ": " + N + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw ct.name = "Invariant Violation", ct;
                }
                Ne = h[re](C, re, F, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Tt) {
                Ne = Tt;
              }
              Ne && !(Ne instanceof Error) && (Rt(q), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", N, re, typeof Ne), Rt(null)), Ne instanceof Error && !(Ne.message in kt) && (kt[Ne.message] = !0, Rt(q), Ee("Failed %s type: %s", N, Ne.message), Rt(null));
            }
        }
      }
      function pi(h) {
        if (h) {
          var C = h._owner, N = Hi(h.type, h._source, C ? C.type : null);
          Ft(N);
        } else
          Ft(null);
      }
      var Ve;
      Ve = !1;
      function Ku() {
        if (ot.current) {
          var h = Gn(ot.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function ar(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), N = h.lineNumber;
          return `

Check your code at ` + C + ":" + N + ".";
        }
        return "";
      }
      function vi(h) {
        return h != null ? ar(h.__source) : "";
      }
      var Dr = {};
      function hi(h) {
        var C = Ku();
        if (!C) {
          var N = typeof h == "string" ? h : h.displayName || h.name;
          N && (C = `

Check the top-level render call using <` + N + ">.");
        }
        return C;
      }
      function on(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var N = hi(C);
          if (!Dr[N]) {
            Dr[N] = !0;
            var F = "";
            h && h._owner && h._owner !== ot.current && (F = " It was passed a child from " + Gn(h._owner.type) + "."), pi(h), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, F), pi(null);
          }
        }
      }
      function Yt(h, C) {
        if (typeof h == "object") {
          if (En(h))
            for (var N = 0; N < h.length; N++) {
              var F = h[N];
              pn(F) && on(F, C);
            }
          else if (pn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var q = ft(h);
            if (typeof q == "function" && q !== h.entries)
              for (var Oe = q.call(h), re; !(re = Oe.next()).done; )
                pn(re.value) && on(re.value, C);
          }
        }
      }
      function yl(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var N;
          if (typeof C == "function")
            N = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === ut || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === ue))
            N = C.propTypes;
          else
            return;
          if (N) {
            var F = Gn(C);
            Yo(N, h.props, "prop", F, h);
          } else if (C.PropTypes !== void 0 && !Ve) {
            Ve = !0;
            var q = Gn(C);
            Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", q || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function $n(h) {
        {
          for (var C = Object.keys(h.props), N = 0; N < C.length; N++) {
            var F = C[N];
            if (F !== "children" && F !== "key") {
              pi(h), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), pi(null);
              break;
            }
          }
          h.ref !== null && (pi(h), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), pi(null));
        }
      }
      function kr(h, C, N) {
        var F = B(h);
        if (!F) {
          var q = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Oe = vi(C);
          Oe ? q += Oe : q += Ku();
          var re;
          h === null ? re = "null" : En(h) ? re = "array" : h !== void 0 && h.$$typeof === wt ? (re = "<" + (Gn(h.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : re = typeof h, Ee("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", re, q);
        }
        var Ne = tt.apply(this, arguments);
        if (Ne == null)
          return Ne;
        if (F)
          for (var ct = 2; ct < arguments.length; ct++)
            Yt(arguments[ct], h);
        return h === mt ? $n(Ne) : yl(Ne), Ne;
      }
      var Ta = !1;
      function ru(h) {
        var C = kr.bind(null, h);
        return C.type = h, Ta || (Ta = !0, Dt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return Dt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function Io(h, C, N) {
        for (var F = Jt.apply(this, arguments), q = 2; q < arguments.length; q++)
          Yt(arguments[q], F.type);
        return yl(F), F;
      }
      function Qo(h, C) {
        var N = pt.transition;
        pt.transition = {};
        var F = pt.transition;
        pt.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (pt.transition = N, N === null && F._updatedFibers) {
            var q = F._updatedFibers.size;
            q > 10 && Dt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
          }
        }
      }
      var gl = !1, au = null;
      function Qf(h) {
        if (au === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), N = Z && Z[C];
            au = N.call(Z, "timers").setImmediate;
          } catch {
            au = function(q) {
              gl === !1 && (gl = !0, typeof MessageChannel > "u" && Ee("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Oe = new MessageChannel();
              Oe.port1.onmessage = q, Oe.port2.postMessage(void 0);
            };
          }
        return au(h);
      }
      var wa = 0, Ka = !1;
      function mi(h) {
        {
          var C = wa;
          wa++, _e.current === null && (_e.current = []);
          var N = _e.isBatchingLegacy, F;
          try {
            if (_e.isBatchingLegacy = !0, F = h(), !N && _e.didScheduleLegacyUpdate) {
              var q = _e.current;
              q !== null && (_e.didScheduleLegacyUpdate = !1, Sl(q));
            }
          } catch (nt) {
            throw xa(C), nt;
          } finally {
            _e.isBatchingLegacy = N;
          }
          if (F !== null && typeof F == "object" && typeof F.then == "function") {
            var Oe = F, re = !1, Ne = {
              then: function(nt, Qt) {
                re = !0, Oe.then(function(vn) {
                  xa(C), wa === 0 ? Ju(vn, nt, Qt) : nt(vn);
                }, function(vn) {
                  xa(C), Qt(vn);
                });
              }
            };
            return !Ka && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              re || (Ka = !0, Ee("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ne;
          } else {
            var ct = F;
            if (xa(C), wa === 0) {
              var Tt = _e.current;
              Tt !== null && (Sl(Tt), _e.current = null);
              var tn = {
                then: function(nt, Qt) {
                  _e.current === null ? (_e.current = [], Ju(ct, nt, Qt)) : nt(ct);
                }
              };
              return tn;
            } else {
              var It = {
                then: function(nt, Qt) {
                  nt(ct);
                }
              };
              return It;
            }
          }
        }
      }
      function xa(h) {
        h !== wa - 1 && Ee("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), wa = h;
      }
      function Ju(h, C, N) {
        {
          var F = _e.current;
          if (F !== null)
            try {
              Sl(F), Qf(function() {
                F.length === 0 ? (_e.current = null, C(h)) : Ju(h, C, N);
              });
            } catch (q) {
              N(q);
            }
          else
            C(h);
        }
      }
      var Zu = !1;
      function Sl(h) {
        if (!Zu) {
          Zu = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var N = h[C];
              do
                N = N(!0);
              while (N !== null);
            }
            h.length = 0;
          } catch (F) {
            throw h = h.slice(C + 1), F;
          } finally {
            Zu = !1;
          }
        }
      }
      var iu = kr, eo = Io, to = ru, Ja = {
        map: Fi,
        forEach: Jl,
        count: Kl,
        toArray: fl,
        only: dl
      };
      X.Children = Ja, X.Component = Ue, X.Fragment = mt, X.Profiler = Vt, X.PureComponent = at, X.StrictMode = S, X.Suspense = ee, X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _t, X.act = mi, X.cloneElement = eo, X.createContext = Zl, X.createElement = iu, X.createFactory = to, X.createRef = kn, X.forwardRef = di, X.isValidElement = pn, X.lazy = fi, X.memo = ae, X.startTransition = Qo, X.unstable_act = mi, X.useCallback = rr, X.useContext = We, X.useDebugValue = Ge, X.useDeferredValue = Ga, X.useEffect = Rn, X.useId = eu, X.useImperativeHandle = Wa, X.useInsertionEffect = en, X.useLayoutEffect = un, X.useMemo = Qa, X.useReducer = st, X.useRef = it, X.useState = Be, X.useSyncExternalStore = tu, X.useTransition = Ke, X.version = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Jp, Jp.exports)), Jp.exports;
}
var KR;
function Zp() {
  return KR || (KR = 1, process.env.NODE_ENV === "production" ? Qm.exports = Xb() : Qm.exports = Kb()), Qm.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var JR;
function Jb() {
  if (JR) return Xp;
  JR = 1;
  var Z = Zp(), X = Symbol.for("react.element"), A = Symbol.for("react.fragment"), wt = Object.prototype.hasOwnProperty, Je = Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, mt = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(Vt, de, ve) {
    var ut, ee = {}, Ce = null, ue = null;
    ve !== void 0 && (Ce = "" + ve), de.key !== void 0 && (Ce = "" + de.key), de.ref !== void 0 && (ue = de.ref);
    for (ut in de) wt.call(de, ut) && !mt.hasOwnProperty(ut) && (ee[ut] = de[ut]);
    if (Vt && Vt.defaultProps) for (ut in de = Vt.defaultProps, de) ee[ut] === void 0 && (ee[ut] = de[ut]);
    return { $$typeof: X, type: Vt, key: Ce, ref: ue, props: ee, _owner: Je.current };
  }
  return Xp.Fragment = A, Xp.jsx = S, Xp.jsxs = S, Xp;
}
var Kp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ZR;
function Zb() {
  return ZR || (ZR = 1, process.env.NODE_ENV !== "production" && function() {
    var Z = Zp(), X = Symbol.for("react.element"), A = Symbol.for("react.portal"), wt = Symbol.for("react.fragment"), Je = Symbol.for("react.strict_mode"), mt = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), Vt = Symbol.for("react.context"), de = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), ut = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), Ye = Symbol.iterator, yt = "@@iterator";
    function dt(R) {
      if (R === null || typeof R != "object")
        return null;
      var B = Ye && R[Ye] || R[yt];
      return typeof B == "function" ? B : null;
    }
    var cn = Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function ft(R) {
      {
        for (var B = arguments.length, ae = new Array(B > 1 ? B - 1 : 0), he = 1; he < B; he++)
          ae[he - 1] = arguments[he];
        Ie("error", R, ae);
      }
    }
    function Ie(R, B, ae) {
      {
        var he = cn.ReactDebugCurrentFrame, We = he.getStackAddendum();
        We !== "" && (B += "%s", ae = ae.concat([We]));
        var Be = ae.map(function(st) {
          return String(st);
        });
        Be.unshift("Warning: " + B), Function.prototype.apply.call(console[R], console, Be);
      }
    }
    var pt = !1, _e = !1, ot = !1, Fe = !1, rn = !1, Ft;
    Ft = Symbol.for("react.module.reference");
    function Kt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === wt || R === mt || rn || R === Je || R === ve || R === ut || Fe || R === ue || pt || _e || ot || typeof R == "object" && R !== null && (R.$$typeof === Ce || R.$$typeof === ee || R.$$typeof === S || R.$$typeof === Vt || R.$$typeof === de || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Ft || R.getModuleId !== void 0));
    }
    function an(R, B, ae) {
      var he = R.displayName;
      if (he)
        return he;
      var We = B.displayName || B.name || "";
      return We !== "" ? ae + "(" + We + ")" : ae;
    }
    function xt(R) {
      return R.displayName || "Context";
    }
    function ke(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && ft("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case wt:
          return "Fragment";
        case A:
          return "Portal";
        case mt:
          return "Profiler";
        case Je:
          return "StrictMode";
        case ve:
          return "Suspense";
        case ut:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case Vt:
            var B = R;
            return xt(B) + ".Consumer";
          case S:
            var ae = R;
            return xt(ae._context) + ".Provider";
          case de:
            return an(R, R.render, "ForwardRef");
          case ee:
            var he = R.displayName || null;
            return he !== null ? he : ke(R.type) || "Memo";
          case Ce: {
            var We = R, Be = We._payload, st = We._init;
            try {
              return ke(st(Be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ut = Object.assign, _t = 0, Dt, Ee, K, Re, ne, b, P;
    function je() {
    }
    je.__reactDisabledLog = !0;
    function Ue() {
      {
        if (_t === 0) {
          Dt = console.log, Ee = console.info, K = console.warn, Re = console.error, ne = console.group, b = console.groupCollapsed, P = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: je,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        _t++;
      }
    }
    function rt() {
      {
        if (_t--, _t === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ut({}, R, {
              value: Dt
            }),
            info: Ut({}, R, {
              value: Ee
            }),
            warn: Ut({}, R, {
              value: K
            }),
            error: Ut({}, R, {
              value: Re
            }),
            group: Ut({}, R, {
              value: ne
            }),
            groupCollapsed: Ut({}, R, {
              value: b
            }),
            groupEnd: Ut({}, R, {
              value: P
            })
          });
        }
        _t < 0 && ft("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ze = cn.ReactCurrentDispatcher, Xe;
    function et(R, B, ae) {
      {
        if (Xe === void 0)
          try {
            throw Error();
          } catch (We) {
            var he = We.stack.trim().match(/\n( *(at )?)/);
            Xe = he && he[1] || "";
          }
        return `
` + Xe + R;
      }
    }
    var at = !1, Pt;
    {
      var kn = typeof WeakMap == "function" ? WeakMap : Map;
      Pt = new kn();
    }
    function wr(R, B) {
      if (!R || at)
        return "";
      {
        var ae = Pt.get(R);
        if (ae !== void 0)
          return ae;
      }
      var he;
      at = !0;
      var We = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Be;
      Be = Ze.current, Ze.current = null, Ue();
      try {
        if (B) {
          var st = function() {
            throw Error();
          };
          if (Object.defineProperty(st.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(st, []);
            } catch (Ge) {
              he = Ge;
            }
            Reflect.construct(R, [], st);
          } else {
            try {
              st.call();
            } catch (Ge) {
              he = Ge;
            }
            R.call(st.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ge) {
            he = Ge;
          }
          R();
        }
      } catch (Ge) {
        if (Ge && he && typeof Ge.stack == "string") {
          for (var it = Ge.stack.split(`
`), Rn = he.stack.split(`
`), en = it.length - 1, un = Rn.length - 1; en >= 1 && un >= 0 && it[en] !== Rn[un]; )
            un--;
          for (; en >= 1 && un >= 0; en--, un--)
            if (it[en] !== Rn[un]) {
              if (en !== 1 || un !== 1)
                do
                  if (en--, un--, un < 0 || it[en] !== Rn[un]) {
                    var rr = `
` + it[en].replace(" at new ", " at ");
                    return R.displayName && rr.includes("<anonymous>") && (rr = rr.replace("<anonymous>", R.displayName)), typeof R == "function" && Pt.set(R, rr), rr;
                  }
                while (en >= 1 && un >= 0);
              break;
            }
        }
      } finally {
        at = !1, Ze.current = Be, rt(), Error.prepareStackTrace = We;
      }
      var Qa = R ? R.displayName || R.name : "", Wa = Qa ? et(Qa) : "";
      return typeof R == "function" && Pt.set(R, Wa), Wa;
    }
    function En(R, B, ae) {
      return wr(R, !1);
    }
    function tr(R) {
      var B = R.prototype;
      return !!(B && B.isReactComponent);
    }
    function Pn(R, B, ae) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return wr(R, tr(R));
      if (typeof R == "string")
        return et(R);
      switch (R) {
        case ve:
          return et("Suspense");
        case ut:
          return et("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case de:
            return En(R.render);
          case ee:
            return Pn(R.type, B, ae);
          case Ce: {
            var he = R, We = he._payload, Be = he._init;
            try {
              return Pn(Be(We), B, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var Vn = Object.prototype.hasOwnProperty, $r = {}, oi = cn.ReactDebugCurrentFrame;
    function ua(R) {
      if (R) {
        var B = R._owner, ae = Pn(R.type, R._source, B ? B.type : null);
        oi.setExtraStackFrame(ae);
      } else
        oi.setExtraStackFrame(null);
    }
    function Gn(R, B, ae, he, We) {
      {
        var Be = Function.call.bind(Vn);
        for (var st in R)
          if (Be(R, st)) {
            var it = void 0;
            try {
              if (typeof R[st] != "function") {
                var Rn = Error((he || "React class") + ": " + ae + " type `" + st + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[st] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Rn.name = "Invariant Violation", Rn;
              }
              it = R[st](B, st, he, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (en) {
              it = en;
            }
            it && !(it instanceof Error) && (ua(We), ft("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", he || "React class", ae, st, typeof it), ua(null)), it instanceof Error && !(it.message in $r) && ($r[it.message] = !0, ua(We), ft("Failed %s type: %s", ae, it.message), ua(null));
          }
      }
    }
    var Cn = Array.isArray;
    function Bn(R) {
      return Cn(R);
    }
    function yr(R) {
      {
        var B = typeof Symbol == "function" && Symbol.toStringTag, ae = B && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return ae;
      }
    }
    function $a(R) {
      try {
        return On(R), !1;
      } catch {
        return !0;
      }
    }
    function On(R) {
      return "" + R;
    }
    function gr(R) {
      if ($a(R))
        return ft("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yr(R)), On(R);
    }
    var oa = cn.ReactCurrentOwner, Ya = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, si, J;
    function Te(R) {
      if (Vn.call(R, "ref")) {
        var B = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function tt(R) {
      if (Vn.call(R, "key")) {
        var B = Object.getOwnPropertyDescriptor(R, "key").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function At(R, B) {
      typeof R.ref == "string" && oa.current;
    }
    function Jt(R, B) {
      {
        var ae = function() {
          si || (si = !0, ft("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function pn(R, B) {
      {
        var ae = function() {
          J || (J = !0, ft("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var ln = function(R, B, ae, he, We, Be, st) {
      var it = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: X,
        // Built-in properties that belong on the element
        type: R,
        key: B,
        ref: ae,
        props: st,
        // Record the component responsible for creating this element.
        _owner: Be
      };
      return it._store = {}, Object.defineProperty(it._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(it, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.defineProperty(it, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: We
      }), Object.freeze && (Object.freeze(it.props), Object.freeze(it)), it;
    };
    function qn(R, B, ae, he, We) {
      {
        var Be, st = {}, it = null, Rn = null;
        ae !== void 0 && (gr(ae), it = "" + ae), tt(B) && (gr(B.key), it = "" + B.key), Te(B) && (Rn = B.ref, At(B, We));
        for (Be in B)
          Vn.call(B, Be) && !Ya.hasOwnProperty(Be) && (st[Be] = B[Be]);
        if (R && R.defaultProps) {
          var en = R.defaultProps;
          for (Be in en)
            st[Be] === void 0 && (st[Be] = en[Be]);
        }
        if (it || Rn) {
          var un = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          it && Jt(st, un), Rn && pn(st, un);
        }
        return ln(R, it, Rn, We, he, oa.current, st);
      }
    }
    var Zt = cn.ReactCurrentOwner, Bt = cn.ReactDebugCurrentFrame;
    function $t(R) {
      if (R) {
        var B = R._owner, ae = Pn(R.type, R._source, B ? B.type : null);
        Bt.setExtraStackFrame(ae);
      } else
        Bt.setExtraStackFrame(null);
    }
    var sa;
    sa = !1;
    function Sr(R) {
      return typeof R == "object" && R !== null && R.$$typeof === X;
    }
    function Ra() {
      {
        if (Zt.current) {
          var R = ke(Zt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function Fi(R) {
      return "";
    }
    var Kl = {};
    function Jl(R) {
      {
        var B = Ra();
        if (!B) {
          var ae = typeof R == "string" ? R : R.displayName || R.name;
          ae && (B = `

Check the top-level render call using <` + ae + ">.");
        }
        return B;
      }
    }
    function fl(R, B) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var ae = Jl(B);
        if (Kl[ae])
          return;
        Kl[ae] = !0;
        var he = "";
        R && R._owner && R._owner !== Zt.current && (he = " It was passed a child from " + ke(R._owner.type) + "."), $t(R), ft('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, he), $t(null);
      }
    }
    function dl(R, B) {
      {
        if (typeof R != "object")
          return;
        if (Bn(R))
          for (var ae = 0; ae < R.length; ae++) {
            var he = R[ae];
            Sr(he) && fl(he, B);
          }
        else if (Sr(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var We = dt(R);
          if (typeof We == "function" && We !== R.entries)
            for (var Be = We.call(R), st; !(st = Be.next()).done; )
              Sr(st.value) && fl(st.value, B);
        }
      }
    }
    function Zl(R) {
      {
        var B = R.type;
        if (B == null || typeof B == "string")
          return;
        var ae;
        if (typeof B == "function")
          ae = B.propTypes;
        else if (typeof B == "object" && (B.$$typeof === de || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        B.$$typeof === ee))
          ae = B.propTypes;
        else
          return;
        if (ae) {
          var he = ke(B);
          Gn(ae, R.props, "prop", he, R);
        } else if (B.PropTypes !== void 0 && !sa) {
          sa = !0;
          var We = ke(B);
          ft("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
        }
        typeof B.getDefaultProps == "function" && !B.getDefaultProps.isReactClassApproved && ft("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xr(R) {
      {
        for (var B = Object.keys(R.props), ae = 0; ae < B.length; ae++) {
          var he = B[ae];
          if (he !== "children" && he !== "key") {
            $t(R), ft("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", he), $t(null);
            break;
          }
        }
        R.ref !== null && ($t(R), ft("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var _r = {};
    function nr(R, B, ae, he, We, Be) {
      {
        var st = Kt(R);
        if (!st) {
          var it = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (it += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Rn = Fi();
          Rn ? it += Rn : it += Ra();
          var en;
          R === null ? en = "null" : Bn(R) ? en = "array" : R !== void 0 && R.$$typeof === X ? (en = "<" + (ke(R.type) || "Unknown") + " />", it = " Did you accidentally export a JSX literal instead of a component?") : en = typeof R, ft("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", en, it);
        }
        var un = qn(R, B, ae, We, Be);
        if (un == null)
          return un;
        if (st) {
          var rr = B.children;
          if (rr !== void 0)
            if (he)
              if (Bn(rr)) {
                for (var Qa = 0; Qa < rr.length; Qa++)
                  dl(rr[Qa], R);
                Object.freeze && Object.freeze(rr);
              } else
                ft("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              dl(rr, R);
        }
        if (Vn.call(B, "key")) {
          var Wa = ke(R), Ge = Object.keys(B).filter(function(eu) {
            return eu !== "key";
          }), Ke = Ge.length > 0 ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!_r[Wa + Ke]) {
            var Ga = Ge.length > 0 ? "{" + Ge.join(": ..., ") + ": ...}" : "{}";
            ft(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ke, Wa, Ga, Wa), _r[Wa + Ke] = !0;
          }
        }
        return R === wt ? xr(un) : Zl(un), un;
      }
    }
    function ci(R, B, ae) {
      return nr(R, B, ae, !0);
    }
    function Ia(R, B, ae) {
      return nr(R, B, ae, !1);
    }
    var fi = Ia, di = ci;
    Kp.Fragment = wt, Kp.jsx = fi, Kp.jsxs = di;
  }()), Kp;
}
var eT;
function eD() {
  return eT || (eT = 1, process.env.NODE_ENV === "production" ? Im.exports = Jb() : Im.exports = Zb()), Im.exports;
}
var tD = eD(), vE = Zp(), Yf = {}, Wm = { exports: {} }, Va = {}, Gm = { exports: {} }, dE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tT;
function nD() {
  return tT || (tT = 1, function(Z) {
    function X(K, Re) {
      var ne = K.length;
      K.push(Re);
      e: for (; 0 < ne; ) {
        var b = ne - 1 >>> 1, P = K[b];
        if (0 < Je(P, Re)) K[b] = Re, K[ne] = P, ne = b;
        else break e;
      }
    }
    function A(K) {
      return K.length === 0 ? null : K[0];
    }
    function wt(K) {
      if (K.length === 0) return null;
      var Re = K[0], ne = K.pop();
      if (ne !== Re) {
        K[0] = ne;
        e: for (var b = 0, P = K.length, je = P >>> 1; b < je; ) {
          var Ue = 2 * (b + 1) - 1, rt = K[Ue], Ze = Ue + 1, Xe = K[Ze];
          if (0 > Je(rt, ne)) Ze < P && 0 > Je(Xe, rt) ? (K[b] = Xe, K[Ze] = ne, b = Ze) : (K[b] = rt, K[Ue] = ne, b = Ue);
          else if (Ze < P && 0 > Je(Xe, ne)) K[b] = Xe, K[Ze] = ne, b = Ze;
          else break e;
        }
      }
      return Re;
    }
    function Je(K, Re) {
      var ne = K.sortIndex - Re.sortIndex;
      return ne !== 0 ? ne : K.id - Re.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var mt = performance;
      Z.unstable_now = function() {
        return mt.now();
      };
    } else {
      var S = Date, Vt = S.now();
      Z.unstable_now = function() {
        return S.now() - Vt;
      };
    }
    var de = [], ve = [], ut = 1, ee = null, Ce = 3, ue = !1, Ye = !1, yt = !1, dt = typeof setTimeout == "function" ? setTimeout : null, cn = typeof clearTimeout == "function" ? clearTimeout : null, ft = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ie(K) {
      for (var Re = A(ve); Re !== null; ) {
        if (Re.callback === null) wt(ve);
        else if (Re.startTime <= K) wt(ve), Re.sortIndex = Re.expirationTime, X(de, Re);
        else break;
        Re = A(ve);
      }
    }
    function pt(K) {
      if (yt = !1, Ie(K), !Ye) if (A(de) !== null) Ye = !0, Dt(_e);
      else {
        var Re = A(ve);
        Re !== null && Ee(pt, Re.startTime - K);
      }
    }
    function _e(K, Re) {
      Ye = !1, yt && (yt = !1, cn(rn), rn = -1), ue = !0;
      var ne = Ce;
      try {
        for (Ie(Re), ee = A(de); ee !== null && (!(ee.expirationTime > Re) || K && !an()); ) {
          var b = ee.callback;
          if (typeof b == "function") {
            ee.callback = null, Ce = ee.priorityLevel;
            var P = b(ee.expirationTime <= Re);
            Re = Z.unstable_now(), typeof P == "function" ? ee.callback = P : ee === A(de) && wt(de), Ie(Re);
          } else wt(de);
          ee = A(de);
        }
        if (ee !== null) var je = !0;
        else {
          var Ue = A(ve);
          Ue !== null && Ee(pt, Ue.startTime - Re), je = !1;
        }
        return je;
      } finally {
        ee = null, Ce = ne, ue = !1;
      }
    }
    var ot = !1, Fe = null, rn = -1, Ft = 5, Kt = -1;
    function an() {
      return !(Z.unstable_now() - Kt < Ft);
    }
    function xt() {
      if (Fe !== null) {
        var K = Z.unstable_now();
        Kt = K;
        var Re = !0;
        try {
          Re = Fe(!0, K);
        } finally {
          Re ? ke() : (ot = !1, Fe = null);
        }
      } else ot = !1;
    }
    var ke;
    if (typeof ft == "function") ke = function() {
      ft(xt);
    };
    else if (typeof MessageChannel < "u") {
      var Ut = new MessageChannel(), _t = Ut.port2;
      Ut.port1.onmessage = xt, ke = function() {
        _t.postMessage(null);
      };
    } else ke = function() {
      dt(xt, 0);
    };
    function Dt(K) {
      Fe = K, ot || (ot = !0, ke());
    }
    function Ee(K, Re) {
      rn = dt(function() {
        K(Z.unstable_now());
      }, Re);
    }
    Z.unstable_IdlePriority = 5, Z.unstable_ImmediatePriority = 1, Z.unstable_LowPriority = 4, Z.unstable_NormalPriority = 3, Z.unstable_Profiling = null, Z.unstable_UserBlockingPriority = 2, Z.unstable_cancelCallback = function(K) {
      K.callback = null;
    }, Z.unstable_continueExecution = function() {
      Ye || ue || (Ye = !0, Dt(_e));
    }, Z.unstable_forceFrameRate = function(K) {
      0 > K || 125 < K ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ft = 0 < K ? Math.floor(1e3 / K) : 5;
    }, Z.unstable_getCurrentPriorityLevel = function() {
      return Ce;
    }, Z.unstable_getFirstCallbackNode = function() {
      return A(de);
    }, Z.unstable_next = function(K) {
      switch (Ce) {
        case 1:
        case 2:
        case 3:
          var Re = 3;
          break;
        default:
          Re = Ce;
      }
      var ne = Ce;
      Ce = Re;
      try {
        return K();
      } finally {
        Ce = ne;
      }
    }, Z.unstable_pauseExecution = function() {
    }, Z.unstable_requestPaint = function() {
    }, Z.unstable_runWithPriority = function(K, Re) {
      switch (K) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          K = 3;
      }
      var ne = Ce;
      Ce = K;
      try {
        return Re();
      } finally {
        Ce = ne;
      }
    }, Z.unstable_scheduleCallback = function(K, Re, ne) {
      var b = Z.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? b + ne : b) : ne = b, K) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = ne + P, K = { id: ut++, callback: Re, priorityLevel: K, startTime: ne, expirationTime: P, sortIndex: -1 }, ne > b ? (K.sortIndex = ne, X(ve, K), A(de) === null && K === A(ve) && (yt ? (cn(rn), rn = -1) : yt = !0, Ee(pt, ne - b))) : (K.sortIndex = P, X(de, K), Ye || ue || (Ye = !0, Dt(_e))), K;
    }, Z.unstable_shouldYield = an, Z.unstable_wrapCallback = function(K) {
      var Re = Ce;
      return function() {
        var ne = Ce;
        Ce = Re;
        try {
          return K.apply(this, arguments);
        } finally {
          Ce = ne;
        }
      };
    };
  }(dE)), dE;
}
var pE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nT;
function rD() {
  return nT || (nT = 1, function(Z) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var X = !1, A = 5;
      function wt(J, Te) {
        var tt = J.length;
        J.push(Te), S(J, Te, tt);
      }
      function Je(J) {
        return J.length === 0 ? null : J[0];
      }
      function mt(J) {
        if (J.length === 0)
          return null;
        var Te = J[0], tt = J.pop();
        return tt !== Te && (J[0] = tt, Vt(J, tt, 0)), Te;
      }
      function S(J, Te, tt) {
        for (var At = tt; At > 0; ) {
          var Jt = At - 1 >>> 1, pn = J[Jt];
          if (de(pn, Te) > 0)
            J[Jt] = Te, J[At] = pn, At = Jt;
          else
            return;
        }
      }
      function Vt(J, Te, tt) {
        for (var At = tt, Jt = J.length, pn = Jt >>> 1; At < pn; ) {
          var ln = (At + 1) * 2 - 1, qn = J[ln], Zt = ln + 1, Bt = J[Zt];
          if (de(qn, Te) < 0)
            Zt < Jt && de(Bt, qn) < 0 ? (J[At] = Bt, J[Zt] = Te, At = Zt) : (J[At] = qn, J[ln] = Te, At = ln);
          else if (Zt < Jt && de(Bt, Te) < 0)
            J[At] = Bt, J[Zt] = Te, At = Zt;
          else
            return;
        }
      }
      function de(J, Te) {
        var tt = J.sortIndex - Te.sortIndex;
        return tt !== 0 ? tt : J.id - Te.id;
      }
      var ve = 1, ut = 2, ee = 3, Ce = 4, ue = 5;
      function Ye(J, Te) {
      }
      var yt = typeof performance == "object" && typeof performance.now == "function";
      if (yt) {
        var dt = performance;
        Z.unstable_now = function() {
          return dt.now();
        };
      } else {
        var cn = Date, ft = cn.now();
        Z.unstable_now = function() {
          return cn.now() - ft;
        };
      }
      var Ie = 1073741823, pt = -1, _e = 250, ot = 5e3, Fe = 1e4, rn = Ie, Ft = [], Kt = [], an = 1, xt = null, ke = ee, Ut = !1, _t = !1, Dt = !1, Ee = typeof setTimeout == "function" ? setTimeout : null, K = typeof clearTimeout == "function" ? clearTimeout : null, Re = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ne(J) {
        for (var Te = Je(Kt); Te !== null; ) {
          if (Te.callback === null)
            mt(Kt);
          else if (Te.startTime <= J)
            mt(Kt), Te.sortIndex = Te.expirationTime, wt(Ft, Te);
          else
            return;
          Te = Je(Kt);
        }
      }
      function b(J) {
        if (Dt = !1, ne(J), !_t)
          if (Je(Ft) !== null)
            _t = !0, On(P);
          else {
            var Te = Je(Kt);
            Te !== null && gr(b, Te.startTime - J);
          }
      }
      function P(J, Te) {
        _t = !1, Dt && (Dt = !1, oa()), Ut = !0;
        var tt = ke;
        try {
          var At;
          if (!X) return je(J, Te);
        } finally {
          xt = null, ke = tt, Ut = !1;
        }
      }
      function je(J, Te) {
        var tt = Te;
        for (ne(tt), xt = Je(Ft); xt !== null && !(xt.expirationTime > tt && (!J || oi())); ) {
          var At = xt.callback;
          if (typeof At == "function") {
            xt.callback = null, ke = xt.priorityLevel;
            var Jt = xt.expirationTime <= tt, pn = At(Jt);
            tt = Z.unstable_now(), typeof pn == "function" ? xt.callback = pn : xt === Je(Ft) && mt(Ft), ne(tt);
          } else
            mt(Ft);
          xt = Je(Ft);
        }
        if (xt !== null)
          return !0;
        var ln = Je(Kt);
        return ln !== null && gr(b, ln.startTime - tt), !1;
      }
      function Ue(J, Te) {
        switch (J) {
          case ve:
          case ut:
          case ee:
          case Ce:
          case ue:
            break;
          default:
            J = ee;
        }
        var tt = ke;
        ke = J;
        try {
          return Te();
        } finally {
          ke = tt;
        }
      }
      function rt(J) {
        var Te;
        switch (ke) {
          case ve:
          case ut:
          case ee:
            Te = ee;
            break;
          default:
            Te = ke;
            break;
        }
        var tt = ke;
        ke = Te;
        try {
          return J();
        } finally {
          ke = tt;
        }
      }
      function Ze(J) {
        var Te = ke;
        return function() {
          var tt = ke;
          ke = Te;
          try {
            return J.apply(this, arguments);
          } finally {
            ke = tt;
          }
        };
      }
      function Xe(J, Te, tt) {
        var At = Z.unstable_now(), Jt;
        if (typeof tt == "object" && tt !== null) {
          var pn = tt.delay;
          typeof pn == "number" && pn > 0 ? Jt = At + pn : Jt = At;
        } else
          Jt = At;
        var ln;
        switch (J) {
          case ve:
            ln = pt;
            break;
          case ut:
            ln = _e;
            break;
          case ue:
            ln = rn;
            break;
          case Ce:
            ln = Fe;
            break;
          case ee:
          default:
            ln = ot;
            break;
        }
        var qn = Jt + ln, Zt = {
          id: an++,
          callback: Te,
          priorityLevel: J,
          startTime: Jt,
          expirationTime: qn,
          sortIndex: -1
        };
        return Jt > At ? (Zt.sortIndex = Jt, wt(Kt, Zt), Je(Ft) === null && Zt === Je(Kt) && (Dt ? oa() : Dt = !0, gr(b, Jt - At))) : (Zt.sortIndex = qn, wt(Ft, Zt), !_t && !Ut && (_t = !0, On(P))), Zt;
      }
      function et() {
      }
      function at() {
        !_t && !Ut && (_t = !0, On(P));
      }
      function Pt() {
        return Je(Ft);
      }
      function kn(J) {
        J.callback = null;
      }
      function wr() {
        return ke;
      }
      var En = !1, tr = null, Pn = -1, Vn = A, $r = -1;
      function oi() {
        var J = Z.unstable_now() - $r;
        return !(J < Vn);
      }
      function ua() {
      }
      function Gn(J) {
        if (J < 0 || J > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        J > 0 ? Vn = Math.floor(1e3 / J) : Vn = A;
      }
      var Cn = function() {
        if (tr !== null) {
          var J = Z.unstable_now();
          $r = J;
          var Te = !0, tt = !0;
          try {
            tt = tr(Te, J);
          } finally {
            tt ? Bn() : (En = !1, tr = null);
          }
        } else
          En = !1;
      }, Bn;
      if (typeof Re == "function")
        Bn = function() {
          Re(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var yr = new MessageChannel(), $a = yr.port2;
        yr.port1.onmessage = Cn, Bn = function() {
          $a.postMessage(null);
        };
      } else
        Bn = function() {
          Ee(Cn, 0);
        };
      function On(J) {
        tr = J, En || (En = !0, Bn());
      }
      function gr(J, Te) {
        Pn = Ee(function() {
          J(Z.unstable_now());
        }, Te);
      }
      function oa() {
        K(Pn), Pn = -1;
      }
      var Ya = ua, si = null;
      Z.unstable_IdlePriority = ue, Z.unstable_ImmediatePriority = ve, Z.unstable_LowPriority = Ce, Z.unstable_NormalPriority = ee, Z.unstable_Profiling = si, Z.unstable_UserBlockingPriority = ut, Z.unstable_cancelCallback = kn, Z.unstable_continueExecution = at, Z.unstable_forceFrameRate = Gn, Z.unstable_getCurrentPriorityLevel = wr, Z.unstable_getFirstCallbackNode = Pt, Z.unstable_next = rt, Z.unstable_pauseExecution = et, Z.unstable_requestPaint = Ya, Z.unstable_runWithPriority = Ue, Z.unstable_scheduleCallback = Xe, Z.unstable_shouldYield = oi, Z.unstable_wrapCallback = Ze, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(pE)), pE;
}
var rT;
function oT() {
  return rT || (rT = 1, process.env.NODE_ENV === "production" ? Gm.exports = nD() : Gm.exports = rD()), Gm.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aT;
function aD() {
  if (aT) return Va;
  aT = 1;
  var Z = Zp(), X = oT();
  function A(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var wt = /* @__PURE__ */ new Set(), Je = {};
  function mt(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Je[n] = r, n = 0; n < r.length; n++) wt.add(r[n]);
  }
  var Vt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), de = Object.prototype.hasOwnProperty, ve = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ut = {}, ee = {};
  function Ce(n) {
    return de.call(ee, n) ? !0 : de.call(ut, n) ? !1 : ve.test(n) ? ee[n] = !0 : (ut[n] = !0, !1);
  }
  function ue(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Ye(n, r, l, o) {
    if (r === null || typeof r > "u" || ue(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function yt(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var dt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    dt[n] = new yt(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    dt[r] = new yt(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    dt[n] = new yt(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    dt[n] = new yt(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    dt[n] = new yt(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    dt[n] = new yt(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    dt[n] = new yt(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    dt[n] = new yt(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    dt[n] = new yt(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var cn = /[\-:]([a-z])/g;
  function ft(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      cn,
      ft
    );
    dt[r] = new yt(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(cn, ft);
    dt[r] = new yt(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(cn, ft);
    dt[r] = new yt(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    dt[n] = new yt(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), dt.xlinkHref = new yt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    dt[n] = new yt(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ie(n, r, l, o) {
    var c = dt.hasOwnProperty(r) ? dt[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Ye(r, l, c, o) && (l = null), o || c === null ? Ce(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var pt = Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, _e = Symbol.for("react.element"), ot = Symbol.for("react.portal"), Fe = Symbol.for("react.fragment"), rn = Symbol.for("react.strict_mode"), Ft = Symbol.for("react.profiler"), Kt = Symbol.for("react.provider"), an = Symbol.for("react.context"), xt = Symbol.for("react.forward_ref"), ke = Symbol.for("react.suspense"), Ut = Symbol.for("react.suspense_list"), _t = Symbol.for("react.memo"), Dt = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), K = Symbol.iterator;
  function Re(n) {
    return n === null || typeof n != "object" ? null : (n = K && n[K] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ne = Object.assign, b;
  function P(n) {
    if (b === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      b = r && r[1] || "";
    }
    return `
` + b + n;
  }
  var je = !1;
  function Ue(n, r) {
    if (!n || je) return "";
    je = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (z) {
          var o = z;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (z) {
          o = z;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (z) {
          o = z;
        }
        n();
      }
    } catch (z) {
      if (z && o && typeof z.stack == "string") {
        for (var c = z.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== d[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== d[E]) {
                var T = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      je = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? P(n) : "";
  }
  function rt(n) {
    switch (n.tag) {
      case 5:
        return P(n.type);
      case 16:
        return P("Lazy");
      case 13:
        return P("Suspense");
      case 19:
        return P("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ue(n.type, !1), n;
      case 11:
        return n = Ue(n.type.render, !1), n;
      case 1:
        return n = Ue(n.type, !0), n;
      default:
        return "";
    }
  }
  function Ze(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Fe:
        return "Fragment";
      case ot:
        return "Portal";
      case Ft:
        return "Profiler";
      case rn:
        return "StrictMode";
      case ke:
        return "Suspense";
      case Ut:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case an:
        return (n.displayName || "Context") + ".Consumer";
      case Kt:
        return (n._context.displayName || "Context") + ".Provider";
      case xt:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case _t:
        return r = n.displayName || null, r !== null ? r : Ze(n.type) || "Memo";
      case Dt:
        r = n._payload, n = n._init;
        try {
          return Ze(n(r));
        } catch {
        }
    }
    return null;
  }
  function Xe(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ze(r);
      case 8:
        return r === rn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function et(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function at(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Pt(n) {
    var r = at(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function kn(n) {
    n._valueTracker || (n._valueTracker = Pt(n));
  }
  function wr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = at(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function En(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function tr(n, r) {
    var l = r.checked;
    return ne({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Pn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = et(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Vn(n, r) {
    r = r.checked, r != null && Ie(n, "checked", r, !1);
  }
  function $r(n, r) {
    Vn(n, r);
    var l = et(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? ua(n, r.type, l) : r.hasOwnProperty("defaultValue") && ua(n, r.type, et(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function oi(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function ua(n, r, l) {
    (r !== "number" || En(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Gn = Array.isArray;
  function Cn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + et(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Bn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(A(91));
    return ne({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function yr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(A(92));
        if (Gn(l)) {
          if (1 < l.length) throw Error(A(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: et(l) };
  }
  function $a(n, r) {
    var l = et(r.value), o = et(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function On(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function gr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function oa(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? gr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ya, si = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ya = Ya || document.createElement("div"), Ya.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ya.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function J(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Te = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, tt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Te).forEach(function(n) {
    tt.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Te[r] = Te[n];
    });
  });
  function At(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Te.hasOwnProperty(n) && Te[n] ? ("" + r).trim() : r + "px";
  }
  function Jt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = At(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var pn = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ln(n, r) {
    if (r) {
      if (pn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(A(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(A(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(A(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(A(62));
    }
  }
  function qn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Zt = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var $t = null, sa = null, Sr = null;
  function Ra(n) {
    if (n = be(n)) {
      if (typeof $t != "function") throw Error(A(280));
      var r = n.stateNode;
      r && (r = hn(r), $t(n.stateNode, n.type, r));
    }
  }
  function Fi(n) {
    sa ? Sr ? Sr.push(n) : Sr = [n] : sa = n;
  }
  function Kl() {
    if (sa) {
      var n = sa, r = Sr;
      if (Sr = sa = null, Ra(n), r) for (n = 0; n < r.length; n++) Ra(r[n]);
    }
  }
  function Jl(n, r) {
    return n(r);
  }
  function fl() {
  }
  var dl = !1;
  function Zl(n, r, l) {
    if (dl) return n(r, l);
    dl = !0;
    try {
      return Jl(n, r, l);
    } finally {
      dl = !1, (sa !== null || Sr !== null) && (fl(), Kl());
    }
  }
  function xr(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = hn(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(A(231, r, typeof l));
    return l;
  }
  var _r = !1;
  if (Vt) try {
    var nr = {};
    Object.defineProperty(nr, "passive", { get: function() {
      _r = !0;
    } }), window.addEventListener("test", nr, nr), window.removeEventListener("test", nr, nr);
  } catch {
    _r = !1;
  }
  function ci(n, r, l, o, c, d, m, E, T) {
    var z = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, z);
    } catch (I) {
      this.onError(I);
    }
  }
  var Ia = !1, fi = null, di = !1, R = null, B = { onError: function(n) {
    Ia = !0, fi = n;
  } };
  function ae(n, r, l, o, c, d, m, E, T) {
    Ia = !1, fi = null, ci.apply(B, arguments);
  }
  function he(n, r, l, o, c, d, m, E, T) {
    if (ae.apply(this, arguments), Ia) {
      if (Ia) {
        var z = fi;
        Ia = !1, fi = null;
      } else throw Error(A(198));
      di || (di = !0, R = z);
    }
  }
  function We(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, (r.flags & 4098) !== 0 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function Be(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function st(n) {
    if (We(n) !== n) throw Error(A(188));
  }
  function it(n) {
    var r = n.alternate;
    if (!r) {
      if (r = We(n), r === null) throw Error(A(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return st(c), n;
          if (d === o) return st(c), r;
          d = d.sibling;
        }
        throw Error(A(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(A(189));
        }
      }
      if (l.alternate !== o) throw Error(A(190));
    }
    if (l.tag !== 3) throw Error(A(188));
    return l.stateNode.current === l ? n : r;
  }
  function Rn(n) {
    return n = it(n), n !== null ? en(n) : null;
  }
  function en(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = en(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var un = X.unstable_scheduleCallback, rr = X.unstable_cancelCallback, Qa = X.unstable_shouldYield, Wa = X.unstable_requestPaint, Ge = X.unstable_now, Ke = X.unstable_getCurrentPriorityLevel, Ga = X.unstable_ImmediatePriority, eu = X.unstable_UserBlockingPriority, tu = X.unstable_NormalPriority, pl = X.unstable_LowPriority, Iu = X.unstable_IdlePriority, vl = null, Yr = null;
  function $o(n) {
    if (Yr && typeof Yr.onCommitFiberRoot == "function") try {
      Yr.onCommitFiberRoot(vl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var br = Math.clz32 ? Math.clz32 : Qu, ac = Math.log, ic = Math.LN2;
  function Qu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (ac(n) / ic | 0) | 0;
  }
  var hl = 64, ca = 4194304;
  function qa(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Xa(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = qa(E) : (d &= m, d !== 0 && (o = qa(d)));
    } else m = l & ~c, m !== 0 ? o = qa(m) : d !== 0 && (o = qa(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && (r & c) === 0 && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if ((o & 4) !== 0 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - br(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Wu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function nu(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - br(d), E = 1 << m, T = c[m];
      T === -1 ? ((E & l) === 0 || (E & o) !== 0) && (c[m] = Wu(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function ml(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Gu() {
    var n = hl;
    return hl <<= 1, (hl & 4194240) === 0 && (hl = 64), n;
  }
  function qu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function ji(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - br(r), n[r] = l;
  }
  function If(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - br(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Hi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - br(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var kt = 0;
  function Xu(n) {
    return n &= -n, 1 < n ? 4 < n ? (n & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Rt, Yo, pi, Ve, Ku, ar = !1, vi = [], Dr = null, hi = null, on = null, Yt = /* @__PURE__ */ new Map(), yl = /* @__PURE__ */ new Map(), $n = [], kr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Ta(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Dr = null;
        break;
      case "dragenter":
      case "dragleave":
        hi = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        Yt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yl.delete(r.pointerId);
    }
  }
  function ru(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = be(r), r !== null && Yo(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Io(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Dr = ru(Dr, n, r, l, o, c), !0;
      case "dragenter":
        return hi = ru(hi, n, r, l, o, c), !0;
      case "mouseover":
        return on = ru(on, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return Yt.set(d, ru(Yt.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, yl.set(d, ru(yl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Qo(n) {
    var r = du(n.target);
    if (r !== null) {
      var l = We(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Be(l), r !== null) {
            n.blockedOn = r, Ku(n.priority, function() {
              pi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function gl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = eo(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Zt = o, l.target.dispatchEvent(o), Zt = null;
      } else return r = be(l), r !== null && Yo(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function au(n, r, l) {
    gl(n) && l.delete(r);
  }
  function Qf() {
    ar = !1, Dr !== null && gl(Dr) && (Dr = null), hi !== null && gl(hi) && (hi = null), on !== null && gl(on) && (on = null), Yt.forEach(au), yl.forEach(au);
  }
  function wa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, ar || (ar = !0, X.unstable_scheduleCallback(X.unstable_NormalPriority, Qf)));
  }
  function Ka(n) {
    function r(c) {
      return wa(c, n);
    }
    if (0 < vi.length) {
      wa(vi[0], n);
      for (var l = 1; l < vi.length; l++) {
        var o = vi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Dr !== null && wa(Dr, n), hi !== null && wa(hi, n), on !== null && wa(on, n), Yt.forEach(r), yl.forEach(r), l = 0; l < $n.length; l++) o = $n[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < $n.length && (l = $n[0], l.blockedOn === null); ) Qo(l), l.blockedOn === null && $n.shift();
  }
  var mi = pt.ReactCurrentBatchConfig, xa = !0;
  function Ju(n, r, l, o) {
    var c = kt, d = mi.transition;
    mi.transition = null;
    try {
      kt = 1, Sl(n, r, l, o);
    } finally {
      kt = c, mi.transition = d;
    }
  }
  function Zu(n, r, l, o) {
    var c = kt, d = mi.transition;
    mi.transition = null;
    try {
      kt = 4, Sl(n, r, l, o);
    } finally {
      kt = c, mi.transition = d;
    }
  }
  function Sl(n, r, l, o) {
    if (xa) {
      var c = eo(n, r, l, o);
      if (c === null) yc(n, r, o, iu, l), Ta(n, o);
      else if (Io(c, n, r, l, o)) o.stopPropagation();
      else if (Ta(n, o), r & 4 && -1 < kr.indexOf(n)) {
        for (; c !== null; ) {
          var d = be(c);
          if (d !== null && Rt(d), d = eo(n, r, l, o), d === null && yc(n, r, o, iu, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else yc(n, r, o, null, l);
    }
  }
  var iu = null;
  function eo(n, r, l, o) {
    if (iu = null, n = Bt(o), n = du(n), n !== null) if (r = We(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Be(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return iu = n, null;
  }
  function to(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Ke()) {
          case Ga:
            return 1;
          case eu:
            return 4;
          case tu:
          case pl:
            return 16;
          case Iu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ja = null, h = null, C = null;
  function N() {
    if (C) return C;
    var n, r = h, l = r.length, o, c = "value" in Ja ? Ja.value : Ja.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function F(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function q() {
    return !0;
  }
  function Oe() {
    return !1;
  }
  function re(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n) n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? q : Oe, this.isPropagationStopped = Oe, this;
    }
    return ne(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = q);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = q);
    }, persist: function() {
    }, isPersistent: q }), r;
  }
  var Ne = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ct = re(Ne), Tt = ne({}, Ne, { view: 0, detail: 0 }), tn = re(Tt), It, nt, Qt, vn = ne({}, Tt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Kf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Qt && (Qt && n.type === "mousemove" ? (It = n.screenX - Qt.screenX, nt = n.screenY - Qt.screenY) : nt = It = 0, Qt = n), It);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : nt;
  } }), El = re(vn), Wo = ne({}, vn, { dataTransfer: 0 }), Pi = re(Wo), Go = ne({}, Tt, { relatedTarget: 0 }), lu = re(Go), Wf = ne({}, Ne, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), lc = re(Wf), Gf = ne({}, Ne, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), ev = re(Gf), qf = ne({}, Ne, { data: 0 }), Xf = re(qf), tv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, nv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Xm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Vi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Xm[n]) ? !!r[n] : !1;
  }
  function Kf() {
    return Vi;
  }
  var Jf = ne({}, Tt, { key: function(n) {
    if (n.key) {
      var r = tv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = F(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? nv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Kf, charCode: function(n) {
    return n.type === "keypress" ? F(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? F(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Zf = re(Jf), ed = ne({}, vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), rv = re(ed), uc = ne({}, Tt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Kf }), av = re(uc), Ir = ne({}, Ne, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Bi = re(Ir), Ln = ne({}, vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), $i = re(Ln), td = [9, 13, 27, 32], no = Vt && "CompositionEvent" in window, qo = null;
  Vt && "documentMode" in document && (qo = document.documentMode);
  var Xo = Vt && "TextEvent" in window && !qo, iv = Vt && (!no || qo && 8 < qo && 11 >= qo), lv = " ", oc = !1;
  function uv(n, r) {
    switch (n) {
      case "keyup":
        return td.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ov(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ro = !1;
  function sv(n, r) {
    switch (n) {
      case "compositionend":
        return ov(r);
      case "keypress":
        return r.which !== 32 ? null : (oc = !0, lv);
      case "textInput":
        return n = r.data, n === lv && oc ? null : n;
      default:
        return null;
    }
  }
  function Km(n, r) {
    if (ro) return n === "compositionend" || !no && uv(n, r) ? (n = N(), C = h = Ja = null, ro = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return iv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Jm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function cv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Jm[n.type] : r === "textarea";
  }
  function nd(n, r, l, o) {
    Fi(o), r = ns(r, "onChange"), 0 < r.length && (l = new ct("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var yi = null, uu = null;
  function fv(n) {
    cu(n, 0);
  }
  function Ko(n) {
    var r = ei(n);
    if (wr(r)) return n;
  }
  function Zm(n, r) {
    if (n === "change") return r;
  }
  var dv = !1;
  if (Vt) {
    var rd;
    if (Vt) {
      var ad = "oninput" in document;
      if (!ad) {
        var pv = document.createElement("div");
        pv.setAttribute("oninput", "return;"), ad = typeof pv.oninput == "function";
      }
      rd = ad;
    } else rd = !1;
    dv = rd && (!document.documentMode || 9 < document.documentMode);
  }
  function vv() {
    yi && (yi.detachEvent("onpropertychange", hv), uu = yi = null);
  }
  function hv(n) {
    if (n.propertyName === "value" && Ko(uu)) {
      var r = [];
      nd(r, uu, n, Bt(n)), Zl(fv, r);
    }
  }
  function ey(n, r, l) {
    n === "focusin" ? (vv(), yi = r, uu = l, yi.attachEvent("onpropertychange", hv)) : n === "focusout" && vv();
  }
  function mv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Ko(uu);
  }
  function ty(n, r) {
    if (n === "click") return Ko(r);
  }
  function yv(n, r) {
    if (n === "input" || n === "change") return Ko(r);
  }
  function ny(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Za = typeof Object.is == "function" ? Object.is : ny;
  function Jo(n, r) {
    if (Za(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!de.call(r, c) || !Za(n[c], r[c])) return !1;
    }
    return !0;
  }
  function gv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function sc(n, r) {
    var l = gv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = gv(l);
    }
  }
  function Cl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Cl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Zo() {
    for (var n = window, r = En(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = En(n.document);
    }
    return r;
  }
  function cc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function ao(n) {
    var r = Zo(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Cl(l.ownerDocument.documentElement, l)) {
      if (o !== null && cc(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = sc(l, d);
          var m = sc(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ry = Vt && "documentMode" in document && 11 >= document.documentMode, io = null, id = null, es = null, ld = !1;
  function ud(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ld || io == null || io !== En(o) || (o = io, "selectionStart" in o && cc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), es && Jo(es, o) || (es = o, o = ns(id, "onSelect"), 0 < o.length && (r = new ct("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = io)));
  }
  function fc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var ou = { animationend: fc("Animation", "AnimationEnd"), animationiteration: fc("Animation", "AnimationIteration"), animationstart: fc("Animation", "AnimationStart"), transitionend: fc("Transition", "TransitionEnd") }, ir = {}, od = {};
  Vt && (od = document.createElement("div").style, "AnimationEvent" in window || (delete ou.animationend.animation, delete ou.animationiteration.animation, delete ou.animationstart.animation), "TransitionEvent" in window || delete ou.transitionend.transition);
  function dc(n) {
    if (ir[n]) return ir[n];
    if (!ou[n]) return n;
    var r = ou[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in od) return ir[n] = r[l];
    return n;
  }
  var Sv = dc("animationend"), Ev = dc("animationiteration"), Cv = dc("animationstart"), Rv = dc("transitionend"), sd = /* @__PURE__ */ new Map(), pc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function _a(n, r) {
    sd.set(n, r), mt(r, [n]);
  }
  for (var cd = 0; cd < pc.length; cd++) {
    var su = pc[cd], ay = su.toLowerCase(), iy = su[0].toUpperCase() + su.slice(1);
    _a(ay, "on" + iy);
  }
  _a(Sv, "onAnimationEnd"), _a(Ev, "onAnimationIteration"), _a(Cv, "onAnimationStart"), _a("dblclick", "onDoubleClick"), _a("focusin", "onFocus"), _a("focusout", "onBlur"), _a(Rv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), mt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), mt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), mt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), mt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), mt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), mt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ts = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), fd = new Set("cancel close invalid load scroll toggle".split(" ").concat(ts));
  function vc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, he(o, r, void 0, n), n.currentTarget = null;
  }
  function cu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var E = o[m], T = E.instance, z = E.currentTarget;
          if (E = E.listener, T !== d && c.isPropagationStopped()) break e;
          vc(c, E, z), d = T;
        }
        else for (m = 0; m < o.length; m++) {
          if (E = o[m], T = E.instance, z = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped()) break e;
          vc(c, E, z), d = T;
        }
      }
    }
    if (di) throw n = R, di = !1, R = null, n;
  }
  function jt(n, r) {
    var l = r[is];
    l === void 0 && (l = r[is] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Tv(r, n, 2, !1), l.add(o));
  }
  function hc(n, r, l) {
    var o = 0;
    r && (o |= 4), Tv(l, n, o, r);
  }
  var mc = "_reactListening" + Math.random().toString(36).slice(2);
  function lo(n) {
    if (!n[mc]) {
      n[mc] = !0, wt.forEach(function(l) {
        l !== "selectionchange" && (fd.has(l) || hc(l, !1, n), hc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[mc] || (r[mc] = !0, hc("selectionchange", !1, r));
    }
  }
  function Tv(n, r, l, o) {
    switch (to(r)) {
      case 1:
        var c = Ju;
        break;
      case 4:
        c = Zu;
        break;
      default:
        c = Sl;
    }
    l = c.bind(null, r, l, n), c = void 0, !_r || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function yc(n, r, l, o, c) {
    var d = o;
    if ((r & 1) === 0 && (r & 2) === 0 && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var E = o.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var T = m.tag;
          if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = du(E), m === null) return;
          if (T = m.tag, T === 5 || T === 6) {
            o = d = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      o = o.return;
    }
    Zl(function() {
      var z = d, I = Bt(l), W = [];
      e: {
        var Y = sd.get(n);
        if (Y !== void 0) {
          var se = ct, me = n;
          switch (n) {
            case "keypress":
              if (F(l) === 0) break e;
            case "keydown":
            case "keyup":
              se = Zf;
              break;
            case "focusin":
              me = "focus", se = lu;
              break;
            case "focusout":
              me = "blur", se = lu;
              break;
            case "beforeblur":
            case "afterblur":
              se = lu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              se = El;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = Pi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = av;
              break;
            case Sv:
            case Ev:
            case Cv:
              se = lc;
              break;
            case Rv:
              se = Bi;
              break;
            case "scroll":
              se = tn;
              break;
            case "wheel":
              se = $i;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = ev;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = rv;
          }
          var Se = (r & 4) !== 0, bn = !Se && n === "scroll", D = Se ? Y !== null ? Y + "Capture" : null : Y;
          Se = [];
          for (var x = z, L; x !== null; ) {
            L = x;
            var Q = L.stateNode;
            if (L.tag === 5 && Q !== null && (L = Q, D !== null && (Q = xr(x, D), Q != null && Se.push(uo(x, Q, L)))), bn) break;
            x = x.return;
          }
          0 < Se.length && (Y = new se(Y, me, null, l, I), W.push({ event: Y, listeners: Se }));
        }
      }
      if ((r & 7) === 0) {
        e: {
          if (Y = n === "mouseover" || n === "pointerover", se = n === "mouseout" || n === "pointerout", Y && l !== Zt && (me = l.relatedTarget || l.fromElement) && (du(me) || me[Yi])) break e;
          if ((se || Y) && (Y = I.window === I ? I : (Y = I.ownerDocument) ? Y.defaultView || Y.parentWindow : window, se ? (me = l.relatedTarget || l.toElement, se = z, me = me ? du(me) : null, me !== null && (bn = We(me), me !== bn || me.tag !== 5 && me.tag !== 6) && (me = null)) : (se = null, me = z), se !== me)) {
            if (Se = El, Q = "onMouseLeave", D = "onMouseEnter", x = "mouse", (n === "pointerout" || n === "pointerover") && (Se = rv, Q = "onPointerLeave", D = "onPointerEnter", x = "pointer"), bn = se == null ? Y : ei(se), L = me == null ? Y : ei(me), Y = new Se(Q, x + "leave", se, l, I), Y.target = bn, Y.relatedTarget = L, Q = null, du(I) === z && (Se = new Se(D, x + "enter", me, l, I), Se.target = L, Se.relatedTarget = bn, Q = Se), bn = Q, se && me) t: {
              for (Se = se, D = me, x = 0, L = Se; L; L = Rl(L)) x++;
              for (L = 0, Q = D; Q; Q = Rl(Q)) L++;
              for (; 0 < x - L; ) Se = Rl(Se), x--;
              for (; 0 < L - x; ) D = Rl(D), L--;
              for (; x--; ) {
                if (Se === D || D !== null && Se === D.alternate) break t;
                Se = Rl(Se), D = Rl(D);
              }
              Se = null;
            }
            else Se = null;
            se !== null && wv(W, Y, se, Se, !1), me !== null && bn !== null && wv(W, bn, me, Se, !0);
          }
        }
        e: {
          if (Y = z ? ei(z) : window, se = Y.nodeName && Y.nodeName.toLowerCase(), se === "select" || se === "input" && Y.type === "file") var ye = Zm;
          else if (cv(Y)) if (dv) ye = yv;
          else {
            ye = mv;
            var Me = ey;
          }
          else (se = Y.nodeName) && se.toLowerCase() === "input" && (Y.type === "checkbox" || Y.type === "radio") && (ye = ty);
          if (ye && (ye = ye(n, z))) {
            nd(W, ye, l, I);
            break e;
          }
          Me && Me(n, Y, z), n === "focusout" && (Me = Y._wrapperState) && Me.controlled && Y.type === "number" && ua(Y, "number", Y.value);
        }
        switch (Me = z ? ei(z) : window, n) {
          case "focusin":
            (cv(Me) || Me.contentEditable === "true") && (io = Me, id = z, es = null);
            break;
          case "focusout":
            es = id = io = null;
            break;
          case "mousedown":
            ld = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ld = !1, ud(W, l, I);
            break;
          case "selectionchange":
            if (ry) break;
          case "keydown":
          case "keyup":
            ud(W, l, I);
        }
        var ze;
        if (no) e: {
          switch (n) {
            case "compositionstart":
              var Pe = "onCompositionStart";
              break e;
            case "compositionend":
              Pe = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Pe = "onCompositionUpdate";
              break e;
          }
          Pe = void 0;
        }
        else ro ? uv(n, l) && (Pe = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (iv && l.locale !== "ko" && (ro || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && ro && (ze = N()) : (Ja = I, h = "value" in Ja ? Ja.value : Ja.textContent, ro = !0)), Me = ns(z, Pe), 0 < Me.length && (Pe = new Xf(Pe, n, null, l, I), W.push({ event: Pe, listeners: Me }), ze ? Pe.data = ze : (ze = ov(l), ze !== null && (Pe.data = ze)))), (ze = Xo ? sv(n, l) : Km(n, l)) && (z = ns(z, "onBeforeInput"), 0 < z.length && (I = new Xf("onBeforeInput", "beforeinput", null, l, I), W.push({ event: I, listeners: z }), I.data = ze));
      }
      cu(W, r);
    });
  }
  function uo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function ns(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = xr(n, l), d != null && o.unshift(uo(n, d, c)), d = xr(n, r), d != null && o.push(uo(n, d, c))), n = n.return;
    }
    return o;
  }
  function Rl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function wv(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, z = E.stateNode;
      if (T !== null && T === o) break;
      E.tag === 5 && z !== null && (E = z, c ? (T = xr(l, d), T != null && m.unshift(uo(l, T, E))) : c || (T = xr(l, d), T != null && m.push(uo(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var xv = /\r\n?/g, ly = /\u0000|\uFFFD/g;
  function _v(n) {
    return (typeof n == "string" ? n : "" + n).replace(xv, `
`).replace(ly, "");
  }
  function gc(n, r, l) {
    if (r = _v(r), _v(n) !== r && l) throw Error(A(425));
  }
  function Tl() {
  }
  var rs = null, fu = null;
  function Sc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Ec = typeof setTimeout == "function" ? setTimeout : void 0, dd = typeof clearTimeout == "function" ? clearTimeout : void 0, bv = typeof Promise == "function" ? Promise : void 0, oo = typeof queueMicrotask == "function" ? queueMicrotask : typeof bv < "u" ? function(n) {
    return bv.resolve(null).then(n).catch(Cc);
  } : Ec;
  function Cc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function so(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Ka(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Ka(r);
  }
  function gi(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Dv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var wl = Math.random().toString(36).slice(2), Si = "__reactFiber$" + wl, as = "__reactProps$" + wl, Yi = "__reactContainer$" + wl, is = "__reactEvents$" + wl, co = "__reactListeners$" + wl, uy = "__reactHandles$" + wl;
  function du(n) {
    var r = n[Si];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Yi] || l[Si]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Dv(n); n !== null; ) {
          if (l = n[Si]) return l;
          n = Dv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function be(n) {
    return n = n[Si] || n[Yi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ei(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(A(33));
  }
  function hn(n) {
    return n[as] || null;
  }
  var gt = [], ba = -1;
  function Da(n) {
    return { current: n };
  }
  function nn(n) {
    0 > ba || (n.current = gt[ba], gt[ba] = null, ba--);
  }
  function xe(n, r) {
    ba++, gt[ba] = n.current, n.current = r;
  }
  var Er = {}, Sn = Da(Er), Yn = Da(!1), Qr = Er;
  function Wr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Er;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function fo() {
    nn(Yn), nn(Sn);
  }
  function kv(n, r, l) {
    if (Sn.current !== Er) throw Error(A(168));
    xe(Sn, r), xe(Yn, l);
  }
  function ls(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(A(108, Xe(n) || "Unknown", c));
    return ne({}, l, o);
  }
  function Xn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Er, Qr = Sn.current, xe(Sn, n), xe(Yn, Yn.current), !0;
  }
  function Rc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(A(169));
    l ? (n = ls(n, r, Qr), o.__reactInternalMemoizedMergedChildContext = n, nn(Yn), nn(Sn), xe(Sn, n)) : nn(Yn), xe(Yn, l);
  }
  var Ei = null, po = !1, Ii = !1;
  function Tc(n) {
    Ei === null ? Ei = [n] : Ei.push(n);
  }
  function xl(n) {
    po = !0, Tc(n);
  }
  function Ci() {
    if (!Ii && Ei !== null) {
      Ii = !0;
      var n = 0, r = kt;
      try {
        var l = Ei;
        for (kt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ei = null, po = !1;
      } catch (c) {
        throw Ei !== null && (Ei = Ei.slice(n + 1)), un(Ga, Ci), c;
      } finally {
        kt = r, Ii = !1;
      }
    }
    return null;
  }
  var _l = [], bl = 0, Dl = null, Qi = 0, Nn = [], ka = 0, fa = null, Ri = 1, Ti = "";
  function pu(n, r) {
    _l[bl++] = Qi, _l[bl++] = Dl, Dl = n, Qi = r;
  }
  function Ov(n, r, l) {
    Nn[ka++] = Ri, Nn[ka++] = Ti, Nn[ka++] = fa, fa = n;
    var o = Ri;
    n = Ti;
    var c = 32 - br(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - br(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Ri = 1 << 32 - br(r) + c | l << c | o, Ti = d + n;
    } else Ri = 1 << d | l << c | o, Ti = n;
  }
  function wc(n) {
    n.return !== null && (pu(n, 1), Ov(n, 1, 0));
  }
  function xc(n) {
    for (; n === Dl; ) Dl = _l[--bl], _l[bl] = null, Qi = _l[--bl], _l[bl] = null;
    for (; n === fa; ) fa = Nn[--ka], Nn[ka] = null, Ti = Nn[--ka], Nn[ka] = null, Ri = Nn[--ka], Nn[ka] = null;
  }
  var Gr = null, qr = null, fn = !1, Oa = null;
  function pd(n, r) {
    var l = Ua(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Lv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = gi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = fa !== null ? { id: Ri, overflow: Ti } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Ua(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Gr = n, qr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function vd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function hd(n) {
    if (fn) {
      var r = qr;
      if (r) {
        var l = r;
        if (!Lv(n, r)) {
          if (vd(n)) throw Error(A(418));
          r = gi(l.nextSibling);
          var o = Gr;
          r && Lv(n, r) ? pd(o, l) : (n.flags = n.flags & -4097 | 2, fn = !1, Gr = n);
        }
      } else {
        if (vd(n)) throw Error(A(418));
        n.flags = n.flags & -4097 | 2, fn = !1, Gr = n;
      }
    }
  }
  function In(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Gr = n;
  }
  function _c(n) {
    if (n !== Gr) return !1;
    if (!fn) return In(n), fn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Sc(n.type, n.memoizedProps)), r && (r = qr)) {
      if (vd(n)) throw us(), Error(A(418));
      for (; r; ) pd(n, r), r = gi(r.nextSibling);
    }
    if (In(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(A(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                qr = gi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        qr = null;
      }
    } else qr = Gr ? gi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function us() {
    for (var n = qr; n; ) n = gi(n.nextSibling);
  }
  function kl() {
    qr = Gr = null, fn = !1;
  }
  function Wi(n) {
    Oa === null ? Oa = [n] : Oa.push(n);
  }
  var oy = pt.ReactCurrentBatchConfig;
  function vu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(A(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(A(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(A(284));
      if (!l._owner) throw Error(A(290, n));
    }
    return n;
  }
  function bc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(A(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Mv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function hu(n) {
    function r(D, x) {
      if (n) {
        var L = D.deletions;
        L === null ? (D.deletions = [x], D.flags |= 16) : L.push(x);
      }
    }
    function l(D, x) {
      if (!n) return null;
      for (; x !== null; ) r(D, x), x = x.sibling;
      return null;
    }
    function o(D, x) {
      for (D = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? D.set(x.key, x) : D.set(x.index, x), x = x.sibling;
      return D;
    }
    function c(D, x) {
      return D = Fl(D, x), D.index = 0, D.sibling = null, D;
    }
    function d(D, x, L) {
      return D.index = L, n ? (L = D.alternate, L !== null ? (L = L.index, L < x ? (D.flags |= 2, x) : L) : (D.flags |= 2, x)) : (D.flags |= 1048576, x);
    }
    function m(D) {
      return n && D.alternate === null && (D.flags |= 2), D;
    }
    function E(D, x, L, Q) {
      return x === null || x.tag !== 6 ? (x = Qd(L, D.mode, Q), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function T(D, x, L, Q) {
      var ye = L.type;
      return ye === Fe ? I(D, x, L.props.children, Q, L.key) : x !== null && (x.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Mv(ye) === x.type) ? (Q = c(x, L.props), Q.ref = vu(D, x, L), Q.return = D, Q) : (Q = Fs(L.type, L.key, L.props, null, D.mode, Q), Q.ref = vu(D, x, L), Q.return = D, Q);
    }
    function z(D, x, L, Q) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== L.containerInfo || x.stateNode.implementation !== L.implementation ? (x = uf(L, D.mode, Q), x.return = D, x) : (x = c(x, L.children || []), x.return = D, x);
    }
    function I(D, x, L, Q, ye) {
      return x === null || x.tag !== 7 ? (x = Zi(L, D.mode, Q, ye), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function W(D, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Qd("" + x, D.mode, L), x.return = D, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case _e:
            return L = Fs(x.type, x.key, x.props, null, D.mode, L), L.ref = vu(D, null, x), L.return = D, L;
          case ot:
            return x = uf(x, D.mode, L), x.return = D, x;
          case Dt:
            var Q = x._init;
            return W(D, Q(x._payload), L);
        }
        if (Gn(x) || Re(x)) return x = Zi(x, D.mode, L, null), x.return = D, x;
        bc(D, x);
      }
      return null;
    }
    function Y(D, x, L, Q) {
      var ye = x !== null ? x.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number") return ye !== null ? null : E(D, x, "" + L, Q);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case _e:
            return L.key === ye ? T(D, x, L, Q) : null;
          case ot:
            return L.key === ye ? z(D, x, L, Q) : null;
          case Dt:
            return ye = L._init, Y(
              D,
              x,
              ye(L._payload),
              Q
            );
        }
        if (Gn(L) || Re(L)) return ye !== null ? null : I(D, x, L, Q, null);
        bc(D, L);
      }
      return null;
    }
    function se(D, x, L, Q, ye) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return D = D.get(L) || null, E(x, D, "" + Q, ye);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case _e:
            return D = D.get(Q.key === null ? L : Q.key) || null, T(x, D, Q, ye);
          case ot:
            return D = D.get(Q.key === null ? L : Q.key) || null, z(x, D, Q, ye);
          case Dt:
            var Me = Q._init;
            return se(D, x, L, Me(Q._payload), ye);
        }
        if (Gn(Q) || Re(Q)) return D = D.get(L) || null, I(x, D, Q, ye, null);
        bc(x, Q);
      }
      return null;
    }
    function me(D, x, L, Q) {
      for (var ye = null, Me = null, ze = x, Pe = x = 0, Zn = null; ze !== null && Pe < L.length; Pe++) {
        ze.index > Pe ? (Zn = ze, ze = null) : Zn = ze.sibling;
        var Mt = Y(D, ze, L[Pe], Q);
        if (Mt === null) {
          ze === null && (ze = Zn);
          break;
        }
        n && ze && Mt.alternate === null && r(D, ze), x = d(Mt, x, Pe), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt, ze = Zn;
      }
      if (Pe === L.length) return l(D, ze), fn && pu(D, Pe), ye;
      if (ze === null) {
        for (; Pe < L.length; Pe++) ze = W(D, L[Pe], Q), ze !== null && (x = d(ze, x, Pe), Me === null ? ye = ze : Me.sibling = ze, Me = ze);
        return fn && pu(D, Pe), ye;
      }
      for (ze = o(D, ze); Pe < L.length; Pe++) Zn = se(ze, D, Pe, L[Pe], Q), Zn !== null && (n && Zn.alternate !== null && ze.delete(Zn.key === null ? Pe : Zn.key), x = d(Zn, x, Pe), Me === null ? ye = Zn : Me.sibling = Zn, Me = Zn);
      return n && ze.forEach(function(Pl) {
        return r(D, Pl);
      }), fn && pu(D, Pe), ye;
    }
    function Se(D, x, L, Q) {
      var ye = Re(L);
      if (typeof ye != "function") throw Error(A(150));
      if (L = ye.call(L), L == null) throw Error(A(151));
      for (var Me = ye = null, ze = x, Pe = x = 0, Zn = null, Mt = L.next(); ze !== null && !Mt.done; Pe++, Mt = L.next()) {
        ze.index > Pe ? (Zn = ze, ze = null) : Zn = ze.sibling;
        var Pl = Y(D, ze, Mt.value, Q);
        if (Pl === null) {
          ze === null && (ze = Zn);
          break;
        }
        n && ze && Pl.alternate === null && r(D, ze), x = d(Pl, x, Pe), Me === null ? ye = Pl : Me.sibling = Pl, Me = Pl, ze = Zn;
      }
      if (Mt.done) return l(
        D,
        ze
      ), fn && pu(D, Pe), ye;
      if (ze === null) {
        for (; !Mt.done; Pe++, Mt = L.next()) Mt = W(D, Mt.value, Q), Mt !== null && (x = d(Mt, x, Pe), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt);
        return fn && pu(D, Pe), ye;
      }
      for (ze = o(D, ze); !Mt.done; Pe++, Mt = L.next()) Mt = se(ze, D, Pe, Mt.value, Q), Mt !== null && (n && Mt.alternate !== null && ze.delete(Mt.key === null ? Pe : Mt.key), x = d(Mt, x, Pe), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt);
      return n && ze.forEach(function(vh) {
        return r(D, vh);
      }), fn && pu(D, Pe), ye;
    }
    function bn(D, x, L, Q) {
      if (typeof L == "object" && L !== null && L.type === Fe && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case _e:
            e: {
              for (var ye = L.key, Me = x; Me !== null; ) {
                if (Me.key === ye) {
                  if (ye = L.type, ye === Fe) {
                    if (Me.tag === 7) {
                      l(D, Me.sibling), x = c(Me, L.props.children), x.return = D, D = x;
                      break e;
                    }
                  } else if (Me.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Mv(ye) === Me.type) {
                    l(D, Me.sibling), x = c(Me, L.props), x.ref = vu(D, Me, L), x.return = D, D = x;
                    break e;
                  }
                  l(D, Me);
                  break;
                } else r(D, Me);
                Me = Me.sibling;
              }
              L.type === Fe ? (x = Zi(L.props.children, D.mode, Q, L.key), x.return = D, D = x) : (Q = Fs(L.type, L.key, L.props, null, D.mode, Q), Q.ref = vu(D, x, L), Q.return = D, D = Q);
            }
            return m(D);
          case ot:
            e: {
              for (Me = L.key; x !== null; ) {
                if (x.key === Me) if (x.tag === 4 && x.stateNode.containerInfo === L.containerInfo && x.stateNode.implementation === L.implementation) {
                  l(D, x.sibling), x = c(x, L.children || []), x.return = D, D = x;
                  break e;
                } else {
                  l(D, x);
                  break;
                }
                else r(D, x);
                x = x.sibling;
              }
              x = uf(L, D.mode, Q), x.return = D, D = x;
            }
            return m(D);
          case Dt:
            return Me = L._init, bn(D, x, Me(L._payload), Q);
        }
        if (Gn(L)) return me(D, x, L, Q);
        if (Re(L)) return Se(D, x, L, Q);
        bc(D, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, x !== null && x.tag === 6 ? (l(D, x.sibling), x = c(x, L), x.return = D, D = x) : (l(D, x), x = Qd(L, D.mode, Q), x.return = D, D = x), m(D)) : l(D, x);
    }
    return bn;
  }
  var Tn = hu(!0), ie = hu(!1), da = Da(null), Xr = null, vo = null, md = null;
  function yd() {
    md = vo = Xr = null;
  }
  function gd(n) {
    var r = da.current;
    nn(da), n._currentValue = r;
  }
  function Sd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function mn(n, r) {
    Xr = n, md = vo = null, n = n.dependencies, n !== null && n.firstContext !== null && ((n.lanes & r) !== 0 && (Un = !0), n.firstContext = null);
  }
  function La(n) {
    var r = n._currentValue;
    if (md !== n) if (n = { context: n, memoizedValue: r, next: null }, vo === null) {
      if (Xr === null) throw Error(A(308));
      vo = n, Xr.dependencies = { lanes: 0, firstContext: n };
    } else vo = vo.next = n;
    return r;
  }
  var mu = null;
  function Ed(n) {
    mu === null ? mu = [n] : mu.push(n);
  }
  function Cd(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Ed(r)) : (l.next = c.next, c.next = l), r.interleaved = l, pa(n, o);
  }
  function pa(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var va = !1;
  function Rd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Nv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Gi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Ol(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (St & 2) !== 0) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, pa(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Ed(o)) : (r.next = c.next, c.next = r), o.interleaved = r, pa(n, l);
  }
  function Dc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Hi(n, l);
    }
  }
  function zv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function os(n, r, l, o) {
    var c = n.updateQueue;
    va = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, z = T.next;
      T.next = null, m === null ? d = z : m.next = z, m = T;
      var I = n.alternate;
      I !== null && (I = I.updateQueue, E = I.lastBaseUpdate, E !== m && (E === null ? I.firstBaseUpdate = z : E.next = z, I.lastBaseUpdate = T));
    }
    if (d !== null) {
      var W = c.baseState;
      m = 0, I = z = T = null, E = d;
      do {
        var Y = E.lane, se = E.eventTime;
        if ((o & Y) === Y) {
          I !== null && (I = I.next = {
            eventTime: se,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var me = n, Se = E;
            switch (Y = r, se = l, Se.tag) {
              case 1:
                if (me = Se.payload, typeof me == "function") {
                  W = me.call(se, W, Y);
                  break e;
                }
                W = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Se.payload, Y = typeof me == "function" ? me.call(se, W, Y) : me, Y == null) break e;
                W = ne({}, W, Y);
                break e;
              case 2:
                va = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, Y = c.effects, Y === null ? c.effects = [E] : Y.push(E));
        } else se = { eventTime: se, lane: Y, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, I === null ? (z = I = se, T = W) : I = I.next = se, m |= Y;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          Y = E, E = Y.next, Y.next = null, c.lastBaseUpdate = Y, c.shared.pending = null;
        }
      } while (!0);
      if (I === null && (T = W), c.baseState = T, c.firstBaseUpdate = z, c.lastBaseUpdate = I, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Di |= m, n.lanes = m, n.memoizedState = W;
    }
  }
  function Td(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(A(191, c));
        c.call(o);
      }
    }
  }
  var ss = {}, wi = Da(ss), cs = Da(ss), fs = Da(ss);
  function yu(n) {
    if (n === ss) throw Error(A(174));
    return n;
  }
  function wd(n, r) {
    switch (xe(fs, r), xe(cs, n), xe(wi, ss), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : oa(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = oa(r, n);
    }
    nn(wi), xe(wi, r);
  }
  function gu() {
    nn(wi), nn(cs), nn(fs);
  }
  function Uv(n) {
    yu(fs.current);
    var r = yu(wi.current), l = oa(r, n.type);
    r !== l && (xe(cs, n), xe(wi, l));
  }
  function kc(n) {
    cs.current === n && (nn(wi), nn(cs));
  }
  var yn = Da(0);
  function Oc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if ((r.flags & 128) !== 0) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var ds = [];
  function De() {
    for (var n = 0; n < ds.length; n++) ds[n]._workInProgressVersionPrimary = null;
    ds.length = 0;
  }
  var lt = pt.ReactCurrentDispatcher, Ot = pt.ReactCurrentBatchConfig, Wt = 0, Lt = null, zn = null, Kn = null, Lc = !1, ps = !1, Su = 0, $ = 0;
  function bt() {
    throw Error(A(321));
  }
  function Ae(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Za(n[l], r[l])) return !1;
    return !0;
  }
  function Ll(n, r, l, o, c, d) {
    if (Wt = d, Lt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, lt.current = n === null || n.memoizedState === null ? Qc : Ss, n = l(o, c), ps) {
      d = 0;
      do {
        if (ps = !1, Su = 0, 25 <= d) throw Error(A(301));
        d += 1, Kn = zn = null, r.updateQueue = null, lt.current = Wc, n = l(o, c);
      } while (ps);
    }
    if (lt.current = wu, r = zn !== null && zn.next !== null, Wt = 0, Kn = zn = Lt = null, Lc = !1, r) throw Error(A(300));
    return n;
  }
  function ti() {
    var n = Su !== 0;
    return Su = 0, n;
  }
  function Cr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Kn === null ? Lt.memoizedState = Kn = n : Kn = Kn.next = n, Kn;
  }
  function wn() {
    if (zn === null) {
      var n = Lt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = zn.next;
    var r = Kn === null ? Lt.memoizedState : Kn.next;
    if (r !== null) Kn = r, zn = n;
    else {
      if (n === null) throw Error(A(310));
      zn = n, n = { memoizedState: zn.memoizedState, baseState: zn.baseState, baseQueue: zn.baseQueue, queue: zn.queue, next: null }, Kn === null ? Lt.memoizedState = Kn = n : Kn = Kn.next = n;
    }
    return Kn;
  }
  function qi(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ml(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = zn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, z = d;
      do {
        var I = z.lane;
        if ((Wt & I) === I) T !== null && (T = T.next = { lane: 0, action: z.action, hasEagerState: z.hasEagerState, eagerState: z.eagerState, next: null }), o = z.hasEagerState ? z.eagerState : n(o, z.action);
        else {
          var W = {
            lane: I,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          T === null ? (E = T = W, m = o) : T = T.next = W, Lt.lanes |= I, Di |= I;
        }
        z = z.next;
      } while (z !== null && z !== d);
      T === null ? m = o : T.next = E, Za(o, r.memoizedState) || (Un = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Lt.lanes |= d, Di |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Eu(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      Za(d, r.memoizedState) || (Un = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Mc() {
  }
  function Nc(n, r) {
    var l = Lt, o = wn(), c = r(), d = !Za(o.memoizedState, c);
    if (d && (o.memoizedState = c, Un = !0), o = o.queue, vs(Ac.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Kn !== null && Kn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Cu(9, Uc.bind(null, l, o, c, r), void 0, null), Qn === null) throw Error(A(349));
      (Wt & 30) !== 0 || zc(l, r, c);
    }
    return c;
  }
  function zc(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Lt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Uc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Fc(r) && jc(n);
  }
  function Ac(n, r, l) {
    return l(function() {
      Fc(r) && jc(n);
    });
  }
  function Fc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Za(n, l);
    } catch {
      return !0;
    }
  }
  function jc(n) {
    var r = pa(n, 1);
    r !== null && Nr(r, n, 1, -1);
  }
  function Hc(n) {
    var r = Cr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: qi, lastRenderedState: n }, r.queue = n, n = n.dispatch = Tu.bind(null, Lt, n), [r.memoizedState, n];
  }
  function Cu(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Lt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Pc() {
    return wn().memoizedState;
  }
  function ho(n, r, l, o) {
    var c = Cr();
    Lt.flags |= n, c.memoizedState = Cu(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function mo(n, r, l, o) {
    var c = wn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (zn !== null) {
      var m = zn.memoizedState;
      if (d = m.destroy, o !== null && Ae(o, m.deps)) {
        c.memoizedState = Cu(r, l, d, o);
        return;
      }
    }
    Lt.flags |= n, c.memoizedState = Cu(1 | r, l, d, o);
  }
  function Vc(n, r) {
    return ho(8390656, 8, n, r);
  }
  function vs(n, r) {
    return mo(2048, 8, n, r);
  }
  function Bc(n, r) {
    return mo(4, 2, n, r);
  }
  function hs(n, r) {
    return mo(4, 4, n, r);
  }
  function Ru(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function $c(n, r, l) {
    return l = l != null ? l.concat([n]) : null, mo(4, 4, Ru.bind(null, r, n), l);
  }
  function ms() {
  }
  function Yc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Ic(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function xd(n, r, l) {
    return (Wt & 21) === 0 ? (n.baseState && (n.baseState = !1, Un = !0), n.memoizedState = l) : (Za(l, r) || (l = Gu(), Lt.lanes |= l, Di |= l, n.baseState = !0), r);
  }
  function ys(n, r) {
    var l = kt;
    kt = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Ot.transition;
    Ot.transition = {};
    try {
      n(!1), r();
    } finally {
      kt = l, Ot.transition = o;
    }
  }
  function _d() {
    return wn().memoizedState;
  }
  function gs(n, r, l) {
    var o = ki(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Kr(n)) Av(r, l);
    else if (l = Cd(n, r, l, o), l !== null) {
      var c = jn();
      Nr(l, n, o, c), Xt(l, r, o);
    }
  }
  function Tu(n, r, l) {
    var o = ki(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Kr(n)) Av(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, E = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = E, Za(E, m)) {
          var T = r.interleaved;
          T === null ? (c.next = c, Ed(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Cd(n, r, c, o), l !== null && (c = jn(), Nr(l, n, o, c), Xt(l, r, o));
    }
  }
  function Kr(n) {
    var r = n.alternate;
    return n === Lt || r !== null && r === Lt;
  }
  function Av(n, r) {
    ps = Lc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Xt(n, r, l) {
    if ((l & 4194240) !== 0) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Hi(n, l);
    }
  }
  var wu = { readContext: La, useCallback: bt, useContext: bt, useEffect: bt, useImperativeHandle: bt, useInsertionEffect: bt, useLayoutEffect: bt, useMemo: bt, useReducer: bt, useRef: bt, useState: bt, useDebugValue: bt, useDeferredValue: bt, useTransition: bt, useMutableSource: bt, useSyncExternalStore: bt, useId: bt, unstable_isNewReconciler: !1 }, Qc = { readContext: La, useCallback: function(n, r) {
    return Cr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: La, useEffect: Vc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, ho(
      4194308,
      4,
      Ru.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return ho(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return ho(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Cr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Cr();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = gs.bind(null, Lt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Cr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Hc, useDebugValue: ms, useDeferredValue: function(n) {
    return Cr().memoizedState = n;
  }, useTransition: function() {
    var n = Hc(!1), r = n[0];
    return n = ys.bind(null, n[1]), Cr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Lt, c = Cr();
    if (fn) {
      if (l === void 0) throw Error(A(407));
      l = l();
    } else {
      if (l = r(), Qn === null) throw Error(A(349));
      (Wt & 30) !== 0 || zc(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Vc(Ac.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Cu(9, Uc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Cr(), r = Qn.identifierPrefix;
    if (fn) {
      var l = Ti, o = Ri;
      l = (o & ~(1 << 32 - br(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Su++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = $++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Ss = {
    readContext: La,
    useCallback: Yc,
    useContext: La,
    useEffect: vs,
    useImperativeHandle: $c,
    useInsertionEffect: Bc,
    useLayoutEffect: hs,
    useMemo: Ic,
    useReducer: Ml,
    useRef: Pc,
    useState: function() {
      return Ml(qi);
    },
    useDebugValue: ms,
    useDeferredValue: function(n) {
      var r = wn();
      return xd(r, zn.memoizedState, n);
    },
    useTransition: function() {
      var n = Ml(qi)[0], r = wn().memoizedState;
      return [n, r];
    },
    useMutableSource: Mc,
    useSyncExternalStore: Nc,
    useId: _d,
    unstable_isNewReconciler: !1
  }, Wc = { readContext: La, useCallback: Yc, useContext: La, useEffect: vs, useImperativeHandle: $c, useInsertionEffect: Bc, useLayoutEffect: hs, useMemo: Ic, useReducer: Eu, useRef: Pc, useState: function() {
    return Eu(qi);
  }, useDebugValue: ms, useDeferredValue: function(n) {
    var r = wn();
    return zn === null ? r.memoizedState = n : xd(r, zn.memoizedState, n);
  }, useTransition: function() {
    var n = Eu(qi)[0], r = wn().memoizedState;
    return [n, r];
  }, useMutableSource: Mc, useSyncExternalStore: Nc, useId: _d, unstable_isNewReconciler: !1 };
  function ni(n, r) {
    if (n && n.defaultProps) {
      r = ne({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function bd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : ne({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Gc = { isMounted: function(n) {
    return (n = n._reactInternals) ? We(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = ki(n), d = Gi(o, c);
    d.payload = r, l != null && (d.callback = l), r = Ol(n, d, c), r !== null && (Nr(r, n, c, o), Dc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = ki(n), d = Gi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Ol(n, d, c), r !== null && (Nr(r, n, c, o), Dc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = jn(), o = ki(n), c = Gi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Ol(n, c, o), r !== null && (Nr(r, n, o, l), Dc(r, n, o));
  } };
  function Fv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !Jo(l, o) || !Jo(c, d) : !0;
  }
  function qc(n, r, l) {
    var o = !1, c = Er, d = r.contextType;
    return typeof d == "object" && d !== null ? d = La(d) : (c = Mn(r) ? Qr : Sn.current, o = r.contextTypes, d = (o = o != null) ? Wr(n, c) : Er), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Gc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function jv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && Gc.enqueueReplaceState(r, r.state, null);
  }
  function Es(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Rd(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = La(d) : (d = Mn(r) ? Qr : Sn.current, c.context = Wr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (bd(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Gc.enqueueReplaceState(c, c.state, null), os(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function xu(n, r) {
    try {
      var l = "", o = r;
      do
        l += rt(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Dd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function kd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Xc = typeof WeakMap == "function" ? WeakMap : Map;
  function Hv(n, r, l) {
    l = Gi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      Ro || (Ro = !0, Du = o), kd(n, r);
    }, l;
  }
  function Od(n, r, l) {
    l = Gi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        kd(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      kd(n, r), typeof o != "function" && (Ul === null ? Ul = /* @__PURE__ */ new Set([this]) : Ul.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Ld(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Xc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = hy.bind(null, n, r, l), r.then(n, n));
  }
  function Pv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Nl(n, r, l, o, c) {
    return (n.mode & 1) === 0 ? (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = Gi(-1, 1), r.tag = 2, Ol(l, r, 1))), l.lanes |= 1), n) : (n.flags |= 65536, n.lanes = c, n);
  }
  var Cs = pt.ReactCurrentOwner, Un = !1;
  function lr(n, r, l, o) {
    r.child = n === null ? ie(r, null, l, o) : Tn(r, n.child, l, o);
  }
  function Jr(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return mn(r, c), o = Ll(n, r, l, o, d, c), l = ti(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Na(n, r, c)) : (fn && l && wc(r), r.flags |= 1, lr(n, r, o, c), r.child);
  }
  function _u(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Id(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, qe(n, r, d, o, c)) : (n = Fs(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, (n.lanes & c) === 0) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Jo, l(m, o) && n.ref === r.ref) return Na(n, r, c);
    }
    return r.flags |= 1, n = Fl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function qe(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (Jo(d, o) && n.ref === r.ref) if (Un = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) (n.flags & 131072) !== 0 && (Un = !0);
      else return r.lanes = n.lanes, Na(n, r, c);
    }
    return Vv(n, r, l, o, c);
  }
  function Rs(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if ((r.mode & 1) === 0) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, xe(So, ha), ha |= l;
    else {
      if ((l & 1073741824) === 0) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, xe(So, ha), ha |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, xe(So, ha), ha |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, xe(So, ha), ha |= o;
    return lr(n, r, c, l), r.child;
  }
  function Md(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Vv(n, r, l, o, c) {
    var d = Mn(l) ? Qr : Sn.current;
    return d = Wr(r, d), mn(r, c), l = Ll(n, r, l, o, d, c), o = ti(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Na(n, r, c)) : (fn && o && wc(r), r.flags |= 1, lr(n, r, l, c), r.child);
  }
  function Bv(n, r, l, o, c) {
    if (Mn(l)) {
      var d = !0;
      Xn(r);
    } else d = !1;
    if (mn(r, c), r.stateNode === null) Ma(n, r), qc(r, l, o), Es(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, z = l.contextType;
      typeof z == "object" && z !== null ? z = La(z) : (z = Mn(l) ? Qr : Sn.current, z = Wr(r, z));
      var I = l.getDerivedStateFromProps, W = typeof I == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      W || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== z) && jv(r, m, o, z), va = !1;
      var Y = r.memoizedState;
      m.state = Y, os(r, o, m, c), T = r.memoizedState, E !== o || Y !== T || Yn.current || va ? (typeof I == "function" && (bd(r, l, I, o), T = r.memoizedState), (E = va || Fv(r, l, E, o, Y, T, z)) ? (W || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = z, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, Nv(n, r), E = r.memoizedProps, z = r.type === r.elementType ? E : ni(r.type, E), m.props = z, W = r.pendingProps, Y = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = La(T) : (T = Mn(l) ? Qr : Sn.current, T = Wr(r, T));
      var se = l.getDerivedStateFromProps;
      (I = typeof se == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== W || Y !== T) && jv(r, m, o, T), va = !1, Y = r.memoizedState, m.state = Y, os(r, o, m, c);
      var me = r.memoizedState;
      E !== W || Y !== me || Yn.current || va ? (typeof se == "function" && (bd(r, l, se, o), me = r.memoizedState), (z = va || Fv(r, l, z, o, Y, me, T) || !1) ? (I || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, me, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, me, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = me), m.props = o, m.state = me, m.context = T, o = z) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Ts(n, r, l, o, d, c);
  }
  function Ts(n, r, l, o, c, d) {
    Md(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Rc(r, l, !1), Na(n, r, d);
    o = r.stateNode, Cs.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = Tn(r, n.child, null, d), r.child = Tn(r, null, E, d)) : lr(n, r, E, d), r.memoizedState = o.state, c && Rc(r, l, !0), r.child;
  }
  function yo(n) {
    var r = n.stateNode;
    r.pendingContext ? kv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && kv(n, r.context, !1), wd(n, r.containerInfo);
  }
  function $v(n, r, l, o, c) {
    return kl(), Wi(c), r.flags |= 256, lr(n, r, l, o), r.child;
  }
  var Kc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Nd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Jc(n, r, l) {
    var o = r.pendingProps, c = yn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), xe(yn, c & 1), n === null)
      return hd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? ((r.mode & 1) === 0 ? r.lanes = 1 : n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, (o & 1) === 0 && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = jl(m, o, 0, null), n = Zi(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Nd(l), r.memoizedState = Kc, n) : zd(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return Yv(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return (m & 1) === 0 && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = Fl(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = Fl(E, d) : (d = Zi(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? Nd(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Kc, o;
    }
    return d = n.child, n = d.sibling, o = Fl(d, { mode: "visible", children: o.children }), (r.mode & 1) === 0 && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function zd(n, r) {
    return r = jl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function ws(n, r, l, o) {
    return o !== null && Wi(o), Tn(r, n.child, null, l), n = zd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Yv(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Dd(Error(A(422))), ws(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = jl({ mode: "visible", children: o.children }, c, 0, null), d = Zi(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, (r.mode & 1) !== 0 && Tn(r, n.child, null, m), r.child.memoizedState = Nd(m), r.memoizedState = Kc, d);
    if ((r.mode & 1) === 0) return ws(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var E = o.dgst;
      return o = E, d = Error(A(419)), o = Dd(d, o, void 0), ws(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, Un || E) {
      if (o = Qn, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = (c & (o.suspendedLanes | m)) !== 0 ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, pa(n, c), Nr(o, n, c, -1));
      }
      return Yd(), o = Dd(Error(A(421))), ws(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = my.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, qr = gi(c.nextSibling), Gr = r, fn = !0, Oa = null, n !== null && (Nn[ka++] = Ri, Nn[ka++] = Ti, Nn[ka++] = fa, Ri = n.id, Ti = n.overflow, fa = r), r = zd(r, o.children), r.flags |= 4096, r);
  }
  function Ud(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Sd(n.return, r, l);
  }
  function Or(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function xi(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (lr(n, r, o.children, l), o = yn.current, (o & 2) !== 0) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && (n.flags & 128) !== 0) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Ud(n, l, r);
        else if (n.tag === 19) Ud(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (xe(yn, o), (r.mode & 1) === 0) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Oc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Or(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Oc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Or(r, !0, l, null, d);
        break;
      case "together":
        Or(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Ma(n, r) {
    (r.mode & 1) === 0 && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Na(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Di |= r.lanes, (l & r.childLanes) === 0) return null;
    if (n !== null && r.child !== n.child) throw Error(A(153));
    if (r.child !== null) {
      for (n = r.child, l = Fl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Fl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function xs(n, r, l) {
    switch (r.tag) {
      case 3:
        yo(r), kl();
        break;
      case 5:
        Uv(r);
        break;
      case 1:
        Mn(r.type) && Xn(r);
        break;
      case 4:
        wd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        xe(da, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (xe(yn, yn.current & 1), r.flags |= 128, null) : (l & r.child.childLanes) !== 0 ? Jc(n, r, l) : (xe(yn, yn.current & 1), n = Na(n, r, l), n !== null ? n.sibling : null);
        xe(yn, yn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, (n.flags & 128) !== 0) {
          if (o) return xi(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), xe(yn, yn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Rs(n, r, l);
    }
    return Na(n, r, l);
  }
  var za, An, Iv, Qv;
  za = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, An = function() {
  }, Iv = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, yu(wi.current);
      var d = null;
      switch (l) {
        case "input":
          c = tr(n, c), o = tr(n, o), d = [];
          break;
        case "select":
          c = ne({}, c, { value: void 0 }), o = ne({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = Tl);
      }
      ln(l, o);
      var m;
      l = null;
      for (z in c) if (!o.hasOwnProperty(z) && c.hasOwnProperty(z) && c[z] != null) if (z === "style") {
        var E = c[z];
        for (m in E) E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else z !== "dangerouslySetInnerHTML" && z !== "children" && z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && z !== "autoFocus" && (Je.hasOwnProperty(z) ? d || (d = []) : (d = d || []).push(z, null));
      for (z in o) {
        var T = o[z];
        if (E = c != null ? c[z] : void 0, o.hasOwnProperty(z) && T !== E && (T != null || E != null)) if (z === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in T) T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
        } else l || (d || (d = []), d.push(
          z,
          l
        )), l = T;
        else z === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(z, T)) : z === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(z, "" + T) : z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && (Je.hasOwnProperty(z) ? (T != null && z === "onScroll" && jt("scroll", n), d || E === T || (d = [])) : (d = d || []).push(z, T));
      }
      l && (d = d || []).push("style", l);
      var z = d;
      (r.updateQueue = z) && (r.flags |= 4);
    }
  }, Qv = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function _s(n, r) {
    if (!fn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function Jn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Wv(n, r, l) {
    var o = r.pendingProps;
    switch (xc(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Jn(r), null;
      case 1:
        return Mn(r.type) && fo(), Jn(r), null;
      case 3:
        return o = r.stateNode, gu(), nn(Yn), nn(Sn), De(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (_c(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && (r.flags & 256) === 0 || (r.flags |= 1024, Oa !== null && (ku(Oa), Oa = null))), An(n, r), Jn(r), null;
      case 5:
        kc(r);
        var c = yu(fs.current);
        if (l = r.type, n !== null && r.stateNode != null) Iv(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(A(166));
            return Jn(r), null;
          }
          if (n = yu(wi.current), _c(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Si] = r, o[as] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                jt("cancel", o), jt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                jt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ts.length; c++) jt(ts[c], o);
                break;
              case "source":
                jt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                jt(
                  "error",
                  o
                ), jt("load", o);
                break;
              case "details":
                jt("toggle", o);
                break;
              case "input":
                Pn(o, d), jt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, jt("invalid", o);
                break;
              case "textarea":
                yr(o, d), jt("invalid", o);
            }
            ln(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var E = d[m];
              m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && gc(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && gc(
                o.textContent,
                E,
                n
              ), c = ["children", "" + E]) : Je.hasOwnProperty(m) && E != null && m === "onScroll" && jt("scroll", o);
            }
            switch (l) {
              case "input":
                kn(o), oi(o, d, !0);
                break;
              case "textarea":
                kn(o), On(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = Tl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = gr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Si] = r, n[as] = o, za(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = qn(l, o), l) {
                case "dialog":
                  jt("cancel", n), jt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  jt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ts.length; c++) jt(ts[c], n);
                  c = o;
                  break;
                case "source":
                  jt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  jt(
                    "error",
                    n
                  ), jt("load", n), c = o;
                  break;
                case "details":
                  jt("toggle", n), c = o;
                  break;
                case "input":
                  Pn(n, o), c = tr(n, o), jt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = ne({}, o, { value: void 0 }), jt("invalid", n);
                  break;
                case "textarea":
                  yr(n, o), c = Bn(n, o), jt("invalid", n);
                  break;
                default:
                  c = o;
              }
              ln(l, c), E = c;
              for (d in E) if (E.hasOwnProperty(d)) {
                var T = E[d];
                d === "style" ? Jt(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && si(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && J(n, T) : typeof T == "number" && J(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Je.hasOwnProperty(d) ? T != null && d === "onScroll" && jt("scroll", n) : T != null && Ie(n, d, T, m));
              }
              switch (l) {
                case "input":
                  kn(n), oi(n, o, !1);
                  break;
                case "textarea":
                  kn(n), On(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + et(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cn(n, !!o.multiple, d, !1) : o.defaultValue != null && Cn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Tl);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Jn(r), null;
      case 6:
        if (n && r.stateNode != null) Qv(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(A(166));
          if (l = yu(fs.current), yu(wi.current), _c(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Si] = r, (d = o.nodeValue !== l) && (n = Gr, n !== null)) switch (n.tag) {
              case 3:
                gc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && gc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Si] = r, r.stateNode = o;
        }
        return Jn(r), null;
      case 13:
        if (nn(yn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (fn && qr !== null && (r.mode & 1) !== 0 && (r.flags & 128) === 0) us(), kl(), r.flags |= 98560, d = !1;
          else if (d = _c(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(A(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(A(317));
              d[Si] = r;
            } else kl(), (r.flags & 128) === 0 && (r.memoizedState = null), r.flags |= 4;
            Jn(r), d = !1;
          } else Oa !== null && (ku(Oa), Oa = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return (r.flags & 128) !== 0 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, (r.mode & 1) !== 0 && (n === null || (yn.current & 1) !== 0 ? _n === 0 && (_n = 3) : Yd())), r.updateQueue !== null && (r.flags |= 4), Jn(r), null);
      case 4:
        return gu(), An(n, r), n === null && lo(r.stateNode.containerInfo), Jn(r), null;
      case 10:
        return gd(r.type._context), Jn(r), null;
      case 17:
        return Mn(r.type) && fo(), Jn(r), null;
      case 19:
        if (nn(yn), d = r.memoizedState, d === null) return Jn(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) _s(d, !1);
        else {
          if (_n !== 0 || n !== null && (n.flags & 128) !== 0) for (n = r.child; n !== null; ) {
            if (m = Oc(n), m !== null) {
              for (r.flags |= 128, _s(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return xe(yn, yn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Ge() > Co && (r.flags |= 128, o = !0, _s(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Oc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), _s(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !fn) return Jn(r), null;
          } else 2 * Ge() - d.renderingStartTime > Co && l !== 1073741824 && (r.flags |= 128, o = !0, _s(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Ge(), r.sibling = null, l = yn.current, xe(yn, o ? l & 1 | 2 : l & 1), r) : (Jn(r), null);
      case 22:
      case 23:
        return $d(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && (r.mode & 1) !== 0 ? (ha & 1073741824) !== 0 && (Jn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Jn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(A(156, r.tag));
  }
  function Zc(n, r) {
    switch (xc(r), r.tag) {
      case 1:
        return Mn(r.type) && fo(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return gu(), nn(Yn), nn(Sn), De(), n = r.flags, (n & 65536) !== 0 && (n & 128) === 0 ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return kc(r), null;
      case 13:
        if (nn(yn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(A(340));
          kl();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return nn(yn), null;
      case 4:
        return gu(), null;
      case 10:
        return gd(r.type._context), null;
      case 22:
      case 23:
        return $d(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var bs = !1, Rr = !1, sy = typeof WeakSet == "function" ? WeakSet : Set, pe = null;
  function go(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      dn(n, r, o);
    }
    else l.current = null;
  }
  function ef(n, r, l) {
    try {
      l();
    } catch (o) {
      dn(n, r, o);
    }
  }
  var Gv = !1;
  function qv(n, r) {
    if (rs = xa, n = Zo(), cc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var m = 0, E = -1, T = -1, z = 0, I = 0, W = n, Y = null;
          t: for (; ; ) {
            for (var se; W !== l || c !== 0 && W.nodeType !== 3 || (E = m + c), W !== d || o !== 0 && W.nodeType !== 3 || (T = m + o), W.nodeType === 3 && (m += W.nodeValue.length), (se = W.firstChild) !== null; )
              Y = W, W = se;
            for (; ; ) {
              if (W === n) break t;
              if (Y === l && ++z === c && (E = m), Y === d && ++I === o && (T = m), (se = W.nextSibling) !== null) break;
              W = Y, Y = W.parentNode;
            }
            W = se;
          }
          l = E === -1 || T === -1 ? null : { start: E, end: T };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (fu = { focusedElem: n, selectionRange: l }, xa = !1, pe = r; pe !== null; ) if (r = pe, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, pe = n;
    else for (; pe !== null; ) {
      r = pe;
      try {
        var me = r.alternate;
        if ((r.flags & 1024) !== 0) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (me !== null) {
              var Se = me.memoizedProps, bn = me.memoizedState, D = r.stateNode, x = D.getSnapshotBeforeUpdate(r.elementType === r.type ? Se : ni(r.type, Se), bn);
              D.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var L = r.stateNode.containerInfo;
            L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(A(163));
        }
      } catch (Q) {
        dn(r, r.return, Q);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, pe = n;
        break;
      }
      pe = r.return;
    }
    return me = Gv, Gv = !1, me;
  }
  function Ds(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && ef(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function ks(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Ad(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function tf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, tf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Si], delete r[as], delete r[is], delete r[co], delete r[uy])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Os(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Xi(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Os(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function _i(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Tl));
    else if (o !== 4 && (n = n.child, n !== null)) for (_i(n, r, l), n = n.sibling; n !== null; ) _i(n, r, l), n = n.sibling;
  }
  function bi(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (bi(n, r, l), n = n.sibling; n !== null; ) bi(n, r, l), n = n.sibling;
  }
  var xn = null, Lr = !1;
  function Mr(n, r, l) {
    for (l = l.child; l !== null; ) Xv(n, r, l), l = l.sibling;
  }
  function Xv(n, r, l) {
    if (Yr && typeof Yr.onCommitFiberUnmount == "function") try {
      Yr.onCommitFiberUnmount(vl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Rr || go(l, r);
      case 6:
        var o = xn, c = Lr;
        xn = null, Mr(n, r, l), xn = o, Lr = c, xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : xn.removeChild(l.stateNode));
        break;
      case 18:
        xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? so(n.parentNode, l) : n.nodeType === 1 && so(n, l), Ka(n)) : so(xn, l.stateNode));
        break;
      case 4:
        o = xn, c = Lr, xn = l.stateNode.containerInfo, Lr = !0, Mr(n, r, l), xn = o, Lr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Rr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && ((d & 2) !== 0 || (d & 4) !== 0) && ef(l, r, m), c = c.next;
          } while (c !== o);
        }
        Mr(n, r, l);
        break;
      case 1:
        if (!Rr && (go(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (E) {
          dn(l, r, E);
        }
        Mr(n, r, l);
        break;
      case 21:
        Mr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Rr = (o = Rr) || l.memoizedState !== null, Mr(n, r, l), Rr = o) : Mr(n, r, l);
        break;
      default:
        Mr(n, r, l);
    }
  }
  function Kv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new sy()), r.forEach(function(o) {
        var c = lh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ri(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              xn = E.stateNode, Lr = !1;
              break e;
            case 3:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
            case 4:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
          }
          E = E.return;
        }
        if (xn === null) throw Error(A(160));
        Xv(d, m, c), xn = null, Lr = !1;
        var T = c.alternate;
        T !== null && (T.return = null), c.return = null;
      } catch (z) {
        dn(c, r, z);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Fd(r, n), r = r.sibling;
  }
  function Fd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ri(r, n), Zr(n), o & 4) {
          try {
            Ds(3, n, n.return), ks(3, n);
          } catch (Se) {
            dn(n, n.return, Se);
          }
          try {
            Ds(5, n, n.return);
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 1:
        ri(r, n), Zr(n), o & 512 && l !== null && go(l, l.return);
        break;
      case 5:
        if (ri(r, n), Zr(n), o & 512 && l !== null && go(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            J(c, "");
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null) try {
            E === "input" && d.type === "radio" && d.name != null && Vn(c, d), qn(E, m);
            var z = qn(E, d);
            for (m = 0; m < T.length; m += 2) {
              var I = T[m], W = T[m + 1];
              I === "style" ? Jt(c, W) : I === "dangerouslySetInnerHTML" ? si(c, W) : I === "children" ? J(c, W) : Ie(c, I, W, z);
            }
            switch (E) {
              case "input":
                $r(c, d);
                break;
              case "textarea":
                $a(c, d);
                break;
              case "select":
                var Y = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var se = d.value;
                se != null ? Cn(c, !!d.multiple, se, !1) : Y !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[as] = d;
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 6:
        if (ri(r, n), Zr(n), o & 4) {
          if (n.stateNode === null) throw Error(A(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 3:
        if (ri(r, n), Zr(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Ka(r.containerInfo);
        } catch (Se) {
          dn(n, n.return, Se);
        }
        break;
      case 4:
        ri(r, n), Zr(n);
        break;
      case 13:
        ri(r, n), Zr(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Pd = Ge())), o & 4 && Kv(n);
        break;
      case 22:
        if (I = l !== null && l.memoizedState !== null, n.mode & 1 ? (Rr = (z = Rr) || I, ri(r, n), Rr = z) : ri(r, n), Zr(n), o & 8192) {
          if (z = n.memoizedState !== null, (n.stateNode.isHidden = z) && !I && (n.mode & 1) !== 0) for (pe = n, I = n.child; I !== null; ) {
            for (W = pe = I; pe !== null; ) {
              switch (Y = pe, se = Y.child, Y.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ds(4, Y, Y.return);
                  break;
                case 1:
                  go(Y, Y.return);
                  var me = Y.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    o = Y, l = Y.return;
                    try {
                      r = o, me.props = r.memoizedProps, me.state = r.memoizedState, me.componentWillUnmount();
                    } catch (Se) {
                      dn(o, l, Se);
                    }
                  }
                  break;
                case 5:
                  go(Y, Y.return);
                  break;
                case 22:
                  if (Y.memoizedState !== null) {
                    Ls(W);
                    continue;
                  }
              }
              se !== null ? (se.return = Y, pe = se) : Ls(W);
            }
            I = I.sibling;
          }
          e: for (I = null, W = n; ; ) {
            if (W.tag === 5) {
              if (I === null) {
                I = W;
                try {
                  c = W.stateNode, z ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = W.stateNode, T = W.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = At("display", m));
                } catch (Se) {
                  dn(n, n.return, Se);
                }
              }
            } else if (W.tag === 6) {
              if (I === null) try {
                W.stateNode.nodeValue = z ? "" : W.memoizedProps;
              } catch (Se) {
                dn(n, n.return, Se);
              }
            } else if ((W.tag !== 22 && W.tag !== 23 || W.memoizedState === null || W === n) && W.child !== null) {
              W.child.return = W, W = W.child;
              continue;
            }
            if (W === n) break e;
            for (; W.sibling === null; ) {
              if (W.return === null || W.return === n) break e;
              I === W && (I = null), W = W.return;
            }
            I === W && (I = null), W.sibling.return = W.return, W = W.sibling;
          }
        }
        break;
      case 19:
        ri(r, n), Zr(n), o & 4 && Kv(n);
        break;
      case 21:
        break;
      default:
        ri(
          r,
          n
        ), Zr(n);
    }
  }
  function Zr(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Os(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(A(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (J(c, ""), o.flags &= -33);
            var d = Xi(n);
            bi(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = Xi(n);
            _i(n, E, m);
            break;
          default:
            throw Error(A(161));
        }
      } catch (T) {
        dn(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function cy(n, r, l) {
    pe = n, jd(n);
  }
  function jd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; pe !== null; ) {
      var c = pe, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || bs;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || Rr;
          E = bs;
          var z = Rr;
          if (bs = m, (Rr = T) && !z) for (pe = c; pe !== null; ) m = pe, T = m.child, m.tag === 22 && m.memoizedState !== null ? Hd(c) : T !== null ? (T.return = m, pe = T) : Hd(c);
          for (; d !== null; ) pe = d, jd(d), d = d.sibling;
          pe = c, bs = E, Rr = z;
        }
        Jv(n);
      } else (c.subtreeFlags & 8772) !== 0 && d !== null ? (d.return = c, pe = d) : Jv(n);
    }
  }
  function Jv(n) {
    for (; pe !== null; ) {
      var r = pe;
      if ((r.flags & 8772) !== 0) {
        var l = r.alternate;
        try {
          if ((r.flags & 8772) !== 0) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Rr || ks(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Rr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ni(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Td(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Td(r, m, l);
              }
              break;
            case 5:
              var E = r.stateNode;
              if (l === null && r.flags & 4) {
                l = E;
                var T = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    T.autoFocus && l.focus();
                    break;
                  case "img":
                    T.src && (l.src = T.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var z = r.alternate;
                if (z !== null) {
                  var I = z.memoizedState;
                  if (I !== null) {
                    var W = I.dehydrated;
                    W !== null && Ka(W);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(A(163));
          }
          Rr || r.flags & 512 && Ad(r);
        } catch (Y) {
          dn(r, r.return, Y);
        }
      }
      if (r === n) {
        pe = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, pe = l;
        break;
      }
      pe = r.return;
    }
  }
  function Ls(n) {
    for (; pe !== null; ) {
      var r = pe;
      if (r === n) {
        pe = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, pe = l;
        break;
      }
      pe = r.return;
    }
  }
  function Hd(n) {
    for (; pe !== null; ) {
      var r = pe;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              ks(4, r);
            } catch (T) {
              dn(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                dn(r, c, T);
              }
            }
            var d = r.return;
            try {
              Ad(r);
            } catch (T) {
              dn(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Ad(r);
            } catch (T) {
              dn(r, m, T);
            }
        }
      } catch (T) {
        dn(r, r.return, T);
      }
      if (r === n) {
        pe = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, pe = E;
        break;
      }
      pe = r.return;
    }
  }
  var fy = Math.ceil, zl = pt.ReactCurrentDispatcher, bu = pt.ReactCurrentOwner, ur = pt.ReactCurrentBatchConfig, St = 0, Qn = null, Fn = null, or = 0, ha = 0, So = Da(0), _n = 0, Ms = null, Di = 0, Eo = 0, nf = 0, Ns = null, ea = null, Pd = 0, Co = 1 / 0, ma = null, Ro = !1, Du = null, Ul = null, rf = !1, Ki = null, zs = 0, Al = 0, To = null, Us = -1, Tr = 0;
  function jn() {
    return (St & 6) !== 0 ? Ge() : Us !== -1 ? Us : Us = Ge();
  }
  function ki(n) {
    return (n.mode & 1) === 0 ? 1 : (St & 2) !== 0 && or !== 0 ? or & -or : oy.transition !== null ? (Tr === 0 && (Tr = Gu()), Tr) : (n = kt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : to(n.type)), n);
  }
  function Nr(n, r, l, o) {
    if (50 < Al) throw Al = 0, To = null, Error(A(185));
    ji(n, l, o), ((St & 2) === 0 || n !== Qn) && (n === Qn && ((St & 2) === 0 && (Eo |= l), _n === 4 && ai(n, or)), ta(n, o), l === 1 && St === 0 && (r.mode & 1) === 0 && (Co = Ge() + 500, po && Ci()));
  }
  function ta(n, r) {
    var l = n.callbackNode;
    nu(n, r);
    var o = Xa(n, n === Qn ? or : 0);
    if (o === 0) l !== null && rr(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && rr(l), r === 1) n.tag === 0 ? xl(Vd.bind(null, n)) : Tc(Vd.bind(null, n)), oo(function() {
        (St & 6) === 0 && Ci();
      }), l = null;
      else {
        switch (Xu(o)) {
          case 1:
            l = Ga;
            break;
          case 4:
            l = eu;
            break;
          case 16:
            l = tu;
            break;
          case 536870912:
            l = Iu;
            break;
          default:
            l = tu;
        }
        l = oh(l, af.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function af(n, r) {
    if (Us = -1, Tr = 0, (St & 6) !== 0) throw Error(A(327));
    var l = n.callbackNode;
    if (wo() && n.callbackNode !== l) return null;
    var o = Xa(n, n === Qn ? or : 0);
    if (o === 0) return null;
    if ((o & 30) !== 0 || (o & n.expiredLanes) !== 0 || r) r = lf(n, o);
    else {
      r = o;
      var c = St;
      St |= 2;
      var d = eh();
      (Qn !== n || or !== r) && (ma = null, Co = Ge() + 500, Ji(n, r));
      do
        try {
          th();
          break;
        } catch (E) {
          Zv(n, E);
        }
      while (!0);
      yd(), zl.current = d, St = c, Fn !== null ? r = 0 : (Qn = null, or = 0, r = _n);
    }
    if (r !== 0) {
      if (r === 2 && (c = ml(n), c !== 0 && (o = c, r = As(n, c))), r === 1) throw l = Ms, Ji(n, 0), ai(n, o), ta(n, Ge()), l;
      if (r === 6) ai(n, o);
      else {
        if (c = n.current.alternate, (o & 30) === 0 && !dy(c) && (r = lf(n, o), r === 2 && (d = ml(n), d !== 0 && (o = d, r = As(n, d))), r === 1)) throw l = Ms, Ji(n, 0), ai(n, o), ta(n, Ge()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(A(345));
          case 2:
            Lu(n, ea, ma);
            break;
          case 3:
            if (ai(n, o), (o & 130023424) === o && (r = Pd + 500 - Ge(), 10 < r)) {
              if (Xa(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                jn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Ec(Lu.bind(null, n, ea, ma), r);
              break;
            }
            Lu(n, ea, ma);
            break;
          case 4:
            if (ai(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - br(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Ge() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * fy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Ec(Lu.bind(null, n, ea, ma), o);
              break;
            }
            Lu(n, ea, ma);
            break;
          case 5:
            Lu(n, ea, ma);
            break;
          default:
            throw Error(A(329));
        }
      }
    }
    return ta(n, Ge()), n.callbackNode === l ? af.bind(null, n) : null;
  }
  function As(n, r) {
    var l = Ns;
    return n.current.memoizedState.isDehydrated && (Ji(n, r).flags |= 256), n = lf(n, r), n !== 2 && (r = ea, ea = l, r !== null && ku(r)), n;
  }
  function ku(n) {
    ea === null ? ea = n : ea.push.apply(ea, n);
  }
  function dy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Za(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function ai(n, r) {
    for (r &= ~nf, r &= ~Eo, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - br(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Vd(n) {
    if ((St & 6) !== 0) throw Error(A(327));
    wo();
    var r = Xa(n, 0);
    if ((r & 1) === 0) return ta(n, Ge()), null;
    var l = lf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = ml(n);
      o !== 0 && (r = o, l = As(n, o));
    }
    if (l === 1) throw l = Ms, Ji(n, 0), ai(n, r), ta(n, Ge()), l;
    if (l === 6) throw Error(A(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Lu(n, ea, ma), ta(n, Ge()), null;
  }
  function Bd(n, r) {
    var l = St;
    St |= 1;
    try {
      return n(r);
    } finally {
      St = l, St === 0 && (Co = Ge() + 500, po && Ci());
    }
  }
  function Ou(n) {
    Ki !== null && Ki.tag === 0 && (St & 6) === 0 && wo();
    var r = St;
    St |= 1;
    var l = ur.transition, o = kt;
    try {
      if (ur.transition = null, kt = 1, n) return n();
    } finally {
      kt = o, ur.transition = l, St = r, (St & 6) === 0 && Ci();
    }
  }
  function $d() {
    ha = So.current, nn(So);
  }
  function Ji(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, dd(l)), Fn !== null) for (l = Fn.return; l !== null; ) {
      var o = l;
      switch (xc(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && fo();
          break;
        case 3:
          gu(), nn(Yn), nn(Sn), De();
          break;
        case 5:
          kc(o);
          break;
        case 4:
          gu();
          break;
        case 13:
          nn(yn);
          break;
        case 19:
          nn(yn);
          break;
        case 10:
          gd(o.type._context);
          break;
        case 22:
        case 23:
          $d();
      }
      l = l.return;
    }
    if (Qn = n, Fn = n = Fl(n.current, null), or = ha = r, _n = 0, Ms = null, nf = Eo = Di = 0, ea = Ns = null, mu !== null) {
      for (r = 0; r < mu.length; r++) if (l = mu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      mu = null;
    }
    return n;
  }
  function Zv(n, r) {
    do {
      var l = Fn;
      try {
        if (yd(), lt.current = wu, Lc) {
          for (var o = Lt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Lc = !1;
        }
        if (Wt = 0, Kn = zn = Lt = null, ps = !1, Su = 0, bu.current = null, l === null || l.return === null) {
          _n = 1, Ms = r, Fn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = or, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var z = T, I = E, W = I.tag;
            if ((I.mode & 1) === 0 && (W === 0 || W === 11 || W === 15)) {
              var Y = I.alternate;
              Y ? (I.updateQueue = Y.updateQueue, I.memoizedState = Y.memoizedState, I.lanes = Y.lanes) : (I.updateQueue = null, I.memoizedState = null);
            }
            var se = Pv(m);
            if (se !== null) {
              se.flags &= -257, Nl(se, m, E, d, r), se.mode & 1 && Ld(d, z, r), r = se, T = z;
              var me = r.updateQueue;
              if (me === null) {
                var Se = /* @__PURE__ */ new Set();
                Se.add(T), r.updateQueue = Se;
              } else me.add(T);
              break e;
            } else {
              if ((r & 1) === 0) {
                Ld(d, z, r), Yd();
                break e;
              }
              T = Error(A(426));
            }
          } else if (fn && E.mode & 1) {
            var bn = Pv(m);
            if (bn !== null) {
              (bn.flags & 65536) === 0 && (bn.flags |= 256), Nl(bn, m, E, d, r), Wi(xu(T, E));
              break e;
            }
          }
          d = T = xu(T, E), _n !== 4 && (_n = 2), Ns === null ? Ns = [d] : Ns.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var D = Hv(d, T, r);
                zv(d, D);
                break e;
              case 1:
                E = T;
                var x = d.type, L = d.stateNode;
                if ((d.flags & 128) === 0 && (typeof x.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Ul === null || !Ul.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Q = Od(d, E, r);
                  zv(d, Q);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        rh(l);
      } catch (ye) {
        r = ye, Fn === l && l !== null && (Fn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function eh() {
    var n = zl.current;
    return zl.current = wu, n === null ? wu : n;
  }
  function Yd() {
    (_n === 0 || _n === 3 || _n === 2) && (_n = 4), Qn === null || (Di & 268435455) === 0 && (Eo & 268435455) === 0 || ai(Qn, or);
  }
  function lf(n, r) {
    var l = St;
    St |= 2;
    var o = eh();
    (Qn !== n || or !== r) && (ma = null, Ji(n, r));
    do
      try {
        py();
        break;
      } catch (c) {
        Zv(n, c);
      }
    while (!0);
    if (yd(), St = l, zl.current = o, Fn !== null) throw Error(A(261));
    return Qn = null, or = 0, _n;
  }
  function py() {
    for (; Fn !== null; ) nh(Fn);
  }
  function th() {
    for (; Fn !== null && !Qa(); ) nh(Fn);
  }
  function nh(n) {
    var r = uh(n.alternate, n, ha);
    n.memoizedProps = n.pendingProps, r === null ? rh(n) : Fn = r, bu.current = null;
  }
  function rh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, (r.flags & 32768) === 0) {
        if (l = Wv(l, r, ha), l !== null) {
          Fn = l;
          return;
        }
      } else {
        if (l = Zc(l, r), l !== null) {
          l.flags &= 32767, Fn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          _n = 6, Fn = null;
          return;
        }
      }
      if (r = r.sibling, r !== null) {
        Fn = r;
        return;
      }
      Fn = r = n;
    } while (r !== null);
    _n === 0 && (_n = 5);
  }
  function Lu(n, r, l) {
    var o = kt, c = ur.transition;
    try {
      ur.transition = null, kt = 1, vy(n, r, l, o);
    } finally {
      ur.transition = c, kt = o;
    }
    return null;
  }
  function vy(n, r, l, o) {
    do
      wo();
    while (Ki !== null);
    if ((St & 6) !== 0) throw Error(A(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(A(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (If(n, d), n === Qn && (Fn = Qn = null, or = 0), (l.subtreeFlags & 2064) === 0 && (l.flags & 2064) === 0 || rf || (rf = !0, oh(tu, function() {
      return wo(), null;
    })), d = (l.flags & 15990) !== 0, (l.subtreeFlags & 15990) !== 0 || d) {
      d = ur.transition, ur.transition = null;
      var m = kt;
      kt = 1;
      var E = St;
      St |= 4, bu.current = null, qv(n, l), Fd(l, n), ao(fu), xa = !!rs, fu = rs = null, n.current = l, cy(l), Wa(), St = E, kt = m, ur.transition = d;
    } else n.current = l;
    if (rf && (rf = !1, Ki = n, zs = c), d = n.pendingLanes, d === 0 && (Ul = null), $o(l.stateNode), ta(n, Ge()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (Ro) throw Ro = !1, n = Du, Du = null, n;
    return (zs & 1) !== 0 && n.tag !== 0 && wo(), d = n.pendingLanes, (d & 1) !== 0 ? n === To ? Al++ : (Al = 0, To = n) : Al = 0, Ci(), null;
  }
  function wo() {
    if (Ki !== null) {
      var n = Xu(zs), r = ur.transition, l = kt;
      try {
        if (ur.transition = null, kt = 16 > n ? 16 : n, Ki === null) var o = !1;
        else {
          if (n = Ki, Ki = null, zs = 0, (St & 6) !== 0) throw Error(A(331));
          var c = St;
          for (St |= 4, pe = n.current; pe !== null; ) {
            var d = pe, m = d.child;
            if ((pe.flags & 16) !== 0) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var z = E[T];
                  for (pe = z; pe !== null; ) {
                    var I = pe;
                    switch (I.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ds(8, I, d);
                    }
                    var W = I.child;
                    if (W !== null) W.return = I, pe = W;
                    else for (; pe !== null; ) {
                      I = pe;
                      var Y = I.sibling, se = I.return;
                      if (tf(I), I === z) {
                        pe = null;
                        break;
                      }
                      if (Y !== null) {
                        Y.return = se, pe = Y;
                        break;
                      }
                      pe = se;
                    }
                  }
                }
                var me = d.alternate;
                if (me !== null) {
                  var Se = me.child;
                  if (Se !== null) {
                    me.child = null;
                    do {
                      var bn = Se.sibling;
                      Se.sibling = null, Se = bn;
                    } while (Se !== null);
                  }
                }
                pe = d;
              }
            }
            if ((d.subtreeFlags & 2064) !== 0 && m !== null) m.return = d, pe = m;
            else e: for (; pe !== null; ) {
              if (d = pe, (d.flags & 2048) !== 0) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Ds(9, d, d.return);
              }
              var D = d.sibling;
              if (D !== null) {
                D.return = d.return, pe = D;
                break e;
              }
              pe = d.return;
            }
          }
          var x = n.current;
          for (pe = x; pe !== null; ) {
            m = pe;
            var L = m.child;
            if ((m.subtreeFlags & 2064) !== 0 && L !== null) L.return = m, pe = L;
            else e: for (m = x; pe !== null; ) {
              if (E = pe, (E.flags & 2048) !== 0) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ks(9, E);
                }
              } catch (ye) {
                dn(E, E.return, ye);
              }
              if (E === m) {
                pe = null;
                break e;
              }
              var Q = E.sibling;
              if (Q !== null) {
                Q.return = E.return, pe = Q;
                break e;
              }
              pe = E.return;
            }
          }
          if (St = c, Ci(), Yr && typeof Yr.onPostCommitFiberRoot == "function") try {
            Yr.onPostCommitFiberRoot(vl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        kt = l, ur.transition = r;
      }
    }
    return !1;
  }
  function ah(n, r, l) {
    r = xu(l, r), r = Hv(n, r, 1), n = Ol(n, r, 1), r = jn(), n !== null && (ji(n, 1, r), ta(n, r));
  }
  function dn(n, r, l) {
    if (n.tag === 3) ah(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        ah(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Ul === null || !Ul.has(o))) {
          n = xu(l, n), n = Od(r, n, 1), r = Ol(r, n, 1), n = jn(), r !== null && (ji(r, 1, n), ta(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function hy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = jn(), n.pingedLanes |= n.suspendedLanes & l, Qn === n && (or & l) === l && (_n === 4 || _n === 3 && (or & 130023424) === or && 500 > Ge() - Pd ? Ji(n, 0) : nf |= l), ta(n, r);
  }
  function ih(n, r) {
    r === 0 && ((n.mode & 1) === 0 ? r = 1 : (r = ca, ca <<= 1, (ca & 130023424) === 0 && (ca = 4194304)));
    var l = jn();
    n = pa(n, r), n !== null && (ji(n, r, l), ta(n, l));
  }
  function my(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), ih(n, l);
  }
  function lh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(A(314));
    }
    o !== null && o.delete(r), ih(n, l);
  }
  var uh;
  uh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Yn.current) Un = !0;
    else {
      if ((n.lanes & l) === 0 && (r.flags & 128) === 0) return Un = !1, xs(n, r, l);
      Un = (n.flags & 131072) !== 0;
    }
    else Un = !1, fn && (r.flags & 1048576) !== 0 && Ov(r, Qi, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Ma(n, r), n = r.pendingProps;
        var c = Wr(r, Sn.current);
        mn(r, l), c = Ll(null, r, o, n, c, l);
        var d = ti();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mn(o) ? (d = !0, Xn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Rd(r), c.updater = Gc, r.stateNode = c, c._reactInternals = r, Es(r, o, n, l), r = Ts(null, r, o, !0, d, l)) : (r.tag = 0, fn && d && wc(r), lr(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Ma(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = gy(o), n = ni(o, n), c) {
            case 0:
              r = Vv(null, r, o, n, l);
              break e;
            case 1:
              r = Bv(null, r, o, n, l);
              break e;
            case 11:
              r = Jr(null, r, o, n, l);
              break e;
            case 14:
              r = _u(null, r, o, ni(o.type, n), l);
              break e;
          }
          throw Error(A(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Vv(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Bv(n, r, o, c, l);
      case 3:
        e: {
          if (yo(r), n === null) throw Error(A(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, Nv(n, r), os(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = xu(Error(A(423)), r), r = $v(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = xu(Error(A(424)), r), r = $v(n, r, o, l, c);
            break e;
          } else for (qr = gi(r.stateNode.containerInfo.firstChild), Gr = r, fn = !0, Oa = null, l = ie(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (kl(), o === c) {
              r = Na(n, r, l);
              break e;
            }
            lr(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Uv(r), n === null && hd(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Sc(o, c) ? m = null : d !== null && Sc(o, d) && (r.flags |= 32), Md(n, r), lr(n, r, m, l), r.child;
      case 6:
        return n === null && hd(r), null;
      case 13:
        return Jc(n, r, l);
      case 4:
        return wd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Tn(r, null, o, l) : lr(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Jr(n, r, o, c, l);
      case 7:
        return lr(n, r, r.pendingProps, l), r.child;
      case 8:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, xe(da, o._currentValue), o._currentValue = m, d !== null) if (Za(d.value, m)) {
            if (d.children === c.children && !Yn.current) {
              r = Na(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              m = d.child;
              for (var T = E.firstContext; T !== null; ) {
                if (T.context === o) {
                  if (d.tag === 1) {
                    T = Gi(-1, l & -l), T.tag = 2;
                    var z = d.updateQueue;
                    if (z !== null) {
                      z = z.shared;
                      var I = z.pending;
                      I === null ? T.next = T : (T.next = I.next, I.next = T), z.pending = T;
                    }
                  }
                  d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), Sd(
                    d.return,
                    l,
                    r
                  ), E.lanes |= l;
                  break;
                }
                T = T.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(A(341));
              m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), Sd(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          lr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, mn(r, l), c = La(c), o = o(c), r.flags |= 1, lr(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ni(o, r.pendingProps), c = ni(o.type, c), _u(n, r, o, c, l);
      case 15:
        return qe(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Ma(n, r), r.tag = 1, Mn(o) ? (n = !0, Xn(r)) : n = !1, mn(r, l), qc(r, o, c), Es(r, o, c, l), Ts(null, r, o, !0, n, l);
      case 19:
        return xi(n, r, l);
      case 22:
        return Rs(n, r, l);
    }
    throw Error(A(156, r.tag));
  };
  function oh(n, r) {
    return un(n, r);
  }
  function yy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ua(n, r, l, o) {
    return new yy(n, r, l, o);
  }
  function Id(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function gy(n) {
    if (typeof n == "function") return Id(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === xt) return 11;
      if (n === _t) return 14;
    }
    return 2;
  }
  function Fl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Ua(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Fs(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Id(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case Fe:
        return Zi(l.children, c, d, r);
      case rn:
        m = 8, c |= 8;
        break;
      case Ft:
        return n = Ua(12, l, r, c | 2), n.elementType = Ft, n.lanes = d, n;
      case ke:
        return n = Ua(13, l, r, c), n.elementType = ke, n.lanes = d, n;
      case Ut:
        return n = Ua(19, l, r, c), n.elementType = Ut, n.lanes = d, n;
      case Ee:
        return jl(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Kt:
            m = 10;
            break e;
          case an:
            m = 9;
            break e;
          case xt:
            m = 11;
            break e;
          case _t:
            m = 14;
            break e;
          case Dt:
            m = 16, o = null;
            break e;
        }
        throw Error(A(130, n == null ? n : typeof n, ""));
    }
    return r = Ua(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Zi(n, r, l, o) {
    return n = Ua(7, n, o, r), n.lanes = l, n;
  }
  function jl(n, r, l, o) {
    return n = Ua(22, n, o, r), n.elementType = Ee, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Qd(n, r, l) {
    return n = Ua(6, n, null, r), n.lanes = l, n;
  }
  function uf(n, r, l) {
    return r = Ua(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function sh(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = qu(0), this.expirationTimes = qu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = qu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function of(n, r, l, o, c, d, m, E, T) {
    return n = new sh(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Ua(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Rd(d), n;
  }
  function Sy(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ot, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Wd(n) {
    if (!n) return Er;
    n = n._reactInternals;
    e: {
      if (We(n) !== n || n.tag !== 1) throw Error(A(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(A(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mn(l)) return ls(n, l, r);
    }
    return r;
  }
  function ch(n, r, l, o, c, d, m, E, T) {
    return n = of(l, o, !0, n, c, d, m, E, T), n.context = Wd(null), l = n.current, o = jn(), c = ki(l), d = Gi(o, c), d.callback = r ?? null, Ol(l, d, c), n.current.lanes = c, ji(n, c, o), ta(n, o), n;
  }
  function sf(n, r, l, o) {
    var c = r.current, d = jn(), m = ki(c);
    return l = Wd(l), r.context === null ? r.context = l : r.pendingContext = l, r = Gi(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Ol(c, r, m), n !== null && (Nr(n, c, m, d), Dc(n, c, m)), m;
  }
  function cf(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Gd(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function ff(n, r) {
    Gd(n, r), (n = n.alternate) && Gd(n, r);
  }
  function fh() {
    return null;
  }
  var Mu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function qd(n) {
    this._internalRoot = n;
  }
  df.prototype.render = qd.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(A(409));
    sf(n, r, null, null);
  }, df.prototype.unmount = qd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Ou(function() {
        sf(null, n, null, null);
      }), r[Yi] = null;
    }
  };
  function df(n) {
    this._internalRoot = n;
  }
  df.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Ve();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < $n.length && r !== 0 && r < $n[l].priority; l++) ;
      $n.splice(l, 0, n), l === 0 && Qo(n);
    }
  };
  function Xd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function pf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function dh() {
  }
  function Ey(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var z = cf(m);
          d.call(z);
        };
      }
      var m = ch(r, o, n, 0, null, !1, !1, "", dh);
      return n._reactRootContainer = m, n[Yi] = m.current, lo(n.nodeType === 8 ? n.parentNode : n), Ou(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var z = cf(T);
        E.call(z);
      };
    }
    var T = of(n, 0, !1, null, null, !1, !1, "", dh);
    return n._reactRootContainer = T, n[Yi] = T.current, lo(n.nodeType === 8 ? n.parentNode : n), Ou(function() {
      sf(r, T, l, o);
    }), T;
  }
  function js(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = cf(m);
          E.call(T);
        };
      }
      sf(r, m, n, c);
    } else m = Ey(l, r, n, c, o);
    return cf(m);
  }
  Rt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = qa(r.pendingLanes);
          l !== 0 && (Hi(r, l | 1), ta(r, Ge()), (St & 6) === 0 && (Co = Ge() + 500, Ci()));
        }
        break;
      case 13:
        Ou(function() {
          var o = pa(n, 1);
          if (o !== null) {
            var c = jn();
            Nr(o, n, 1, c);
          }
        }), ff(n, 1);
    }
  }, Yo = function(n) {
    if (n.tag === 13) {
      var r = pa(n, 134217728);
      if (r !== null) {
        var l = jn();
        Nr(r, n, 134217728, l);
      }
      ff(n, 134217728);
    }
  }, pi = function(n) {
    if (n.tag === 13) {
      var r = ki(n), l = pa(n, r);
      if (l !== null) {
        var o = jn();
        Nr(l, n, r, o);
      }
      ff(n, r);
    }
  }, Ve = function() {
    return kt;
  }, Ku = function(n, r) {
    var l = kt;
    try {
      return kt = n, r();
    } finally {
      kt = l;
    }
  }, $t = function(n, r, l) {
    switch (r) {
      case "input":
        if ($r(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = hn(o);
              if (!c) throw Error(A(90));
              wr(o), $r(o, c);
            }
          }
        }
        break;
      case "textarea":
        $a(n, l);
        break;
      case "select":
        r = l.value, r != null && Cn(n, !!l.multiple, r, !1);
    }
  }, Jl = Bd, fl = Ou;
  var Cy = { usingClientEntryPoint: !1, Events: [be, ei, hn, Fi, Kl, Bd] }, Hs = { findFiberByHostInstance: du, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ph = { bundleType: Hs.bundleType, version: Hs.version, rendererPackageName: Hs.rendererPackageName, rendererConfig: Hs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: pt.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Rn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Hs.findFiberByHostInstance || fh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Hl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Hl.isDisabled && Hl.supportsFiber) try {
      vl = Hl.inject(ph), Yr = Hl;
    } catch {
    }
  }
  return Va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Cy, Va.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xd(r)) throw Error(A(200));
    return Sy(n, r, null, l);
  }, Va.createRoot = function(n, r) {
    if (!Xd(n)) throw Error(A(299));
    var l = !1, o = "", c = Mu;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = of(n, 1, !1, null, null, l, !1, o, c), n[Yi] = r.current, lo(n.nodeType === 8 ? n.parentNode : n), new qd(r);
  }, Va.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(A(188)) : (n = Object.keys(n).join(","), Error(A(268, n)));
    return n = Rn(r), n = n === null ? null : n.stateNode, n;
  }, Va.flushSync = function(n) {
    return Ou(n);
  }, Va.hydrate = function(n, r, l) {
    if (!pf(r)) throw Error(A(200));
    return js(null, n, r, !0, l);
  }, Va.hydrateRoot = function(n, r, l) {
    if (!Xd(n)) throw Error(A(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Mu;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = ch(r, null, n, 1, l ?? null, c, !1, d, m), n[Yi] = r.current, lo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new df(r);
  }, Va.render = function(n, r, l) {
    if (!pf(r)) throw Error(A(200));
    return js(null, n, r, !1, l);
  }, Va.unmountComponentAtNode = function(n) {
    if (!pf(n)) throw Error(A(40));
    return n._reactRootContainer ? (Ou(function() {
      js(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Yi] = null;
      });
    }), !0) : !1;
  }, Va.unstable_batchedUpdates = Bd, Va.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!pf(l)) throw Error(A(200));
    if (n == null || n._reactInternals === void 0) throw Error(A(38));
    return js(n, r, l, !1, o);
  }, Va.version = "18.3.1-next-f1338f8080-20240426", Va;
}
var Ba = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var iT;
function iD() {
  return iT || (iT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var Z = Zp(), X = oT(), A = Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, wt = !1;
    function Je(e) {
      wt = e;
    }
    function mt(e) {
      if (!wt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Vt("warn", e, a);
      }
    }
    function S(e) {
      if (!wt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Vt("error", e, a);
      }
    }
    function Vt(e, t, a) {
      {
        var i = A.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var de = 0, ve = 1, ut = 2, ee = 3, Ce = 4, ue = 5, Ye = 6, yt = 7, dt = 8, cn = 9, ft = 10, Ie = 11, pt = 12, _e = 13, ot = 14, Fe = 15, rn = 16, Ft = 17, Kt = 18, an = 19, xt = 21, ke = 22, Ut = 23, _t = 24, Dt = 25, Ee = !0, K = !1, Re = !1, ne = !1, b = !1, P = !0, je = !0, Ue = !0, rt = !0, Ze = /* @__PURE__ */ new Set(), Xe = {}, et = {};
    function at(e, t) {
      Pt(e, t), Pt(e + "Capture", t);
    }
    function Pt(e, t) {
      Xe[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Xe[e] = t;
      {
        var a = e.toLowerCase();
        et[a] = e, e === "onDoubleClick" && (et.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Ze.add(t[i]);
    }
    var kn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", wr = Object.prototype.hasOwnProperty;
    function En(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function tr(e) {
      try {
        return Pn(e), !1;
      } catch {
        return !0;
      }
    }
    function Pn(e) {
      return "" + e;
    }
    function Vn(e, t) {
      if (tr(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function $r(e) {
      if (tr(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function oi(e, t) {
      if (tr(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function ua(e, t) {
      if (tr(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function Gn(e) {
      if (tr(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function Cn(e) {
      if (tr(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    var Bn = 0, yr = 1, $a = 2, On = 3, gr = 4, oa = 5, Ya = 6, si = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", J = si + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Te = new RegExp("^[" + si + "][" + J + "]*$"), tt = {}, At = {};
    function Jt(e) {
      return wr.call(At, e) ? !0 : wr.call(tt, e) ? !1 : Te.test(e) ? (At[e] = !0, !0) : (tt[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Bn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function ln(e, t, a, i) {
      if (a !== null && a.type === Bn)
        return !1;
      switch (typeof t) {
        case "function":
        // $FlowIssue symbol is perfectly valid here
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function qn(e, t, a, i) {
      if (t === null || typeof t > "u" || ln(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case On:
            return !t;
          case gr:
            return t === !1;
          case oa:
            return isNaN(t);
          case Ya:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Zt(e) {
      return $t.hasOwnProperty(e) ? $t[e] : null;
    }
    function Bt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === $a || t === On || t === gr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var $t = {}, sa = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    sa.forEach(function(e) {
      $t[e] = new Bt(
        e,
        Bn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        $a,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        $a,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        gr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ya,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        oa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Sr = /[\-\:]([a-z])/g, Ra = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ra);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ra);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ra);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Fi = "xlinkHref";
    $t[Fi] = new Bt(
      "xlinkHref",
      yr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Kl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Jl = !1;
    function fl(e) {
      !Jl && Kl.test(e) && (Jl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function dl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Vn(a, t), i.sanitizeURL && fl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === gr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : qn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (qn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === On)
            return a;
          f = e.getAttribute(s);
        }
        return qn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function Zl(e, t, a, i) {
      {
        if (!Jt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Vn(a, t), u === "" + a ? a : u;
      }
    }
    function xr(e, t, a, i) {
      var u = Zt(t);
      if (!pn(t, u, i)) {
        if (qn(t, a, u, i) && (a = null), i || u === null) {
          if (Jt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Vn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === On ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var _ = u.type, w;
          _ === On || _ === gr && a === !0 ? w = "" : (Vn(a, y), w = "" + a, u.sanitizeURL && fl(w.toString())), g ? e.setAttributeNS(g, y, w) : e.setAttribute(y, w);
        }
      }
    }
    var _r = Symbol.for("react.element"), nr = Symbol.for("react.portal"), ci = Symbol.for("react.fragment"), Ia = Symbol.for("react.strict_mode"), fi = Symbol.for("react.profiler"), di = Symbol.for("react.provider"), R = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), We = Symbol.for("react.memo"), Be = Symbol.for("react.lazy"), st = Symbol.for("react.scope"), it = Symbol.for("react.debug_trace_mode"), Rn = Symbol.for("react.offscreen"), en = Symbol.for("react.legacy_hidden"), un = Symbol.for("react.cache"), rr = Symbol.for("react.tracing_marker"), Qa = Symbol.iterator, Wa = "@@iterator";
    function Ge(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Qa && e[Qa] || e[Wa];
      return typeof t == "function" ? t : null;
    }
    var Ke = Object.assign, Ga = 0, eu, tu, pl, Iu, vl, Yr, $o;
    function br() {
    }
    br.__reactDisabledLog = !0;
    function ac() {
      {
        if (Ga === 0) {
          eu = console.log, tu = console.info, pl = console.warn, Iu = console.error, vl = console.group, Yr = console.groupCollapsed, $o = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: br,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Ga++;
      }
    }
    function ic() {
      {
        if (Ga--, Ga === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ke({}, e, {
              value: eu
            }),
            info: Ke({}, e, {
              value: tu
            }),
            warn: Ke({}, e, {
              value: pl
            }),
            error: Ke({}, e, {
              value: Iu
            }),
            group: Ke({}, e, {
              value: vl
            }),
            groupCollapsed: Ke({}, e, {
              value: Yr
            }),
            groupEnd: Ke({}, e, {
              value: $o
            })
          });
        }
        Ga < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Qu = A.ReactCurrentDispatcher, hl;
    function ca(e, t, a) {
      {
        if (hl === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            hl = i && i[1] || "";
          }
        return `
` + hl + e;
      }
    }
    var qa = !1, Xa;
    {
      var Wu = typeof WeakMap == "function" ? WeakMap : Map;
      Xa = new Wu();
    }
    function nu(e, t) {
      if (!e || qa)
        return "";
      {
        var a = Xa.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      qa = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Qu.current, Qu.current = null, ac();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (U) {
              i = U;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (U) {
              i = U;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            i = U;
          }
          e();
        }
      } catch (U) {
        if (U && i && typeof U.stack == "string") {
          for (var p = U.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var _ = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && Xa.set(e, _), _;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        qa = !1, Qu.current = s, ic(), Error.prepareStackTrace = u;
      }
      var w = e ? e.displayName || e.name : "", M = w ? ca(w) : "";
      return typeof e == "function" && Xa.set(e, M), M;
    }
    function ml(e, t, a) {
      return nu(e, !0);
    }
    function Gu(e, t, a) {
      return nu(e, !1);
    }
    function qu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ji(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return nu(e, qu(e));
      if (typeof e == "string")
        return ca(e);
      switch (e) {
        case ae:
          return ca("Suspense");
        case he:
          return ca("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case B:
            return Gu(e.render);
          case We:
            return ji(e.type, t, a);
          case Be: {
            var i = e, u = i._payload, s = i._init;
            try {
              return ji(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function If(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ue:
          return ca(e.type);
        case rn:
          return ca("Lazy");
        case _e:
          return ca("Suspense");
        case an:
          return ca("SuspenseList");
        case de:
        case ut:
        case Fe:
          return Gu(e.type);
        case Ie:
          return Gu(e.type.render);
        case ve:
          return ml(e.type);
        default:
          return "";
      }
    }
    function Hi(e) {
      try {
        var t = "", a = e;
        do
          t += If(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function kt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Xu(e) {
      return e.displayName || "Context";
    }
    function Rt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case ci:
          return "Fragment";
        case nr:
          return "Portal";
        case fi:
          return "Profiler";
        case Ia:
          return "StrictMode";
        case ae:
          return "Suspense";
        case he:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var t = e;
            return Xu(t) + ".Consumer";
          case di:
            var a = e;
            return Xu(a._context) + ".Provider";
          case B:
            return kt(e, e.render, "ForwardRef");
          case We:
            var i = e.displayName || null;
            return i !== null ? i : Rt(e.type) || "Memo";
          case Be: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Rt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Yo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function pi(e) {
      return e.displayName || "Context";
    }
    function Ve(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case _t:
          return "Cache";
        case cn:
          var i = a;
          return pi(i) + ".Consumer";
        case ft:
          var u = a;
          return pi(u._context) + ".Provider";
        case Kt:
          return "DehydratedFragment";
        case Ie:
          return Yo(a, a.render, "ForwardRef");
        case yt:
          return "Fragment";
        case ue:
          return a;
        case Ce:
          return "Portal";
        case ee:
          return "Root";
        case Ye:
          return "Text";
        case rn:
          return Rt(a);
        case dt:
          return a === Ia ? "StrictMode" : "Mode";
        case ke:
          return "Offscreen";
        case pt:
          return "Profiler";
        case xt:
          return "Scope";
        case _e:
          return "Suspense";
        case an:
          return "SuspenseList";
        case Dt:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case ve:
        case de:
        case Ft:
        case ut:
        case ot:
        case Fe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Ku = A.ReactDebugCurrentFrame, ar = null, vi = !1;
    function Dr() {
      {
        if (ar === null)
          return null;
        var e = ar._debugOwner;
        if (e !== null && typeof e < "u")
          return Ve(e);
      }
      return null;
    }
    function hi() {
      return ar === null ? "" : Hi(ar);
    }
    function on() {
      Ku.getCurrentStack = null, ar = null, vi = !1;
    }
    function Yt(e) {
      Ku.getCurrentStack = e === null ? null : hi, ar = e, vi = !1;
    }
    function yl() {
      return ar;
    }
    function $n(e) {
      vi = e;
    }
    function kr(e) {
      return "" + e;
    }
    function Ta(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var ru = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Io(e, t) {
      ru[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Qo(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function gl(e) {
      return e._valueTracker;
    }
    function au(e) {
      e._valueTracker = null;
    }
    function Qf(e) {
      var t = "";
      return e && (Qo(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function wa(e) {
      var t = Qo(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            au(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Ka(e) {
      gl(e) || (e._valueTracker = wa(e));
    }
    function mi(e) {
      if (!e)
        return !1;
      var t = gl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Qf(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function xa(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ju = !1, Zu = !1, Sl = !1, iu = !1;
    function eo(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function to(e, t) {
      var a = e, i = t.checked, u = Ke({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Ja(e, t) {
      Io("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !Zu && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), Zu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ju && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), Ju = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Ta(t.value != null ? t.value : i),
        controlled: eo(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && xr(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = eo(t);
        !a._wrapperState.controlled && i && !iu && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), iu = !0), a._wrapperState.controlled && !i && !Sl && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Sl = !0);
      }
      h(e, t);
      var u = Ta(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = kr(u)) : a.value !== kr(u) && (a.value = kr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Oe(a, t.type, u) : t.hasOwnProperty("defaultValue") && Oe(a, t.type, Ta(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function N(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = kr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function F(e, t) {
      var a = e;
      C(a, t), q(a, t);
    }
    function q(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Vn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Lh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            mi(f), C(f, p);
          }
        }
      }
    }
    function Oe(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || xa(e.ownerDocument) !== e) && (a == null ? e.defaultValue = kr(e._wrapperState.initialValue) : e.defaultValue !== kr(a) && (e.defaultValue = kr(a)));
    }
    var re = !1, Ne = !1, ct = !1;
    function Tt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? Z.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Ne || (Ne = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (ct || (ct = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !re && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), re = !0);
    }
    function tn(e, t) {
      t.value != null && e.setAttribute("value", kr(Ta(t.value)));
    }
    var It = Array.isArray;
    function nt(e) {
      return It(e);
    }
    var Qt;
    Qt = !1;
    function vn() {
      var e = Dr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var El = ["value", "defaultValue"];
    function Wo(e) {
      {
        Io("select", e);
        for (var t = 0; t < El.length; t++) {
          var a = El[t];
          if (e[a] != null) {
            var i = nt(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, vn()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, vn());
          }
        }
      }
    }
    function Pi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = kr(Ta(a)), _ = null, w = 0; w < u.length; w++) {
          if (u[w].value === g) {
            u[w].selected = !0, i && (u[w].defaultSelected = !0);
            return;
          }
          _ === null && !u[w].disabled && (_ = u[w]);
        }
        _ !== null && (_.selected = !0);
      }
    }
    function Go(e, t) {
      return Ke({}, t, {
        value: void 0
      });
    }
    function lu(e, t) {
      var a = e;
      Wo(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Qt && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Qt = !0);
    }
    function Wf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Pi(a, !!t.multiple, i, !1) : t.defaultValue != null && Pi(a, !!t.multiple, t.defaultValue, !0);
    }
    function lc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Pi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Pi(a, !!t.multiple, t.defaultValue, !0) : Pi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Gf(e, t) {
      var a = e, i = t.value;
      i != null && Pi(a, !!t.multiple, i, !1);
    }
    var ev = !1;
    function qf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = Ke({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: kr(a._wrapperState.initialValue)
      });
      return i;
    }
    function Xf(e, t) {
      var a = e;
      Io("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !ev && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component"), ev = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (nt(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Ta(i)
      };
    }
    function tv(e, t) {
      var a = e, i = Ta(t.value), u = Ta(t.defaultValue);
      if (i != null) {
        var s = kr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = kr(u));
    }
    function nv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Xm(e, t) {
      tv(e, t);
    }
    var Vi = "http://www.w3.org/1999/xhtml", Kf = "http://www.w3.org/1998/Math/MathML", Jf = "http://www.w3.org/2000/svg";
    function Zf(e) {
      switch (e) {
        case "svg":
          return Jf;
        case "math":
          return Kf;
        default:
          return Vi;
      }
    }
    function ed(e, t) {
      return e == null || e === Vi ? Zf(t) : e === Jf && t === "foreignObject" ? Vi : e;
    }
    var rv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, uc, av = rv(function(e, t) {
      if (e.namespaceURI === Jf && !("innerHTML" in e)) {
        uc = uc || document.createElement("div"), uc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = uc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Ir = 1, Bi = 3, Ln = 8, $i = 9, td = 11, no = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Bi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, qo = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Xo = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function iv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var lv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Xo).forEach(function(e) {
      lv.forEach(function(t) {
        Xo[iv(t, e)] = Xo[e];
      });
    });
    function oc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Xo.hasOwnProperty(e) && Xo[e]) ? t + "px" : (ua(t, e), ("" + t).trim());
    }
    var uv = /([A-Z])/g, ov = /^ms-/;
    function ro(e) {
      return e.replace(uv, "-$1").toLowerCase().replace(ov, "-ms-");
    }
    var sv = function() {
    };
    {
      var Km = /^(?:webkit|moz|o)[A-Z]/, Jm = /^-ms-/, cv = /-(.)/g, nd = /;\s*$/, yi = {}, uu = {}, fv = !1, Ko = !1, Zm = function(e) {
        return e.replace(cv, function(t, a) {
          return a.toUpperCase();
        });
      }, dv = function(e) {
        yi.hasOwnProperty(e) && yi[e] || (yi[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Zm(e.replace(Jm, "ms-"))
        ));
      }, rd = function(e) {
        yi.hasOwnProperty(e) && yi[e] || (yi[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, ad = function(e, t) {
        uu.hasOwnProperty(t) && uu[t] || (uu[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(nd, "")));
      }, pv = function(e, t) {
        fv || (fv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, vv = function(e, t) {
        Ko || (Ko = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      sv = function(e, t) {
        e.indexOf("-") > -1 ? dv(e) : Km.test(e) ? rd(e) : nd.test(t) && ad(e, t), typeof t == "number" && (isNaN(t) ? pv(e, t) : isFinite(t) || vv(e, t));
      };
    }
    var hv = sv;
    function ey(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ro(i)) + ":", t += oc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function mv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || hv(i, t[i]);
          var s = oc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function ty(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function yv(e) {
      var t = {};
      for (var a in e)
        for (var i = qo[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function ny(e, t) {
      {
        if (!t)
          return;
        var a = yv(e), i = yv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", ty(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var Za = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Jo = Ke({
      menuitem: !0
    }, Za), gv = "__html";
    function sc(e, t) {
      if (t) {
        if (Jo[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(gv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Cl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        // These are reserved SVG and MathML elements.
        // We don't mind this list too much because we expect it to never grow.
        // The alternative is to track the namespace in a few places which is convoluted.
        // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Zo = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, cc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, ao = {}, ry = new RegExp("^(aria)-[" + J + "]*$"), io = new RegExp("^(aria)[A-Z][" + J + "]*$");
    function id(e, t) {
      {
        if (wr.call(ao, t) && ao[t])
          return !0;
        if (io.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = cc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ao[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), ao[t] = !0, !0;
        }
        if (ry.test(t)) {
          var u = t.toLowerCase(), s = cc.hasOwnProperty(u) ? u : null;
          if (s == null)
            return ao[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), ao[t] = !0, !0;
        }
      }
      return !0;
    }
    function es(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = id(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function ld(e, t) {
      Cl(e, t) || es(e, t);
    }
    var ud = !1;
    function fc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !ud && (ud = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var ou = function() {
    };
    {
      var ir = {}, od = /^on./, dc = /^on[^A-Z]/, Sv = new RegExp("^(aria)-[" + J + "]*$"), Ev = new RegExp("^(aria)[A-Z][" + J + "]*$");
      ou = function(e, t, a, i) {
        if (wr.call(ir, t) && ir[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ir[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), ir[t] = !0, !0;
          if (od.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), ir[t] = !0, !0;
        } else if (od.test(t))
          return dc.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ir[t] = !0, !0;
        if (Sv.test(t) || Ev.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ir[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ir[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ir[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ir[t] = !0, !0;
        var v = Zt(t), y = v !== null && v.type === Bn;
        if (Zo.hasOwnProperty(u)) {
          var g = Zo[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), ir[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), ir[t] = !0, !0;
        return typeof a == "boolean" && ln(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ir[t] = !0, !0) : y ? !0 : ln(t, a, v, !1) ? (ir[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === On && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ir[t] = !0), !0);
      };
    }
    var Cv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = ou(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Rv(e, t, a) {
      Cl(e, t) || Cv(e, t, a);
    }
    var sd = 1, pc = 2, _a = 4, cd = sd | pc | _a, su = null;
    function ay(e) {
      su !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), su = e;
    }
    function iy() {
      su === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), su = null;
    }
    function ts(e) {
      return e === su;
    }
    function fd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Bi ? t.parentNode : t;
    }
    var vc = null, cu = null, jt = null;
    function hc(e) {
      var t = bo(e);
      if (t) {
        if (typeof vc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Lh(a);
          vc(t.stateNode, t.type, i);
        }
      }
    }
    function mc(e) {
      vc = e;
    }
    function lo(e) {
      cu ? jt ? jt.push(e) : jt = [e] : cu = e;
    }
    function Tv() {
      return cu !== null || jt !== null;
    }
    function yc() {
      if (cu) {
        var e = cu, t = jt;
        if (cu = null, jt = null, hc(e), t)
          for (var a = 0; a < t.length; a++)
            hc(t[a]);
      }
    }
    var uo = function(e, t) {
      return e(t);
    }, ns = function() {
    }, Rl = !1;
    function wv() {
      var e = Tv();
      e && (ns(), yc());
    }
    function xv(e, t, a) {
      if (Rl)
        return e(t, a);
      Rl = !0;
      try {
        return uo(e, t, a);
      } finally {
        Rl = !1, wv();
      }
    }
    function ly(e, t, a) {
      uo = e, ns = a;
    }
    function _v(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function gc(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && _v(t));
        default:
          return !1;
      }
    }
    function Tl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Lh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (gc(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var rs = !1;
    if (kn)
      try {
        var fu = {};
        Object.defineProperty(fu, "passive", {
          get: function() {
            rs = !0;
          }
        }), window.addEventListener("test", fu, fu), window.removeEventListener("test", fu, fu);
      } catch {
        rs = !1;
      }
    function Sc(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var Ec = Sc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var dd = document.createElement("react");
      Ec = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), _ = !1, w = !0, M = window.event, U = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          dd.removeEventListener(H, Le, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
        }
        var le = Array.prototype.slice.call(arguments, 3);
        function Le() {
          _ = !0, j(), a.apply(i, le), w = !1;
        }
        var we, Ct = !1, vt = !1;
        function k(O) {
          if (we = O.error, Ct = !0, we === null && O.colno === 0 && O.lineno === 0 && (vt = !0), O.defaultPrevented && we != null && typeof we == "object")
            try {
              we._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", k), dd.addEventListener(H, Le, !1), g.initEvent(H, !1, !1), dd.dispatchEvent(g), U && Object.defineProperty(window, "event", U), _ && w && (Ct ? vt && (we = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : we = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(we)), window.removeEventListener("error", k), !_)
          return j(), Sc.apply(this, arguments);
      };
    }
    var bv = Ec, oo = !1, Cc = null, so = !1, gi = null, Dv = {
      onError: function(e) {
        oo = !0, Cc = e;
      }
    };
    function wl(e, t, a, i, u, s, f, p, v) {
      oo = !1, Cc = null, bv.apply(Dv, arguments);
    }
    function Si(e, t, a, i, u, s, f, p, v) {
      if (wl.apply(this, arguments), oo) {
        var y = is();
        so || (so = !0, gi = y);
      }
    }
    function as() {
      if (so) {
        var e = gi;
        throw so = !1, gi = null, e;
      }
    }
    function Yi() {
      return oo;
    }
    function is() {
      if (oo) {
        var e = Cc;
        return oo = !1, Cc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function co(e) {
      return e._reactInternals;
    }
    function uy(e) {
      return e._reactInternals !== void 0;
    }
    function du(e, t) {
      e._reactInternals = t;
    }
    var be = (
      /*                      */
      0
    ), ei = (
      /*                */
      1
    ), hn = (
      /*                    */
      2
    ), gt = (
      /*                       */
      4
    ), ba = (
      /*                */
      16
    ), Da = (
      /*                 */
      32
    ), nn = (
      /*                     */
      64
    ), xe = (
      /*                   */
      128
    ), Er = (
      /*            */
      256
    ), Sn = (
      /*                          */
      512
    ), Yn = (
      /*                     */
      1024
    ), Qr = (
      /*                      */
      2048
    ), Wr = (
      /*                    */
      4096
    ), Mn = (
      /*                   */
      8192
    ), fo = (
      /*             */
      16384
    ), kv = (
      /*               */
      32767
    ), ls = (
      /*                   */
      32768
    ), Xn = (
      /*                */
      65536
    ), Rc = (
      /* */
      131072
    ), Ei = (
      /*                       */
      1048576
    ), po = (
      /*                    */
      2097152
    ), Ii = (
      /*                 */
      4194304
    ), Tc = (
      /*                */
      8388608
    ), xl = (
      /*               */
      16777216
    ), Ci = (
      /*              */
      33554432
    ), _l = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      gt | Yn | 0
    ), bl = hn | gt | ba | Da | Sn | Wr | Mn, Dl = gt | nn | Sn | Mn, Qi = Qr | ba, Nn = Ii | Tc | po, ka = A.ReactCurrentOwner;
    function fa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (hn | Wr)) !== be && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === ee ? a : null;
    }
    function Ri(e) {
      if (e.tag === _e) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Ti(e) {
      return e.tag === ee ? e.stateNode.containerInfo : null;
    }
    function pu(e) {
      return fa(e) === e;
    }
    function Ov(e) {
      {
        var t = ka.current;
        if (t !== null && t.tag === ve) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ve(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = co(e);
      return u ? fa(u) === u : !1;
    }
    function wc(e) {
      if (fa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function xc(e) {
      var t = e.alternate;
      if (!t) {
        var a = fa(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return wc(s), e;
            if (v === u)
              return wc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== ee)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Gr(e) {
      var t = xc(e);
      return t !== null ? qr(t) : null;
    }
    function qr(e) {
      if (e.tag === ue || e.tag === Ye)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = qr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function fn(e) {
      var t = xc(e);
      return t !== null ? Oa(t) : null;
    }
    function Oa(e) {
      if (e.tag === ue || e.tag === Ye)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== Ce) {
          var a = Oa(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var pd = X.unstable_scheduleCallback, Lv = X.unstable_cancelCallback, vd = X.unstable_shouldYield, hd = X.unstable_requestPaint, In = X.unstable_now, _c = X.unstable_getCurrentPriorityLevel, us = X.unstable_ImmediatePriority, kl = X.unstable_UserBlockingPriority, Wi = X.unstable_NormalPriority, oy = X.unstable_LowPriority, vu = X.unstable_IdlePriority, bc = X.unstable_yieldValue, Mv = X.unstable_setDisableYieldValue, hu = null, Tn = null, ie = null, da = !1, Xr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function vo(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        je && (e = Ke({}, e, {
          getLaneLabelMap: mu,
          injectProfilingHooks: La
        })), hu = t.inject(e), Tn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function md(e, t) {
      if (Tn && typeof Tn.onScheduleFiberRoot == "function")
        try {
          Tn.onScheduleFiberRoot(hu, e, t);
        } catch (a) {
          da || (da = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function yd(e, t) {
      if (Tn && typeof Tn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & xe) === xe;
          if (Ue) {
            var i;
            switch (t) {
              case Or:
                i = us;
                break;
              case xi:
                i = kl;
                break;
              case Ma:
                i = Wi;
                break;
              case Na:
                i = vu;
                break;
              default:
                i = Wi;
                break;
            }
            Tn.onCommitFiberRoot(hu, e, i, a);
          }
        } catch (u) {
          da || (da = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function gd(e) {
      if (Tn && typeof Tn.onPostCommitFiberRoot == "function")
        try {
          Tn.onPostCommitFiberRoot(hu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Sd(e) {
      if (Tn && typeof Tn.onCommitFiberUnmount == "function")
        try {
          Tn.onCommitFiberUnmount(hu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function mn(e) {
      if (typeof bc == "function" && (Mv(e), Je(e)), Tn && typeof Tn.setStrictMode == "function")
        try {
          Tn.setStrictMode(hu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function La(e) {
      ie = e;
    }
    function mu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Su; a++) {
          var i = Av(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ed(e) {
      ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
    }
    function Cd() {
      ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
    }
    function pa(e) {
      ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
    }
    function va() {
      ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
    }
    function Rd(e) {
      ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
    }
    function Nv() {
      ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
    }
    function Gi(e) {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ol() {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
    }
    function Dc(e) {
      ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
    }
    function zv() {
      ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
    }
    function os(e) {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
    }
    function Td() {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
    }
    function ss(e, t, a) {
      ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, a);
    }
    function wi(e, t, a) {
      ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, a);
    }
    function cs(e) {
      ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
    }
    function fs() {
      ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
    }
    function yu(e) {
      ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
    }
    function wd() {
      ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
    }
    function gu(e) {
      ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
    }
    function Uv() {
      ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
    }
    function kc() {
      ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
    }
    function yn(e) {
      ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
    }
    function Oc(e, t) {
      ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
    }
    function ds(e, t) {
      ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
    }
    var De = (
      /*                         */
      0
    ), lt = (
      /*                 */
      1
    ), Ot = (
      /*                    */
      2
    ), Wt = (
      /*               */
      8
    ), Lt = (
      /*              */
      16
    ), zn = Math.clz32 ? Math.clz32 : ps, Kn = Math.log, Lc = Math.LN2;
    function ps(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Kn(t) / Lc | 0) | 0;
    }
    var Su = 31, $ = (
      /*                        */
      0
    ), bt = (
      /*                          */
      0
    ), Ae = (
      /*                        */
      1
    ), Ll = (
      /*    */
      2
    ), ti = (
      /*             */
      4
    ), Cr = (
      /*            */
      8
    ), wn = (
      /*                     */
      16
    ), qi = (
      /*                */
      32
    ), Ml = (
      /*                       */
      4194240
    ), Eu = (
      /*                        */
      64
    ), Mc = (
      /*                        */
      128
    ), Nc = (
      /*                        */
      256
    ), zc = (
      /*                        */
      512
    ), Uc = (
      /*                        */
      1024
    ), Ac = (
      /*                        */
      2048
    ), Fc = (
      /*                        */
      4096
    ), jc = (
      /*                        */
      8192
    ), Hc = (
      /*                        */
      16384
    ), Cu = (
      /*                       */
      32768
    ), Pc = (
      /*                       */
      65536
    ), ho = (
      /*                       */
      131072
    ), mo = (
      /*                       */
      262144
    ), Vc = (
      /*                       */
      524288
    ), vs = (
      /*                       */
      1048576
    ), Bc = (
      /*                       */
      2097152
    ), hs = (
      /*                            */
      130023424
    ), Ru = (
      /*                             */
      4194304
    ), $c = (
      /*                             */
      8388608
    ), ms = (
      /*                             */
      16777216
    ), Yc = (
      /*                             */
      33554432
    ), Ic = (
      /*                             */
      67108864
    ), xd = Ru, ys = (
      /*          */
      134217728
    ), _d = (
      /*                          */
      268435455
    ), gs = (
      /*               */
      268435456
    ), Tu = (
      /*                        */
      536870912
    ), Kr = (
      /*                   */
      1073741824
    );
    function Av(e) {
      {
        if (e & Ae)
          return "Sync";
        if (e & Ll)
          return "InputContinuousHydration";
        if (e & ti)
          return "InputContinuous";
        if (e & Cr)
          return "DefaultHydration";
        if (e & wn)
          return "Default";
        if (e & qi)
          return "TransitionHydration";
        if (e & Ml)
          return "Transition";
        if (e & hs)
          return "Retry";
        if (e & ys)
          return "SelectiveHydration";
        if (e & gs)
          return "IdleHydration";
        if (e & Tu)
          return "Idle";
        if (e & Kr)
          return "Offscreen";
      }
    }
    var Xt = -1, wu = Eu, Qc = Ru;
    function Ss(e) {
      switch (Nl(e)) {
        case Ae:
          return Ae;
        case Ll:
          return Ll;
        case ti:
          return ti;
        case Cr:
          return Cr;
        case wn:
          return wn;
        case qi:
          return qi;
        case Eu:
        case Mc:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Cu:
        case Pc:
        case ho:
        case mo:
        case Vc:
        case vs:
        case Bc:
          return e & Ml;
        case Ru:
        case $c:
        case ms:
        case Yc:
        case Ic:
          return e & hs;
        case ys:
          return ys;
        case gs:
          return gs;
        case Tu:
          return Tu;
        case Kr:
          return Kr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Wc(e, t) {
      var a = e.pendingLanes;
      if (a === $)
        return $;
      var i = $, u = e.suspendedLanes, s = e.pingedLanes, f = a & _d;
      if (f !== $) {
        var p = f & ~u;
        if (p !== $)
          i = Ss(p);
        else {
          var v = f & s;
          v !== $ && (i = Ss(v));
        }
      } else {
        var y = a & ~u;
        y !== $ ? i = Ss(y) : s !== $ && (i = Ss(s));
      }
      if (i === $)
        return $;
      if (t !== $ && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === $) {
        var g = Nl(i), _ = Nl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= _ || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === wn && (_ & Ml) !== $
        )
          return t;
      }
      (i & ti) !== $ && (i |= a & wn);
      var w = e.entangledLanes;
      if (w !== $)
        for (var M = e.entanglements, U = i & w; U > 0; ) {
          var j = Un(U), le = 1 << j;
          i |= M[j], U &= ~le;
        }
      return i;
    }
    function ni(e, t) {
      for (var a = e.eventTimes, i = Xt; t > 0; ) {
        var u = Un(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function bd(e, t) {
      switch (e) {
        case Ae:
        case Ll:
        case ti:
          return t + 250;
        case Cr:
        case wn:
        case qi:
        case Eu:
        case Mc:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Cu:
        case Pc:
        case ho:
        case mo:
        case Vc:
        case vs:
        case Bc:
          return t + 5e3;
        case Ru:
        case $c:
        case ms:
        case Yc:
        case Ic:
          return Xt;
        case ys:
        case gs:
        case Tu:
        case Kr:
          return Xt;
        default:
          return S("Should have found matching lanes. This is a bug in React."), Xt;
      }
    }
    function Gc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p, y = s[p];
        y === Xt ? ((v & i) === $ || (v & u) !== $) && (s[p] = bd(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Fv(e) {
      return Ss(e.pendingLanes);
    }
    function qc(e) {
      var t = e.pendingLanes & ~Kr;
      return t !== $ ? t : t & Kr ? Kr : $;
    }
    function jv(e) {
      return (e & Ae) !== $;
    }
    function Es(e) {
      return (e & _d) !== $;
    }
    function xu(e) {
      return (e & hs) === e;
    }
    function Dd(e) {
      var t = Ae | ti | wn;
      return (e & t) === $;
    }
    function kd(e) {
      return (e & Ml) === e;
    }
    function Xc(e, t) {
      var a = Ll | ti | Cr | wn;
      return (t & a) !== $;
    }
    function Hv(e, t) {
      return (t & e.expiredLanes) !== $;
    }
    function Od(e) {
      return (e & Ml) !== $;
    }
    function Ld() {
      var e = wu;
      return wu <<= 1, (wu & Ml) === $ && (wu = Eu), e;
    }
    function Pv() {
      var e = Qc;
      return Qc <<= 1, (Qc & hs) === $ && (Qc = Ru), e;
    }
    function Nl(e) {
      return e & -e;
    }
    function Cs(e) {
      return Nl(e);
    }
    function Un(e) {
      return 31 - zn(e);
    }
    function lr(e) {
      return Un(e);
    }
    function Jr(e, t) {
      return (e & t) !== $;
    }
    function _u(e, t) {
      return (e & t) === t;
    }
    function qe(e, t) {
      return e | t;
    }
    function Rs(e, t) {
      return e & ~t;
    }
    function Md(e, t) {
      return e & t;
    }
    function Vv(e) {
      return e;
    }
    function Bv(e, t) {
      return e !== bt && e < t ? e : t;
    }
    function Ts(e) {
      for (var t = [], a = 0; a < Su; a++)
        t.push(e);
      return t;
    }
    function yo(e, t, a) {
      e.pendingLanes |= t, t !== Tu && (e.suspendedLanes = $, e.pingedLanes = $);
      var i = e.eventTimes, u = lr(t);
      i[u] = a;
    }
    function $v(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Un(i), s = 1 << u;
        a[u] = Xt, i &= ~s;
      }
    }
    function Kc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Nd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p;
        i[p] = $, u[p] = Xt, s[p] = Xt, f &= ~v;
      }
    }
    function Jc(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Un(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function zd(e, t) {
      var a = Nl(t), i;
      switch (a) {
        case ti:
          i = Ll;
          break;
        case wn:
          i = Cr;
          break;
        case Eu:
        case Mc:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Cu:
        case Pc:
        case ho:
        case mo:
        case Vc:
        case vs:
        case Bc:
        case Ru:
        case $c:
        case ms:
        case Yc:
        case Ic:
          i = qi;
          break;
        case Tu:
          i = gs;
          break;
        default:
          i = bt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== bt ? bt : i;
    }
    function ws(e, t, a) {
      if (Xr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = lr(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Yv(e, t) {
      if (Xr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = lr(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Ud(e, t) {
      return null;
    }
    var Or = Ae, xi = ti, Ma = wn, Na = Tu, xs = bt;
    function za() {
      return xs;
    }
    function An(e) {
      xs = e;
    }
    function Iv(e, t) {
      var a = xs;
      try {
        return xs = e, t();
      } finally {
        xs = a;
      }
    }
    function Qv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function _s(e, t) {
      return e > t ? e : t;
    }
    function Jn(e, t) {
      return e !== 0 && e < t;
    }
    function Wv(e) {
      var t = Nl(e);
      return Jn(Or, t) ? Jn(xi, t) ? Es(t) ? Ma : Na : xi : Or;
    }
    function Zc(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var bs;
    function Rr(e) {
      bs = e;
    }
    function sy(e) {
      bs(e);
    }
    var pe;
    function go(e) {
      pe = e;
    }
    var ef;
    function Gv(e) {
      ef = e;
    }
    var qv;
    function Ds(e) {
      qv = e;
    }
    var ks;
    function Ad(e) {
      ks = e;
    }
    var tf = !1, Os = [], Xi = null, _i = null, bi = null, xn = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), Mr = [], Xv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Kv(e) {
      return Xv.indexOf(e) > -1;
    }
    function ri(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Fd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Xi = null;
          break;
        case "dragenter":
        case "dragleave":
          _i = null;
          break;
        case "mouseover":
        case "mouseout":
          bi = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          xn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lr.delete(i);
          break;
        }
      }
    }
    function Zr(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ri(t, a, i, u, s);
        if (t !== null) {
          var p = bo(t);
          p !== null && pe(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function cy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Xi = Zr(Xi, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return _i = Zr(_i, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return bi = Zr(bi, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return xn.set(y, Zr(xn.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, _ = g.pointerId;
          return Lr.set(_, Zr(Lr.get(_) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function jd(e) {
      var t = Bs(e.target);
      if (t !== null) {
        var a = fa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === _e) {
            var u = Ri(a);
            if (u !== null) {
              e.blockedOn = u, ks(e.priority, function() {
                ef(a);
              });
              return;
            }
          } else if (i === ee) {
            var s = a.stateNode;
            if (Zc(s)) {
              e.blockedOn = Ti(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Jv(e) {
      for (var t = qv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Mr.length && Jn(t, Mr[i].priority); i++)
        ;
      Mr.splice(i, 0, a), i === 0 && jd(a);
    }
    function Ls(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Eo(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ay(s), u.target.dispatchEvent(s), iy();
        } else {
          var f = bo(i);
          return f !== null && pe(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Hd(e, t, a) {
      Ls(e) && a.delete(t);
    }
    function fy() {
      tf = !1, Xi !== null && Ls(Xi) && (Xi = null), _i !== null && Ls(_i) && (_i = null), bi !== null && Ls(bi) && (bi = null), xn.forEach(Hd), Lr.forEach(Hd);
    }
    function zl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, tf || (tf = !0, X.unstable_scheduleCallback(X.unstable_NormalPriority, fy)));
    }
    function bu(e) {
      if (Os.length > 0) {
        zl(Os[0], e);
        for (var t = 1; t < Os.length; t++) {
          var a = Os[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Xi !== null && zl(Xi, e), _i !== null && zl(_i, e), bi !== null && zl(bi, e);
      var i = function(p) {
        return zl(p, e);
      };
      xn.forEach(i), Lr.forEach(i);
      for (var u = 0; u < Mr.length; u++) {
        var s = Mr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Mr.length > 0; ) {
        var f = Mr[0];
        if (f.blockedOn !== null)
          break;
        jd(f), f.blockedOn === null && Mr.shift();
      }
    }
    var ur = A.ReactCurrentBatchConfig, St = !0;
    function Qn(e) {
      St = !!e;
    }
    function Fn() {
      return St;
    }
    function or(e, t, a) {
      var i = nf(t), u;
      switch (i) {
        case Or:
          u = ha;
          break;
        case xi:
          u = So;
          break;
        case Ma:
        default:
          u = _n;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function ha(e, t, a, i) {
      var u = za(), s = ur.transition;
      ur.transition = null;
      try {
        An(Or), _n(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function So(e, t, a, i) {
      var u = za(), s = ur.transition;
      ur.transition = null;
      try {
        An(xi), _n(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function _n(e, t, a, i) {
      St && Ms(e, t, a, i);
    }
    function Ms(e, t, a, i) {
      var u = Eo(e, t, a, i);
      if (u === null) {
        Dy(e, t, i, Di, a), Fd(e, i);
        return;
      }
      if (cy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Fd(e, i), t & _a && Kv(e)) {
        for (; u !== null; ) {
          var s = bo(u);
          s !== null && sy(s);
          var f = Eo(e, t, a, i);
          if (f === null && Dy(e, t, i, Di, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      Dy(e, t, i, null, a);
    }
    var Di = null;
    function Eo(e, t, a, i) {
      Di = null;
      var u = fd(i), s = Bs(u);
      if (s !== null) {
        var f = fa(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === _e) {
            var v = Ri(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === ee) {
            var y = f.stateNode;
            if (Zc(y))
              return Ti(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Di = s, null;
    }
    function nf(e) {
      switch (e) {
        // Used by SimpleEventPlugin:
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        // Used by polyfills:
        // eslint-disable-next-line no-fallthrough
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        // Only enableCreateEventHandleAPI:
        // eslint-disable-next-line no-fallthrough
        case "beforeblur":
        case "afterblur":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Or;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        // Not used by React but could be by user code:
        // eslint-disable-next-line no-fallthrough
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return xi;
        case "message": {
          var t = _c();
          switch (t) {
            case us:
              return Or;
            case kl:
              return xi;
            case Wi:
            case oy:
              return Ma;
            case vu:
              return Na;
            default:
              return Ma;
          }
        }
        default:
          return Ma;
      }
    }
    function Ns(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ea(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Pd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Co(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ma = null, Ro = null, Du = null;
    function Ul(e) {
      return ma = e, Ro = zs(), !0;
    }
    function rf() {
      ma = null, Ro = null, Du = null;
    }
    function Ki() {
      if (Du)
        return Du;
      var e, t = Ro, a = t.length, i, u = zs(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Du = u.slice(e, p), Du;
    }
    function zs() {
      return "value" in ma ? ma.value : ma.textContent;
    }
    function Al(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function To() {
      return !0;
    }
    function Us() {
      return !1;
    }
    function Tr(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = To : this.isDefaultPrevented = Us, this.isPropagationStopped = Us, this;
      }
      return Ke(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = To);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = To);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: To
      }), t;
    }
    var jn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, ki = Tr(jn), Nr = Ke({}, jn, {
      view: 0,
      detail: 0
    }), ta = Tr(Nr), af, As, ku;
    function dy(e) {
      e !== ku && (ku && e.type === "mousemove" ? (af = e.screenX - ku.screenX, As = e.screenY - ku.screenY) : (af = 0, As = 0), ku = e);
    }
    var ai = Ke({}, Nr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: dn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (dy(e), af);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : As;
      }
    }), Vd = Tr(ai), Bd = Ke({}, ai, {
      dataTransfer: 0
    }), Ou = Tr(Bd), $d = Ke({}, Nr, {
      relatedTarget: 0
    }), Ji = Tr($d), Zv = Ke({}, jn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), eh = Tr(Zv), Yd = Ke({}, jn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), lf = Tr(Yd), py = Ke({}, jn, {
      data: 0
    }), th = Tr(py), nh = th, rh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Lu = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function vy(e) {
      if (e.key) {
        var t = rh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Al(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Lu[e.keyCode] || "Unidentified" : "";
    }
    var wo = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ah(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = wo[e];
      return i ? !!a[i] : !1;
    }
    function dn(e) {
      return ah;
    }
    var hy = Ke({}, Nr, {
      key: vy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Al(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Al(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ih = Tr(hy), my = Ke({}, ai, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), lh = Tr(my), uh = Ke({}, Nr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dn
    }), oh = Tr(uh), yy = Ke({}, jn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Ua = Tr(yy), Id = Ke({}, ai, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), gy = Tr(Id), Fl = [9, 13, 27, 32], Fs = 229, Zi = kn && "CompositionEvent" in window, jl = null;
    kn && "documentMode" in document && (jl = document.documentMode);
    var Qd = kn && "TextEvent" in window && !jl, uf = kn && (!Zi || jl && jl > 8 && jl <= 11), sh = 32, of = String.fromCharCode(sh);
    function Sy() {
      at("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), at("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), at("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), at("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Wd = !1;
    function ch(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function sf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function cf(e, t) {
      return e === "keydown" && t.keyCode === Fs;
    }
    function Gd(e, t) {
      switch (e) {
        case "keyup":
          return Fl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Fs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function ff(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function fh(e) {
      return e.locale === "ko";
    }
    var Mu = !1;
    function qd(e, t, a, i, u) {
      var s, f;
      if (Zi ? s = sf(t) : Mu ? Gd(t, i) && (s = "onCompositionEnd") : cf(t, i) && (s = "onCompositionStart"), !s)
        return null;
      uf && !fh(i) && (!Mu && s === "onCompositionStart" ? Mu = Ul(u) : s === "onCompositionEnd" && Mu && (f = Ki()));
      var p = gh(a, s);
      if (p.length > 0) {
        var v = new th(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = ff(i);
          y !== null && (v.data = y);
        }
      }
    }
    function df(e, t) {
      switch (e) {
        case "compositionend":
          return ff(t);
        case "keypress":
          var a = t.which;
          return a !== sh ? null : (Wd = !0, of);
        case "textInput":
          var i = t.data;
          return i === of && Wd ? null : i;
        default:
          return null;
      }
    }
    function Xd(e, t) {
      if (Mu) {
        if (e === "compositionend" || !Zi && Gd(e, t)) {
          var a = Ki();
          return rf(), Mu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!ch(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return uf && !fh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function pf(e, t, a, i, u) {
      var s;
      if (Qd ? s = df(t, i) : s = Xd(t, i), !s)
        return null;
      var f = gh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new nh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function dh(e, t, a, i, u, s, f) {
      qd(e, t, a, i, u), pf(e, t, a, i, u);
    }
    var Ey = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function js(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Ey[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function Cy(e) {
      if (!kn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Hs() {
      at("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function ph(e, t, a, i) {
      lo(i);
      var u = gh(t, "onChange");
      if (u.length > 0) {
        var s = new ki("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var Hl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      ph(t, n, e, fd(e)), xv(o, t);
    }
    function o(e) {
      _E(e, 0);
    }
    function c(e) {
      var t = Sf(e);
      if (mi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var m = !1;
    kn && (m = Cy("input") && (!document.documentMode || document.documentMode > 9));
    function E(e, t) {
      Hl = e, n = t, Hl.attachEvent("onpropertychange", z);
    }
    function T() {
      Hl && (Hl.detachEvent("onpropertychange", z), Hl = null, n = null);
    }
    function z(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function I(e, t, a) {
      e === "focusin" ? (T(), E(t, a)) : e === "focusout" && T();
    }
    function W(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function Y(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function se(e, t) {
      if (e === "click")
        return c(t);
    }
    function me(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Se(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Oe(e, "number", e.value);
    }
    function bn(e, t, a, i, u, s, f) {
      var p = a ? Sf(a) : window, v, y;
      if (r(p) ? v = d : js(p) ? m ? v = me : (v = W, y = I) : Y(p) && (v = se), v) {
        var g = v(t, a);
        if (g) {
          ph(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && Se(p);
    }
    function D() {
      Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function x(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !ts(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && (Bs(y) || cp(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var _ = u.ownerDocument;
          _ ? g = _.defaultView || _.parentWindow : g = window;
        }
        var w, M;
        if (v) {
          var U = i.relatedTarget || i.toElement;
          if (w = a, M = U ? Bs(U) : null, M !== null) {
            var j = fa(M);
            (M !== j || M.tag !== ue && M.tag !== Ye) && (M = null);
          }
        } else
          w = null, M = a;
        if (w !== M) {
          var le = Vd, Le = "onMouseLeave", we = "onMouseEnter", Ct = "mouse";
          (t === "pointerout" || t === "pointerover") && (le = lh, Le = "onPointerLeave", we = "onPointerEnter", Ct = "pointer");
          var vt = w == null ? g : Sf(w), k = M == null ? g : Sf(M), H = new le(Le, Ct + "leave", w, i, u);
          H.target = vt, H.relatedTarget = k;
          var O = null, G = Bs(u);
          if (G === a) {
            var fe = new le(we, Ct + "enter", M, i, u);
            fe.target = k, fe.relatedTarget = vt, O = fe;
          }
          DT(e, H, O, w, M);
        }
      }
    }
    function L(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Q = typeof Object.is == "function" ? Object.is : L;
    function ye(e, t) {
      if (Q(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!wr.call(t, s) || !Q(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Me(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function ze(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Pe(e, t) {
      for (var a = Me(e), i = 0, u = 0; a; ) {
        if (a.nodeType === Bi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Me(ze(a));
      }
    }
    function Zn(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Mt(e, u, s, f, p);
    }
    function Mt(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, _ = null;
      e: for (; ; ) {
        for (var w = null; g === t && (a === 0 || g.nodeType === Bi) && (f = s + a), g === i && (u === 0 || g.nodeType === Bi) && (p = s + u), g.nodeType === Bi && (s += g.nodeValue.length), (w = g.firstChild) !== null; )
          _ = g, g = w;
        for (; ; ) {
          if (g === e)
            break e;
          if (_ === t && ++v === a && (f = s), _ === i && ++y === u && (p = s), (w = g.nextSibling) !== null)
            break;
          g = _, _ = g.parentNode;
        }
        g = w;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Pl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = Pe(e, f), g = Pe(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var _ = a.createRange();
          _.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(_), u.extend(g.node, g.offset)) : (_.setEnd(g.node, g.offset), u.addRange(_));
        }
      }
    }
    function vh(e) {
      return e && e.nodeType === Bi;
    }
    function hE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : vh(e) ? !1 : vh(t) ? hE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function cT(e) {
      return e && e.ownerDocument && hE(e.ownerDocument.documentElement, e);
    }
    function fT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function mE() {
      for (var e = window, t = xa(); t instanceof e.HTMLIFrameElement; ) {
        if (fT(t))
          e = t.contentWindow;
        else
          return t;
        t = xa(e.document);
      }
      return t;
    }
    function Ry(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function dT() {
      var e = mE();
      return {
        focusedElem: e,
        selectionRange: Ry(e) ? vT(e) : null
      };
    }
    function pT(e) {
      var t = mE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && cT(a)) {
        i !== null && Ry(a) && hT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Ir && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function vT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Zn(e), t || {
        start: 0,
        end: 0
      };
    }
    function hT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Pl(e, t);
    }
    var mT = kn && "documentMode" in document && document.documentMode <= 11;
    function yT() {
      at("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var vf = null, Ty = null, Kd = null, wy = !1;
    function gT(e) {
      if ("selectionStart" in e && Ry(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function ST(e) {
      return e.window === e ? e.document : e.nodeType === $i ? e : e.ownerDocument;
    }
    function yE(e, t, a) {
      var i = ST(a);
      if (!(wy || vf == null || vf !== xa(i))) {
        var u = gT(vf);
        if (!Kd || !ye(Kd, u)) {
          Kd = u;
          var s = gh(Ty, "onSelect");
          if (s.length > 0) {
            var f = new ki("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = vf;
          }
        }
      }
    }
    function ET(e, t, a, i, u, s, f) {
      var p = a ? Sf(a) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (js(p) || p.contentEditable === "true") && (vf = p, Ty = a, Kd = null);
          break;
        case "focusout":
          vf = null, Ty = null, Kd = null;
          break;
        // Don't fire the event while the user is dragging. This matches the
        // semantics of the native select event.
        case "mousedown":
          wy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          wy = !1, yE(e, i, u);
          break;
        // Chrome and IE fire non-standard event when selection is changed (and
        // sometimes when it hasn't). IE's event fires out of order with respect
        // to key and input events on deletion, so we discard it.
        //
        // Firefox doesn't support selectionchange, so check selection status
        // after each key entry. The selection changes after keydown and before
        // keyup, but we check on keydown as well in the case of holding down a
        // key, when multiple keydown events are fired but only one keyup is.
        // This is also our approach for IE handling, for the reason above.
        case "selectionchange":
          if (mT)
            break;
        // falls through
        case "keydown":
        case "keyup":
          yE(e, i, u);
      }
    }
    function hh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var hf = {
      animationend: hh("Animation", "AnimationEnd"),
      animationiteration: hh("Animation", "AnimationIteration"),
      animationstart: hh("Animation", "AnimationStart"),
      transitionend: hh("Transition", "TransitionEnd")
    }, xy = {}, gE = {};
    kn && (gE = document.createElement("div").style, "AnimationEvent" in window || (delete hf.animationend.animation, delete hf.animationiteration.animation, delete hf.animationstart.animation), "TransitionEvent" in window || delete hf.transitionend.transition);
    function mh(e) {
      if (xy[e])
        return xy[e];
      if (!hf[e])
        return e;
      var t = hf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in gE)
          return xy[e] = t[a];
      return e;
    }
    var SE = mh("animationend"), EE = mh("animationiteration"), CE = mh("animationstart"), RE = mh("transitionend"), TE = /* @__PURE__ */ new Map(), wE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function xo(e, t) {
      TE.set(e, t), at(t, [e]);
    }
    function CT() {
      for (var e = 0; e < wE.length; e++) {
        var t = wE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        xo(a, "on" + i);
      }
      xo(SE, "onAnimationEnd"), xo(EE, "onAnimationIteration"), xo(CE, "onAnimationStart"), xo("dblclick", "onDoubleClick"), xo("focusin", "onFocus"), xo("focusout", "onBlur"), xo(RE, "onTransitionEnd");
    }
    function RT(e, t, a, i, u, s, f) {
      var p = TE.get(t);
      if (p !== void 0) {
        var v = ki, y = t;
        switch (t) {
          case "keypress":
            if (Al(i) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            v = ih;
            break;
          case "focusin":
            y = "focus", v = Ji;
            break;
          case "focusout":
            y = "blur", v = Ji;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ji;
            break;
          case "click":
            if (i.button === 2)
              return;
          /* falls through */
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          // TODO: Disabled elements should not respond to mouse events
          /* falls through */
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Vd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Ou;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = oh;
            break;
          case SE:
          case EE:
          case CE:
            v = eh;
            break;
          case RE:
            v = Ua;
            break;
          case "scroll":
            v = ta;
            break;
          case "wheel":
            v = gy;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = lf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = lh;
            break;
        }
        var g = (s & _a) !== 0;
        {
          var _ = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", w = _T(a, p, i.type, g, _);
          if (w.length > 0) {
            var M = new v(p, y, null, i, u);
            e.push({
              event: M,
              listeners: w
            });
          }
        }
      }
    }
    CT(), D(), Hs(), yT(), Sy();
    function TT(e, t, a, i, u, s, f) {
      RT(e, t, a, i, u, s);
      var p = (s & cd) === 0;
      p && (x(e, t, a, i, u), bn(e, t, a, i, u), ET(e, t, a, i, u), dh(e, t, a, i, u));
    }
    var Jd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], _y = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Jd));
    function xE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Si(i, t, void 0, e), e.currentTarget = null;
    }
    function wT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          xE(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], _ = g.instance, w = g.currentTarget, M = g.listener;
          if (_ !== i && e.isPropagationStopped())
            return;
          xE(e, M, w), i = _;
        }
    }
    function _E(e, t) {
      for (var a = (t & _a) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        wT(s, f, a);
      }
      as();
    }
    function xT(e, t, a, i, u) {
      var s = fd(a), f = [];
      TT(f, e, i, a, s, t), _E(f, t);
    }
    function gn(e, t) {
      _y.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = tw(t), u = kT(e);
      i.has(u) || (bE(t, e, pc, a), i.add(u));
    }
    function by(e, t, a) {
      _y.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= _a), bE(a, e, i, t);
    }
    var yh = "_reactListening" + Math.random().toString(36).slice(2);
    function Zd(e) {
      if (!e[yh]) {
        e[yh] = !0, Ze.forEach(function(a) {
          a !== "selectionchange" && (_y.has(a) || by(a, !1, e), by(a, !0, e));
        });
        var t = e.nodeType === $i ? e : e.ownerDocument;
        t !== null && (t[yh] || (t[yh] = !0, by("selectionchange", !1, t)));
      }
    }
    function bE(e, t, a, i, u) {
      var s = or(e, t, a), f = void 0;
      rs && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Pd(e, t, s, f) : ea(e, t, s) : f !== void 0 ? Co(e, t, s, f) : Ns(e, t, s);
    }
    function DE(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function Dy(e, t, a, i, u) {
      var s = i;
      if ((t & sd) === 0 && (t & pc) === 0) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === ee || v === Ce) {
              var y = p.stateNode.containerInfo;
              if (DE(y, f))
                break;
              if (v === Ce)
                for (var g = p.return; g !== null; ) {
                  var _ = g.tag;
                  if (_ === ee || _ === Ce) {
                    var w = g.stateNode.containerInfo;
                    if (DE(w, f))
                      return;
                  }
                  g = g.return;
                }
              for (; y !== null; ) {
                var M = Bs(y);
                if (M === null)
                  return;
                var U = M.tag;
                if (U === ue || U === Ye) {
                  p = s = M;
                  continue e;
                }
                y = y.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      xv(function() {
        return xT(e, t, a, s);
      });
    }
    function ep(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function _T(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var _ = y, w = _.stateNode, M = _.tag;
        if (M === ue && w !== null && (g = w, p !== null)) {
          var U = Tl(y, p);
          U != null && v.push(ep(y, U, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function gh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ue && f !== null) {
          var v = f, y = Tl(u, a);
          y != null && i.unshift(ep(u, y, v));
          var g = Tl(u, t);
          g != null && i.push(ep(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function mf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ue);
      return e || null;
    }
    function bT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = mf(s))
        u++;
      for (var f = 0, p = i; p; p = mf(p))
        f++;
      for (; u - f > 0; )
        a = mf(a), u--;
      for (; f - u > 0; )
        i = mf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = mf(a), i = mf(i);
      }
      return null;
    }
    function kE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, _ = v.tag;
        if (y !== null && y === i)
          break;
        if (_ === ue && g !== null) {
          var w = g;
          if (u) {
            var M = Tl(p, s);
            M != null && f.unshift(ep(p, M, w));
          } else if (!u) {
            var U = Tl(p, s);
            U != null && f.push(ep(p, U, w));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function DT(e, t, a, i, u) {
      var s = i && u ? bT(i, u) : null;
      i !== null && kE(e, t, i, s, !1), u !== null && a !== null && kE(e, a, u, s, !0);
    }
    function kT(e, t) {
      return e + "__bubble";
    }
    var Aa = !1, tp = "dangerouslySetInnerHTML", Sh = "suppressContentEditableWarning", _o = "suppressHydrationWarning", OE = "autoFocus", Ps = "children", Vs = "style", Eh = "__html", ky, Ch, np, LE, Rh, ME, NE;
    ky = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Ch = function(e, t) {
      ld(e, t), fc(e, t), Rv(e, t, {
        registrationNameDependencies: Xe,
        possibleRegistrationNames: et
      });
    }, ME = kn && !document.documentMode, np = function(e, t, a) {
      if (!Aa) {
        var i = Th(a), u = Th(t);
        u !== i && (Aa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, LE = function(e) {
      if (!Aa) {
        Aa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Rh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, NE = function(e, t) {
      var a = e.namespaceURI === Vi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var OT = /\r\n?/g, LT = /\u0000|\uFFFD/g;
    function Th(e) {
      Gn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(OT, `
`).replace(LT, "");
    }
    function wh(e, t, a, i) {
      var u = Th(t), s = Th(e);
      if (s !== u && (i && (Aa || (Aa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Ee))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function zE(e) {
      return e.nodeType === $i ? e : e.ownerDocument;
    }
    function MT() {
    }
    function xh(e) {
      e.onclick = MT;
    }
    function NT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Vs)
            f && Object.freeze(f), mv(t, f);
          else if (s === tp) {
            var p = f ? f[Eh] : void 0;
            p != null && av(t, p);
          } else if (s === Ps)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && no(t, f);
            } else typeof f == "number" && no(t, "" + f);
          else s === Sh || s === _o || s === OE || (Xe.hasOwnProperty(s) ? f != null && (typeof f != "function" && Rh(s, f), s === "onScroll" && gn("scroll", t)) : f != null && xr(t, s, f, u));
        }
    }
    function zT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Vs ? mv(e, f) : s === tp ? av(e, f) : s === Ps ? no(e, f) : xr(e, s, f, i);
      }
    }
    function UT(e, t, a, i) {
      var u, s = zE(a), f, p = i;
      if (p === Vi && (p = Zf(e)), p === Vi) {
        if (u = Cl(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Vi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !wr.call(ky, e) && (ky[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function AT(e, t) {
      return zE(t).createTextNode(e);
    }
    function FT(e, t, a, i) {
      var u = Cl(t, a);
      Ch(t, a);
      var s;
      switch (t) {
        case "dialog":
          gn("cancel", e), gn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Jd.length; f++)
            gn(Jd[f], e);
          s = a;
          break;
        case "source":
          gn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e), s = a;
          break;
        case "details":
          gn("toggle", e), s = a;
          break;
        case "input":
          Ja(e, a), s = to(e, a), gn("invalid", e);
          break;
        case "option":
          Tt(e, a), s = a;
          break;
        case "select":
          lu(e, a), s = Go(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), s = qf(e, a), gn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (sc(t, s), NT(t, e, i, s, u), t) {
        case "input":
          Ka(e), N(e, a, !1);
          break;
        case "textarea":
          Ka(e), nv(e);
          break;
        case "option":
          tn(e, a);
          break;
        case "select":
          Wf(e, a);
          break;
        default:
          typeof s.onClick == "function" && xh(e);
          break;
      }
    }
    function jT(e, t, a, i, u) {
      Ch(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = to(e, a), p = to(e, i), s = [];
          break;
        case "select":
          f = Go(e, a), p = Go(e, i), s = [];
          break;
        case "textarea":
          f = qf(e, a), p = qf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && xh(e);
          break;
      }
      sc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Vs) {
            var _ = f[v];
            for (y in _)
              _.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else v === tp || v === Ps || v === Sh || v === _o || v === OE || (Xe.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var w = p[v], M = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || w === M || w == null && M == null))
          if (v === Vs)
            if (w && Object.freeze(w), M) {
              for (y in M)
                M.hasOwnProperty(y) && (!w || !w.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in w)
                w.hasOwnProperty(y) && M[y] !== w[y] && (g || (g = {}), g[y] = w[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = w;
          else if (v === tp) {
            var U = w ? w[Eh] : void 0, j = M ? M[Eh] : void 0;
            U != null && j !== U && (s = s || []).push(v, U);
          } else v === Ps ? (typeof w == "string" || typeof w == "number") && (s = s || []).push(v, "" + w) : v === Sh || v === _o || (Xe.hasOwnProperty(v) ? (w != null && (typeof w != "function" && Rh(v, w), v === "onScroll" && gn("scroll", e)), !s && M !== w && (s = [])) : (s = s || []).push(v, w));
      }
      return g && (ny(g, p[Vs]), (s = s || []).push(Vs, g)), s;
    }
    function HT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = Cl(a, i), f = Cl(a, u);
      switch (zT(e, t, s, f), a) {
        case "input":
          C(e, u);
          break;
        case "textarea":
          tv(e, u);
          break;
        case "select":
          lc(e, u);
          break;
      }
    }
    function PT(e) {
      {
        var t = e.toLowerCase();
        return Zo.hasOwnProperty(t) && Zo[t] || null;
      }
    }
    function VT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Cl(t, a), Ch(t, a), t) {
        case "dialog":
          gn("cancel", e), gn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Jd.length; y++)
            gn(Jd[y], e);
          break;
        case "source":
          gn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e);
          break;
        case "details":
          gn("toggle", e);
          break;
        case "input":
          Ja(e, a), gn("invalid", e);
          break;
        case "option":
          Tt(e, a);
          break;
        case "select":
          lu(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), gn("invalid", e);
          break;
      }
      sc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, _ = 0; _ < g.length; _++) {
          var w = g[_].name.toLowerCase();
          switch (w) {
            // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[_].name);
          }
        }
      }
      var M = null;
      for (var U in a)
        if (a.hasOwnProperty(U)) {
          var j = a[U];
          if (U === Ps)
            typeof j == "string" ? e.textContent !== j && (a[_o] !== !0 && wh(e.textContent, j, s, f), M = [Ps, j]) : typeof j == "number" && e.textContent !== "" + j && (a[_o] !== !0 && wh(e.textContent, j, s, f), M = [Ps, "" + j]);
          else if (Xe.hasOwnProperty(U))
            j != null && (typeof j != "function" && Rh(U, j), U === "onScroll" && gn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var le = void 0, Le = Zt(U);
            if (a[_o] !== !0) {
              if (!(U === Sh || U === _o || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              U === "value" || U === "checked" || U === "selected")) {
                if (U === tp) {
                  var we = e.innerHTML, Ct = j ? j[Eh] : void 0;
                  if (Ct != null) {
                    var vt = NE(e, Ct);
                    vt !== we && np(U, we, vt);
                  }
                } else if (U === Vs) {
                  if (v.delete(U), ME) {
                    var k = ey(j);
                    le = e.getAttribute("style"), k !== le && np(U, le, k);
                  }
                } else if (p && !b)
                  v.delete(U.toLowerCase()), le = Zl(e, U, j), j !== le && np(U, le, j);
                else if (!pn(U, Le, p) && !qn(U, j, Le, p)) {
                  var H = !1;
                  if (Le !== null)
                    v.delete(Le.attributeName), le = dl(e, U, j, Le);
                  else {
                    var O = i;
                    if (O === Vi && (O = Zf(t)), O === Vi)
                      v.delete(U.toLowerCase());
                    else {
                      var G = PT(U);
                      G !== null && G !== U && (H = !0, v.delete(G)), v.delete(U);
                    }
                    le = Zl(e, U, j);
                  }
                  var fe = b;
                  !fe && j !== le && !H && np(U, le, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[_o] !== !0 && LE(v), t) {
        case "input":
          Ka(e), N(e, a, !0);
          break;
        case "textarea":
          Ka(e), nv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && xh(e);
          break;
      }
      return M;
    }
    function BT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Oy(e, t) {
      {
        if (Aa)
          return;
        Aa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Ly(e, t) {
      {
        if (Aa)
          return;
        Aa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function My(e, t, a) {
      {
        if (Aa)
          return;
        Aa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Ny(e, t) {
      {
        if (t === "" || Aa)
          return;
        Aa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function $T(e, t, a) {
      switch (t) {
        case "input":
          F(e, a);
          return;
        case "textarea":
          Xm(e, a);
          return;
        case "select":
          Gf(e, a);
          return;
      }
    }
    var rp = function() {
    }, ap = function() {
    };
    {
      var YT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], UE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], IT = UE.concat(["button"]), QT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], AE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      ap = function(e, t) {
        var a = Ke({}, e || AE), i = {
          tag: t
        };
        return UE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), IT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), YT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var WT = function(e, t) {
        switch (t) {
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
          // but
          case "option":
            return e === "#text";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
          // No special behavior since these rules fall back to "in body" mode for
          // all except special table nodes which cause bad parsing behavior anyway.
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
          case "colgroup":
            return e === "col" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return QT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, GT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, FE = {};
      rp = function(e, t, a) {
        a = a || AE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = WT(e, u) ? null : i, f = s ? null : GT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!FE[y]) {
            FE[y] = !0;
            var g = e, _ = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", _ = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var w = "";
              v === "table" && e === "tr" && (w += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, _, w);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var _h = "suppressHydrationWarning", bh = "$", Dh = "/$", ip = "$?", lp = "$!", qT = "style", zy = null, Uy = null;
    function XT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case $i:
        case td: {
          t = i === $i ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : ed(null, "");
          break;
        }
        default: {
          var s = i === Ln ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = ed(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = ap(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function KT(e, t, a) {
      {
        var i = e, u = ed(i.namespace, t), s = ap(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function oD(e) {
      return e;
    }
    function JT(e) {
      zy = Fn(), Uy = dT();
      var t = null;
      return Qn(!1), t;
    }
    function ZT(e) {
      pT(Uy), Qn(zy), zy = null, Uy = null;
    }
    function e1(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (rp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = ap(f.ancestorInfo, e);
          rp(null, p, v);
        }
        s = f.namespace;
      }
      var y = UT(e, t, a, s);
      return sp(u, y), $y(y, t), y;
    }
    function t1(e, t) {
      e.appendChild(t);
    }
    function n1(e, t, a, i, u) {
      switch (FT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function r1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = ap(f.ancestorInfo, t);
          rp(null, p, v);
        }
      }
      return jT(e, t, a, i);
    }
    function Ay(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function a1(e, t, a, i) {
      {
        var u = a;
        rp(null, e, u.ancestorInfo);
      }
      var s = AT(e, t);
      return sp(i, s), s;
    }
    function i1() {
      var e = window.event;
      return e === void 0 ? Ma : nf(e.type);
    }
    var Fy = typeof setTimeout == "function" ? setTimeout : void 0, l1 = typeof clearTimeout == "function" ? clearTimeout : void 0, jy = -1, jE = typeof Promise == "function" ? Promise : void 0, u1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof jE < "u" ? function(e) {
      return jE.resolve(null).then(e).catch(o1);
    } : Fy;
    function o1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function s1(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function c1(e, t, a, i, u, s) {
      HT(e, t, a, i, u), $y(e, u);
    }
    function HE(e) {
      no(e, "");
    }
    function f1(e, t, a) {
      e.nodeValue = a;
    }
    function d1(e, t) {
      e.appendChild(t);
    }
    function p1(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && xh(a);
    }
    function v1(e, t, a) {
      e.insertBefore(t, a);
    }
    function h1(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function m1(e, t) {
      e.removeChild(t);
    }
    function y1(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Hy(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Ln) {
          var s = u.data;
          if (s === Dh)
            if (i === 0) {
              e.removeChild(u), bu(t);
              return;
            } else
              i--;
          else (s === bh || s === ip || s === lp) && i++;
        }
        a = u;
      } while (a);
      bu(t);
    }
    function g1(e, t) {
      e.nodeType === Ln ? Hy(e.parentNode, t) : e.nodeType === Ir && Hy(e, t), bu(e);
    }
    function S1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function E1(e) {
      e.nodeValue = "";
    }
    function C1(e, t) {
      e = e;
      var a = t[qT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = oc("display", i);
    }
    function R1(e, t) {
      e.nodeValue = t;
    }
    function T1(e) {
      e.nodeType === Ir ? e.textContent = "" : e.nodeType === $i && e.documentElement && e.removeChild(e.documentElement);
    }
    function w1(e, t, a) {
      return e.nodeType !== Ir || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function x1(e, t) {
      return t === "" || e.nodeType !== Bi ? null : e;
    }
    function _1(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function PE(e) {
      return e.data === ip;
    }
    function Py(e) {
      return e.data === lp;
    }
    function b1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function D1(e, t) {
      e._reactRetry = t;
    }
    function kh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Ir || t === Bi)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === bh || a === lp || a === ip)
            break;
          if (a === Dh)
            return null;
        }
      }
      return e;
    }
    function up(e) {
      return kh(e.nextSibling);
    }
    function k1(e) {
      return kh(e.firstChild);
    }
    function O1(e) {
      return kh(e.firstChild);
    }
    function L1(e) {
      return kh(e.nextSibling);
    }
    function M1(e, t, a, i, u, s, f) {
      sp(s, e), $y(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & lt) !== De;
      return VT(e, t, a, p, i, y, f);
    }
    function N1(e, t, a, i) {
      return sp(a, e), a.mode & lt, BT(e, t);
    }
    function z1(e, t) {
      sp(t, e);
    }
    function U1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === Dh) {
            if (a === 0)
              return up(t);
            a--;
          } else (i === bh || i === lp || i === ip) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function VE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === bh || i === lp || i === ip) {
            if (a === 0)
              return t;
            a--;
          } else i === Dh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function A1(e) {
      bu(e);
    }
    function F1(e) {
      bu(e);
    }
    function j1(e) {
      return e !== "head" && e !== "body";
    }
    function H1(e, t, a, i) {
      var u = !0;
      wh(t.nodeValue, a, i, u);
    }
    function P1(e, t, a, i, u, s) {
      if (t[_h] !== !0) {
        var f = !0;
        wh(i.nodeValue, u, s, f);
      }
    }
    function V1(e, t) {
      t.nodeType === Ir ? Oy(e, t) : t.nodeType === Ln || Ly(e, t);
    }
    function B1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Ir ? Oy(a, t) : t.nodeType === Ln || Ly(a, t));
      }
    }
    function $1(e, t, a, i, u) {
      (u || t[_h] !== !0) && (i.nodeType === Ir ? Oy(a, i) : i.nodeType === Ln || Ly(a, i));
    }
    function Y1(e, t, a) {
      My(e, t);
    }
    function I1(e, t) {
      Ny(e, t);
    }
    function Q1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && My(i, t);
      }
    }
    function W1(e, t) {
      {
        var a = e.parentNode;
        a !== null && Ny(a, t);
      }
    }
    function G1(e, t, a, i, u, s) {
      (s || t[_h] !== !0) && My(a, i);
    }
    function q1(e, t, a, i, u) {
      (u || t[_h] !== !0) && Ny(a, i);
    }
    function X1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function K1(e) {
      Zd(e);
    }
    var yf = Math.random().toString(36).slice(2), gf = "__reactFiber$" + yf, Vy = "__reactProps$" + yf, op = "__reactContainer$" + yf, By = "__reactEvents$" + yf, J1 = "__reactListeners$" + yf, Z1 = "__reactHandles$" + yf;
    function ew(e) {
      delete e[gf], delete e[Vy], delete e[By], delete e[J1], delete e[Z1];
    }
    function sp(e, t) {
      t[gf] = e;
    }
    function Oh(e, t) {
      t[op] = e;
    }
    function BE(e) {
      e[op] = null;
    }
    function cp(e) {
      return !!e[op];
    }
    function Bs(e) {
      var t = e[gf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[op] || a[gf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = VE(e); u !== null; ) {
              var s = u[gf];
              if (s)
                return s;
              u = VE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function bo(e) {
      var t = e[gf] || e[op];
      return t && (t.tag === ue || t.tag === Ye || t.tag === _e || t.tag === ee) ? t : null;
    }
    function Sf(e) {
      if (e.tag === ue || e.tag === Ye)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Lh(e) {
      return e[Vy] || null;
    }
    function $y(e, t) {
      e[Vy] = t;
    }
    function tw(e) {
      var t = e[By];
      return t === void 0 && (t = e[By] = /* @__PURE__ */ new Set()), t;
    }
    var $E = {}, YE = A.ReactDebugCurrentFrame;
    function Mh(e) {
      if (e) {
        var t = e._owner, a = ji(e.type, e._source, t ? t.type : null);
        YE.setExtraStackFrame(a);
      } else
        YE.setExtraStackFrame(null);
    }
    function el(e, t, a, i, u) {
      {
        var s = Function.call.bind(wr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (Mh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Mh(null)), p instanceof Error && !(p.message in $E) && ($E[p.message] = !0, Mh(u), S("Failed %s type: %s", a, p.message), Mh(null));
          }
      }
    }
    var Yy = [], Nh;
    Nh = [];
    var Nu = -1;
    function Do(e) {
      return {
        current: e
      };
    }
    function na(e, t) {
      if (Nu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Nh[Nu] && S("Unexpected Fiber popped."), e.current = Yy[Nu], Yy[Nu] = null, Nh[Nu] = null, Nu--;
    }
    function ra(e, t, a) {
      Nu++, Yy[Nu] = e.current, Nh[Nu] = a, e.current = t;
    }
    var Iy;
    Iy = {};
    var ii = {};
    Object.freeze(ii);
    var zu = Do(ii), Vl = Do(!1), Qy = ii;
    function Ef(e, t, a) {
      return a && Bl(t) ? Qy : zu.current;
    }
    function IE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Cf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return ii;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Ve(e) || "Unknown";
          el(i, s, "context", p);
        }
        return u && IE(e, t, s), s;
      }
    }
    function zh() {
      return Vl.current;
    }
    function Bl(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Uh(e) {
      na(Vl, e), na(zu, e);
    }
    function Wy(e) {
      na(Vl, e), na(zu, e);
    }
    function QE(e, t, a) {
      {
        if (zu.current !== ii)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ra(zu, t, e), ra(Vl, a, e);
      }
    }
    function WE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Ve(e) || "Unknown";
            Iy[s] || (Iy[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Ve(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Ve(e) || "Unknown";
          el(u, f, "child context", v);
        }
        return Ke({}, a, f);
      }
    }
    function Ah(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || ii;
        return Qy = zu.current, ra(zu, a, e), ra(Vl, Vl.current, e), !0;
      }
    }
    function GE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = WE(e, t, Qy);
          i.__reactInternalMemoizedMergedChildContext = u, na(Vl, e), na(zu, e), ra(zu, u, e), ra(Vl, a, e);
        } else
          na(Vl, e), ra(Vl, a, e);
      }
    }
    function nw(e) {
      {
        if (!pu(e) || e.tag !== ve)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case ee:
              return t.stateNode.context;
            case ve: {
              var a = t.type;
              if (Bl(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var ko = 0, Fh = 1, Uu = null, Gy = !1, qy = !1;
    function qE(e) {
      Uu === null ? Uu = [e] : Uu.push(e);
    }
    function rw(e) {
      Gy = !0, qE(e);
    }
    function XE() {
      Gy && Oo();
    }
    function Oo() {
      if (!qy && Uu !== null) {
        qy = !0;
        var e = 0, t = za();
        try {
          var a = !0, i = Uu;
          for (An(Or); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Uu = null, Gy = !1;
        } catch (s) {
          throw Uu !== null && (Uu = Uu.slice(e + 1)), pd(us, Oo), s;
        } finally {
          An(t), qy = !1;
        }
      }
      return null;
    }
    var Rf = [], Tf = 0, jh = null, Hh = 0, Oi = [], Li = 0, $s = null, Au = 1, Fu = "";
    function aw(e) {
      return Is(), (e.flags & Ei) !== be;
    }
    function iw(e) {
      return Is(), Hh;
    }
    function lw() {
      var e = Fu, t = Au, a = t & ~uw(t);
      return a.toString(32) + e;
    }
    function Ys(e, t) {
      Is(), Rf[Tf++] = Hh, Rf[Tf++] = jh, jh = e, Hh = t;
    }
    function KE(e, t, a) {
      Is(), Oi[Li++] = Au, Oi[Li++] = Fu, Oi[Li++] = $s, $s = e;
      var i = Au, u = Fu, s = Ph(i) - 1, f = i & ~(1 << s), p = a + 1, v = Ph(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, _ = (f & g).toString(32), w = f >> y, M = s - y, U = Ph(t) + M, j = p << M, le = j | w, Le = _ + u;
        Au = 1 << U | le, Fu = Le;
      } else {
        var we = p << s, Ct = we | f, vt = u;
        Au = 1 << v | Ct, Fu = vt;
      }
    }
    function Xy(e) {
      Is();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Ys(e, a), KE(e, a, i);
      }
    }
    function Ph(e) {
      return 32 - zn(e);
    }
    function uw(e) {
      return 1 << Ph(e) - 1;
    }
    function Ky(e) {
      for (; e === jh; )
        jh = Rf[--Tf], Rf[Tf] = null, Hh = Rf[--Tf], Rf[Tf] = null;
      for (; e === $s; )
        $s = Oi[--Li], Oi[Li] = null, Fu = Oi[--Li], Oi[Li] = null, Au = Oi[--Li], Oi[Li] = null;
    }
    function ow() {
      return Is(), $s !== null ? {
        id: Au,
        overflow: Fu
      } : null;
    }
    function sw(e, t) {
      Is(), Oi[Li++] = Au, Oi[Li++] = Fu, Oi[Li++] = $s, Au = t.id, Fu = t.overflow, $s = e;
    }
    function Is() {
      Ur() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var zr = null, Mi = null, tl = !1, Qs = !1, Lo = null;
    function cw() {
      tl && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function JE() {
      Qs = !0;
    }
    function fw() {
      return Qs;
    }
    function dw(e) {
      var t = e.stateNode.containerInfo;
      return Mi = O1(t), zr = e, tl = !0, Lo = null, Qs = !1, !0;
    }
    function pw(e, t, a) {
      return Mi = L1(t), zr = e, tl = !0, Lo = null, Qs = !1, a !== null && sw(e, a), !0;
    }
    function ZE(e, t) {
      switch (e.tag) {
        case ee: {
          V1(e.stateNode.containerInfo, t);
          break;
        }
        case ue: {
          var a = (e.mode & lt) !== De;
          $1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case _e: {
          var i = e.memoizedState;
          i.dehydrated !== null && B1(i.dehydrated, t);
          break;
        }
      }
    }
    function eC(e, t) {
      ZE(e, t);
      var a = yb();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ba) : i.push(a);
    }
    function Jy(e, t) {
      {
        if (Qs)
          return;
        switch (e.tag) {
          case ee: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ue:
                var i = t.type;
                t.pendingProps, Y1(a, i);
                break;
              case Ye:
                var u = t.pendingProps;
                I1(a, u);
                break;
            }
            break;
          }
          case ue: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ue: {
                var v = t.type, y = t.pendingProps, g = (e.mode & lt) !== De;
                G1(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Ye: {
                var _ = t.pendingProps, w = (e.mode & lt) !== De;
                q1(
                  s,
                  f,
                  p,
                  _,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
            }
            break;
          }
          case _e: {
            var M = e.memoizedState, U = M.dehydrated;
            if (U !== null) switch (t.tag) {
              case ue:
                var j = t.type;
                t.pendingProps, Q1(U, j);
                break;
              case Ye:
                var le = t.pendingProps;
                W1(U, le);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function tC(e, t) {
      t.flags = t.flags & ~Wr | hn, Jy(e, t);
    }
    function nC(e, t) {
      switch (e.tag) {
        case ue: {
          var a = e.type;
          e.pendingProps;
          var i = w1(t, a);
          return i !== null ? (e.stateNode = i, zr = e, Mi = k1(i), !0) : !1;
        }
        case Ye: {
          var u = e.pendingProps, s = x1(t, u);
          return s !== null ? (e.stateNode = s, zr = e, Mi = null, !0) : !1;
        }
        case _e: {
          var f = _1(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: ow(),
              retryLane: Kr
            };
            e.memoizedState = p;
            var v = gb(f);
            return v.return = e, e.child = v, zr = e, Mi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Zy(e) {
      return (e.mode & lt) !== De && (e.flags & xe) === be;
    }
    function eg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function tg(e) {
      if (tl) {
        var t = Mi;
        if (!t) {
          Zy(e) && (Jy(zr, e), eg()), tC(zr, e), tl = !1, zr = e;
          return;
        }
        var a = t;
        if (!nC(e, t)) {
          Zy(e) && (Jy(zr, e), eg()), t = up(a);
          var i = zr;
          if (!t || !nC(e, t)) {
            tC(zr, e), tl = !1, zr = e;
            return;
          }
          eC(i, a);
        }
      }
    }
    function vw(e, t, a) {
      var i = e.stateNode, u = !Qs, s = M1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function hw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = N1(t, a, e);
      if (i) {
        var u = zr;
        if (u !== null)
          switch (u.tag) {
            case ee: {
              var s = u.stateNode.containerInfo, f = (u.mode & lt) !== De;
              H1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ue: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & lt) !== De;
              P1(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function mw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      z1(a, e);
    }
    function yw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return U1(a);
    }
    function rC(e) {
      for (var t = e.return; t !== null && t.tag !== ue && t.tag !== ee && t.tag !== _e; )
        t = t.return;
      zr = t;
    }
    function Vh(e) {
      if (e !== zr)
        return !1;
      if (!tl)
        return rC(e), tl = !0, !1;
      if (e.tag !== ee && (e.tag !== ue || j1(e.type) && !Ay(e.type, e.memoizedProps))) {
        var t = Mi;
        if (t)
          if (Zy(e))
            aC(e), eg();
          else
            for (; t; )
              eC(e, t), t = up(t);
      }
      return rC(e), e.tag === _e ? Mi = yw(e) : Mi = zr ? up(e.stateNode) : null, !0;
    }
    function gw() {
      return tl && Mi !== null;
    }
    function aC(e) {
      for (var t = Mi; t; )
        ZE(e, t), t = up(t);
    }
    function wf() {
      zr = null, Mi = null, tl = !1, Qs = !1;
    }
    function iC() {
      Lo !== null && (J0(Lo), Lo = null);
    }
    function Ur() {
      return tl;
    }
    function ng(e) {
      Lo === null ? Lo = [e] : Lo.push(e);
    }
    var Sw = A.ReactCurrentBatchConfig, Ew = null;
    function Cw() {
      return Sw.transition;
    }
    var nl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Rw = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Wt && (t = a), a = a.return;
        return t;
      }, Ws = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, fp = [], dp = [], pp = [], vp = [], hp = [], mp = [], Gs = /* @__PURE__ */ new Set();
      nl.recordUnsafeLifecycleWarnings = function(e, t) {
        Gs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && fp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillMount == "function" && dp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && pp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && hp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillUpdate == "function" && mp.push(e));
      }, nl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        fp.length > 0 && (fp.forEach(function(w) {
          e.add(Ve(w) || "Component"), Gs.add(w.type);
        }), fp = []);
        var t = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(w) {
          t.add(Ve(w) || "Component"), Gs.add(w.type);
        }), dp = []);
        var a = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(w) {
          a.add(Ve(w) || "Component"), Gs.add(w.type);
        }), pp = []);
        var i = /* @__PURE__ */ new Set();
        vp.length > 0 && (vp.forEach(function(w) {
          i.add(Ve(w) || "Component"), Gs.add(w.type);
        }), vp = []);
        var u = /* @__PURE__ */ new Set();
        hp.length > 0 && (hp.forEach(function(w) {
          u.add(Ve(w) || "Component"), Gs.add(w.type);
        }), hp = []);
        var s = /* @__PURE__ */ new Set();
        if (mp.length > 0 && (mp.forEach(function(w) {
          s.add(Ve(w) || "Component"), Gs.add(w.type);
        }), mp = []), t.size > 0) {
          var f = Ws(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Ws(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Ws(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = Ws(e);
          mt(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = Ws(a);
          mt(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var _ = Ws(u);
          mt(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, _);
        }
      };
      var Bh = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set();
      nl.recordLegacyContextWarning = function(e, t) {
        var a = Rw(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!lC.has(e.type)) {
          var i = Bh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Bh.set(a, i)), i.push(e));
        }
      }, nl.flushLegacyContextWarning = function() {
        Bh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Ve(s) || "Component"), lC.add(s.type);
            });
            var u = Ws(i);
            try {
              Yt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              on();
            }
          }
        });
      }, nl.discardPendingWarnings = function() {
        fp = [], dp = [], pp = [], vp = [], hp = [], mp = [], Bh = /* @__PURE__ */ new Map();
      };
    }
    var rg, ag, ig, lg, ug, uC = function(e, t) {
    };
    rg = !1, ag = !1, ig = {}, lg = {}, ug = {}, uC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Ve(t) || "Component";
        lg[a] || (lg[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Tw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function yp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Wt || P) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== ve) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Tw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Ve(e) || "Component";
          ig[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), ig[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== ve)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          oi(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(_) {
            var w = v.refs;
            _ === null ? delete w[y] : w[y] = _;
          };
          return g._stringRef = y, g;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function $h(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Yh(e) {
      {
        var t = Ve(e) || "Component";
        if (ug[t])
          return;
        ug[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function oC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function sC(e) {
      function t(k, H) {
        if (e) {
          var O = k.deletions;
          O === null ? (k.deletions = [H], k.flags |= ba) : O.push(H);
        }
      }
      function a(k, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(k, O), O = O.sibling;
        return null;
      }
      function i(k, H) {
        for (var O = /* @__PURE__ */ new Map(), G = H; G !== null; )
          G.key !== null ? O.set(G.key, G) : O.set(G.index, G), G = G.sibling;
        return O;
      }
      function u(k, H) {
        var O = rc(k, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(k, H, O) {
        if (k.index = O, !e)
          return k.flags |= Ei, H;
        var G = k.alternate;
        if (G !== null) {
          var fe = G.index;
          return fe < H ? (k.flags |= hn, H) : fe;
        } else
          return k.flags |= hn, H;
      }
      function f(k) {
        return e && k.alternate === null && (k.flags |= hn), k;
      }
      function p(k, H, O, G) {
        if (H === null || H.tag !== Ye) {
          var fe = nE(O, k.mode, G);
          return fe.return = k, fe;
        } else {
          var oe = u(H, O);
          return oe.return = k, oe;
        }
      }
      function v(k, H, O, G) {
        var fe = O.type;
        if (fe === ci)
          return g(k, H, O.props.children, G, O.key);
        if (H !== null && (H.elementType === fe || // Keep this check inline so it only runs on the false path:
        vR(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof fe == "object" && fe !== null && fe.$$typeof === Be && oC(fe) === H.type)) {
          var oe = u(H, O.props);
          return oe.ref = yp(k, H, O), oe.return = k, oe._debugSource = O._source, oe._debugOwner = O._owner, oe;
        }
        var He = tE(O, k.mode, G);
        return He.ref = yp(k, H, O), He.return = k, He;
      }
      function y(k, H, O, G) {
        if (H === null || H.tag !== Ce || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var fe = rE(O, k.mode, G);
          return fe.return = k, fe;
        } else {
          var oe = u(H, O.children || []);
          return oe.return = k, oe;
        }
      }
      function g(k, H, O, G, fe) {
        if (H === null || H.tag !== yt) {
          var oe = Bo(O, k.mode, G, fe);
          return oe.return = k, oe;
        } else {
          var He = u(H, O);
          return He.return = k, He;
        }
      }
      function _(k, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var G = nE("" + H, k.mode, O);
          return G.return = k, G;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case _r: {
              var fe = tE(H, k.mode, O);
              return fe.ref = yp(k, null, H), fe.return = k, fe;
            }
            case nr: {
              var oe = rE(H, k.mode, O);
              return oe.return = k, oe;
            }
            case Be: {
              var He = H._payload, Qe = H._init;
              return _(k, Qe(He), O);
            }
          }
          if (nt(H) || Ge(H)) {
            var qt = Bo(H, k.mode, O, null);
            return qt.return = k, qt;
          }
          $h(k, H);
        }
        return typeof H == "function" && Yh(k), null;
      }
      function w(k, H, O, G) {
        var fe = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return fe !== null ? null : p(k, H, "" + O, G);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case _r:
              return O.key === fe ? v(k, H, O, G) : null;
            case nr:
              return O.key === fe ? y(k, H, O, G) : null;
            case Be: {
              var oe = O._payload, He = O._init;
              return w(k, H, He(oe), G);
            }
          }
          if (nt(O) || Ge(O))
            return fe !== null ? null : g(k, H, O, G, null);
          $h(k, O);
        }
        return typeof O == "function" && Yh(k), null;
      }
      function M(k, H, O, G, fe) {
        if (typeof G == "string" && G !== "" || typeof G == "number") {
          var oe = k.get(O) || null;
          return p(H, oe, "" + G, fe);
        }
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case _r: {
              var He = k.get(G.key === null ? O : G.key) || null;
              return v(H, He, G, fe);
            }
            case nr: {
              var Qe = k.get(G.key === null ? O : G.key) || null;
              return y(H, Qe, G, fe);
            }
            case Be:
              var qt = G._payload, Nt = G._init;
              return M(k, H, O, Nt(qt), fe);
          }
          if (nt(G) || Ge(G)) {
            var Wn = k.get(O) || null;
            return g(H, Wn, G, fe, null);
          }
          $h(H, G);
        }
        return typeof G == "function" && Yh(H), null;
      }
      function U(k, H, O) {
        {
          if (typeof k != "object" || k === null)
            return H;
          switch (k.$$typeof) {
            case _r:
            case nr:
              uC(k, O);
              var G = k.key;
              if (typeof G != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(G);
                break;
              }
              if (!H.has(G)) {
                H.add(G);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", G);
              break;
            case Be:
              var fe = k._payload, oe = k._init;
              U(oe(fe), H, O);
              break;
          }
        }
        return H;
      }
      function j(k, H, O, G) {
        for (var fe = null, oe = 0; oe < O.length; oe++) {
          var He = O[oe];
          fe = U(He, fe, k);
        }
        for (var Qe = null, qt = null, Nt = H, Wn = 0, zt = 0, Hn = null; Nt !== null && zt < O.length; zt++) {
          Nt.index > zt ? (Hn = Nt, Nt = null) : Hn = Nt.sibling;
          var ia = w(k, Nt, O[zt], G);
          if (ia === null) {
            Nt === null && (Nt = Hn);
            break;
          }
          e && Nt && ia.alternate === null && t(k, Nt), Wn = s(ia, Wn, zt), qt === null ? Qe = ia : qt.sibling = ia, qt = ia, Nt = Hn;
        }
        if (zt === O.length) {
          if (a(k, Nt), Ur()) {
            var Br = zt;
            Ys(k, Br);
          }
          return Qe;
        }
        if (Nt === null) {
          for (; zt < O.length; zt++) {
            var ui = _(k, O[zt], G);
            ui !== null && (Wn = s(ui, Wn, zt), qt === null ? Qe = ui : qt.sibling = ui, qt = ui);
          }
          if (Ur()) {
            var Ea = zt;
            Ys(k, Ea);
          }
          return Qe;
        }
        for (var Ca = i(k, Nt); zt < O.length; zt++) {
          var la = M(Ca, k, zt, O[zt], G);
          la !== null && (e && la.alternate !== null && Ca.delete(la.key === null ? zt : la.key), Wn = s(la, Wn, zt), qt === null ? Qe = la : qt.sibling = la, qt = la);
        }
        if (e && Ca.forEach(function($f) {
          return t(k, $f);
        }), Ur()) {
          var Yu = zt;
          Ys(k, Yu);
        }
        return Qe;
      }
      function le(k, H, O, G) {
        var fe = Ge(O);
        if (typeof fe != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (ag || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), ag = !0), O.entries === fe && (rg || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rg = !0);
          var oe = fe.call(O);
          if (oe)
            for (var He = null, Qe = oe.next(); !Qe.done; Qe = oe.next()) {
              var qt = Qe.value;
              He = U(qt, He, k);
            }
        }
        var Nt = fe.call(O);
        if (Nt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Wn = null, zt = null, Hn = H, ia = 0, Br = 0, ui = null, Ea = Nt.next(); Hn !== null && !Ea.done; Br++, Ea = Nt.next()) {
          Hn.index > Br ? (ui = Hn, Hn = null) : ui = Hn.sibling;
          var Ca = w(k, Hn, Ea.value, G);
          if (Ca === null) {
            Hn === null && (Hn = ui);
            break;
          }
          e && Hn && Ca.alternate === null && t(k, Hn), ia = s(Ca, ia, Br), zt === null ? Wn = Ca : zt.sibling = Ca, zt = Ca, Hn = ui;
        }
        if (Ea.done) {
          if (a(k, Hn), Ur()) {
            var la = Br;
            Ys(k, la);
          }
          return Wn;
        }
        if (Hn === null) {
          for (; !Ea.done; Br++, Ea = Nt.next()) {
            var Yu = _(k, Ea.value, G);
            Yu !== null && (ia = s(Yu, ia, Br), zt === null ? Wn = Yu : zt.sibling = Yu, zt = Yu);
          }
          if (Ur()) {
            var $f = Br;
            Ys(k, $f);
          }
          return Wn;
        }
        for (var qp = i(k, Hn); !Ea.done; Br++, Ea = Nt.next()) {
          var Xl = M(qp, k, Br, Ea.value, G);
          Xl !== null && (e && Xl.alternate !== null && qp.delete(Xl.key === null ? Br : Xl.key), ia = s(Xl, ia, Br), zt === null ? Wn = Xl : zt.sibling = Xl, zt = Xl);
        }
        if (e && qp.forEach(function(qb) {
          return t(k, qb);
        }), Ur()) {
          var Gb = Br;
          Ys(k, Gb);
        }
        return Wn;
      }
      function Le(k, H, O, G) {
        if (H !== null && H.tag === Ye) {
          a(k, H.sibling);
          var fe = u(H, O);
          return fe.return = k, fe;
        }
        a(k, H);
        var oe = nE(O, k.mode, G);
        return oe.return = k, oe;
      }
      function we(k, H, O, G) {
        for (var fe = O.key, oe = H; oe !== null; ) {
          if (oe.key === fe) {
            var He = O.type;
            if (He === ci) {
              if (oe.tag === yt) {
                a(k, oe.sibling);
                var Qe = u(oe, O.props.children);
                return Qe.return = k, Qe._debugSource = O._source, Qe._debugOwner = O._owner, Qe;
              }
            } else if (oe.elementType === He || // Keep this check inline so it only runs on the false path:
            vR(oe, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof He == "object" && He !== null && He.$$typeof === Be && oC(He) === oe.type) {
              a(k, oe.sibling);
              var qt = u(oe, O.props);
              return qt.ref = yp(k, oe, O), qt.return = k, qt._debugSource = O._source, qt._debugOwner = O._owner, qt;
            }
            a(k, oe);
            break;
          } else
            t(k, oe);
          oe = oe.sibling;
        }
        if (O.type === ci) {
          var Nt = Bo(O.props.children, k.mode, G, O.key);
          return Nt.return = k, Nt;
        } else {
          var Wn = tE(O, k.mode, G);
          return Wn.ref = yp(k, H, O), Wn.return = k, Wn;
        }
      }
      function Ct(k, H, O, G) {
        for (var fe = O.key, oe = H; oe !== null; ) {
          if (oe.key === fe)
            if (oe.tag === Ce && oe.stateNode.containerInfo === O.containerInfo && oe.stateNode.implementation === O.implementation) {
              a(k, oe.sibling);
              var He = u(oe, O.children || []);
              return He.return = k, He;
            } else {
              a(k, oe);
              break;
            }
          else
            t(k, oe);
          oe = oe.sibling;
        }
        var Qe = rE(O, k.mode, G);
        return Qe.return = k, Qe;
      }
      function vt(k, H, O, G) {
        var fe = typeof O == "object" && O !== null && O.type === ci && O.key === null;
        if (fe && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case _r:
              return f(we(k, H, O, G));
            case nr:
              return f(Ct(k, H, O, G));
            case Be:
              var oe = O._payload, He = O._init;
              return vt(k, H, He(oe), G);
          }
          if (nt(O))
            return j(k, H, O, G);
          if (Ge(O))
            return le(k, H, O, G);
          $h(k, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Le(k, H, "" + O, G)) : (typeof O == "function" && Yh(k), a(k, H));
      }
      return vt;
    }
    var xf = sC(!0), cC = sC(!1);
    function ww(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = rc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = rc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function xw(e, t) {
      for (var a = e.child; a !== null; )
        db(a, t), a = a.sibling;
    }
    var og = Do(null), sg;
    sg = {};
    var Ih = null, _f = null, cg = null, Qh = !1;
    function Wh() {
      Ih = null, _f = null, cg = null, Qh = !1;
    }
    function fC() {
      Qh = !0;
    }
    function dC() {
      Qh = !1;
    }
    function pC(e, t, a) {
      ra(og, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== sg && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = sg;
    }
    function fg(e, t) {
      var a = og.current;
      na(og, t), e._currentValue = a;
    }
    function dg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (_u(i.childLanes, t) ? u !== null && !_u(u.childLanes, t) && (u.childLanes = qe(u.childLanes, t)) : (i.childLanes = qe(i.childLanes, t), u !== null && (u.childLanes = qe(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function _w(e, t, a) {
      bw(e, t, a);
    }
    function bw(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === ve) {
                var p = Cs(a), v = ju(Xt, p);
                v.tag = qh;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, _ = g.pending;
                  _ === null ? v.next = v : (v.next = _.next, _.next = v), g.pending = v;
                }
              }
              i.lanes = qe(i.lanes, a);
              var w = i.alternate;
              w !== null && (w.lanes = qe(w.lanes, a)), dg(i.return, a, e), s.lanes = qe(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === ft)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Kt) {
          var M = i.return;
          if (M === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          M.lanes = qe(M.lanes, a);
          var U = M.alternate;
          U !== null && (U.lanes = qe(U.lanes, a)), dg(M, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function bf(e, t) {
      Ih = e, _f = null, cg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Jr(a.lanes, t) && Mp(), a.firstContext = null);
      }
    }
    function er(e) {
      Qh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (cg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (_f === null) {
          if (Ih === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          _f = a, Ih.dependencies = {
            lanes: $,
            firstContext: a
          };
        } else
          _f = _f.next = a;
      }
      return t;
    }
    var qs = null;
    function pg(e) {
      qs === null ? qs = [e] : qs.push(e);
    }
    function Dw() {
      if (qs !== null) {
        for (var e = 0; e < qs.length; e++) {
          var t = qs[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        qs = null;
      }
    }
    function vC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, pg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function kw(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, pg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Ow(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, pg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function Fa(e, t) {
      return Gh(e, t);
    }
    var Lw = Gh;
    function Gh(e, t) {
      e.lanes = qe(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = qe(a.lanes, t)), a === null && (e.flags & (hn | Wr)) !== be && cR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = qe(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = qe(a.childLanes, t) : (u.flags & (hn | Wr)) !== be && cR(e), i = u, u = u.return;
      if (i.tag === ee) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var hC = 0, mC = 1, qh = 2, vg = 3, Xh = !1, hg, Kh;
    hg = !1, Kh = null;
    function mg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: $
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function yC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function ju(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: hC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Mo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Kh === u && !hg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), hg = !0), k_()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Lw(e, a);
      } else
        return Ow(e, u, t, a);
    }
    function Jh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Od(a)) {
          var s = u.lanes;
          s = Md(s, e.pendingLanes);
          var f = qe(s, a);
          u.lanes = f, Jc(e, f);
        }
      }
    }
    function yg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function Mw(e, t, a, i, u, s) {
      switch (a.tag) {
        case mC: {
          var f = a.payload;
          if (typeof f == "function") {
            fC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
            return p;
          }
          return f;
        }
        case vg:
          e.flags = e.flags & ~Xn | xe;
        // Intentional fallthrough
        case hC: {
          var v = a.payload, y;
          if (typeof v == "function") {
            fC(), y = v.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
          } else
            y = v;
          return y == null ? i : Ke({}, i, y);
        }
        case qh:
          return Xh = !0, i;
      }
      return i;
    }
    function Zh(e, t, a, i) {
      var u = e.updateQueue;
      Xh = !1, Kh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var _ = g.updateQueue, w = _.lastBaseUpdate;
          w !== f && (w === null ? _.firstBaseUpdate = y : w.next = y, _.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var M = u.baseState, U = $, j = null, le = null, Le = null, we = s;
        do {
          var Ct = we.lane, vt = we.eventTime;
          if (_u(i, Ct)) {
            if (Le !== null) {
              var H = {
                eventTime: vt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: bt,
                tag: we.tag,
                payload: we.payload,
                callback: we.callback,
                next: null
              };
              Le = Le.next = H;
            }
            M = Mw(e, u, we, M, t, a);
            var O = we.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            we.lane !== bt) {
              e.flags |= nn;
              var G = u.effects;
              G === null ? u.effects = [we] : G.push(we);
            }
          } else {
            var k = {
              eventTime: vt,
              lane: Ct,
              tag: we.tag,
              payload: we.payload,
              callback: we.callback,
              next: null
            };
            Le === null ? (le = Le = k, j = M) : Le = Le.next = k, U = qe(U, Ct);
          }
          if (we = we.next, we === null) {
            if (p = u.shared.pending, p === null)
              break;
            var fe = p, oe = fe.next;
            fe.next = null, we = oe, u.lastBaseUpdate = fe, u.shared.pending = null;
          }
        } while (!0);
        Le === null && (j = M), u.baseState = j, u.firstBaseUpdate = le, u.lastBaseUpdate = Le;
        var He = u.shared.interleaved;
        if (He !== null) {
          var Qe = He;
          do
            U = qe(U, Qe.lane), Qe = Qe.next;
          while (Qe !== He);
        } else s === null && (u.shared.lanes = $);
        Yp(U), e.lanes = U, e.memoizedState = M;
      }
      Kh = null;
    }
    function Nw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function gC() {
      Xh = !1;
    }
    function em() {
      return Xh;
    }
    function SC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Nw(f, a));
        }
    }
    var gp = {}, No = Do(gp), Sp = Do(gp), tm = Do(gp);
    function nm(e) {
      if (e === gp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function EC() {
      var e = nm(tm.current);
      return e;
    }
    function gg(e, t) {
      ra(tm, t, e), ra(Sp, e, e), ra(No, gp, e);
      var a = XT(t);
      na(No, e), ra(No, a, e);
    }
    function Df(e) {
      na(No, e), na(Sp, e), na(tm, e);
    }
    function Sg() {
      var e = nm(No.current);
      return e;
    }
    function CC(e) {
      nm(tm.current);
      var t = nm(No.current), a = KT(t, e.type);
      t !== a && (ra(Sp, e, e), ra(No, a, e));
    }
    function Eg(e) {
      Sp.current === e && (na(No, e), na(Sp, e));
    }
    var zw = 0, RC = 1, TC = 1, Ep = 2, rl = Do(zw);
    function Cg(e, t) {
      return (e & t) !== 0;
    }
    function kf(e) {
      return e & RC;
    }
    function Rg(e, t) {
      return e & RC | t;
    }
    function Uw(e, t) {
      return e | t;
    }
    function zo(e, t) {
      ra(rl, t, e);
    }
    function Of(e) {
      na(rl, e);
    }
    function Aw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function rm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === _e) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || PE(i) || Py(i))
              return t;
          }
        } else if (t.tag === an && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & xe) !== be;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var ja = (
      /*   */
      0
    ), sr = (
      /* */
      1
    ), $l = (
      /*  */
      2
    ), cr = (
      /*    */
      4
    ), Ar = (
      /*   */
      8
    ), Tg = [];
    function wg() {
      for (var e = 0; e < Tg.length; e++) {
        var t = Tg[e];
        t._workInProgressVersionPrimary = null;
      }
      Tg.length = 0;
    }
    function Fw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var ce = A.ReactCurrentDispatcher, Cp = A.ReactCurrentBatchConfig, xg, Lf;
    xg = /* @__PURE__ */ new Set();
    var Xs = $, Gt = null, fr = null, dr = null, am = !1, Rp = !1, Tp = 0, jw = 0, Hw = 25, V = null, Ni = null, Uo = -1, _g = !1;
    function Ht() {
      {
        var e = V;
        Ni === null ? Ni = [e] : Ni.push(e);
      }
    }
    function te() {
      {
        var e = V;
        Ni !== null && (Uo++, Ni[Uo] !== e && Pw(e));
      }
    }
    function Mf(e) {
      e != null && !nt(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", V, typeof e);
    }
    function Pw(e) {
      {
        var t = Ve(Gt);
        if (!xg.has(t) && (xg.add(t), Ni !== null)) {
          for (var a = "", i = 30, u = 0; u <= Uo; u++) {
            for (var s = Ni[u], f = u === Uo ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function aa() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function bg(e, t) {
      if (_g)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", V), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, V, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Q(e[a], t[a]))
          return !1;
      return !0;
    }
    function Nf(e, t, a, i, u, s) {
      Xs = s, Gt = t, Ni = e !== null ? e._debugHookTypes : null, Uo = -1, _g = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? ce.current = IC : Ni !== null ? ce.current = YC : ce.current = $C;
      var f = a(i, u);
      if (Rp) {
        var p = 0;
        do {
          if (Rp = !1, Tp = 0, p >= Hw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, _g = !1, fr = null, dr = null, t.updateQueue = null, Uo = -1, ce.current = QC, f = a(i, u);
        } while (Rp);
      }
      ce.current = ym, t._debugHookTypes = Ni;
      var v = fr !== null && fr.next !== null;
      if (Xs = $, Gt = null, fr = null, dr = null, V = null, Ni = null, Uo = -1, e !== null && (e.flags & Nn) !== (t.flags & Nn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & lt) !== De && S("Internal React error: Expected static flag was missing. Please notify the React team."), am = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function zf() {
      var e = Tp !== 0;
      return Tp = 0, e;
    }
    function wC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Lt) !== De ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Rs(e.lanes, a);
    }
    function xC() {
      if (ce.current = ym, am) {
        for (var e = Gt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        am = !1;
      }
      Xs = $, Gt = null, fr = null, dr = null, Ni = null, Uo = -1, V = null, jC = !1, Rp = !1, Tp = 0;
    }
    function Yl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return dr === null ? Gt.memoizedState = dr = e : dr = dr.next = e, dr;
    }
    function zi() {
      var e;
      if (fr === null) {
        var t = Gt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = fr.next;
      var a;
      if (dr === null ? a = Gt.memoizedState : a = dr.next, a !== null)
        dr = a, a = dr.next, fr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        fr = e;
        var i = {
          memoizedState: fr.memoizedState,
          baseState: fr.baseState,
          baseQueue: fr.baseQueue,
          queue: fr.queue,
          next: null
        };
        dr === null ? Gt.memoizedState = dr = i : dr = dr.next = i;
      }
      return dr;
    }
    function _C() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Dg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function kg(e, t, a) {
      var i = Yl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Yw.bind(null, Gt, s);
      return [i.memoizedState, f];
    }
    function Og(e, t, a) {
      var i = zi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = fr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, _ = s.baseState, w = null, M = null, U = null, j = g;
        do {
          var le = j.lane;
          if (_u(Xs, le)) {
            if (U !== null) {
              var we = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: bt,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              U = U.next = we;
            }
            if (j.hasEagerState)
              _ = j.eagerState;
            else {
              var Ct = j.action;
              _ = e(_, Ct);
            }
          } else {
            var Le = {
              lane: le,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            U === null ? (M = U = Le, w = _) : U = U.next = Le, Gt.lanes = qe(Gt.lanes, le), Yp(le);
          }
          j = j.next;
        } while (j !== null && j !== g);
        U === null ? w = _ : U.next = M, Q(_, i.memoizedState) || Mp(), i.memoizedState = _, i.baseState = w, i.baseQueue = U, u.lastRenderedState = _;
      }
      var vt = u.interleaved;
      if (vt !== null) {
        var k = vt;
        do {
          var H = k.lane;
          Gt.lanes = qe(Gt.lanes, H), Yp(H), k = k.next;
        } while (k !== vt);
      } else f === null && (u.lanes = $);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function Lg(e, t, a) {
      var i = zi(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        Q(p, i.memoizedState) || Mp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function sD(e, t, a) {
    }
    function cD(e, t, a) {
    }
    function Mg(e, t, a) {
      var i = Gt, u = Yl(), s, f = Ur();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Lf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Lf = !0);
      } else {
        if (s = t(), !Lf) {
          var p = t();
          Q(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Lf = !0);
        }
        var v = Am();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Xc(v, Xs) || bC(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, sm(kC.bind(null, i, y, e), [e]), i.flags |= Qr, wp(sr | Ar, DC.bind(null, i, y, s, t), void 0, null), s;
    }
    function im(e, t, a) {
      var i = Gt, u = zi(), s = t();
      if (!Lf) {
        var f = t();
        Q(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Lf = !0);
      }
      var p = u.memoizedState, v = !Q(p, s);
      v && (u.memoizedState = s, Mp());
      var y = u.queue;
      if (_p(kC.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      dr !== null && dr.memoizedState.tag & sr) {
        i.flags |= Qr, wp(sr | Ar, DC.bind(null, i, y, s, t), void 0, null);
        var g = Am();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Xc(g, Xs) || bC(i, t, s);
      }
      return s;
    }
    function bC(e, t, a) {
      e.flags |= fo;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Gt.updateQueue;
      if (u === null)
        u = _C(), Gt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function DC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, OC(t) && LC(e);
    }
    function kC(e, t, a) {
      var i = function() {
        OC(t) && LC(e);
      };
      return a(i);
    }
    function OC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Q(a, i);
      } catch {
        return !0;
      }
    }
    function LC(e) {
      var t = Fa(e, Ae);
      t !== null && mr(t, e, Ae, Xt);
    }
    function lm(e) {
      var t = Yl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: Dg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Iw.bind(null, Gt, a);
      return [t.memoizedState, i];
    }
    function Ng(e) {
      return Og(Dg);
    }
    function zg(e) {
      return Lg(Dg);
    }
    function wp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Gt.updateQueue;
      if (s === null)
        s = _C(), Gt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function Ug(e) {
      var t = Yl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function um(e) {
      var t = zi();
      return t.memoizedState;
    }
    function xp(e, t, a, i) {
      var u = Yl(), s = i === void 0 ? null : i;
      Gt.flags |= e, u.memoizedState = wp(sr | t, a, void 0, s);
    }
    function om(e, t, a, i) {
      var u = zi(), s = i === void 0 ? null : i, f = void 0;
      if (fr !== null) {
        var p = fr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (bg(s, v)) {
            u.memoizedState = wp(t, a, f, s);
            return;
          }
        }
      }
      Gt.flags |= e, u.memoizedState = wp(sr | t, a, f, s);
    }
    function sm(e, t) {
      return (Gt.mode & Lt) !== De ? xp(Ci | Qr | Tc, Ar, e, t) : xp(Qr | Tc, Ar, e, t);
    }
    function _p(e, t) {
      return om(Qr, Ar, e, t);
    }
    function Ag(e, t) {
      return xp(gt, $l, e, t);
    }
    function cm(e, t) {
      return om(gt, $l, e, t);
    }
    function Fg(e, t) {
      var a = gt;
      return a |= Ii, (Gt.mode & Lt) !== De && (a |= xl), xp(a, cr, e, t);
    }
    function fm(e, t) {
      return om(gt, cr, e, t);
    }
    function MC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function jg(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = gt;
      return u |= Ii, (Gt.mode & Lt) !== De && (u |= xl), xp(u, cr, MC.bind(null, t, e), i);
    }
    function dm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return om(gt, cr, MC.bind(null, t, e), i);
    }
    function Vw(e, t) {
    }
    var pm = Vw;
    function Hg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function vm(e, t) {
      var a = zi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (bg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Pg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function hm(e, t) {
      var a = zi(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (bg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function Vg(e) {
      var t = Yl();
      return t.memoizedState = e, e;
    }
    function NC(e) {
      var t = zi(), a = fr, i = a.memoizedState;
      return UC(t, i, e);
    }
    function zC(e) {
      var t = zi();
      if (fr === null)
        return t.memoizedState = e, e;
      var a = fr.memoizedState;
      return UC(t, a, e);
    }
    function UC(e, t, a) {
      var i = !Dd(Xs);
      if (i) {
        if (!Q(a, t)) {
          var u = Ld();
          Gt.lanes = qe(Gt.lanes, u), Yp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Mp()), e.memoizedState = a, a;
    }
    function Bw(e, t, a) {
      var i = za();
      An(Qv(i, xi)), e(!0);
      var u = Cp.transition;
      Cp.transition = {};
      var s = Cp.transition;
      Cp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (An(i), Cp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && mt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Bg() {
      var e = lm(!1), t = e[0], a = e[1], i = Bw.bind(null, a), u = Yl();
      return u.memoizedState = i, [t, i];
    }
    function AC() {
      var e = Ng(), t = e[0], a = zi(), i = a.memoizedState;
      return [t, i];
    }
    function FC() {
      var e = zg(), t = e[0], a = zi(), i = a.memoizedState;
      return [t, i];
    }
    var jC = !1;
    function $w() {
      return jC;
    }
    function $g() {
      var e = Yl(), t = Am(), a = t.identifierPrefix, i;
      if (Ur()) {
        var u = lw();
        i = ":" + a + "R" + u;
        var s = Tp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = jw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function mm() {
      var e = zi(), t = e.memoizedState;
      return t;
    }
    function Yw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Po(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        PC(t, u);
      else {
        var s = vC(e, t, u, i);
        if (s !== null) {
          var f = Sa();
          mr(s, e, i, f), VC(s, t, i);
        }
      }
      BC(e, i);
    }
    function Iw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Po(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        PC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === $ && (s === null || s.lanes === $)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = ce.current, ce.current = al;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, Q(y, v)) {
                kw(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              ce.current = p;
            }
          }
        }
        var g = vC(e, t, u, i);
        if (g !== null) {
          var _ = Sa();
          mr(g, e, i, _), VC(g, t, i);
        }
      }
      BC(e, i);
    }
    function HC(e) {
      var t = e.alternate;
      return e === Gt || t !== null && t === Gt;
    }
    function PC(e, t) {
      Rp = am = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function VC(e, t, a) {
      if (Od(a)) {
        var i = t.lanes;
        i = Md(i, e.pendingLanes);
        var u = qe(i, a);
        t.lanes = u, Jc(e, u);
      }
    }
    function BC(e, t, a) {
      ds(e, t);
    }
    var ym = {
      readContext: er,
      useCallback: aa,
      useContext: aa,
      useEffect: aa,
      useImperativeHandle: aa,
      useInsertionEffect: aa,
      useLayoutEffect: aa,
      useMemo: aa,
      useReducer: aa,
      useRef: aa,
      useState: aa,
      useDebugValue: aa,
      useDeferredValue: aa,
      useTransition: aa,
      useMutableSource: aa,
      useSyncExternalStore: aa,
      useId: aa,
      unstable_isNewReconciler: K
    }, $C = null, YC = null, IC = null, QC = null, Il = null, al = null, gm = null;
    {
      var Yg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, $e = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      $C = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Ht(), Mf(t), Hg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Ht(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Ht(), Mf(t), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Ht(), Mf(a), jg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Ht(), Mf(t), Ag(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Ht(), Mf(t), Fg(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Ht(), Mf(t);
          var a = ce.current;
          ce.current = Il;
          try {
            return Pg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Ht();
          var i = ce.current;
          ce.current = Il;
          try {
            return kg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Ht(), Ug(e);
        },
        useState: function(e) {
          V = "useState", Ht();
          var t = ce.current;
          ce.current = Il;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Ht(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Ht(), Vg(e);
        },
        useTransition: function() {
          return V = "useTransition", Ht(), Bg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Ht(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Ht(), Mg(e, t, a);
        },
        useId: function() {
          return V = "useId", Ht(), $g();
        },
        unstable_isNewReconciler: K
      }, YC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), Hg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), jg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), Ag(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), Fg(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = ce.current;
          ce.current = Il;
          try {
            return Pg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = ce.current;
          ce.current = Il;
          try {
            return kg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), Ug(e);
        },
        useState: function(e) {
          V = "useState", te();
          var t = ce.current;
          ce.current = Il;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), Vg(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), Bg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), Mg(e, t, a);
        },
        useId: function() {
          return V = "useId", te(), $g();
        },
        unstable_isNewReconciler: K
      }, IC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = ce.current;
          ce.current = al;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = ce.current;
          ce.current = al;
          try {
            return Og(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), um();
        },
        useState: function(e) {
          V = "useState", te();
          var t = ce.current;
          ce.current = al;
          try {
            return Ng(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), NC(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), AC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return V = "useId", te(), mm();
        },
        unstable_isNewReconciler: K
      }, QC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = ce.current;
          ce.current = gm;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = ce.current;
          ce.current = gm;
          try {
            return Lg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), um();
        },
        useState: function(e) {
          V = "useState", te();
          var t = ce.current;
          ce.current = gm;
          try {
            return zg(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), zC(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return V = "useId", te(), mm();
        },
        unstable_isNewReconciler: K
      }, Il = {
        readContext: function(e) {
          return Yg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", $e(), Ht(), Hg(e, t);
        },
        useContext: function(e) {
          return V = "useContext", $e(), Ht(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", $e(), Ht(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", $e(), Ht(), jg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", $e(), Ht(), Ag(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", $e(), Ht(), Fg(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", $e(), Ht();
          var a = ce.current;
          ce.current = Il;
          try {
            return Pg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", $e(), Ht();
          var i = ce.current;
          ce.current = Il;
          try {
            return kg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", $e(), Ht(), Ug(e);
        },
        useState: function(e) {
          V = "useState", $e(), Ht();
          var t = ce.current;
          ce.current = Il;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", $e(), Ht(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", $e(), Ht(), Vg(e);
        },
        useTransition: function() {
          return V = "useTransition", $e(), Ht(), Bg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", $e(), Ht(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", $e(), Ht(), Mg(e, t, a);
        },
        useId: function() {
          return V = "useId", $e(), Ht(), $g();
        },
        unstable_isNewReconciler: K
      }, al = {
        readContext: function(e) {
          return Yg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", $e(), te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", $e(), te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", $e(), te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", $e(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", $e(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", $e(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", $e(), te();
          var a = ce.current;
          ce.current = al;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", $e(), te();
          var i = ce.current;
          ce.current = al;
          try {
            return Og(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", $e(), te(), um();
        },
        useState: function(e) {
          V = "useState", $e(), te();
          var t = ce.current;
          ce.current = al;
          try {
            return Ng(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", $e(), te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", $e(), te(), NC(e);
        },
        useTransition: function() {
          return V = "useTransition", $e(), te(), AC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", $e(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", $e(), te(), im(e, t);
        },
        useId: function() {
          return V = "useId", $e(), te(), mm();
        },
        unstable_isNewReconciler: K
      }, gm = {
        readContext: function(e) {
          return Yg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", $e(), te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", $e(), te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", $e(), te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", $e(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", $e(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", $e(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", $e(), te();
          var a = ce.current;
          ce.current = al;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", $e(), te();
          var i = ce.current;
          ce.current = al;
          try {
            return Lg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", $e(), te(), um();
        },
        useState: function(e) {
          V = "useState", $e(), te();
          var t = ce.current;
          ce.current = al;
          try {
            return zg(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", $e(), te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", $e(), te(), zC(e);
        },
        useTransition: function() {
          return V = "useTransition", $e(), te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", $e(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", $e(), te(), im(e, t);
        },
        useId: function() {
          return V = "useId", $e(), te(), mm();
        },
        unstable_isNewReconciler: K
      };
    }
    var Ao = X.unstable_now, WC = 0, Sm = -1, bp = -1, Em = -1, Ig = !1, Cm = !1;
    function GC() {
      return Ig;
    }
    function Qw() {
      Cm = !0;
    }
    function Ww() {
      Ig = !1, Cm = !1;
    }
    function Gw() {
      Ig = Cm, Cm = !1;
    }
    function qC() {
      return WC;
    }
    function XC() {
      WC = Ao();
    }
    function Qg(e) {
      bp = Ao(), e.actualStartTime < 0 && (e.actualStartTime = Ao());
    }
    function KC(e) {
      bp = -1;
    }
    function Rm(e, t) {
      if (bp >= 0) {
        var a = Ao() - bp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), bp = -1;
      }
    }
    function Ql(e) {
      if (Sm >= 0) {
        var t = Ao() - Sm;
        Sm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case pt:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Wg(e) {
      if (Em >= 0) {
        var t = Ao() - Em;
        Em = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case pt:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Wl() {
      Sm = Ao();
    }
    function Gg() {
      Em = Ao();
    }
    function qg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function il(e, t) {
      if (e && e.defaultProps) {
        var a = Ke({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var Xg = {}, Kg, Jg, Zg, eS, tS, JC, Tm, nS, rS, aS, Dp;
    {
      Kg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), Dp = /* @__PURE__ */ new Set();
      var ZC = /* @__PURE__ */ new Set();
      Tm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          ZC.has(a) || (ZC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, JC = function(e, t) {
        if (t === void 0) {
          var a = Rt(e) || "Component";
          tS.has(a) || (tS.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Xg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Xg);
    }
    function iS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Wt) {
          mn(!0);
          try {
            s = a(i, u);
          } finally {
            mn(!1);
          }
        }
        JC(t, s);
      }
      var f = s == null ? u : Ke({}, u, s);
      if (e.memoizedState = f, e.lanes === $) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var lS = {
      isMounted: Ov,
      enqueueSetState: function(e, t, a) {
        var i = co(e), u = Sa(), s = Po(i), f = ju(u, s);
        f.payload = t, a != null && (Tm(a, "setState"), f.callback = a);
        var p = Mo(i, f, s);
        p !== null && (mr(p, i, s, u), Jh(p, i, s)), ds(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = co(e), u = Sa(), s = Po(i), f = ju(u, s);
        f.tag = mC, f.payload = t, a != null && (Tm(a, "replaceState"), f.callback = a);
        var p = Mo(i, f, s);
        p !== null && (mr(p, i, s, u), Jh(p, i, s)), ds(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = co(e), i = Sa(), u = Po(a), s = ju(i, u);
        s.tag = qh, t != null && (Tm(t, "forceUpdate"), s.callback = t);
        var f = Mo(a, s, u);
        f !== null && (mr(f, a, u, i), Jh(f, a, u)), Oc(a, u);
      }
    };
    function e0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Wt) {
            mn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              mn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Rt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !ye(a, i) || !ye(u, s) : !0;
    }
    function qw(e, t, a) {
      var i = e.stateNode;
      {
        var u = Rt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === De && (Dp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === De && (Dp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !rS.has(t) && (rS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Rt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Zg.has(t) && (Zg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Rt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || nt(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function t0(e, t) {
      t.updater = lS, e.stateNode = t, du(t, e), t._reactInternalInstance = Xg;
    }
    function n0(e, t, a) {
      var i = !1, u = ii, s = ii, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === R && f._context === void 0
        );
        if (!p && !aS.has(t)) {
          aS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === di ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Rt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = er(f);
      else {
        u = Ef(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Cf(e, u) : ii;
      }
      var g = new t(a, s);
      if (e.mode & Wt) {
        mn(!0);
        try {
          g = new t(a, s);
        } finally {
          mn(!1);
        }
      }
      var _ = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      t0(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && _ === null) {
          var w = Rt(t) || "Component";
          Jg.has(w) || (Jg.add(w), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", w, g.state === null ? "null" : "undefined", w));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var M = null, U = null, j = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? U = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (U = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), M !== null || U !== null || j !== null) {
            var le = Rt(t) || "Component", Le = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            eS.has(le) || (eS.add(le), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, le, Le, M !== null ? `
  ` + M : "", U !== null ? `
  ` + U : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && IE(e, u, s), g;
    }
    function Xw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ve(e) || "Component"), lS.enqueueReplaceState(t, t.state, null));
    }
    function r0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Ve(e) || "Component";
          Kg.has(s) || (Kg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        lS.enqueueReplaceState(t, t.state, null);
      }
    }
    function uS(e, t, a, i) {
      qw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, mg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = er(s);
      else {
        var f = Ef(e, t, !0);
        u.context = Cf(e, f);
      }
      {
        if (u.state === a) {
          var p = Rt(t) || "Component";
          nS.has(p) || (nS.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Wt && nl.recordLegacyContextWarning(e, u), nl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (iS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Xw(e, u), Zh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = gt;
        y |= Ii, (e.mode & Lt) !== De && (y |= xl), e.flags |= y;
      }
    }
    function Kw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = ii;
      if (typeof p == "object" && p !== null)
        v = er(p);
      else {
        var y = Ef(e, t, !0);
        v = Cf(e, y);
      }
      var g = t.getDerivedStateFromProps, _ = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !_ && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && r0(e, u, a, v), gC();
      var w = e.memoizedState, M = u.state = w;
      if (Zh(e, a, u, i), M = e.memoizedState, s === a && w === M && !zh() && !em()) {
        if (typeof u.componentDidMount == "function") {
          var U = gt;
          U |= Ii, (e.mode & Lt) !== De && (U |= xl), e.flags |= U;
        }
        return !1;
      }
      typeof g == "function" && (iS(e, t, g, a), M = e.memoizedState);
      var j = em() || e0(e, t, s, a, w, M, v);
      if (j) {
        if (!_ && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var le = gt;
          le |= Ii, (e.mode & Lt) !== De && (le |= xl), e.flags |= le;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Le = gt;
          Le |= Ii, (e.mode & Lt) !== De && (Le |= xl), e.flags |= Le;
        }
        e.memoizedProps = a, e.memoizedState = M;
      }
      return u.props = a, u.state = M, u.context = v, j;
    }
    function Jw(e, t, a, i, u) {
      var s = t.stateNode;
      yC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : il(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, _ = ii;
      if (typeof g == "object" && g !== null)
        _ = er(g);
      else {
        var w = Ef(t, a, !0);
        _ = Cf(t, w);
      }
      var M = a.getDerivedStateFromProps, U = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !U && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== _) && r0(t, s, i, _), gC();
      var j = t.memoizedState, le = s.state = j;
      if (Zh(t, i, s, u), le = t.memoizedState, f === v && j === le && !zh() && !em() && !Re)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= gt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Yn), !1;
      typeof M == "function" && (iS(t, a, M, i), le = t.memoizedState);
      var Le = em() || e0(t, a, p, i, j, le, _) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Re;
      return Le ? (!U && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, le, _), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, le, _)), typeof s.componentDidUpdate == "function" && (t.flags |= gt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Yn)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= gt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Yn), t.memoizedProps = i, t.memoizedState = le), s.props = i, s.state = le, s.context = _, Le;
    }
    function Ks(e, t) {
      return {
        value: e,
        source: t,
        stack: Hi(t),
        digest: null
      };
    }
    function oS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Zw(e, t) {
      return !0;
    }
    function sS(e, t) {
      try {
        var a = Zw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === ve)
            return;
          console.error(i);
        }
        var p = u ? Ve(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === ee)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = Ve(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var _ = v + `
` + f + `

` + ("" + y);
        console.error(_);
      } catch (w) {
        setTimeout(function() {
          throw w;
        });
      }
    }
    var ex = typeof WeakMap == "function" ? WeakMap : Map;
    function a0(e, t, a) {
      var i = ju(Xt, a);
      i.tag = vg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        Q_(u), sS(e, t);
      }, i;
    }
    function cS(e, t, a) {
      var i = ju(Xt, a);
      i.tag = vg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          hR(e), sS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        hR(e), sS(e, t), typeof u != "function" && Y_(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (Jr(e.lanes, Ae) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ve(e) || "Unknown"));
      }), i;
    }
    function i0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new ex(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = W_.bind(null, e, t, a);
        Xr && Ip(e, a), t.then(s, s);
      }
    }
    function tx(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function nx(e, t) {
      var a = e.tag;
      if ((e.mode & lt) === De && (a === de || a === Ie || a === Fe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function l0(e) {
      var t = e;
      do {
        if (t.tag === _e && Aw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function u0(e, t, a, i, u) {
      if ((e.mode & lt) === De) {
        if (e === t)
          e.flags |= Xn;
        else {
          if (e.flags |= xe, a.flags |= Rc, a.flags &= -52805, a.tag === ve) {
            var s = a.alternate;
            if (s === null)
              a.tag = Ft;
            else {
              var f = ju(Xt, Ae);
              f.tag = qh, Mo(a, f, Ae);
            }
          }
          a.lanes = qe(a.lanes, Ae);
        }
        return e;
      }
      return e.flags |= Xn, e.lanes = u, e;
    }
    function rx(e, t, a, i, u) {
      if (a.flags |= ls, Xr && Ip(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        nx(a), Ur() && a.mode & lt && JE();
        var f = l0(t);
        if (f !== null) {
          f.flags &= ~Er, u0(f, t, a, e, u), f.mode & lt && i0(e, s, u), tx(f, e, s);
          return;
        } else {
          if (!jv(u)) {
            i0(e, s, u), $S();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Ur() && a.mode & lt) {
        JE();
        var v = l0(t);
        if (v !== null) {
          (v.flags & Xn) === be && (v.flags |= Er), u0(v, t, a, e, u), ng(Ks(i, a));
          return;
        }
      }
      i = Ks(i, a), A_(i);
      var y = t;
      do {
        switch (y.tag) {
          case ee: {
            var g = i;
            y.flags |= Xn;
            var _ = Cs(u);
            y.lanes = qe(y.lanes, _);
            var w = a0(y, g, _);
            yg(y, w);
            return;
          }
          case ve:
            var M = i, U = y.type, j = y.stateNode;
            if ((y.flags & xe) === be && (typeof U.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !lR(j))) {
              y.flags |= Xn;
              var le = Cs(u);
              y.lanes = qe(y.lanes, le);
              var Le = cS(y, M, le);
              yg(y, Le);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function ax() {
      return null;
    }
    var kp = A.ReactCurrentOwner, ll = !1, fS, Op, dS, pS, vS, Js, hS, wm, Lp;
    fS = {}, Op = {}, dS = {}, pS = {}, vS = {}, Js = !1, hS = {}, wm = {}, Lp = {};
    function ya(e, t, a, i) {
      e === null ? t.child = cC(t, null, a, i) : t.child = xf(t, e.child, a, i);
    }
    function ix(e, t, a, i) {
      t.child = xf(t, e.child, null, i), t.child = xf(t, null, a, i);
    }
    function o0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && el(
          s,
          i,
          // Resolved props
          "prop",
          Rt(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      bf(t, u), pa(t);
      {
        if (kp.current = t, $n(!0), v = Nf(e, t, f, i, p, u), y = zf(), t.mode & Wt) {
          mn(!0);
          try {
            v = Nf(e, t, f, i, p, u), y = zf();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return va(), e !== null && !ll ? (wC(e, t, u), Hu(e, t, u)) : (Ur() && y && Xy(t), t.flags |= ei, ya(e, t, v, u), t.child);
    }
    function s0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (cb(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Bf(s), t.tag = Fe, t.type = f, gS(t, s), c0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && el(
            p,
            i,
            // Resolved props
            "prop",
            Rt(s)
          ), a.defaultProps !== void 0) {
            var v = Rt(s) || "Unknown";
            Lp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Lp[v] = !0);
          }
        }
        var y = eE(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, _ = g.propTypes;
        _ && el(
          _,
          i,
          // Resolved props
          "prop",
          Rt(g)
        );
      }
      var w = e.child, M = wS(e, u);
      if (!M) {
        var U = w.memoizedProps, j = a.compare;
        if (j = j !== null ? j : ye, j(U, i) && e.ref === t.ref)
          return Hu(e, t, u);
      }
      t.flags |= ei;
      var le = rc(w, i);
      return le.ref = t.ref, le.return = t, t.child = le, le;
    }
    function c0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Be) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && el(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Rt(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (ye(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ll = !1, t.pendingProps = i = g, wS(e, u))
            (e.flags & Rc) !== be && (ll = !0);
          else return t.lanes = e.lanes, Hu(e, t, u);
      }
      return mS(e, t, a, i, u);
    }
    function f0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ne)
        if ((t.mode & lt) === De) {
          var f = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Fm(t, a);
        } else if (Jr(a, Kr)) {
          var _ = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = _;
          var w = s !== null ? s.baseLanes : a;
          Fm(t, w);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = qe(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = Kr;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, Fm(t, v), null;
        }
      else {
        var M;
        s !== null ? (M = qe(s.baseLanes, a), t.memoizedState = null) : M = a, Fm(t, M);
      }
      return ya(e, t, u, a), t.child;
    }
    function lx(e, t, a) {
      var i = t.pendingProps;
      return ya(e, t, i, a), t.child;
    }
    function ux(e, t, a) {
      var i = t.pendingProps.children;
      return ya(e, t, i, a), t.child;
    }
    function ox(e, t, a) {
      {
        t.flags |= gt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ya(e, t, s, a), t.child;
    }
    function d0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Sn, t.flags |= po);
    }
    function mS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && el(
          s,
          i,
          // Resolved props
          "prop",
          Rt(a)
        );
      }
      var f;
      {
        var p = Ef(t, a, !0);
        f = Cf(t, p);
      }
      var v, y;
      bf(t, u), pa(t);
      {
        if (kp.current = t, $n(!0), v = Nf(e, t, a, i, f, u), y = zf(), t.mode & Wt) {
          mn(!0);
          try {
            v = Nf(e, t, a, i, f, u), y = zf();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return va(), e !== null && !ll ? (wC(e, t, u), Hu(e, t, u)) : (Ur() && y && Xy(t), t.flags |= ei, ya(e, t, v, u), t.child);
    }
    function p0(e, t, a, i, u) {
      {
        switch (xb(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= xe, t.flags |= Xn;
            var y = new Error("Simulated error coming from DevTools"), g = Cs(u);
            t.lanes = qe(t.lanes, g);
            var _ = cS(t, Ks(y, t), g);
            yg(t, _);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var w = a.propTypes;
          w && el(
            w,
            i,
            // Resolved props
            "prop",
            Rt(a)
          );
        }
      }
      var M;
      Bl(a) ? (M = !0, Ah(t)) : M = !1, bf(t, u);
      var U = t.stateNode, j;
      U === null ? (_m(e, t), n0(t, a, i), uS(t, a, i, u), j = !0) : e === null ? j = Kw(t, a, i, u) : j = Jw(e, t, a, i, u);
      var le = yS(e, t, a, j, M, u);
      {
        var Le = t.stateNode;
        j && Le.props !== i && (Js || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ve(t) || "a component"), Js = !0);
      }
      return le;
    }
    function yS(e, t, a, i, u, s) {
      d0(e, t);
      var f = (t.flags & xe) !== be;
      if (!i && !f)
        return u && GE(t, a, !1), Hu(e, t, s);
      var p = t.stateNode;
      kp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, KC();
      else {
        pa(t);
        {
          if ($n(!0), v = p.render(), t.mode & Wt) {
            mn(!0);
            try {
              p.render();
            } finally {
              mn(!1);
            }
          }
          $n(!1);
        }
        va();
      }
      return t.flags |= ei, e !== null && f ? ix(e, t, v, s) : ya(e, t, v, s), t.memoizedState = p.state, u && GE(t, a, !0), t.child;
    }
    function v0(e) {
      var t = e.stateNode;
      t.pendingContext ? QE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && QE(e, t.context, !1), gg(e, t.containerInfo);
    }
    function sx(e, t, a) {
      if (v0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      yC(e, t), Zh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & Er) {
          var g = Ks(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return h0(e, t, p, a, g);
        } else if (p !== s) {
          var _ = Ks(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return h0(e, t, p, a, _);
        } else {
          dw(t);
          var w = cC(t, null, p, a);
          t.child = w;
          for (var M = w; M; )
            M.flags = M.flags & ~hn | Wr, M = M.sibling;
        }
      } else {
        if (wf(), p === s)
          return Hu(e, t, a);
        ya(e, t, p, a);
      }
      return t.child;
    }
    function h0(e, t, a, i, u) {
      return wf(), ng(u), t.flags |= Er, ya(e, t, a, i), t.child;
    }
    function cx(e, t, a) {
      CC(t), e === null && tg(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Ay(i, u);
      return p ? f = null : s !== null && Ay(i, s) && (t.flags |= Da), d0(e, t), ya(e, t, f, a), t.child;
    }
    function fx(e, t) {
      return e === null && tg(t), null;
    }
    function dx(e, t, a, i) {
      _m(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = fb(v), g = il(v, u), _;
      switch (y) {
        case de:
          return gS(t, v), t.type = v = Bf(v), _ = mS(null, t, v, g, i), _;
        case ve:
          return t.type = v = GS(v), _ = p0(null, t, v, g, i), _;
        case Ie:
          return t.type = v = qS(v), _ = o0(null, t, v, g, i), _;
        case ot: {
          if (t.type !== t.elementType) {
            var w = v.propTypes;
            w && el(
              w,
              g,
              // Resolved for outer only
              "prop",
              Rt(v)
            );
          }
          return _ = s0(
            null,
            t,
            v,
            il(v.type, g),
            // The inner type can have defaults too
            i
          ), _;
        }
      }
      var M = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Be && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + M));
    }
    function px(e, t, a, i, u) {
      _m(e, t), t.tag = ve;
      var s;
      return Bl(a) ? (s = !0, Ah(t)) : s = !1, bf(t, u), n0(t, a, i), uS(t, a, i, u), yS(null, t, a, !0, s, u);
    }
    function vx(e, t, a, i) {
      _m(e, t);
      var u = t.pendingProps, s;
      {
        var f = Ef(t, a, !1);
        s = Cf(t, f);
      }
      bf(t, i);
      var p, v;
      pa(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = Rt(a) || "Unknown";
          fS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), fS[y] = !0);
        }
        t.mode & Wt && nl.recordLegacyContextWarning(t, null), $n(!0), kp.current = t, p = Nf(null, t, a, u, s, i), v = zf(), $n(!1);
      }
      if (va(), t.flags |= ei, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = Rt(a) || "Unknown";
        Op[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), Op[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var _ = Rt(a) || "Unknown";
          Op[_] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _, _, _), Op[_] = !0);
        }
        t.tag = ve, t.memoizedState = null, t.updateQueue = null;
        var w = !1;
        return Bl(a) ? (w = !0, Ah(t)) : w = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, mg(t), t0(t, p), uS(t, a, u, i), yS(null, t, a, !0, w, i);
      } else {
        if (t.tag = de, t.mode & Wt) {
          mn(!0);
          try {
            p = Nf(null, t, a, u, s, i), v = zf();
          } finally {
            mn(!1);
          }
        }
        return Ur() && v && Xy(t), ya(null, t, p, i), gS(t, a), t.child;
      }
    }
    function gS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Dr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), vS[u] || (vS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Rt(t) || "Unknown";
          Lp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Lp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Rt(t) || "Unknown";
          pS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), pS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Rt(t) || "Unknown";
          dS[v] || (S("%s: Function components do not support contextType.", v), dS[v] = !0);
        }
      }
    }
    var SS = {
      dehydrated: null,
      treeContext: null,
      retryLane: bt
    };
    function ES(e) {
      return {
        baseLanes: e,
        cachePool: ax(),
        transitions: null
      };
    }
    function hx(e, t) {
      var a = null;
      return {
        baseLanes: qe(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function mx(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Cg(e, Ep);
    }
    function yx(e, t) {
      return Rs(e.childLanes, t);
    }
    function m0(e, t, a) {
      var i = t.pendingProps;
      _b(t) && (t.flags |= xe);
      var u = rl.current, s = !1, f = (t.flags & xe) !== be;
      if (f || mx(u, e) ? (s = !0, t.flags &= ~xe) : (e === null || e.memoizedState !== null) && (u = Uw(u, TC)), u = kf(u), zo(t, u), e === null) {
        tg(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Rx(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var _ = gx(t, y, g, a), w = t.child;
          return w.memoizedState = ES(a), t.memoizedState = SS, _;
        } else
          return CS(t, y);
      } else {
        var M = e.memoizedState;
        if (M !== null) {
          var U = M.dehydrated;
          if (U !== null)
            return Tx(e, t, f, i, U, M, a);
        }
        if (s) {
          var j = i.fallback, le = i.children, Le = Ex(e, t, le, j, a), we = t.child, Ct = e.child.memoizedState;
          return we.memoizedState = Ct === null ? ES(a) : hx(Ct, a), we.childLanes = yx(e, a), t.memoizedState = SS, Le;
        } else {
          var vt = i.children, k = Sx(e, t, vt, a);
          return t.memoizedState = null, k;
        }
      }
    }
    function CS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = RS(u, i);
      return s.return = e, e.child = s, s;
    }
    function gx(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & lt) === De && s !== null ? (p = s, p.childLanes = $, p.pendingProps = f, e.mode & Ot && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = Bo(a, u, i, null)) : (p = RS(f, u), v = Bo(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function RS(e, t, a) {
      return yR(e, t, $, null);
    }
    function y0(e, t) {
      return rc(e, t);
    }
    function Sx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = y0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & lt) === De && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= ba) : p.push(s);
      }
      return t.child = f, f;
    }
    function Ex(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & lt) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = $, y.pendingProps = v, t.mode & Ot && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = y0(f, v), y.subtreeFlags = f.subtreeFlags & Nn;
      var _;
      return p !== null ? _ = rc(p, i) : (_ = Bo(i, s, u, null), _.flags |= hn), _.return = t, y.return = t, y.sibling = _, t.child = y, _;
    }
    function xm(e, t, a, i) {
      i !== null && ng(i), xf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = CS(t, s);
      return f.flags |= hn, t.memoizedState = null, f;
    }
    function Cx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = RS(f, s), v = Bo(i, s, u, null);
      return v.flags |= hn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & lt) !== De && xf(t, e.child, null, u), v;
    }
    function Rx(e, t, a) {
      return (e.mode & lt) === De ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : Py(t) ? e.lanes = Cr : e.lanes = Kr, null;
    }
    function Tx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Er) {
          t.flags &= ~Er;
          var k = oS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return xm(e, t, f, k);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= xe, null;
          var H = i.children, O = i.fallback, G = Cx(e, t, H, O, f), fe = t.child;
          return fe.memoizedState = ES(f), t.memoizedState = SS, G;
        }
      else {
        if (cw(), (t.mode & lt) === De)
          return xm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Py(u)) {
          var p, v, y;
          {
            var g = b1(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var _;
          v ? _ = new Error(v) : _ = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var w = oS(_, p, y);
          return xm(e, t, f, w);
        }
        var M = Jr(f, e.childLanes);
        if (ll || M) {
          var U = Am();
          if (U !== null) {
            var j = zd(U, f);
            if (j !== bt && j !== s.retryLane) {
              s.retryLane = j;
              var le = Xt;
              Fa(e, j), mr(U, e, j, le);
            }
          }
          $S();
          var Le = oS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return xm(e, t, f, Le);
        } else if (PE(u)) {
          t.flags |= xe, t.child = e.child;
          var we = G_.bind(null, e);
          return D1(u, we), null;
        } else {
          pw(t, u, s.treeContext);
          var Ct = i.children, vt = CS(t, Ct);
          return vt.flags |= Wr, vt;
        }
      }
    }
    function g0(e, t, a) {
      e.lanes = qe(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = qe(i.lanes, t)), dg(e.return, t, a);
    }
    function wx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === _e) {
          var u = i.memoizedState;
          u !== null && g0(i, a, e);
        } else if (i.tag === an)
          g0(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function xx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && rm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function _x(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !hS[e])
        if (hS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function bx(e, t) {
      e !== void 0 && !wm[e] && (e !== "collapsed" && e !== "hidden" ? (wm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (wm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function S0(e, t) {
      {
        var a = nt(e), i = !a && typeof Ge(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function Dx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (nt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!S0(e[a], a))
              return;
        } else {
          var i = Ge(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!S0(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function TS(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function E0(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      _x(u), bx(s, u), Dx(f, u), ya(e, t, f, a);
      var p = rl.current, v = Cg(p, Ep);
      if (v)
        p = Rg(p, Ep), t.flags |= xe;
      else {
        var y = e !== null && (e.flags & xe) !== be;
        y && wx(t, t.child, a), p = kf(p);
      }
      if (zo(t, p), (t.mode & lt) === De)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = xx(t.child), _;
            g === null ? (_ = t.child, t.child = null) : (_ = g.sibling, g.sibling = null), TS(
              t,
              !1,
              // isBackwards
              _,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var w = null, M = t.child;
            for (t.child = null; M !== null; ) {
              var U = M.alternate;
              if (U !== null && rm(U) === null) {
                t.child = M;
                break;
              }
              var j = M.sibling;
              M.sibling = w, w = M, M = j;
            }
            TS(
              t,
              !0,
              // isBackwards
              w,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            TS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function kx(e, t, a) {
      gg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = xf(t, null, i, a) : ya(e, t, i, a), t.child;
    }
    var C0 = !1;
    function Ox(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || C0 || (C0 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && el(v, s, "prop", "Context.Provider");
      }
      if (pC(t, u, p), f !== null) {
        var y = f.value;
        if (Q(y, p)) {
          if (f.children === s.children && !zh())
            return Hu(e, t, a);
        } else
          _w(t, u, a);
      }
      var g = s.children;
      return ya(e, t, g, a), t.child;
    }
    var R0 = !1;
    function Lx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (R0 || (R0 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), bf(t, a);
      var f = er(i);
      pa(t);
      var p;
      return kp.current = t, $n(!0), p = s(f), $n(!1), va(), t.flags |= ei, ya(e, t, p, a), t.child;
    }
    function Mp() {
      ll = !0;
    }
    function _m(e, t) {
      (t.mode & lt) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hn);
    }
    function Hu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), KC(), Yp(t.lanes), Jr(a, t.childLanes) ? (ww(e, t), t.child) : null;
    }
    function Mx(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= ba) : s.push(e), a.flags |= hn, a;
      }
    }
    function wS(e, t) {
      var a = e.lanes;
      return !!Jr(a, t);
    }
    function Nx(e, t, a) {
      switch (t.tag) {
        case ee:
          v0(t), t.stateNode, wf();
          break;
        case ue:
          CC(t);
          break;
        case ve: {
          var i = t.type;
          Bl(i) && Ah(t);
          break;
        }
        case Ce:
          gg(t, t.stateNode.containerInfo);
          break;
        case ft: {
          var u = t.memoizedProps.value, s = t.type._context;
          pC(t, s, u);
          break;
        }
        case pt:
          {
            var f = Jr(a, t.childLanes);
            f && (t.flags |= gt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case _e: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return zo(t, kf(rl.current)), t.flags |= xe, null;
            var y = t.child, g = y.childLanes;
            if (Jr(a, g))
              return m0(e, t, a);
            zo(t, kf(rl.current));
            var _ = Hu(e, t, a);
            return _ !== null ? _.sibling : null;
          } else
            zo(t, kf(rl.current));
          break;
        }
        case an: {
          var w = (e.flags & xe) !== be, M = Jr(a, t.childLanes);
          if (w) {
            if (M)
              return E0(e, t, a);
            t.flags |= xe;
          }
          var U = t.memoizedState;
          if (U !== null && (U.rendering = null, U.tail = null, U.lastEffect = null), zo(t, rl.current), M)
            break;
          return null;
        }
        case ke:
        case Ut:
          return t.lanes = $, f0(e, t, a);
      }
      return Hu(e, t, a);
    }
    function T0(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Mx(e, t, eE(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || zh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ll = !0;
        else {
          var s = wS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & xe) === be)
            return ll = !1, Nx(e, t, a);
          (e.flags & Rc) !== be ? ll = !0 : ll = !1;
        }
      } else if (ll = !1, Ur() && aw(t)) {
        var f = t.index, p = iw();
        KE(t, p, f);
      }
      switch (t.lanes = $, t.tag) {
        case ut:
          return vx(e, t, t.type, a);
        case rn: {
          var v = t.elementType;
          return dx(e, t, v, a);
        }
        case de: {
          var y = t.type, g = t.pendingProps, _ = t.elementType === y ? g : il(y, g);
          return mS(e, t, y, _, a);
        }
        case ve: {
          var w = t.type, M = t.pendingProps, U = t.elementType === w ? M : il(w, M);
          return p0(e, t, w, U, a);
        }
        case ee:
          return sx(e, t, a);
        case ue:
          return cx(e, t, a);
        case Ye:
          return fx(e, t);
        case _e:
          return m0(e, t, a);
        case Ce:
          return kx(e, t, a);
        case Ie: {
          var j = t.type, le = t.pendingProps, Le = t.elementType === j ? le : il(j, le);
          return o0(e, t, j, Le, a);
        }
        case yt:
          return lx(e, t, a);
        case dt:
          return ux(e, t, a);
        case pt:
          return ox(e, t, a);
        case ft:
          return Ox(e, t, a);
        case cn:
          return Lx(e, t, a);
        case ot: {
          var we = t.type, Ct = t.pendingProps, vt = il(we, Ct);
          if (t.type !== t.elementType) {
            var k = we.propTypes;
            k && el(
              k,
              vt,
              // Resolved for outer only
              "prop",
              Rt(we)
            );
          }
          return vt = il(we.type, vt), s0(e, t, we, vt, a);
        }
        case Fe:
          return c0(e, t, t.type, t.pendingProps, a);
        case Ft: {
          var H = t.type, O = t.pendingProps, G = t.elementType === H ? O : il(H, O);
          return px(e, t, H, G, a);
        }
        case an:
          return E0(e, t, a);
        case xt:
          break;
        case ke:
          return f0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Uf(e) {
      e.flags |= gt;
    }
    function w0(e) {
      e.flags |= Sn, e.flags |= po;
    }
    var x0, xS, _0, b0;
    x0 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ue || u.tag === Ye)
          t1(e, u.stateNode);
        else if (u.tag !== Ce) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, xS = function(e, t) {
    }, _0 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Sg(), v = r1(f, a, s, i, u, p);
        t.updateQueue = v, v && Uf(t);
      }
    }, b0 = function(e, t, a, i) {
      a !== i && Uf(t);
    };
    function Np(e, t) {
      if (!Ur())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Fr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = $, i = be;
      if (t) {
        if ((e.mode & Ot) !== De) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = qe(a, qe(y.lanes, y.childLanes)), i |= y.subtreeFlags & Nn, i |= y.flags & Nn, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = qe(a, qe(g.lanes, g.childLanes)), i |= g.subtreeFlags & Nn, i |= g.flags & Nn, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ot) !== De) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = qe(a, qe(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = qe(a, qe(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function zx(e, t, a) {
      if (gw() && (t.mode & lt) !== De && (t.flags & xe) === be)
        return aC(t), wf(), t.flags |= Er | ls | Xn, !1;
      var i = Vh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (mw(t), Fr(t), (t.mode & Ot) !== De) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (wf(), (t.flags & xe) === be && (t.memoizedState = null), t.flags |= gt, Fr(t), (t.mode & Ot) !== De) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return iC(), !0;
    }
    function D0(e, t, a) {
      var i = t.pendingProps;
      switch (Ky(t), t.tag) {
        case ut:
        case rn:
        case Fe:
        case de:
        case Ie:
        case yt:
        case dt:
        case pt:
        case cn:
        case ot:
          return Fr(t), null;
        case ve: {
          var u = t.type;
          return Bl(u) && Uh(t), Fr(t), null;
        }
        case ee: {
          var s = t.stateNode;
          if (Df(t), Wy(t), wg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Vh(t);
            if (f)
              Uf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Er) !== be) && (t.flags |= Yn, iC());
            }
          }
          return xS(e, t), Fr(t), null;
        }
        case ue: {
          Eg(t);
          var v = EC(), y = t.type;
          if (e !== null && t.stateNode != null)
            _0(e, t, y, i, v), e.ref !== t.ref && w0(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Fr(t), null;
            }
            var g = Sg(), _ = Vh(t);
            if (_)
              vw(t, v, g) && Uf(t);
            else {
              var w = e1(y, i, v, g, t);
              x0(w, t, !1, !1), t.stateNode = w, n1(w, y, i, v) && Uf(t);
            }
            t.ref !== null && w0(t);
          }
          return Fr(t), null;
        }
        case Ye: {
          var M = i;
          if (e && t.stateNode != null) {
            var U = e.memoizedProps;
            b0(e, t, U, M);
          } else {
            if (typeof M != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = EC(), le = Sg(), Le = Vh(t);
            Le ? hw(t) && Uf(t) : t.stateNode = a1(M, j, le, t);
          }
          return Fr(t), null;
        }
        case _e: {
          Of(t);
          var we = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Ct = zx(e, t, we);
            if (!Ct)
              return t.flags & Xn ? t : null;
          }
          if ((t.flags & xe) !== be)
            return t.lanes = a, (t.mode & Ot) !== De && qg(t), t;
          var vt = we !== null, k = e !== null && e.memoizedState !== null;
          if (vt !== k && vt) {
            var H = t.child;
            if (H.flags |= Mn, (t.mode & lt) !== De) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              O || Cg(rl.current, TC) ? U_() : $S();
            }
          }
          var G = t.updateQueue;
          if (G !== null && (t.flags |= gt), Fr(t), (t.mode & Ot) !== De && vt) {
            var fe = t.child;
            fe !== null && (t.treeBaseDuration -= fe.treeBaseDuration);
          }
          return null;
        }
        case Ce:
          return Df(t), xS(e, t), e === null && K1(t.stateNode.containerInfo), Fr(t), null;
        case ft:
          var oe = t.type._context;
          return fg(oe, t), Fr(t), null;
        case Ft: {
          var He = t.type;
          return Bl(He) && Uh(t), Fr(t), null;
        }
        case an: {
          Of(t);
          var Qe = t.memoizedState;
          if (Qe === null)
            return Fr(t), null;
          var qt = (t.flags & xe) !== be, Nt = Qe.rendering;
          if (Nt === null)
            if (qt)
              Np(Qe, !1);
            else {
              var Wn = F_() && (e === null || (e.flags & xe) === be);
              if (!Wn)
                for (var zt = t.child; zt !== null; ) {
                  var Hn = rm(zt);
                  if (Hn !== null) {
                    qt = !0, t.flags |= xe, Np(Qe, !1);
                    var ia = Hn.updateQueue;
                    return ia !== null && (t.updateQueue = ia, t.flags |= gt), t.subtreeFlags = be, xw(t, a), zo(t, Rg(rl.current, Ep)), t.child;
                  }
                  zt = zt.sibling;
                }
              Qe.tail !== null && In() > q0() && (t.flags |= xe, qt = !0, Np(Qe, !1), t.lanes = xd);
            }
          else {
            if (!qt) {
              var Br = rm(Nt);
              if (Br !== null) {
                t.flags |= xe, qt = !0;
                var ui = Br.updateQueue;
                if (ui !== null && (t.updateQueue = ui, t.flags |= gt), Np(Qe, !0), Qe.tail === null && Qe.tailMode === "hidden" && !Nt.alternate && !Ur())
                  return Fr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              In() * 2 - Qe.renderingStartTime > q0() && a !== Kr && (t.flags |= xe, qt = !0, Np(Qe, !1), t.lanes = xd);
            }
            if (Qe.isBackwards)
              Nt.sibling = t.child, t.child = Nt;
            else {
              var Ea = Qe.last;
              Ea !== null ? Ea.sibling = Nt : t.child = Nt, Qe.last = Nt;
            }
          }
          if (Qe.tail !== null) {
            var Ca = Qe.tail;
            Qe.rendering = Ca, Qe.tail = Ca.sibling, Qe.renderingStartTime = In(), Ca.sibling = null;
            var la = rl.current;
            return qt ? la = Rg(la, Ep) : la = kf(la), zo(t, la), Ca;
          }
          return Fr(t), null;
        }
        case xt:
          break;
        case ke:
        case Ut: {
          BS(t);
          var Yu = t.memoizedState, $f = Yu !== null;
          if (e !== null) {
            var qp = e.memoizedState, Xl = qp !== null;
            Xl !== $f && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ne && (t.flags |= Mn);
          }
          return !$f || (t.mode & lt) === De ? Fr(t) : Jr(ql, Kr) && (Fr(t), t.subtreeFlags & (hn | gt) && (t.flags |= Mn)), null;
        }
        case _t:
          return null;
        case Dt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ux(e, t, a) {
      switch (Ky(t), t.tag) {
        case ve: {
          var i = t.type;
          Bl(i) && Uh(t);
          var u = t.flags;
          return u & Xn ? (t.flags = u & ~Xn | xe, (t.mode & Ot) !== De && qg(t), t) : null;
        }
        case ee: {
          t.stateNode, Df(t), Wy(t), wg();
          var s = t.flags;
          return (s & Xn) !== be && (s & xe) === be ? (t.flags = s & ~Xn | xe, t) : null;
        }
        case ue:
          return Eg(t), null;
        case _e: {
          Of(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            wf();
          }
          var p = t.flags;
          return p & Xn ? (t.flags = p & ~Xn | xe, (t.mode & Ot) !== De && qg(t), t) : null;
        }
        case an:
          return Of(t), null;
        case Ce:
          return Df(t), null;
        case ft:
          var v = t.type._context;
          return fg(v, t), null;
        case ke:
        case Ut:
          return BS(t), null;
        case _t:
          return null;
        default:
          return null;
      }
    }
    function k0(e, t, a) {
      switch (Ky(t), t.tag) {
        case ve: {
          var i = t.type.childContextTypes;
          i != null && Uh(t);
          break;
        }
        case ee: {
          t.stateNode, Df(t), Wy(t), wg();
          break;
        }
        case ue: {
          Eg(t);
          break;
        }
        case Ce:
          Df(t);
          break;
        case _e:
          Of(t);
          break;
        case an:
          Of(t);
          break;
        case ft:
          var u = t.type._context;
          fg(u, t);
          break;
        case ke:
        case Ut:
          BS(t);
          break;
      }
    }
    var O0 = null;
    O0 = /* @__PURE__ */ new Set();
    var bm = !1, jr = !1, Ax = typeof WeakSet == "function" ? WeakSet : Set, ge = null, Af = null, Ff = null;
    function Fx(e) {
      wl(null, function() {
        throw e;
      }), is();
    }
    var jx = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ot)
        try {
          Wl(), t.componentWillUnmount();
        } finally {
          Ql(e);
        }
      else
        t.componentWillUnmount();
    };
    function L0(e, t) {
      try {
        Fo(cr, e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function _S(e, t, a) {
      try {
        jx(e, a);
      } catch (i) {
        sn(e, t, i);
      }
    }
    function Hx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        sn(e, t, i);
      }
    }
    function M0(e, t) {
      try {
        z0(e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function jf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ue && rt && e.mode & Ot)
              try {
                Wl(), i = a(null);
              } finally {
                Ql(e);
              }
            else
              i = a(null);
          } catch (u) {
            sn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
        } else
          a.current = null;
    }
    function Dm(e, t, a) {
      try {
        a();
      } catch (i) {
        sn(e, t, i);
      }
    }
    var N0 = !1;
    function Px(e, t) {
      JT(e.containerInfo), ge = t, Vx();
      var a = N0;
      return N0 = !1, a;
    }
    function Vx() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        (e.subtreeFlags & _l) !== be && t !== null ? (t.return = e, ge = t) : Bx();
      }
    }
    function Bx() {
      for (; ge !== null; ) {
        var e = ge;
        Yt(e);
        try {
          $x(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        on();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function $x(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Yn) !== be) {
        switch (Yt(e), e.tag) {
          case de:
          case Ie:
          case Fe:
            break;
          case ve: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !Js && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : il(e.type, i), u);
              {
                var p = O0;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ve(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case ee: {
            {
              var v = e.stateNode;
              T1(v.containerInfo);
            }
            break;
          }
          case ue:
          case Ye:
          case Ce:
          case Ft:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        on();
      }
    }
    function ul(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Ar) !== ja ? Gi(t) : (e & cr) !== ja && os(t), (e & $l) !== ja && Qp(!0), Dm(t, a, p), (e & $l) !== ja && Qp(!1), (e & Ar) !== ja ? Ol() : (e & cr) !== ja && Td());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Fo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Ar) !== ja ? Rd(t) : (e & cr) !== ja && Dc(t);
            var f = s.create;
            (e & $l) !== ja && Qp(!0), s.destroy = f(), (e & $l) !== ja && Qp(!1), (e & Ar) !== ja ? Nv() : (e & cr) !== ja && zv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & cr) !== be ? v = "useLayoutEffect" : (s.tag & $l) !== be ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Yx(e, t) {
      if ((t.flags & gt) !== be)
        switch (t.tag) {
          case pt: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = qC(), p = t.alternate === null ? "mount" : "update";
            GC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case ee:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
                case pt:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function Ix(e, t, a, i) {
      if ((a.flags & Dl) !== be)
        switch (a.tag) {
          case de:
          case Ie:
          case Fe: {
            if (!jr)
              if (a.mode & Ot)
                try {
                  Wl(), Fo(cr | sr, a);
                } finally {
                  Ql(a);
                }
              else
                Fo(cr | sr, a);
            break;
          }
          case ve: {
            var u = a.stateNode;
            if (a.flags & gt && !jr)
              if (t === null)
                if (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(a) || "instance")), a.mode & Ot)
                  try {
                    Wl(), u.componentDidMount();
                  } finally {
                    Ql(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : il(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(a) || "instance")), a.mode & Ot)
                  try {
                    Wl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Ql(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(a) || "instance")), SC(a, p, u));
            break;
          }
          case ee: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ue:
                    y = a.child.stateNode;
                    break;
                  case ve:
                    y = a.child.stateNode;
                    break;
                }
              SC(a, v, y);
            }
            break;
          }
          case ue: {
            var g = a.stateNode;
            if (t === null && a.flags & gt) {
              var _ = a.type, w = a.memoizedProps;
              s1(g, _, w);
            }
            break;
          }
          case Ye:
            break;
          case Ce:
            break;
          case pt: {
            {
              var M = a.memoizedProps, U = M.onCommit, j = M.onRender, le = a.stateNode.effectDuration, Le = qC(), we = t === null ? "mount" : "update";
              GC() && (we = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, we, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Le);
              {
                typeof U == "function" && U(a.memoizedProps.id, we, le, Le), B_(a);
                var Ct = a.return;
                e: for (; Ct !== null; ) {
                  switch (Ct.tag) {
                    case ee:
                      var vt = Ct.stateNode;
                      vt.effectDuration += le;
                      break e;
                    case pt:
                      var k = Ct.stateNode;
                      k.effectDuration += le;
                      break e;
                  }
                  Ct = Ct.return;
                }
              }
            }
            break;
          }
          case _e: {
            Zx(e, a);
            break;
          }
          case an:
          case Ft:
          case xt:
          case ke:
          case Ut:
          case Dt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      jr || a.flags & Sn && z0(a);
    }
    function Qx(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          if (e.mode & Ot)
            try {
              Wl(), L0(e, e.return);
            } finally {
              Ql(e);
            }
          else
            L0(e, e.return);
          break;
        }
        case ve: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Hx(e, e.return, t), M0(e, e.return);
          break;
        }
        case ue: {
          M0(e, e.return);
          break;
        }
      }
    }
    function Wx(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ue) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? S1(u) : C1(i.stateNode, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
          }
        } else if (i.tag === Ye) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? E1(s) : R1(s, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
        } else if (!((i.tag === ke || i.tag === Ut) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function z0(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ue:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Ot)
            try {
              Wl(), u = t(i);
            } finally {
              Ql(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ve(e)), t.current = i;
      }
    }
    function Gx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function U0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, U0(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ue) {
          var a = e.stateNode;
          a !== null && ew(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function qx(e) {
      for (var t = e.return; t !== null; ) {
        if (A0(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function A0(e) {
      return e.tag === ue || e.tag === ee || e.tag === Ce;
    }
    function F0(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || A0(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ue && t.tag !== Ye && t.tag !== Kt; ) {
          if (t.flags & hn || t.child === null || t.tag === Ce)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hn))
          return t.stateNode;
      }
    }
    function Xx(e) {
      var t = qx(e);
      switch (t.tag) {
        case ue: {
          var a = t.stateNode;
          t.flags & Da && (HE(a), t.flags &= ~Da);
          var i = F0(e);
          DS(e, i, a);
          break;
        }
        case ee:
        case Ce: {
          var u = t.stateNode.containerInfo, s = F0(e);
          bS(e, s, u);
          break;
        }
        // eslint-disable-next-line-no-fallthrough
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function bS(e, t, a) {
      var i = e.tag, u = i === ue || i === Ye;
      if (u) {
        var s = e.stateNode;
        t ? h1(a, s, t) : p1(a, s);
      } else if (i !== Ce) {
        var f = e.child;
        if (f !== null) {
          bS(f, t, a);
          for (var p = f.sibling; p !== null; )
            bS(p, t, a), p = p.sibling;
        }
      }
    }
    function DS(e, t, a) {
      var i = e.tag, u = i === ue || i === Ye;
      if (u) {
        var s = e.stateNode;
        t ? v1(a, s, t) : d1(a, s);
      } else if (i !== Ce) {
        var f = e.child;
        if (f !== null) {
          DS(f, t, a);
          for (var p = f.sibling; p !== null; )
            DS(p, t, a), p = p.sibling;
        }
      }
    }
    var Hr = null, ol = !1;
    function Kx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ue: {
              Hr = i.stateNode, ol = !1;
              break e;
            }
            case ee: {
              Hr = i.stateNode.containerInfo, ol = !0;
              break e;
            }
            case Ce: {
              Hr = i.stateNode.containerInfo, ol = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Hr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        j0(e, t, a), Hr = null, ol = !1;
      }
      Gx(a);
    }
    function jo(e, t, a) {
      for (var i = a.child; i !== null; )
        j0(e, t, i), i = i.sibling;
    }
    function j0(e, t, a) {
      switch (Sd(a), a.tag) {
        case ue:
          jr || jf(a, t);
        // eslint-disable-next-line-no-fallthrough
        case Ye: {
          {
            var i = Hr, u = ol;
            Hr = null, jo(e, t, a), Hr = i, ol = u, Hr !== null && (ol ? y1(Hr, a.stateNode) : m1(Hr, a.stateNode));
          }
          return;
        }
        case Kt: {
          Hr !== null && (ol ? g1(Hr, a.stateNode) : Hy(Hr, a.stateNode));
          return;
        }
        case Ce: {
          {
            var s = Hr, f = ol;
            Hr = a.stateNode.containerInfo, ol = !0, jo(e, t, a), Hr = s, ol = f;
          }
          return;
        }
        case de:
        case Ie:
        case ot:
        case Fe: {
          if (!jr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var _ = g, w = _.destroy, M = _.tag;
                  w !== void 0 && ((M & $l) !== ja ? Dm(a, t, w) : (M & cr) !== ja && (os(a), a.mode & Ot ? (Wl(), Dm(a, t, w), Ql(a)) : Dm(a, t, w), Td())), g = g.next;
                } while (g !== y);
              }
            }
          }
          jo(e, t, a);
          return;
        }
        case ve: {
          if (!jr) {
            jf(a, t);
            var U = a.stateNode;
            typeof U.componentWillUnmount == "function" && _S(a, t, U);
          }
          jo(e, t, a);
          return;
        }
        case xt: {
          jo(e, t, a);
          return;
        }
        case ke: {
          if (
            // TODO: Remove this dead flag
            a.mode & lt
          ) {
            var j = jr;
            jr = j || a.memoizedState !== null, jo(e, t, a), jr = j;
          } else
            jo(e, t, a);
          break;
        }
        default: {
          jo(e, t, a);
          return;
        }
      }
    }
    function Jx(e) {
      e.memoizedState;
    }
    function Zx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && F1(s);
          }
        }
      }
    }
    function H0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Ax()), t.forEach(function(i) {
          var u = q_.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Xr)
              if (Af !== null && Ff !== null)
                Ip(Ff, Af);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function e_(e, t, a) {
      Af = a, Ff = e, Yt(t), P0(t, e), Yt(t), Af = null, Ff = null;
    }
    function sl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Kx(e, t, s);
          } catch (v) {
            sn(s, t, v);
          }
        }
      var f = yl();
      if (t.subtreeFlags & bl)
        for (var p = t.child; p !== null; )
          Yt(p), P0(p, e), p = p.sibling;
      Yt(f);
    }
    function P0(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case de:
        case Ie:
        case ot:
        case Fe: {
          if (sl(t, e), Gl(e), u & gt) {
            try {
              ul($l | sr, e, e.return), Fo($l | sr, e);
            } catch (He) {
              sn(e, e.return, He);
            }
            if (e.mode & Ot) {
              try {
                Wl(), ul(cr | sr, e, e.return);
              } catch (He) {
                sn(e, e.return, He);
              }
              Ql(e);
            } else
              try {
                ul(cr | sr, e, e.return);
              } catch (He) {
                sn(e, e.return, He);
              }
          }
          return;
        }
        case ve: {
          sl(t, e), Gl(e), u & Sn && i !== null && jf(i, i.return);
          return;
        }
        case ue: {
          sl(t, e), Gl(e), u & Sn && i !== null && jf(i, i.return);
          {
            if (e.flags & Da) {
              var s = e.stateNode;
              try {
                HE(s);
              } catch (He) {
                sn(e, e.return, He);
              }
            }
            if (u & gt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    c1(f, g, y, v, p, e);
                  } catch (He) {
                    sn(e, e.return, He);
                  }
              }
            }
          }
          return;
        }
        case Ye: {
          if (sl(t, e), Gl(e), u & gt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var _ = e.stateNode, w = e.memoizedProps, M = i !== null ? i.memoizedProps : w;
            try {
              f1(_, M, w);
            } catch (He) {
              sn(e, e.return, He);
            }
          }
          return;
        }
        case ee: {
          if (sl(t, e), Gl(e), u & gt && i !== null) {
            var U = i.memoizedState;
            if (U.isDehydrated)
              try {
                A1(t.containerInfo);
              } catch (He) {
                sn(e, e.return, He);
              }
          }
          return;
        }
        case Ce: {
          sl(t, e), Gl(e);
          return;
        }
        case _e: {
          sl(t, e), Gl(e);
          var j = e.child;
          if (j.flags & Mn) {
            var le = j.stateNode, Le = j.memoizedState, we = Le !== null;
            if (le.isHidden = we, we) {
              var Ct = j.alternate !== null && j.alternate.memoizedState !== null;
              Ct || z_();
            }
          }
          if (u & gt) {
            try {
              Jx(e);
            } catch (He) {
              sn(e, e.return, He);
            }
            H0(e);
          }
          return;
        }
        case ke: {
          var vt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & lt
          ) {
            var k = jr;
            jr = k || vt, sl(t, e), jr = k;
          } else
            sl(t, e);
          if (Gl(e), u & Mn) {
            var H = e.stateNode, O = e.memoizedState, G = O !== null, fe = e;
            if (H.isHidden = G, G && !vt && (fe.mode & lt) !== De) {
              ge = fe;
              for (var oe = fe.child; oe !== null; )
                ge = oe, n_(oe), oe = oe.sibling;
            }
            Wx(fe, G);
          }
          return;
        }
        case an: {
          sl(t, e), Gl(e), u & gt && H0(e);
          return;
        }
        case xt:
          return;
        default: {
          sl(t, e), Gl(e);
          return;
        }
      }
    }
    function Gl(e) {
      var t = e.flags;
      if (t & hn) {
        try {
          Xx(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        e.flags &= ~hn;
      }
      t & Wr && (e.flags &= ~Wr);
    }
    function t_(e, t, a) {
      Af = a, Ff = t, ge = e, V0(e, t, a), Af = null, Ff = null;
    }
    function V0(e, t, a) {
      for (var i = (e.mode & lt) !== De; ge !== null; ) {
        var u = ge, s = u.child;
        if (u.tag === ke && i) {
          var f = u.memoizedState !== null, p = f || bm;
          if (p) {
            kS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || jr, _ = bm, w = jr;
            bm = p, jr = g, jr && !w && (ge = u, r_(u));
            for (var M = s; M !== null; )
              ge = M, V0(
                M,
                // New root; bubble back up to here and stop.
                t,
                a
              ), M = M.sibling;
            ge = u, bm = _, jr = w, kS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Dl) !== be && s !== null ? (s.return = u, ge = s) : kS(e, t, a);
      }
    }
    function kS(e, t, a) {
      for (; ge !== null; ) {
        var i = ge;
        if ((i.flags & Dl) !== be) {
          var u = i.alternate;
          Yt(i);
          try {
            Ix(t, u, i, a);
          } catch (f) {
            sn(i, i.return, f);
          }
          on();
        }
        if (i === e) {
          ge = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, ge = s;
          return;
        }
        ge = i.return;
      }
    }
    function n_(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        switch (t.tag) {
          case de:
          case Ie:
          case ot:
          case Fe: {
            if (t.mode & Ot)
              try {
                Wl(), ul(cr, t, t.return);
              } finally {
                Ql(t);
              }
            else
              ul(cr, t, t.return);
            break;
          }
          case ve: {
            jf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && _S(t, t.return, i);
            break;
          }
          case ue: {
            jf(t, t.return);
            break;
          }
          case ke: {
            var u = t.memoizedState !== null;
            if (u) {
              B0(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, ge = a) : B0(e);
      }
    }
    function B0(e) {
      for (; ge !== null; ) {
        var t = ge;
        if (t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function r_(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        if (t.tag === ke) {
          var i = t.memoizedState !== null;
          if (i) {
            $0(e);
            continue;
          }
        }
        a !== null ? (a.return = t, ge = a) : $0(e);
      }
    }
    function $0(e) {
      for (; ge !== null; ) {
        var t = ge;
        Yt(t);
        try {
          Qx(t);
        } catch (i) {
          sn(t, t.return, i);
        }
        if (on(), t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function a_(e, t, a, i) {
      ge = t, i_(t, e, a, i);
    }
    function i_(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge, s = u.child;
        (u.subtreeFlags & Qi) !== be && s !== null ? (s.return = u, ge = s) : l_(e, t, a, i);
      }
    }
    function l_(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge;
        if ((u.flags & Qr) !== be) {
          Yt(u);
          try {
            u_(t, u, a, i);
          } catch (f) {
            sn(u, u.return, f);
          }
          on();
        }
        if (u === e) {
          ge = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, ge = s;
          return;
        }
        ge = u.return;
      }
    }
    function u_(e, t, a, i) {
      switch (t.tag) {
        case de:
        case Ie:
        case Fe: {
          if (t.mode & Ot) {
            Gg();
            try {
              Fo(Ar | sr, t);
            } finally {
              Wg(t);
            }
          } else
            Fo(Ar | sr, t);
          break;
        }
      }
    }
    function o_(e) {
      ge = e, s_();
    }
    function s_() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        if ((ge.flags & ba) !== be) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              ge = u, d_(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            ge = e;
          }
        }
        (e.subtreeFlags & Qi) !== be && t !== null ? (t.return = e, ge = t) : c_();
      }
    }
    function c_() {
      for (; ge !== null; ) {
        var e = ge;
        (e.flags & Qr) !== be && (Yt(e), f_(e), on());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function f_(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          e.mode & Ot ? (Gg(), ul(Ar | sr, e, e.return), Wg(e)) : ul(Ar | sr, e, e.return);
          break;
        }
      }
    }
    function d_(e, t) {
      for (; ge !== null; ) {
        var a = ge;
        Yt(a), v_(a, t), on();
        var i = a.child;
        i !== null ? (i.return = a, ge = i) : p_(e);
      }
    }
    function p_(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.sibling, i = t.return;
        if (U0(t), t === e) {
          ge = null;
          return;
        }
        if (a !== null) {
          a.return = i, ge = a;
          return;
        }
        ge = i;
      }
    }
    function v_(e, t) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          e.mode & Ot ? (Gg(), ul(Ar, e, t), Wg(e)) : ul(Ar, e, t);
          break;
        }
      }
    }
    function h_(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          try {
            Fo(cr | sr, e);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ve: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
      }
    }
    function m_(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          try {
            Fo(Ar | sr, e);
          } catch (t) {
            sn(e, e.return, t);
          }
          break;
        }
      }
    }
    function y_(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          try {
            ul(cr | sr, e, e.return);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ve: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && _S(e, e.return, t);
          break;
        }
      }
    }
    function g_(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe:
          try {
            ul(Ar | sr, e, e.return);
          } catch (t) {
            sn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var zp = Symbol.for;
      zp("selector.component"), zp("selector.has_pseudo_class"), zp("selector.role"), zp("selector.test_id"), zp("selector.text");
    }
    var S_ = [];
    function E_() {
      S_.forEach(function(e) {
        return e();
      });
    }
    var C_ = A.ReactCurrentActQueue;
    function R_(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Y0() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && C_.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var T_ = Math.ceil, OS = A.ReactCurrentDispatcher, LS = A.ReactCurrentOwner, Pr = A.ReactCurrentBatchConfig, cl = A.ReactCurrentActQueue, pr = (
      /*             */
      0
    ), I0 = (
      /*               */
      1
    ), Vr = (
      /*                */
      2
    ), Ui = (
      /*                */
      4
    ), Pu = 0, Up = 1, Zs = 2, km = 3, Ap = 4, Q0 = 5, MS = 6, Et = pr, ga = null, Dn = null, vr = $, ql = $, NS = Do($), hr = Pu, Fp = null, Om = $, jp = $, Lm = $, Hp = null, Ha = null, zS = 0, W0 = 500, G0 = 1 / 0, w_ = 500, Vu = null;
    function Pp() {
      G0 = In() + w_;
    }
    function q0() {
      return G0;
    }
    var Mm = !1, US = null, Hf = null, ec = !1, Ho = null, Vp = $, AS = [], FS = null, x_ = 50, Bp = 0, jS = null, HS = !1, Nm = !1, __ = 50, Pf = 0, zm = null, $p = Xt, Um = $, X0 = !1;
    function Am() {
      return ga;
    }
    function Sa() {
      return (Et & (Vr | Ui)) !== pr ? In() : ($p !== Xt || ($p = In()), $p);
    }
    function Po(e) {
      var t = e.mode;
      if ((t & lt) === De)
        return Ae;
      if ((Et & Vr) !== pr && vr !== $)
        return Cs(vr);
      var a = Cw() !== Ew;
      if (a) {
        if (Pr.transition !== null) {
          var i = Pr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Um === bt && (Um = Ld()), Um;
      }
      var u = za();
      if (u !== bt)
        return u;
      var s = i1();
      return s;
    }
    function b_(e) {
      var t = e.mode;
      return (t & lt) === De ? Ae : Pv();
    }
    function mr(e, t, a, i) {
      K_(), X0 && S("useInsertionEffect must not schedule updates."), HS && (Nm = !0), yo(e, a, i), (Et & Vr) !== $ && e === ga ? eb(t) : (Xr && ws(e, t, a), tb(t), e === ga && ((Et & Vr) === pr && (jp = qe(jp, a)), hr === Ap && Vo(e, vr)), Pa(e, i), a === Ae && Et === pr && (t.mode & lt) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !cl.isBatchingLegacy && (Pp(), XE()));
    }
    function D_(e, t, a) {
      var i = e.current;
      i.lanes = t, yo(e, t, a), Pa(e, a);
    }
    function k_(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Et & Vr) !== pr
      );
    }
    function Pa(e, t) {
      var a = e.callbackNode;
      Gc(e, t);
      var i = Wc(e, e === ga ? vr : $);
      if (i === $) {
        a !== null && dR(a), e.callbackNode = null, e.callbackPriority = bt;
        return;
      }
      var u = Nl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(cl.current !== null && a !== QS)) {
        a == null && s !== Ae && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && dR(a);
      var f;
      if (u === Ae)
        e.tag === ko ? (cl.isBatchingLegacy !== null && (cl.didScheduleLegacyUpdate = !0), rw(Z0.bind(null, e))) : qE(Z0.bind(null, e)), cl.current !== null ? cl.current.push(Oo) : u1(function() {
          (Et & (Vr | Ui)) === pr && Oo();
        }), f = null;
      else {
        var p;
        switch (Wv(i)) {
          case Or:
            p = us;
            break;
          case xi:
            p = kl;
            break;
          case Ma:
            p = Wi;
            break;
          case Na:
            p = vu;
            break;
          default:
            p = Wi;
            break;
        }
        f = WS(p, K0.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function K0(e, t) {
      if (Ww(), $p = Xt, Um = $, (Et & (Vr | Ui)) !== pr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = $u();
      if (i && e.callbackNode !== a)
        return null;
      var u = Wc(e, e === ga ? vr : $);
      if (u === $)
        return null;
      var s = !Xc(e, u) && !Hv(e, u) && !t, f = s ? H_(e, u) : jm(e, u);
      if (f !== Pu) {
        if (f === Zs) {
          var p = qc(e);
          p !== $ && (u = p, f = PS(e, p));
        }
        if (f === Up) {
          var v = Fp;
          throw tc(e, $), Vo(e, u), Pa(e, In()), v;
        }
        if (f === MS)
          Vo(e, u);
        else {
          var y = !Xc(e, u), g = e.current.alternate;
          if (y && !L_(g)) {
            if (f = jm(e, u), f === Zs) {
              var _ = qc(e);
              _ !== $ && (u = _, f = PS(e, _));
            }
            if (f === Up) {
              var w = Fp;
              throw tc(e, $), Vo(e, u), Pa(e, In()), w;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, O_(e, f, u);
        }
      }
      return Pa(e, In()), e.callbackNode === a ? K0.bind(null, e) : null;
    }
    function PS(e, t) {
      var a = Hp;
      if (Zc(e)) {
        var i = tc(e, t);
        i.flags |= Er, X1(e.containerInfo);
      }
      var u = jm(e, t);
      if (u !== Zs) {
        var s = Ha;
        Ha = a, s !== null && J0(s);
      }
      return u;
    }
    function J0(e) {
      Ha === null ? Ha = e : Ha.push.apply(Ha, e);
    }
    function O_(e, t, a) {
      switch (t) {
        case Pu:
        case Up:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Zs: {
          nc(e, Ha, Vu);
          break;
        }
        case km: {
          if (Vo(e, a), xu(a) && // do not delay if we're inside an act() scope
          !pR()) {
            var i = zS + W0 - In();
            if (i > 10) {
              var u = Wc(e, $);
              if (u !== $)
                break;
              var s = e.suspendedLanes;
              if (!_u(s, a)) {
                Sa(), Kc(e, s);
                break;
              }
              e.timeoutHandle = Fy(nc.bind(null, e, Ha, Vu), i);
              break;
            }
          }
          nc(e, Ha, Vu);
          break;
        }
        case Ap: {
          if (Vo(e, a), kd(a))
            break;
          if (!pR()) {
            var f = ni(e, a), p = f, v = In() - p, y = X_(v) - v;
            if (y > 10) {
              e.timeoutHandle = Fy(nc.bind(null, e, Ha, Vu), y);
              break;
            }
          }
          nc(e, Ha, Vu);
          break;
        }
        case Q0: {
          nc(e, Ha, Vu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function L_(e) {
      for (var t = e; ; ) {
        if (t.flags & fo) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Q(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & fo && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Vo(e, t) {
      t = Rs(t, Lm), t = Rs(t, jp), $v(e, t);
    }
    function Z0(e) {
      if (Gw(), (Et & (Vr | Ui)) !== pr)
        throw new Error("Should not already be working.");
      $u();
      var t = Wc(e, $);
      if (!Jr(t, Ae))
        return Pa(e, In()), null;
      var a = jm(e, t);
      if (e.tag !== ko && a === Zs) {
        var i = qc(e);
        i !== $ && (t = i, a = PS(e, i));
      }
      if (a === Up) {
        var u = Fp;
        throw tc(e, $), Vo(e, t), Pa(e, In()), u;
      }
      if (a === MS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, nc(e, Ha, Vu), Pa(e, In()), null;
    }
    function M_(e, t) {
      t !== $ && (Jc(e, qe(t, Ae)), Pa(e, In()), (Et & (Vr | Ui)) === pr && (Pp(), Oo()));
    }
    function VS(e, t) {
      var a = Et;
      Et |= I0;
      try {
        return e(t);
      } finally {
        Et = a, Et === pr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !cl.isBatchingLegacy && (Pp(), XE());
      }
    }
    function N_(e, t, a, i, u) {
      var s = za(), f = Pr.transition;
      try {
        return Pr.transition = null, An(Or), e(t, a, i, u);
      } finally {
        An(s), Pr.transition = f, Et === pr && Pp();
      }
    }
    function Bu(e) {
      Ho !== null && Ho.tag === ko && (Et & (Vr | Ui)) === pr && $u();
      var t = Et;
      Et |= I0;
      var a = Pr.transition, i = za();
      try {
        return Pr.transition = null, An(Or), e ? e() : void 0;
      } finally {
        An(i), Pr.transition = a, Et = t, (Et & (Vr | Ui)) === pr && Oo();
      }
    }
    function eR() {
      return (Et & (Vr | Ui)) !== pr;
    }
    function Fm(e, t) {
      ra(NS, ql, e), ql = qe(ql, t);
    }
    function BS(e) {
      ql = NS.current, na(NS, e);
    }
    function tc(e, t) {
      e.finishedWork = null, e.finishedLanes = $;
      var a = e.timeoutHandle;
      if (a !== jy && (e.timeoutHandle = jy, l1(a)), Dn !== null)
        for (var i = Dn.return; i !== null; ) {
          var u = i.alternate;
          k0(u, i), i = i.return;
        }
      ga = e;
      var s = rc(e.current, null);
      return Dn = s, vr = ql = t, hr = Pu, Fp = null, Om = $, jp = $, Lm = $, Hp = null, Ha = null, Dw(), nl.discardPendingWarnings(), s;
    }
    function tR(e, t) {
      do {
        var a = Dn;
        try {
          if (Wh(), xC(), on(), LS.current = null, a === null || a.return === null) {
            hr = Up, Fp = t, Dn = null;
            return;
          }
          if (Ue && a.mode & Ot && Rm(a, !0), je)
            if (va(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              wi(a, i, vr);
            } else
              ss(a, t, vr);
          rx(e, a.return, a, t, vr), iR(a);
        } catch (u) {
          t = u, Dn === a && a !== null ? (a = a.return, Dn = a) : a = Dn;
          continue;
        }
        return;
      } while (!0);
    }
    function nR() {
      var e = OS.current;
      return OS.current = ym, e === null ? ym : e;
    }
    function rR(e) {
      OS.current = e;
    }
    function z_() {
      zS = In();
    }
    function Yp(e) {
      Om = qe(e, Om);
    }
    function U_() {
      hr === Pu && (hr = km);
    }
    function $S() {
      (hr === Pu || hr === km || hr === Zs) && (hr = Ap), ga !== null && (Es(Om) || Es(jp)) && Vo(ga, vr);
    }
    function A_(e) {
      hr !== Ap && (hr = Zs), Hp === null ? Hp = [e] : Hp.push(e);
    }
    function F_() {
      return hr === Pu;
    }
    function jm(e, t) {
      var a = Et;
      Et |= Vr;
      var i = nR();
      if (ga !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Ip(e, vr), u.clear()), Yv(e, t);
        }
        Vu = Ud(), tc(e, t);
      }
      gu(t);
      do
        try {
          j_();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      if (Wh(), Et = a, rR(i), Dn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return kc(), ga = null, vr = $, hr;
    }
    function j_() {
      for (; Dn !== null; )
        aR(Dn);
    }
    function H_(e, t) {
      var a = Et;
      Et |= Vr;
      var i = nR();
      if (ga !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Ip(e, vr), u.clear()), Yv(e, t);
        }
        Vu = Ud(), Pp(), tc(e, t);
      }
      gu(t);
      do
        try {
          P_();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      return Wh(), rR(i), Et = a, Dn !== null ? (Uv(), Pu) : (kc(), ga = null, vr = $, hr);
    }
    function P_() {
      for (; Dn !== null && !vd(); )
        aR(Dn);
    }
    function aR(e) {
      var t = e.alternate;
      Yt(e);
      var a;
      (e.mode & Ot) !== De ? (Qg(e), a = YS(t, e, ql), Rm(e, !0)) : a = YS(t, e, ql), on(), e.memoizedProps = e.pendingProps, a === null ? iR(e) : Dn = a, LS.current = null;
    }
    function iR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & ls) === be) {
          Yt(t);
          var u = void 0;
          if ((t.mode & Ot) === De ? u = D0(a, t, ql) : (Qg(t), u = D0(a, t, ql), Rm(t, !1)), on(), u !== null) {
            Dn = u;
            return;
          }
        } else {
          var s = Ux(a, t);
          if (s !== null) {
            s.flags &= kv, Dn = s;
            return;
          }
          if ((t.mode & Ot) !== De) {
            Rm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= ls, i.subtreeFlags = be, i.deletions = null;
          else {
            hr = MS, Dn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          Dn = v;
          return;
        }
        t = i, Dn = t;
      } while (t !== null);
      hr === Pu && (hr = Q0);
    }
    function nc(e, t, a) {
      var i = za(), u = Pr.transition;
      try {
        Pr.transition = null, An(Or), V_(e, t, a, i);
      } finally {
        Pr.transition = u, An(i);
      }
      return null;
    }
    function V_(e, t, a, i) {
      do
        $u();
      while (Ho !== null);
      if (J_(), (Et & (Vr | Ui)) !== pr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ed(s), u === null)
        return Cd(), null;
      if (s === $ && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = bt;
      var f = qe(u.lanes, u.childLanes);
      Nd(e, f), e === ga && (ga = null, Dn = null, vr = $), ((u.subtreeFlags & Qi) !== be || (u.flags & Qi) !== be) && (ec || (ec = !0, FS = a, WS(Wi, function() {
        return $u(), null;
      })));
      var p = (u.subtreeFlags & (_l | bl | Dl | Qi)) !== be, v = (u.flags & (_l | bl | Dl | Qi)) !== be;
      if (p || v) {
        var y = Pr.transition;
        Pr.transition = null;
        var g = za();
        An(Or);
        var _ = Et;
        Et |= Ui, LS.current = null, Px(e, u), XC(), e_(e, u, s), ZT(e.containerInfo), e.current = u, cs(s), t_(u, e, s), fs(), hd(), Et = _, An(g), Pr.transition = y;
      } else
        e.current = u, XC();
      var w = ec;
      if (ec ? (ec = !1, Ho = e, Vp = s) : (Pf = 0, zm = null), f = e.pendingLanes, f === $ && (Hf = null), w || sR(e.current, !1), yd(u.stateNode, i), Xr && e.memoizedUpdaters.clear(), E_(), Pa(e, In()), t !== null)
        for (var M = e.onRecoverableError, U = 0; U < t.length; U++) {
          var j = t[U], le = j.stack, Le = j.digest;
          M(j.value, {
            componentStack: le,
            digest: Le
          });
        }
      if (Mm) {
        Mm = !1;
        var we = US;
        throw US = null, we;
      }
      return Jr(Vp, Ae) && e.tag !== ko && $u(), f = e.pendingLanes, Jr(f, Ae) ? (Qw(), e === jS ? Bp++ : (Bp = 0, jS = e)) : Bp = 0, Oo(), Cd(), null;
    }
    function $u() {
      if (Ho !== null) {
        var e = Wv(Vp), t = _s(Ma, e), a = Pr.transition, i = za();
        try {
          return Pr.transition = null, An(t), $_();
        } finally {
          An(i), Pr.transition = a;
        }
      }
      return !1;
    }
    function B_(e) {
      AS.push(e), ec || (ec = !0, WS(Wi, function() {
        return $u(), null;
      }));
    }
    function $_() {
      if (Ho === null)
        return !1;
      var e = FS;
      FS = null;
      var t = Ho, a = Vp;
      if (Ho = null, Vp = $, (Et & (Vr | Ui)) !== pr)
        throw new Error("Cannot flush passive effects while already rendering.");
      HS = !0, Nm = !1, yu(a);
      var i = Et;
      Et |= Ui, o_(t.current), a_(t, t.current, a, e);
      {
        var u = AS;
        AS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Yx(t, f);
        }
      }
      wd(), sR(t.current, !0), Et = i, Oo(), Nm ? t === zm ? Pf++ : (Pf = 0, zm = t) : Pf = 0, HS = !1, Nm = !1, gd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function lR(e) {
      return Hf !== null && Hf.has(e);
    }
    function Y_(e) {
      Hf === null ? Hf = /* @__PURE__ */ new Set([e]) : Hf.add(e);
    }
    function I_(e) {
      Mm || (Mm = !0, US = e);
    }
    var Q_ = I_;
    function uR(e, t, a) {
      var i = Ks(a, t), u = a0(e, i, Ae), s = Mo(e, u, Ae), f = Sa();
      s !== null && (yo(s, Ae, f), Pa(s, f));
    }
    function sn(e, t, a) {
      if (Fx(a), Qp(!1), e.tag === ee) {
        uR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === ee) {
          uR(i, e, a);
          return;
        } else if (i.tag === ve) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !lR(s)) {
            var f = Ks(a, e), p = cS(i, f, Ae), v = Mo(i, p, Ae), y = Sa();
            v !== null && (yo(v, Ae, y), Pa(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function W_(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Sa();
      Kc(e, a), nb(e), ga === e && _u(vr, a) && (hr === Ap || hr === km && xu(vr) && In() - zS < W0 ? tc(e, $) : Lm = qe(Lm, a)), Pa(e, u);
    }
    function oR(e, t) {
      t === bt && (t = b_(e));
      var a = Sa(), i = Fa(e, t);
      i !== null && (yo(i, t, a), Pa(i, a));
    }
    function G_(e) {
      var t = e.memoizedState, a = bt;
      t !== null && (a = t.retryLane), oR(e, a);
    }
    function q_(e, t) {
      var a = bt, i;
      switch (e.tag) {
        case _e:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case an:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), oR(e, a);
    }
    function X_(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : T_(e / 1960) * 1960;
    }
    function K_() {
      if (Bp > x_)
        throw Bp = 0, jS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Pf > __ && (Pf = 0, zm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function J_() {
      nl.flushLegacyContextWarning(), nl.flushPendingUnsafeLifecycleWarnings();
    }
    function sR(e, t) {
      Yt(e), Hm(e, xl, y_), t && Hm(e, Ci, g_), Hm(e, xl, h_), t && Hm(e, Ci, m_), on();
    }
    function Hm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== be ? i = i.child : ((i.flags & t) !== be && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Pm = null;
    function cR(e) {
      {
        if ((Et & Vr) !== pr || !(e.mode & lt))
          return;
        var t = e.tag;
        if (t !== ut && t !== ee && t !== ve && t !== de && t !== Ie && t !== ot && t !== Fe)
          return;
        var a = Ve(e) || "ReactComponent";
        if (Pm !== null) {
          if (Pm.has(a))
            return;
          Pm.add(a);
        } else
          Pm = /* @__PURE__ */ new Set([a]);
        var i = ar;
        try {
          Yt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Yt(e) : on();
        }
      }
    }
    var YS;
    {
      var Z_ = null;
      YS = function(e, t, a) {
        var i = gR(Z_, t);
        try {
          return T0(e, t, a);
        } catch (s) {
          if (fw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Wh(), xC(), k0(e, t), gR(t, i), t.mode & Ot && Qg(t), wl(null, T0, null, e, t, a), Yi()) {
            var u = is();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var fR = !1, IS;
    IS = /* @__PURE__ */ new Set();
    function eb(e) {
      if (vi && !$w())
        switch (e.tag) {
          case de:
          case Ie:
          case Fe: {
            var t = Dn && Ve(Dn) || "Unknown", a = t;
            if (!IS.has(a)) {
              IS.add(a);
              var i = Ve(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case ve: {
            fR || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), fR = !0);
            break;
          }
        }
    }
    function Ip(e, t) {
      if (Xr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          ws(e, i, t);
        });
      }
    }
    var QS = {};
    function WS(e, t) {
      {
        var a = cl.current;
        return a !== null ? (a.push(t), QS) : pd(e, t);
      }
    }
    function dR(e) {
      if (e !== QS)
        return Lv(e);
    }
    function pR() {
      return cl.current !== null;
    }
    function tb(e) {
      {
        if (e.mode & lt) {
          if (!Y0())
            return;
        } else if (!R_() || Et !== pr || e.tag !== de && e.tag !== Ie && e.tag !== Fe)
          return;
        if (cl.current === null) {
          var t = ar;
          try {
            Yt(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ve(e));
          } finally {
            t ? Yt(e) : on();
          }
        }
      }
    }
    function nb(e) {
      e.tag !== ko && Y0() && cl.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Qp(e) {
      X0 = e;
    }
    var Ai = null, Vf = null, rb = function(e) {
      Ai = e;
    };
    function Bf(e) {
      {
        if (Ai === null)
          return e;
        var t = Ai(e);
        return t === void 0 ? e : t.current;
      }
    }
    function GS(e) {
      return Bf(e);
    }
    function qS(e) {
      {
        if (Ai === null)
          return e;
        var t = Ai(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Bf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: B,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function vR(e, t) {
      {
        if (Ai === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case ve: {
            typeof i == "function" && (u = !0);
            break;
          }
          case de: {
            (typeof i == "function" || s === Be) && (u = !0);
            break;
          }
          case Ie: {
            (s === B || s === Be) && (u = !0);
            break;
          }
          case ot:
          case Fe: {
            (s === We || s === Be) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Ai(a);
          if (f !== void 0 && f === Ai(i))
            return !0;
        }
        return !1;
      }
    }
    function hR(e) {
      {
        if (Ai === null || typeof WeakSet != "function")
          return;
        Vf === null && (Vf = /* @__PURE__ */ new WeakSet()), Vf.add(e);
      }
    }
    var ab = function(e, t) {
      {
        if (Ai === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        $u(), Bu(function() {
          XS(e.current, i, a);
        });
      }
    }, ib = function(e, t) {
      {
        if (e.context !== ii)
          return;
        $u(), Bu(function() {
          Wp(t, e, null, null);
        });
      }
    };
    function XS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case de:
          case Fe:
          case ve:
            v = p;
            break;
          case Ie:
            v = p.render;
            break;
        }
        if (Ai === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var _ = Ai(v);
          _ !== void 0 && (a.has(_) ? g = !0 : t.has(_) && (f === ve ? g = !0 : y = !0));
        }
        if (Vf !== null && (Vf.has(e) || i !== null && Vf.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var w = Fa(e, Ae);
          w !== null && mr(w, e, Ae, Xt);
        }
        u !== null && !g && XS(u, t, a), s !== null && XS(s, t, a);
      }
    }
    var lb = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return KS(e.current, i, a), a;
      }
    };
    function KS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case de:
          case Fe:
          case ve:
            p = f;
            break;
          case Ie:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? ub(e, a) : i !== null && KS(i, t, a), u !== null && KS(u, t, a);
      }
    }
    function ub(e, t) {
      {
        var a = ob(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ue:
              t.add(i.stateNode);
              return;
            case Ce:
              t.add(i.stateNode.containerInfo);
              return;
            case ee:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function ob(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ue)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var JS;
    {
      JS = !1;
      try {
        var mR = Object.preventExtensions({});
      } catch {
        JS = !0;
      }
    }
    function sb(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = be, this.subtreeFlags = be, this.deletions = null, this.lanes = $, this.childLanes = $, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !JS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var li = function(e, t, a, i) {
      return new sb(e, t, a, i);
    };
    function ZS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function cb(e) {
      return typeof e == "function" && !ZS(e) && e.defaultProps === void 0;
    }
    function fb(e) {
      if (typeof e == "function")
        return ZS(e) ? ve : de;
      if (e != null) {
        var t = e.$$typeof;
        if (t === B)
          return Ie;
        if (t === We)
          return ot;
      }
      return ut;
    }
    function rc(e, t) {
      var a = e.alternate;
      a === null ? (a = li(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = be, a.subtreeFlags = be, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Nn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case ut:
        case de:
        case Fe:
          a.type = Bf(e.type);
          break;
        case ve:
          a.type = GS(e.type);
          break;
        case Ie:
          a.type = qS(e.type);
          break;
      }
      return a;
    }
    function db(e, t) {
      e.flags &= Nn | hn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = $, e.lanes = t, e.child = null, e.subtreeFlags = be, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = be, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function pb(e, t, a) {
      var i;
      return e === Fh ? (i = lt, t === !0 && (i |= Wt, i |= Lt)) : i = De, Xr && (i |= Ot), li(ee, null, null, i);
    }
    function eE(e, t, a, i, u, s) {
      var f = ut, p = e;
      if (typeof e == "function")
        ZS(e) ? (f = ve, p = GS(p)) : p = Bf(p);
      else if (typeof e == "string")
        f = ue;
      else
        e: switch (e) {
          case ci:
            return Bo(a.children, u, s, t);
          case Ia:
            f = dt, u |= Wt, (u & lt) !== De && (u |= Lt);
            break;
          case fi:
            return vb(a, u, s, t);
          case ae:
            return hb(a, u, s, t);
          case he:
            return mb(a, u, s, t);
          case Rn:
            return yR(a, u, s, t);
          case en:
          // eslint-disable-next-line no-fallthrough
          case st:
          // eslint-disable-next-line no-fallthrough
          case un:
          // eslint-disable-next-line no-fallthrough
          case rr:
          // eslint-disable-next-line no-fallthrough
          case it:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case di:
                  f = ft;
                  break e;
                case R:
                  f = cn;
                  break e;
                case B:
                  f = Ie, p = qS(p);
                  break e;
                case We:
                  f = ot;
                  break e;
                case Be:
                  f = rn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var y = i ? Ve(i) : null;
              y && (v += `

Check the render method of \`` + y + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var g = li(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function tE(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = eE(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function Bo(e, t, a, i) {
      var u = li(yt, e, i, t);
      return u.lanes = a, u;
    }
    function vb(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = li(pt, e, i, t | Ot);
      return u.elementType = fi, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function hb(e, t, a, i) {
      var u = li(_e, e, i, t);
      return u.elementType = ae, u.lanes = a, u;
    }
    function mb(e, t, a, i) {
      var u = li(an, e, i, t);
      return u.elementType = he, u.lanes = a, u;
    }
    function yR(e, t, a, i) {
      var u = li(ke, e, i, t);
      u.elementType = Rn, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function nE(e, t, a) {
      var i = li(Ye, e, null, t);
      return i.lanes = a, i;
    }
    function yb() {
      var e = li(ue, null, null, De);
      return e.elementType = "DELETED", e;
    }
    function gb(e) {
      var t = li(Kt, null, null, De);
      return t.stateNode = e, t;
    }
    function rE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = li(Ce, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function gR(e, t) {
      return e === null && (e = li(ut, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function Sb(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = jy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = bt, this.eventTimes = Ts($), this.expirationTimes = Ts(Xt), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = Ts($), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Su; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Fh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case ko:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function SR(e, t, a, i, u, s, f, p, v, y) {
      var g = new Sb(e, t, a, p, v), _ = pb(t, s);
      g.current = _, _.stateNode = g;
      {
        var w = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        _.memoizedState = w;
      }
      return mg(_), g;
    }
    var aE = "18.3.1";
    function Eb(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return $r(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: nr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var iE, lE;
    iE = !1, lE = {};
    function ER(e) {
      if (!e)
        return ii;
      var t = co(e), a = nw(t);
      if (t.tag === ve) {
        var i = t.type;
        if (Bl(i))
          return WE(t, i, a);
      }
      return a;
    }
    function Cb(e, t) {
      {
        var a = co(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Gr(a);
        if (u === null)
          return null;
        if (u.mode & Wt) {
          var s = Ve(a) || "Component";
          if (!lE[s]) {
            lE[s] = !0;
            var f = ar;
            try {
              Yt(u), a.mode & Wt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Yt(f) : on();
            }
          }
        }
        return u.stateNode;
      }
    }
    function CR(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return SR(e, t, v, y, a, i, u, s, f);
    }
    function RR(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, _ = SR(a, i, g, e, u, s, f, p, v);
      _.context = ER(null);
      var w = _.current, M = Sa(), U = Po(w), j = ju(M, U);
      return j.callback = t ?? null, Mo(w, j, U), D_(_, U, M), _;
    }
    function Wp(e, t, a, i) {
      md(t, e);
      var u = t.current, s = Sa(), f = Po(u);
      yn(f);
      var p = ER(a);
      t.context === null ? t.context = p : t.pendingContext = p, vi && ar !== null && !iE && (iE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ve(ar) || "Unknown"));
      var v = ju(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = Mo(u, v, f);
      return y !== null && (mr(y, u, f, s), Jh(y, u, f)), f;
    }
    function Vm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ue:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function Rb(e) {
      switch (e.tag) {
        case ee: {
          var t = e.stateNode;
          if (Zc(t)) {
            var a = Fv(t);
            M_(t, a);
          }
          break;
        }
        case _e: {
          Bu(function() {
            var u = Fa(e, Ae);
            if (u !== null) {
              var s = Sa();
              mr(u, e, Ae, s);
            }
          });
          var i = Ae;
          uE(e, i);
          break;
        }
      }
    }
    function TR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Bv(a.retryLane, t));
    }
    function uE(e, t) {
      TR(e, t);
      var a = e.alternate;
      a && TR(a, t);
    }
    function Tb(e) {
      if (e.tag === _e) {
        var t = ys, a = Fa(e, t);
        if (a !== null) {
          var i = Sa();
          mr(a, e, t, i);
        }
        uE(e, t);
      }
    }
    function wb(e) {
      if (e.tag === _e) {
        var t = Po(e), a = Fa(e, t);
        if (a !== null) {
          var i = Sa();
          mr(a, e, t, i);
        }
        uE(e, t);
      }
    }
    function wR(e) {
      var t = fn(e);
      return t === null ? null : t.stateNode;
    }
    var xR = function(e) {
      return null;
    };
    function xb(e) {
      return xR(e);
    }
    var _R = function(e) {
      return !1;
    };
    function _b(e) {
      return _R(e);
    }
    var bR = null, DR = null, kR = null, OR = null, LR = null, MR = null, NR = null, zR = null, UR = null;
    {
      var AR = function(e, t, a) {
        var i = t[a], u = nt(e) ? e.slice() : Ke({}, e);
        return a + 1 === t.length ? (nt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = AR(e[i], t, a + 1), u);
      }, FR = function(e, t) {
        return AR(e, t, 0);
      }, jR = function(e, t, a, i) {
        var u = t[i], s = nt(e) ? e.slice() : Ke({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], nt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = jR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, HR = function(e, t, a) {
        if (t.length !== a.length) {
          mt("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              mt("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return jR(e, t, a, 0);
      }, PR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = nt(e) ? e.slice() : Ke({}, e);
        return s[u] = PR(e[u], t, a + 1, i), s;
      }, VR = function(e, t, a) {
        return PR(e, t, 0, a);
      }, oE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      bR = function(e, t, a, i) {
        var u = oE(e, t);
        if (u !== null) {
          var s = VR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Ke({}, e.memoizedProps);
          var f = Fa(e, Ae);
          f !== null && mr(f, e, Ae, Xt);
        }
      }, DR = function(e, t, a) {
        var i = oE(e, t);
        if (i !== null) {
          var u = FR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = Ke({}, e.memoizedProps);
          var s = Fa(e, Ae);
          s !== null && mr(s, e, Ae, Xt);
        }
      }, kR = function(e, t, a, i) {
        var u = oE(e, t);
        if (u !== null) {
          var s = HR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Ke({}, e.memoizedProps);
          var f = Fa(e, Ae);
          f !== null && mr(f, e, Ae, Xt);
        }
      }, OR = function(e, t, a) {
        e.pendingProps = VR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Fa(e, Ae);
        i !== null && mr(i, e, Ae, Xt);
      }, LR = function(e, t) {
        e.pendingProps = FR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Fa(e, Ae);
        a !== null && mr(a, e, Ae, Xt);
      }, MR = function(e, t, a) {
        e.pendingProps = HR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Fa(e, Ae);
        i !== null && mr(i, e, Ae, Xt);
      }, NR = function(e) {
        var t = Fa(e, Ae);
        t !== null && mr(t, e, Ae, Xt);
      }, zR = function(e) {
        xR = e;
      }, UR = function(e) {
        _R = e;
      };
    }
    function bb(e) {
      var t = Gr(e);
      return t === null ? null : t.stateNode;
    }
    function Db(e) {
      return null;
    }
    function kb() {
      return ar;
    }
    function Ob(e) {
      var t = e.findFiberByHostInstance, a = A.ReactCurrentDispatcher;
      return vo({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: bR,
        overrideHookStateDeletePath: DR,
        overrideHookStateRenamePath: kR,
        overrideProps: OR,
        overridePropsDeletePath: LR,
        overridePropsRenamePath: MR,
        setErrorHandler: zR,
        setSuspenseHandler: UR,
        scheduleUpdate: NR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: bb,
        findFiberByHostInstance: t || Db,
        // React Refresh
        findHostInstancesForRefresh: lb,
        scheduleRefresh: ab,
        scheduleRoot: ib,
        setRefreshHandler: rb,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: kb,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: aE
      });
    }
    var BR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function sE(e) {
      this._internalRoot = e;
    }
    Bm.prototype.render = sE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : $m(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = wR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Wp(e, t, null, null);
    }, Bm.prototype.unmount = sE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        eR() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Bu(function() {
          Wp(null, e, null, null);
        }), BE(t);
      }
    };
    function Lb(e, t) {
      if (!$m(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      $R(e);
      var a = !1, i = !1, u = "", s = BR;
      t != null && (t.hydrate ? mt("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === _r && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = CR(e, Fh, null, a, i, u, s);
      Oh(f.current, e);
      var p = e.nodeType === Ln ? e.parentNode : e;
      return Zd(p), new sE(f);
    }
    function Bm(e) {
      this._internalRoot = e;
    }
    function Mb(e) {
      e && Jv(e);
    }
    Bm.prototype.unstable_scheduleHydration = Mb;
    function Nb(e, t, a) {
      if (!$m(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      $R(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = BR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = RR(t, null, e, Fh, i, s, f, p, v);
      if (Oh(y.current, e), Zd(e), u)
        for (var g = 0; g < u.length; g++) {
          var _ = u[g];
          Fw(y, _);
        }
      return new Bm(y);
    }
    function $m(e) {
      return !!(e && (e.nodeType === Ir || e.nodeType === $i || e.nodeType === td));
    }
    function Gp(e) {
      return !!(e && (e.nodeType === Ir || e.nodeType === $i || e.nodeType === td || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function $R(e) {
      e.nodeType === Ir && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), cp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var zb = A.ReactCurrentOwner, YR;
    YR = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = wR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = cE(e), u = !!(i && bo(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Ir && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function cE(e) {
      return e ? e.nodeType === $i ? e.documentElement : e.firstChild : null;
    }
    function IR() {
    }
    function Ub(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var w = Vm(f);
            s.call(w);
          };
        }
        var f = RR(
          t,
          i,
          e,
          ko,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = f, Oh(f.current, e);
        var p = e.nodeType === Ln ? e.parentNode : e;
        return Zd(p), Bu(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var w = Vm(g);
            y.call(w);
          };
        }
        var g = CR(
          e,
          ko,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = g, Oh(g.current, e);
        var _ = e.nodeType === Ln ? e.parentNode : e;
        return Zd(_), Bu(function() {
          Wp(t, g, a, i);
        }), g;
      }
    }
    function Ab(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Ym(e, t, a, i, u) {
      YR(a), Ab(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = Ub(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Vm(f);
            p.call(v);
          };
        }
        Wp(t, f, e, u);
      }
      return Vm(f);
    }
    var QR = !1;
    function Fb(e) {
      {
        QR || (QR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = zb.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Rt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Ir ? e : Cb(e, "findDOMNode");
    }
    function jb(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Ym(null, e, t, !0, a);
    }
    function Hb(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Ym(null, e, t, !1, a);
    }
    function Pb(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !uy(e))
        throw new Error("parentComponent must be a valid React Component");
      return Ym(e, t, a, !1, i);
    }
    var WR = !1;
    function Vb(e) {
      if (WR || (WR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = cp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = cE(e), i = a && !bo(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Bu(function() {
          Ym(null, null, e, !1, function() {
            e._reactRootContainer = null, BE(e);
          });
        }), !0;
      } else {
        {
          var u = cE(e), s = !!(u && bo(u)), f = e.nodeType === Ir && Gp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Rr(Rb), go(Tb), Gv(wb), Ds(za), Ad(Iv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), mc($T), ly(VS, N_, Bu);
    function Bb(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!$m(t))
        throw new Error("Target container is not a DOM element.");
      return Eb(e, t, null, a);
    }
    function $b(e, t, a, i) {
      return Pb(e, t, a, i);
    }
    var fE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [bo, Sf, Lh, lo, yc, VS]
    };
    function Yb(e, t) {
      return fE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Lb(e, t);
    }
    function Ib(e, t, a) {
      return fE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Nb(e, t, a);
    }
    function Qb(e) {
      return eR() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Bu(e);
    }
    var Wb = Ob({
      findFiberByHostInstance: Bs,
      bundleType: 1,
      version: aE,
      rendererPackageName: "react-dom"
    });
    if (!Wb && kn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var GR = window.location.protocol;
      /^(https?|file):$/.test(GR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (GR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fE, Ba.createPortal = Bb, Ba.createRoot = Yb, Ba.findDOMNode = Fb, Ba.flushSync = Qb, Ba.hydrate = jb, Ba.hydrateRoot = Ib, Ba.render = Hb, Ba.unmountComponentAtNode = Vb, Ba.unstable_batchedUpdates = VS, Ba.unstable_renderSubtreeIntoContainer = $b, Ba.version = aE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ba;
}
var lT;
function lD() {
  if (lT) return Wm.exports;
  lT = 1;
  function Z() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Z);
      } catch (X) {
        console.error(X);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (Z(), Wm.exports = aD()) : Wm.exports = iD(), Wm.exports;
}
var uT;
function uD() {
  if (uT) return Yf;
  uT = 1;
  var Z = lD();
  if (process.env.NODE_ENV === "production")
    Yf.createRoot = Z.createRoot, Yf.hydrateRoot = Z.hydrateRoot;
  else {
    var X = Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Yf.createRoot = function(A, wt) {
      X.usingClientEntryPoint = !0;
      try {
        return Z.createRoot(A, wt);
      } finally {
        X.usingClientEntryPoint = !1;
      }
    }, Yf.hydrateRoot = function(A, wt, Je) {
      X.usingClientEntryPoint = !0;
      try {
        return Z.hydrateRoot(A, wt, Je);
      } finally {
        X.usingClientEntryPoint = !1;
      }
    };
  }
  return Yf;
}
var fD = uD();
const qm = {
  serverPort: "8082"
}, sT = vE.createContext({
  settings: qm,
  updateSettings: () => {
  }
}), dD = () => vE.useContext(sT), pD = ({ children: Z }) => {
  const [X, A] = vE.useState(() => {
    try {
      const Je = localStorage.getItem("mxlint-settings");
      return Je ? { ...qm, ...JSON.parse(Je) } : qm;
    } catch (Je) {
      return console.error("Failed to load settings from localStorage:", Je), qm;
    }
  }), wt = (Je) => {
    const mt = { ...X, ...Je };
    A(mt);
    try {
      localStorage.setItem("mxlint-settings", JSON.stringify(mt));
    } catch (S) {
      console.error("Failed to save settings to localStorage:", S);
    }
  };
  return /* @__PURE__ */ tD.jsx(sT.Provider, { value: { settings: X, updateSettings: wt }, children: Z });
};
export {
  pD as S,
  fD as c,
  tD as j,
  vE as r,
  dD as u
};
