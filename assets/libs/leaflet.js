/* Leaflet 1.9.4 JS - Version minimale pour Xtranumerik (partie finale) */

        shadowSize: [41, 41]
    };

    // Create default icon
    var DefaultIconProto = extend({}, defaultIconOptions, DefaultIcon);
    DefaultIcon = function(options) {
        return extend(this, DefaultIconProto, options);
    };

    // Popup class (simplified)
    var Popup = Class.extend({
        options: {
            minWidth: 50,
            maxWidth: 300,
            maxHeight: null,
            autoPan: true,
            autoPanPaddingTopLeft: null,
            autoPanPaddingBottomRight: null,
            autoPanPadding: [5, 5],
            keepInView: false,
            closeButton: true,
            autoClose: true,
            closeOnEscapeKey: true,
            closeOnClick: null,
            className: '',
            pane: 'popupPane'
        },

        initialize: function(options, source) {
            extend(this, options);
            this._source = source;
        },

        onAdd: function(map) {
            this._zoomAnimated = map._zoomAnimated;

            if (!this._container) {
                this._initLayout();
            }

            if (map._fadeAnimated) {
                DomUtil.setOpacity(this._container, 0);
            }

            clearTimeout(this._removeTimeout);
            this.getPane().appendChild(this._container);
            this.update();

            if (map._fadeAnimated) {
                DomUtil.setOpacity(this._container, 1);
            }

            this.bringToFront();

            if (this.options.autoPan) {
                this._panIntoView();
            }
        },

        onRemove: function(map) {
            if (map._fadeAnimated) {
                DomUtil.setOpacity(this._container, 0);
                this._removeTimeout = setTimeout(DomUtil.bind(DomUtil.remove, undefined, this._container), 200);
            } else {
                DomUtil.remove(this._container);
            }
        },

        getLatLng: function() {
            return this._latlng;
        },

        setLatLng: function(latlng) {
            this._latlng = toLatLng(latlng);
            if (this._map) {
                this._updatePosition();
                this._adjustPan();
            }
            return this;
        },

        getContent: function() {
            return this._content;
        },

        setContent: function(content) {
            this._content = content;
            this.update();
            return this;
        },

        getElement: function() {
            return this._container;
        },

        update: function() {
            if (!this._map) { return; }

            this._container.style.visibility = 'hidden';

            this._updateContent();
            this._updateLayout();
            this._updatePosition();

            this._container.style.visibility = '';

            this._adjustPan();
        },

        getEvents: function() {
            var events = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };

            if (this._zoomAnimated) {
                events.zoomanim = this._animateZoom;
            }
            return events;
        },

        isOpen: function() {
            return !!this._map && this._map.hasLayer(this);
        },

        bringToFront: function() {
            if (this._map) {
                DomUtil.toFront(this._container);
            }
            return this;
        },

        bringToBack: function() {
            if (this._map) {
                DomUtil.toBack(this._container);
            }
            return this;
        },

        _prepareOpen: function(latlng) {
            var parent = this._source;
            if (!parent._map) { return false; }

            if (parent instanceof FeatureGroup) {
                parent = null;
                var layers = this._source._layers;
                for (var id in layers) {
                    if (layers[id]._map) {
                        parent = layers[id];
                        break;
                    }
                }
                if (!parent) { return false; } // Unable to get source layer.
            }

            if (!latlng) {
                if (parent.getCenter) {
                    latlng = parent.getCenter();
                } else if (parent.getLatLng) {
                    latlng = parent.getLatLng();
                } else if (parent._latlng) {
                    latlng = parent._latlng;
                } else {
                    throw new Error('Unable to get source layer LatLng.');
                }
            }
            this.setLatLng(latlng);

            if (this._map) {
                // Already open on this map.
                return true;
            }

            if (this._map) {
                this._map.removeLayer(this);
            }

            return true;
        },

        _updateContent: function() {
            if (!this._content) { return; }

            var node = this._contentNode;
            var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

            if (typeof content === 'string') {
                node.innerHTML = content;
            } else {
                while (node.hasChildNodes()) {
                    node.removeChild(node.firstChild);
                }
                node.appendChild(content);
            }

            this.fire('contentupdate');
        },

        _updatePosition: function() {
            if (!this._map) { return; }

            var pos = this._map.latLngToLayerPoint(this._latlng),
                offset = toPoint(this.options.offset),
                anchor = this._getAnchor();

            if (this._zoomAnimated) {
                DomUtil.setPosition(this._container, pos.add(anchor));
            } else {
                offset = offset.add(pos).add(anchor);
            }

            var bottom = this._containerBottom = -offset.y,
                left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

            this._container.style.bottom = bottom + 'px';
            this._container.style.left = left + 'px';
        },

        _getAnchor: function() {
            return [0, 0];
        },

        _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
                anchor = this._getAnchor();
            DomUtil.setPosition(this._container, pos.add(anchor));
        },

        _adjustPan: function() {
            if (!this.options.autoPan) { return; }
            if (this._map._panAnim) { this._map._panAnim.stop(); }

            var map = this._map,
                marginBottom = parseInt(DomUtil.getStyle(this._container, 'marginBottom'), 10) || 0,
                containerHeight = this._container.offsetHeight + marginBottom,
                containerWidth = this._containerWidth,
                layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

            layerPos._add(DomUtil.getPosition(this._container));

            var containerPos = map.layerPointToContainerPoint(layerPos),
                padding = toPoint(this.options.autoPanPadding),
                paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
                paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
                size = map.getSize(),
                dx = 0,
                dy = 0;

            if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
                dx = containerPos.x + containerWidth - size.x + paddingBR.x;
            }
            if (containerPos.x - dx - paddingTL.x < 0) { // left
                dx = containerPos.x - paddingTL.x;
            }
            if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
                dy = containerPos.y + containerHeight - size.y + paddingBR.y;
            }
            if (containerPos.y - dy - paddingTL.y < 0) { // top
                dy = containerPos.y - paddingTL.y;
            }

            if (dx || dy) {
                if (this.options.keepInView) {
                    this._autopanning = true;
                }
                map
                    .fire('autopanstart')
                    .panBy([dx, dy]);
            }
        },

        _onCloseButtonClick: function(e) {
            this._close();
            DomEvent.stopPropagation(e);
        },

        _getCloseButton: function() {
            var closeButton = DomUtil.create('a', 'leaflet-popup-close-button', this._wrapper);
            closeButton.setAttribute('role', 'button'); // overrides the implicit role=link of <a> elements #7399
            closeButton.setAttribute('aria-label', 'Close popup');
            closeButton.href = '#close';
            closeButton.innerHTML = '<span aria-hidden="true">&#215;</span>';

            DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);

            return closeButton;
        },

        _initLayout: function() {
            var prefix = 'leaflet-popup',
                container = this._container = DomUtil.create('div',
                    prefix + ' ' + (this.options.className || '') +
                    ' leaflet-zoom-animated');

            var wrapper = this._wrapper = DomUtil.create('div', prefix + '-content-wrapper', container);
            this._contentNode = DomUtil.create('div', prefix + '-content', wrapper);

            DomEvent.disableClickPropagation(this._contentNode);
            DomEvent.disableScrollPropagation(this._contentNode);

            if (this.options.closeButton) {
                var closeButton = this._closeButton = this._getCloseButton();
                wrapper.appendChild(closeButton);
            }

            var tip = this._tip = DomUtil.create('div', prefix + '-tip-container', container);
            DomUtil.create('div', prefix + '-tip', tip);
        },

        _updateLayout: function() {
            var container = this._contentNode,
                style = container.style;

            style.width = '';
            style.whiteSpace = 'nowrap';

            var width = container.offsetWidth;
            width = Math.min(width, this.options.maxWidth);
            width = Math.max(width, this.options.minWidth);

            style.width = (width + 1) + 'px';
            style.whiteSpace = '';

            style.height = '';

            var height = container.offsetHeight,
                maxHeight = this.options.maxHeight;

            if (maxHeight && height > maxHeight) {
                style.height = maxHeight + 'px';
                DomUtil.addClass(container, 'leaflet-popup-scrolled');
            } else {
                DomUtil.removeClass(container, 'leaflet-popup-scrolled');
            }

            this._containerWidth = this._container.offsetWidth;
        },

        _animateZoom: function(e) {
            var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
                anchor = this._getAnchor();
            DomUtil.setPosition(this._container, pos.add(anchor));
        },

        _adjustPan: function() {
            if (!this.options.autoPan || (this._map._panAnim && this._map._panAnim._inProgress)) { return; }

            if (this._autopanning) {
                this._autopanning = false;
                return;
            }

            var map = this._map,
                marginBottom = parseInt(DomUtil.getStyle(this._container, 'marginBottom'), 10) || 0,
                containerHeight = this._container.offsetHeight + marginBottom,
                containerWidth = this._containerWidth,
                layerPos = new Point(this._containerLeft, -containerHeight - this._containerBottom);

            layerPos._add(DomUtil.getPosition(this._container));

            var containerPos = map.layerPointToContainerPoint(layerPos),
                padding = toPoint(this.options.autoPanPadding),
                paddingTL = toPoint(this.options.autoPanPaddingTopLeft || padding),
                paddingBR = toPoint(this.options.autoPanPaddingBottomRight || padding),
                size = map.getSize(),
                dx = 0,
                dy = 0;

            if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
                dx = containerPos.x + containerWidth - size.x + paddingBR.x;
            }
            if (containerPos.x - dx - paddingTL.x < 0) { // left
                dx = containerPos.x - paddingTL.x;
            }
            if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
                dy = containerPos.y + containerHeight - size.y + paddingBR.y;
            }
            if (containerPos.y - dy - paddingTL.y < 0) { // top
                dy = containerPos.y - paddingTL.y;
            }

            // Disable repositioning with keepInView option
            if (this.options.keepInView && (dx || dy)) {
                map.fire('autopanstart').panBy([dx, dy]);
            }
        }
    });

    // Add popup functionality to layers
    Layer.include({
        bindPopup: function(content, options) {
            if (this._popup) {
                this.unbindPopup();
            }

            this._popup = new Popup(options, this)
                .setContent(content);

            if (!this._popupHandlersAdded) {
                this.on({
                    click: this._openPopup,
                    keypress: this._onKeyPress,
                    remove: this.closePopup,
                    move: this._movePopup
                });
                this._popupHandlersAdded = true;
            }

            return this;
        },

        unbindPopup: function() {
            if (this._popup) {
                this.off({
                    click: this._openPopup,
                    keypress: this._onKeyPress,
                    remove: this.closePopup,
                    move: this._movePopup
                });
                this._popupHandlersAdded = false;
                this._popup = null;
            }
            return this;
        },

        openPopup: function(latlng) {
            if (this._popup) {
                if (this._popup._prepareOpen(latlng || this._latlng)) {
                    this._map.addLayer(this._popup);
                }
            }
            return this;
        },

        closePopup: function() {
            if (this._popup) {
                this._popup._close();
            }
            return this;
        },

        togglePopup: function() {
            if (this._popup) {
                if (this._popup.isOpen()) {
                    this.closePopup();
                } else {
                    this.openPopup();
                }
            }
            return this;
        },

        isPopupOpen: function() {
            return (this._popup ? this._popup.isOpen() : false);
        },

        setPopupContent: function(content) {
            if (this._popup) {
                this._popup.setContent(content);
            }
            return this;
        },

        getPopup: function() {
            return this._popup;
        },

        _openPopup: function(e) {
            if (!this._popup || !this._map) {
                return;
            }

            DomEvent.stopPropagation(e);

            var target = e.layer || e.target;

            if (this._popup._source === target && !(target instanceof Path)) {
                if (this._map.hasLayer(this._popup)) {
                    this.closePopup();
                } else {
                    this.openPopup(e.latlng);
                }
                return;
            }
            this._popup._source = target;
            this.openPopup(e && e.latlng);
        },

        _movePopup: function(e) {
            this._popup.setLatLng(e.latlng);
        },

        _onKeyPress: function(e) {
            if (e.originalEvent.keyCode === 13) {
                this._openPopup(e);
            }
        }
    });

    // Export everything
    exports.version = version;
    exports.Class = Class;
    exports.Evented = Class; // For compatibility
    exports.Mixin = { Events: Events };
    exports.Util = Util;
    exports.extend = extend;
    exports.bind = DomUtil.bind;
    exports.stamp = stamp;
    exports.setOptions = DomUtil.setOptions;

    // Geometry
    exports.Point = Point;
    exports.point = toPoint;
    exports.Bounds = Bounds;
    exports.bounds = toBounds;
    exports.LatLng = LatLng;
    exports.latLng = toLatLng;
    exports.LatLngBounds = LatLngBounds;
    exports.latLngBounds = toLatLngBounds;
    exports.Transformation = Transformation;
    exports.transformation = toTransformation;

    // CRS
    exports.CRS = CRS;
    exports.Projection = {};
    exports.Projection.SphericalMercator = SphericalMercator;

    // Map
    exports.Map = Map;
    exports.map = createMap;

    // Layers
    exports.Layer = Layer;
    exports.TileLayer = TileLayer;
    exports.tileLayer = function(url, options) {
        return new TileLayer(url, options);
    };

    exports.Marker = Marker;
    exports.marker = function(latlng, options) {
        return new Marker(latlng, options);
    };

    // Popup
    exports.Popup = Popup;
    exports.popup = function(options, source) {
        return new Popup(options, source);
    };

    // Icon
    exports.Icon = DefaultIcon;
    exports.icon = function(options) {
        return new DefaultIcon(options);
    };

    // DOM utilities
    exports.DomUtil = DomUtil;
    exports.DomEvent = DomEvent;

    // Set default CRS
    if (!Map.prototype.options.crs) {
        Map.prototype.options.crs = EPSG3857;
    }

    // Set default icon
    DefaultIcon = function(options) {
        return extend(Object.create(DefaultIconProto), options);
    };

    // Ensure marker has default icon
    if (!Marker.prototype.options.icon) {
        Marker.prototype.options.icon = new DefaultIcon();
    }

})));

// Auto-assign to global L if not already defined
if (typeof window !== 'undefined' && !window.L) {
    window.L = exports;
}
