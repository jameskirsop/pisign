/* screenly-ose ui
*/


(function() {
  var API, App, Asset, AssetRowView, Assets, AssetsView, EditAssetView, date_to, bool_to, delay, get_filename, get_mimetype, get_template, insertWbr, mimetypes, now, url_test, routes, Schedule, EditScheduleView, ScheduleRowView, Schedules, SchedulesView, assetNiceName, Shutdown, Shutdowns, ShutdownRowView, ShutdownsView, EditShutdownView
    _this = this,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  API = (window.Screenly || (window.Screenly = {}));

  API.date_to = date_to = function(d) {
    var dd;
    if(d == now()){
      dd = moment(new Date(d));
    } else {
      dd = moment.utc(new Date(d));
    }
    return {
      string: function() {
        return moment.utc(dd).format('MM/DD/YYYY hh:mm:ss A');
      },
      date: function() {
        return dd.format('MM/DD/YYYY');
      },
      time: function() {
        return dd.format('hh:mm A');
      },
      moment: function() {
        return dd;
      }
    };
  };

  API.bool_to = bool_to = function(boolVal) {
    if(boolVal == 0) {
      return "No";
    } else if(boolVal == 1) {
      return "Yes";
    } else{
      return "";
    }
  }

  now = function() {
    return new Date();
  };

  get_template = function(name) {
    return _.template(($("#" + name + "-template")).html());
  };

  // _.templateSettings = {
  //   evaluate    : /\{\{([\s\S]+?)\}\}/g,
  //   interpolate : /\{\{=([\s\S]+?)\}\}/g,
  //   escape      : /\{\{-([\s\S]+?)\}\}/g
  // };

  delay = function(wait, fn) {
    return _.delay(fn, wait);
  };

  mimetypes = [['jpg jpeg png pnm gif bmp'.split(' '), 'image'], ['avi mkv mov mpg mpeg mp4 ts flv'.split(' '), 'video']];

  get_mimetype = function(filename) {
    var ext, mt;
    ext = (_.last(filename.split('.'))).toLowerCase();
    mt = _.find(mimetypes, function(mt) {
      return __indexOf.call(mt[0], ext) >= 0;
    });
    if (mt) {
      return mt[1];
    } else {
      return null;
    }
  };

  url_test = function(v) {
    return /(http|https):\/\/[\w-]+(\.?[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(v);
  };

  get_filename = function(v) {
    return (v.replace(/[\/\\\s]+$/g, '')).replace(/^.*[\\\/]/g, '');
  };

  insertWbr = function(v) {
    return (v.replace(/\//g, '/<wbr>')).replace(/\&/g, '&amp;<wbr>');
  };

  Backbone.emulateJSON = true;

  API.Asset = Asset = (function(_super) {

    __extends(Asset, _super);

    function Asset() {
      var _this = this;
      this.defaults = function() {
        return Asset.prototype.defaults.apply(_this, arguments);
      };
      return Asset.__super__.constructor.apply(this, arguments);
    }

    Asset.prototype.idAttribute = "asset_id";

    Asset.prototype.fields = 'name mimetype is_enabled duration uri'.split(' ');

    Asset.prototype.defaults = function() {
      return {
        name: '',
        mimetype: 'webpage',
        uri: '',
        duration: 0,
        is_enabled: 0,
        nocache: 0
      };
    };

    return Asset;

  })(Backbone.Model);

  API.Assets = Assets = (function(_super) {

    __extends(Assets, _super);

    function Assets() {
      return Assets.__super__.constructor.apply(this, arguments);
    }

    Assets.prototype.url = "/api/assets";

    Assets.prototype.model = Asset;

    return Assets;

  })(Backbone.Collection);

  EditAssetView = (function(_super) {

    __extends(EditAssetView, _super);

    function EditAssetView() {
      var _this = this;
      this.displayAdvanced = function() {
        return EditAssetView.prototype.displayAdvanced.apply(_this, arguments);
      };
      this.toggleAdvanced = function() {
        return EditAssetView.prototype.toggleAdvanced.apply(_this, arguments);
      };
      this.updateMimetype = function(filename) {
        return EditAssetView.prototype.updateMimetype.apply(_this, arguments);
      };
      this.updateFileUploadMimetype = function() {
        return EditAssetView.prototype.updateFileUploadMimetype.apply(_this, arguments);
      };
      this.updateUriMimetype = function() {
        return EditAssetView.prototype.updateUriMimetype.apply(_this, arguments);
      };
      // this.clickTabNavUpload = function(e) {
      //   return EditAssetView.prototype.clickTabNavUpload.apply(_this, arguments);
      // };
      // this.clickTabNavUri = function(e) {
      //   return EditAssetView.prototype.clickTabNavUri.apply(_this, arguments);
      // };
      this.cancel = function(e) {
        return EditAssetView.prototype.cancel.apply(_this, arguments);
      };
      this.validate = function(e) {
        return EditAssetView.prototype.validate.apply(_this, arguments);
      };
      this.change = function(e) {
        return EditAssetView.prototype.change.apply(_this, arguments);
      };
      this.save = function(e) {
        return EditAssetView.prototype.save.apply(_this, arguments);
      };
      this.viewmodel = function() {
        return EditAssetView.prototype.viewmodel.apply(_this, arguments);
      };
      this.render = function() {
        return EditAssetView.prototype.render.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return EditAssetView.prototype.initialize.apply(_this, arguments);
      };
      this.$fv = function() {
        var field, val;
        field = arguments[0], val = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return EditAssetView.prototype.$fv.apply(_this, arguments);
      };
      this.$f = function(field) {
        return EditAssetView.prototype.$f.apply(_this, arguments);
      };
      return EditAssetView.__super__.constructor.apply(this, arguments);
    }

    EditAssetView.prototype.$f = function(field) {
      return this.$("[name='" + field + "']");
    };

    EditAssetView.prototype.$fv = function() {
      var field, val, _ref;
      field = arguments[0], val = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.$f(field)).val.apply(_ref, val);
    };

    EditAssetView.prototype.initialize = function(options) {
      var _this = this;
      this.edit = options.edit;
      ($('body')).append(this.$el.html(get_template('asset-modal')));
      (this.$('input.time')).timepicker({
        minuteStep: 5,
        showInputs: true,
        disableFocus: true,
        showMeridian: true
      });
      (this.$('input[name="nocache"]')).prop('checked', this.model.get('nocache'));
      (this.$('.modal-header .close')).remove();
      (this.$el.children(":first")).modal();
      this.model.bind('change', this.render);
      this.render();
      this.validate();
      _.delay((function() {
        return (_this.$f('uri')).focus();
      }), 300);
      return false;
    };

    EditAssetView.prototype.render = function() {
      var d, f, field, which, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      this.undelegateEvents();
      if (this.edit) {
        _ref = 'mimetype uri file_upload'.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          (this.$(f)).attr('disabled', true);
        }
        (this.$('#modalLabel')).text("Edit Asset");
        (this.$('.asset-location')).hide();
        (this.$('.asset-location.edit')).show();
      }
      (this.$('.duration')).toggle((this.model.get('mimetype')) !== 'video');
      if ((this.model.get('mimetype')) === 'webpage') {
        this.clickTabNavUri();
      }
      _ref1 = this.model.fields;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        field = _ref1[_j];
        if ((this.$fv(field)) !== this.model.get(field)) {
          this.$fv(field, this.model.get(field));
        }
      }
      (this.$('.uri-text')).html(insertWbr(this.model.get('uri')));
      _ref2 = ['start', 'end'];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        which = _ref2[_k];
        d = date_to(this.model.get("" + which + "_date"));
        this.$fv("" + which + "_date_date", d.date());
        (this.$f("" + which + "_date_date")).datepicker({
          autoclose: true
        });
        (this.$f("" + which + "_date_date")).datepicker('setValue', d.date());
        this.$fv("" + which + "_date_time", d.time());
      }
      this.displayAdvanced();
      this.delegateEvents();
      return false;
    };

    EditAssetView.prototype.viewmodel = function() {
      var field, which, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref1 = this.model.fields;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        field = _ref1[_j];
        if (!(this.$f(field)).prop('disabled')) {
          _results.push(this.model.set(field, this.$fv(field), {
            silent: true
          }));
        }
      }
      return _results;
    };

    EditAssetView.prototype.events = {
      'submit form': 'save',
      'click .cancel': 'cancel',
      'change': 'change',
      'keyup': 'change',
      // 'click #tabUri-tab': 'clickTabNavUri',
      // 'click #tabFile-tab': 'clickTabNavUpload',
      // 'click #tabUri-nav, #tabFile-nav': 'displayAdvanced',
      // 'click .advanced-toggle': 'toggleAdvanced',
      'paste [name=uri]': 'updateUriMimetype',
      'change [name=file_upload]': 'updateFileUploadMimetype'
    };

    EditAssetView.prototype.save = function(e) {
      var save,
        _this = this;
      e.preventDefault();
      this.viewmodel();
      save = null;
      this.model.set('nocache', (this.$('input[name="nocache"]')).prop('checked') ? 1 : 0);
      if ((this.$('#tabFile')).hasClass('active')) {
        if (!this.$fv('name')) {
          this.$fv('name', get_filename(this.$fv('file_upload')));
        }
        (this.$('.progress')).show();
        this.$el.fileupload({
          url: this.model.url(),
          progressall: function(e, data) {
            if (data.loaded && data.total) {
              return (_this.$('.progress .bar')).css('width', "" + (data.loaded / data.total * 100) + "%");
            }
          }
        });
        save = this.$el.fileupload('send', {
          fileInput: this.$f('file_upload')
        });
      } else {
        if (!this.model.get('name')) {
          if (get_mimetype(this.model.get('uri'))) {
            this.model.set({
              name: get_filename(this.model.get('uri'))
            }, {
              silent: true
            });
          } else {
            this.model.set({
              name: this.model.get('uri')
            }, {
              silent: true
            });
          }
        }
        save = this.model.save();
      }
      (this.$('input, select')).prop('disabled', true);
      save.done(function(data) {
        _this.model.id = data.asset_id;
        if (!_this.model.collection) {
          _this.collection.add(_this.model);
        }
        (_this.$el.children(":first")).modal('hide');
        _.extend(_this.model.attributes, data);
        if (!_this.edit) {
          return _this.model.collection.add(_this.model);
        }
      });
      save.fail(function() {
        (_this.$('.progress')).hide();
        return (_this.$('input, select')).prop('disabled', false);
      });
      return false;
    };

    EditAssetView.prototype.change = function(e) {
      var _this = this;
      this._change || (this._change = _.throttle((function() {
        _this.viewmodel();
        _this.model.trigger('change');
        _this.validate();
        return true;
      }), 500));
      return this._change.apply(this, arguments);
    };

    EditAssetView.prototype.validate = function(e) {
      var errors, field, fn, that, v, validators, _i, _len, _ref, _results,
        _this = this;
      that = this;
      validators = {
        uri: function(v) {
          if (_this.model.isNew() && ((that.$('#tabUri')).hasClass('active')) && !url_test(v)) {
            return 'please enter a valid URL';
          }
        },
        file_upload: function(v) {
          if (_this.model.isNew() && !v && !(that.$('#tabUri')).hasClass('active')) {
            return 'please select a file';
          }
        }
      };
      errors = (function() {
        var _results;
        _results = [];
        for (field in validators) {
          fn = validators[field];
          if (v = fn(this.$fv(field))) {
            _results.push([field, v]);
          }
        }
        return _results;
      }).call(this);
      (this.$(".control-group.warning .help-inline.warning")).remove();
      (this.$(".control-group")).removeClass('warning');
      (this.$('[type=submit]')).prop('disabled', false);
      _results = [];
      for (_i = 0, _len = errors.length; _i < _len; _i++) {
        _ref = errors[_i], field = _ref[0], v = _ref[1];
        (this.$('[type=submit]')).prop('disabled', true);
        (this.$(".control-group." + field)).addClass('warning');
        _results.push((this.$(".control-group." + field + " .controls")).append($("<span class='help-inline warning'>" + v + "</span>")));
      }
      return _results;
    };

    EditAssetView.prototype.cancel = function(e) {
      this.model.set(this.model.previousAttributes());
      if (!this.edit) {
        this.model.destroy();
      }
      return (this.$el.children(":first")).modal('hide');
    };

    EditAssetView.prototype.clickTabNavUri = function(e) {
    //   if (!(this.$('#tabUri')).hasClass('active')) {
    //     (this.$('.tab-pane')).removeClass('active');
    //     (this.$('#tabUri-tab')).addClass('active');
    //     (this.$('#tabUri')).addClass('active');
    //     (this.$f('uri')).focus();
    //     this.updateUriMimetype();
    //   }
      return false;
    };

    EditAssetView.prototype.clickTabNavUpload = function(e) {
    //   if (!(this.$('#tabFile')).hasClass('active')) {
    //     (this.$('.tab-pane')).removeClass('active');
    //     (this.$('#tabFile-tab')).addClass('active');
    //     (this.$('#tabFile')).addClass('active');
    //     if ((this.$fv('mimetype')) === 'webpage') {
    //       this.$fv('mimetype', 'image');
    //     }
    //     this.updateFileUploadMimetype;
    //   }
      return false;
    };

    EditAssetView.prototype.updateUriMimetype = function() {
      var _this = this;
      return _.defer(function() {
        return _this.updateMimetype(_this.$fv('uri'));
      });
    };

    EditAssetView.prototype.updateFileUploadMimetype = function() {
      var _this = this;
      return _.defer(function() {
        return _this.updateMimetype(_this.$fv('file_upload'));
      });
    };

    EditAssetView.prototype.updateMimetype = function(filename) {
      var mt;
      mt = get_mimetype(filename);
      (this.$('#file_upload_label')).text(get_filename(filename));
      if (mt) {
        return this.$fv('mimetype', mt);
      }
    };

    EditAssetView.prototype.toggleAdvanced = function() {
      (this.$('.icon-play')).toggleClass('rotated');
      (this.$('.icon-play')).toggleClass('unrotated');
      return (this.$('.collapse-advanced')).collapse('toggle');
    };

    EditAssetView.prototype.displayAdvanced = function() {
      var edit, has_nocache, img, on_uri_tab;
      img = 'image' === this.$fv('mimetype');
      on_uri_tab = !this.edit && (this.$('#tab-uri')).hasClass('active');
      edit = this.edit && url_test(this.model.get('uri'));
      has_nocache = img && (on_uri_tab || edit);
      return (this.$('.advanced-accordion')).toggle(has_nocache === true);
    };

    return EditAssetView;

  })(Backbone.View);

  AssetRowView = (function(_super) {

    __extends(AssetRowView, _super);

    function AssetRowView() {
      var _this = this;
      this.hidePopover = function() {
        return AssetRowView.prototype.hidePopover.apply(_this, arguments);
      };
      this.showPopover = function() {
        return AssetRowView.prototype.showPopover.apply(_this, arguments);
      };
      this["delete"] = function(e) {
        return AssetRowView.prototype.delete.apply(_this, arguments);
      };
      this.redirectSchedule = function(e) {
        return AssetRowView.prototype.redirectSchedule.apply(_this, arguments);
      };
      this.edit = function(e) {
        return AssetRowView.prototype.edit.apply(_this, arguments);
      };
      this.setEnabled = function(enabled) {
        return AssetRowView.prototype.setEnabled.apply(_this, arguments);
      };
      this.toggleIsEnabled = function(e) {
        return AssetRowView.prototype.toggleIsEnabled.apply(_this, arguments);
      };
      this.render = function() {
        return AssetRowView.prototype.render.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return AssetRowView.prototype.initialize.apply(_this, arguments);
      };
      return AssetRowView.__super__.constructor.apply(this, arguments);
    }

    AssetRowView.prototype.tagName = "tr";

    AssetRowView.prototype.initialize = function(options) {
      return this.template = get_template('asset-row');
    };

    AssetRowView.prototype.render = function() {
      var json;
      console.log(this.model);
      this.$el.html(this.template(_.extend(json = this.model.toJSON(), {
        name: insertWbr(json.name),
      })));
      this.$el.prop('id', this.model.get('asset_id'));
      (this.$(".delete-asset-button")).popover({
        content: get_template('confirm-delete')
      });
      (this.$(".toggle input")).prop("checked", this.model.get('is_enabled'));
      (this.$(".asset-icon")).addClass((function() {
        switch (this.model.get("mimetype")) {
          case "video":
            return "oi-video";
          case "image":
            return "oi-image";
          case "webpage":
            return "oi-globe";
          default:
            return "";
        }
      }).call(this));
      return this.el;
    };

    AssetRowView.prototype.events = {
      'change .is_enabled-toggle input': 'toggleIsEnabled',
      'click .edit-asset-button': 'edit',
      'click .delete-asset-button': 'showPopover',
      'click .edit-schedule-button': 'redirectSchedule'
    };

    AssetRowView.prototype.redirectSchedule = function(e) {
      var assetID = this.model.get('asset_id');
      window.location = '/asset/'+assetID+'/schedule';
      e.preventDefault();
    }

    AssetRowView.prototype.toggleIsEnabled = function(e) {
      var save, val,
        _this = this;
      val = (1 + this.model.get('is_enabled')) % 2;
      this.model.set({
        is_enabled: val
      });
      this.setEnabled(false);
      save = this.model.save();
      save.done(function() {
        return _this.setEnabled(true);
      });
      save.fail(function() {
        _this.model.set(_this.model.previousAttributes(), {
          silent: true
        });
        _this.setEnabled(true);
        return _this.render();
      });
      return true;
    };

    AssetRowView.prototype.setEnabled = function(enabled) {
      if (enabled) {
        this.$el.removeClass('warning');
        this.delegateEvents();
        return (this.$('input, button')).prop('disabled', false);
      } else {
        this.hidePopover();
        this.undelegateEvents();
        this.$el.addClass('warning');
        return (this.$('input, button')).prop('disabled', true);
      }
    };

    AssetRowView.prototype.edit = function(e) {
      new EditAssetView({
        model: this.model,
        edit: true
      });
      return false;
    };

    AssetRowView.prototype["delete"] = function(e) {
      var xhr,
        _this = this;
      this.hidePopover();
      if ((xhr = this.model.destroy()) === !false) {
        xhr.done(function() {
          return _this.remove();
        });
      } else {
        this.remove();
      }
      return false;
    };

    AssetRowView.prototype.showPopover = function() {
      if (!($('.popover')).length) {
        (this.$(".delete-asset-button")).popover('show');
        ($('.confirm-delete')).click(this["delete"]);
        ($(window)).one('click', this.hidePopover);
      }
      return false;
    };

    AssetRowView.prototype.hidePopover = function() {
      (this.$(".delete-asset-button")).popover('hide');
      return false;
    };

    return AssetRowView;

  })(Backbone.View);

  AssetsView = (function(_super) {

    __extends(AssetsView, _super);

    function AssetsView() {
      var _this = this;
      this.render = function() {
        return AssetsView.prototype.render.apply(_this, arguments);
      };
      this.update_order = function() {
        return AssetsView.prototype.update_order.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return AssetsView.prototype.initialize.apply(_this, arguments);
      };
      return AssetsView.__super__.constructor.apply(this, arguments);
    }

    AssetsView.prototype.initialize = function(options) {
      var event, _i, _len, _ref;
      _ref = 'reset add remove sync'.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.collection.bind(event, this.render);
      }
      return this.sorted = (this.$('#active-assets')).sortable({
        containment: 'parent',
        axis: 'y',
        helper: 'clone',
        update: this.update_order
      });
    };

    AssetsView.prototype.update_order = function() {
      return $.post('/api/assets/order', {
        ids: ((this.$('#active-assets')).sortable('toArray')).join(',')
      });
    };

    AssetsView.prototype.render = function() {
      var which, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;
      _ref = ['active', 'inactive'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        which = _ref[_i];
        (this.$("#" + which + "-assets")).html('');
      }
      this.collection.each(function(model) {
        which = model.get('is_enabled') ? 'active' : 'inactive';
        return (_this.$("#" + which + "-assets")).append((new AssetRowView({
          model: model
        })).render());
      });
      _ref1 = ['inactive', 'active'];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        which = _ref1[_j];
        this.$("." + which + "-table thead").toggle(!!(this.$("#" + which + "-assets tr").length));
      }
      if (this.$('#active-assets tr').length > 1) {
        this.sorted.sortable('enable');
        this.update_order();
      } else {
        this.sorted.sortable('disable');
      }
      return this.el;
    };

    return AssetsView;

  })(Backbone.View);

  EditScheduleView = (function(_super) {
    __extends(EditScheduleView, _super);

    function EditScheduleView() {
      var _this = this;
      this.initialize = function(options) {
        return EditScheduleView.prototype.initialize.apply(_this, arguments);
      }
      this.cancel = function(options) {
        return EditScheduleView.prototype.cancel.apply(_this, arguments);
      }
      this.render = function(options) {
        return EditScheduleView.prototype.render.apply(_this, arguments);
      }
      this.save = function(e) {
        return EditScheduleView.prototype.save.apply(_this, arguments);
      };
      this.$f = function(field) {
        return EditScheduleView.prototype.$f.apply(_this, arguments);
      };
      this.toggleRepeat = function(e) {
        return EditScheduleView.prototype.toggleRepeat.apply(_this, arguments);
      };
      this.$fieldValue = function() {
        var field, val;
        field = arguments[0], val = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return EditScheduleView.prototype.$fieldValue.apply(_this, arguments);
      };
      return EditScheduleView.__super__.constructor.apply(this, arguments);
    }

    EditScheduleView.prototype.$f = function(field) {
      return this.$("[name='" + field + "']");
    };

    EditScheduleView.prototype.$fieldValue = function() {
      var field, val, _ref;
      field = arguments[0], val = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.$f(field)).val.apply(_ref, val);
    };

    EditScheduleView.prototype.events = {
      'submit form': 'save',
      'click .cancel': 'cancel',
      'change .repeat-toggle input': 'toggleRepeat',
      'change [name="pattern_type"]': 'switchPatternType',
    }

    EditScheduleView.prototype.toggleRepeat = function() {
      var val,
        _this = this;
      val = $("input[name='repeat']").val();
      val = 1 - val;
      $("input[name='repeat']").val(val);
      return true;
    }

    EditScheduleView.prototype.prepareModelToSend = function(){
      _ref1 = this.model.fields;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        field = _ref1[_j];
        if (!(this.$f(field)).prop('disabled')) {
          _results.push(this.model.set(field, this.$fieldValue(field), {
            silent: true
          }));
        }
      }
      return _results;
    }

    EditScheduleView.prototype.viewmodel = function() {
      var field, which, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = ['start', 'end'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        which = _ref[_i];
        if (this.$fieldValue("" + which + "_date").length > 0){
          this.$fieldValue("" + which + "_date", moment.utc(this.$fieldValue("" + which + "_date"),"MM/DD/YYYY").toISOString());        
        }
        if (this.$fieldValue("" + which + "_time").length > 0){
          this.$fieldValue("" + which + "_time", moment.utc(this.$fieldValue("" + which + "_time"),"hh:mm A").format("hh:mm A"));        
        }
      }
      return this.prepareModelToSend();
    };

    EditScheduleView.prototype.initialize = function(options){
      var _this = this;
      if(!this.model.get("asset_id")){
        this.model.set({asset_id: API.schedules.asset_id})
      }
      this.model.on("invalid", function(model, error){
        alert(error);
      });
      this.edit = options.edit;
      ($('body')).append(this.$el.html(get_template('schedule-modal')));
      (this.$el.children(":first")).modal();
      (this.$('input[name="repeat"]')).prop('checked', this.model.get('repeat'));
      this.model.bind('change', this.render);
      this.render();
      _.delay((function() {
        return (_this.$f('uri')).focus();
      }), 300);
      this.$('.input-group.date').datetimepicker({
        format: 'HH:mm',
        allowInputToggle: true,
      });
      return false;
    }

    EditScheduleView.prototype.render = function(){
      var d, f, field, which, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (this.edit) {
        _ref = 'name'.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          (this.$(f)).attr('disabled', true);
        }
      }
      _ref1 = this.model.fields;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          field = _ref1[_j];
          if ((this.$fieldValue(field)) !== this.model.get(field)) {
            this.$fieldValue(field, this.model.get(field));
          }
        }
        _ref2 = ['start', 'end'];
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          which = _ref2[_k];
          if(this.model.get("" + which + "_date")){
            if(this.model.get("" + which + "_date")){
              // this.$fieldValue("" + which + "_date", d.date());
              d = date_to(this.model.get("" + which + "_date")).moment();
              (this.$f("" + which + "_date")).datepicker('setDate', d.toDate());
            }
          }
          // if(this.model.get("" + which + "_time")){
            // d = date_to(this.model.get("" + which + "_time")).time();
            // this.$fieldValue("" + which + "_time",d.toString());
            // (this.$f("" + which + "_time")).timepicker('setTime', d.toString());
          // }
        }
      this.switchPatternType();
      this.delegateEvents();
      return false; 
    }

    EditScheduleView.prototype.save = function(e) {
      var save,
        _this = this;
      e.preventDefault();
      this.prepareModelToSend();
      if(!this.model.isValid()){
        return false;
      }
      this.viewmodel();
      save = null;
      save = this.model.save();
      if(!save){
        return false;
      }
      save.done(function(data) {
        _this.model.id = data.asset_id;
        if (!_this.model.collection) {
          _this.collection.add(_this.model);
        }
        (_this.$el.children(":first")).modal('hide');
        _.extend(_this.model.attributes, data);
        if (!_this.edit) {
          return _this.model.collection.add(_this.model);
        }
      });
      return false;
    }

    EditScheduleView.prototype.cancel = function() {
      return (this.$el.children(":first")).modal('hide');
    }

    EditScheduleView.prototype.switchPatternType = function() {
      switch($('select[name="pattern_type"]').val()) {
        case 'daily':
          $('select[name="pattern_days"]').prop('disabled', true);
          break;
        case 'weekly':
          $('select[name="pattern_days"]').prop('disabled', false);
          break;
      }
    }
    return EditScheduleView;
  })(Backbone.View);

  
  ScheduleRowView = (function(_super) {
    __extends(ScheduleRowView, _super);

    function ScheduleRowView() {
      var _this = this;
      this.render = function() {
        return ScheduleRowView.prototype.render.apply(_this, arguments);
      };
      this["delete"] = function(e) {
        return ScheduleRowView.prototype.delete.apply(_this, arguments);
      };
      this.edit = function(e) {
        return ScheduleRowView.prototype.edit.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return ScheduleRowView.prototype.initialize.apply(_this, arguments);
      };
      this.showDeletePopover = function() {
        return ScheduleRowView.prototype.showDeletePopover.apply(_this, arguments);
      };
      this.hideDeletePopover = function() {
        return ScheduleRowView.prototype.hideDeletePopover.apply(_this, arguments);
      };
      return ScheduleRowView.__super__.constructor.apply(this, arguments);
    }

    ScheduleRowView.prototype["delete"] = function(e) {
      var xhr,
        _this = this;
      this.hideDeletePopover();
      if((xhr = this.model.destroy()) === !false) {
        xhr.done(function() {
          return _this.remove();
        });
      } else {
        this.remove();
      }
      return false;
    }

    ScheduleRowView.prototype.edit = function(e) {
      new EditScheduleView({
        model: this.model,
        edit: true
      });
      return false;
    };

    ScheduleRowView.prototype.events = {
      'click .edit-schedule-button': 'edit',
      'click .delete-schedule-button': 'showDeletePopover',
    }

    ScheduleRowView.prototype.initialize = function(options) {
      return this.template = get_template('schedule-row');
    }

    ScheduleRowView.prototype.render = function() {
      var json;
      var daysDict = {"2":"Mon",
        "4":"Tues",
        "8":"Wed",
        "16":"Thurs",
        "32":"Fri",
        "64":"Sat",
        "128":"Sun"
      };
      this.$el.html(this.template(_.extend(json = this.model.toJSON(), {
         name: json.name,
         start_date: (json.start_date ? (date_to(json.start_date)).date() : null),
         end_date: (json.end_date ? (date_to(json.end_date)).date() : null),
         start_time: (json.start_time ? (date_to(json.start_time)).time() : null),
         end_time: (json.end_time ? (date_to(json.end_time)).time() : null),
         repeat: (bool_to(json.repeat)),
         repeat_bool: (json.repeat),
         pattern_days: (function(){
          var returnArray = [];
          if(Object.prototype.toString.call(json.pattern_days) === '[object Array]'){
            for (var i = 0; i <= json.pattern_days.length - 1; i++) {
              returnArray.push(daysDict[json.pattern_days[i]]);
            };
          } else {
            for (var intDay in daysDict){
              if (json.pattern_days & intDay){
                returnArray.push(daysDict[intDay]);
              }
            }
          }
          
          return returnArray;
         })(),
      })));
      (this.$(".delete-schedule-button")).popover({
        content: get_template('confirm-delete')
      });
      this.$el.prop('id', this.model.get('id'));
      return this.el;
    }

    ScheduleRowView.prototype.showDeletePopover = function(){
      (this.$(".delete-schedule-button")).popover('show');
      ($('.confirm-delete')).click(this["delete"]);
      ($(window)).one('click', this.hideDeletePopover);
      return false;
    }

    ScheduleRowView.prototype.hideDeletePopover = function(){
      (this.$(".delete-schedule-button")).popover('hide');
      return false;
    }

    ScheduleRowView.prototype.tagName = "tr";

    return ScheduleRowView;
  })(Backbone.View);

  SchedulesView = (function(_super) {

    __extends(SchedulesView, _super);

    function SchedulesView() {
      var _this = this;
      this.render = function() {
        return SchedulesView.prototype.render.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return SchedulesView.prototype.initialize.apply(_this, arguments);
      };
      return SchedulesView.__super__.constructor.apply(this, arguments);
    }

    SchedulesView.prototype.initialize = function(options) {
      var event, _i, _len, _ref;
      _ref = 'add remove sync'.split(' ');// reset
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.collection.bind(event, this.render);
      }
      var ajaxRequest = new XMLHttpRequest();
      ajaxRequest.open('GET','/api/assets/'+this.attributes.lol,true);
      ajaxRequest.onload = function(){
        if(this.status >= 200 && this.status < 400){
          $('#assetName').html(JSON.parse(this.response).name);
        }
      }
      ajaxRequest.send();
    };

    SchedulesView.prototype.render = function(){
      this.$("#schedules-tbody").html('');
      this.collection.each(function(model) {
        return (_this.$("#schedules-tbody")).append((new ScheduleRowView({
          model: model
        })).render());
      });
      return this.el;
    };

    return SchedulesView;

  })(Backbone.View);

  API.Schedule = Schedule = (function(_super) {
    __extends(Schedule, _super);

    function Schedule() {
      var _this = this;
      this.defaults = function() {
        return Schedule.prototype.defaults.apply(_this, arguments);
      }
      return Schedule.__super__.constructor.apply(this, arguments);
    }
    Schedule.prototype.idAttribute = "id";

    Schedule.prototype.fields = 'asset_id name start_date start_time end_date end_time duration repeat priority pattern_type pattern_days'.split(' ');

    Schedule.prototype.defaults = function(){
      return {
        name: '',
        // start_time: now(),
        // end_time: now().setHours(now().getHours() + 1 > 23 ? 0 : now().getHours() + 1),
        repeat: 0,
        duration: 30,
        priority: 0,
        pattern_type: '',
     };
    };

    Schedule.prototype.validate = function(attributes, options){
      if(attributes.name == ""){
        return "You must supply a name for the schedule.";
      }
      if((!attributes.start_time && attributes.end_time) || (attributes.start_time && !attributes.end_time)){
        return "You must supply both a start and end time, or leave empty.";
      }
      if(moment(attributes["end_date"],"MM/DD/YYYY").isBefore(moment(attributes["start_date"],"MM/DD/YYYY"))){
        return "Your end date is before your start date!";
      }
      if(moment(attributes["end_time"],"hh:mm A").isBefore(moment(attributes["start_time"],"hh:mm A"))){
        return "Your end time is before your start time!";
      }
    }

    return Schedule;

  })(Backbone.Model);

  API.Schedules = Schedules = (function(_super) {

    __extends(Schedules, _super);

    function Schedules(model, options) {
      Schedules.prototype.url = "/api/schedules/"+ options.asset_id;
      Schedules.prototype.asset_id = options.asset_id;
      return Schedules.__super__.constructor.apply(this, arguments);
    }
    Schedules.prototype.model = Schedule;

    return Schedules;

  })(Backbone.Collection);

  API.Shutdown = Shutdown = (function(_super) {

    __extends(Shutdown, _super);

    function Shutdown() {
      var _this = this;
      this.defaults = function() {
        return Shutdown.prototype.defaults.apply(_this, arguments);
      };
      return Shutdown.__super__.constructor.apply(this, arguments);
    }

    Shutdown.prototype.idAttribute = "id";

    Shutdown.prototype.fields = 'day time'.split(' ');

    Shutdown.prototype.defaults = function() {
      return {
        // name: '',
        // mimetype: 'webpage',
      };
    };

    return Shutdown;

  })(Backbone.Model);

  API.Shutdowns = Shutdowns = (function(_super) {

    __extends(Shutdowns, _super);

    function Shutdowns() {
      return Shutdowns.__super__.constructor.apply(this, arguments);
    }
    Shutdowns.prototype.url = "/api/shutdowns";
    Shutdowns.prototype.model = Shutdown;
    return Shutdowns;
  })(Backbone.Collection);

  ShutdownRowView = (function(_super) {

    __extends(ShutdownRowView, _super);

    function ShutdownRowView() {
      var _this = this;
      this.hidePopover = function() {
        return ShutdownRowView.prototype.hidePopover.apply(_this, arguments);
      };
      this.showPopover = function() {
        return ShutdownRowView.prototype.showPopover.apply(_this, arguments);
      };
      this["delete"] = function(e) {
        return ShutdownRowView.prototype.delete.apply(_this, arguments);
      };
      this.redirectSchedule = function(e) {
        return ShutdownRowView.prototype.redirectSchedule.apply(_this, arguments);
      };
      this.edit = function(e) {
        return ShutdownRowView.prototype.edit.apply(_this, arguments);
      };
      this.setEnabled = function(enabled) {
        return ShutdownRowView.prototype.setEnabled.apply(_this, arguments);
      };
      this.toggleIsEnabled = function(e) {
        return ShutdownRowView.prototype.toggleIsEnabled.apply(_this, arguments);
      };
      this.render = function() {
        return ShutdownRowView.prototype.render.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return ShutdownRowView.prototype.initialize.apply(_this, arguments);
      };
      return ShutdownRowView.__super__.constructor.apply(this, arguments);
    }

    ShutdownRowView.prototype.tagName = "tr";

    ShutdownRowView.prototype.initialize = function(options) {
      return this.template = get_template('shutdown-row');
    };

    ShutdownRowView.prototype.render = function() {
      var json;
      console.log(this.model);
      this.$el.html(this.template(_.extend(json = this.model.toJSON(), {
        day: {0:'Monday',1:'Tuesday',2:'Wednesday',3:'Thursday',4:'Friday',5:'Saturday',6:'Sunday'}[json.day]
      })));
      this.$el.prop('id', this.model.get('id'));
      (this.$("button.delete-shutdown")).popover({
        content: get_template('confirm-delete')
      });
      return this.el;
    };

    ShutdownRowView.prototype.events = {
      // 'change .is_enabled-toggle input': 'toggleIsEnabled',
      // 'click .edit-asset-button': 'edit',
      'click button.delete-shutdown': 'showPopover',
      // 'click .edit-schedule-button': 'redirectSchedule'
    };

    ShutdownRowView.prototype.edit = function(e) {
      // new EditAssetView({
      //   model: this.model,
      //   edit: true
      // });
      return false;
    };

    ShutdownRowView.prototype["delete"] = function(e) {
      var xhr,
        _this = this;
      this.hidePopover();
      console.log('outside-delete');
      console.log(this.model);
      if ((xhr = this.model.destroy()) === !false) {
        console.log('inside-delete');
        xhr.done(function() {
          return _this.remove();
        });
      } else {
        this.remove();
      }
      return false;
    };

    ShutdownRowView.prototype.showPopover = function() {
      if (!($('.popover')).length) {
        (this.$("button.delete-shutdown")).popover('show');
        ($('.confirm-delete')).click(this["delete"]);
        ($(window)).one('click', this.hidePopover);
      }
      return false;
    };

    ShutdownRowView.prototype.hidePopover = function() {
      (this.$("button.delete-shutdown")).popover('hide');
      return false;
    };

    return ShutdownRowView;

  })(Backbone.View);

  ShutdownsView = (function(_super) {

    __extends(ShutdownsView, _super);

    function ShutdownsView() {
      var _this = this;
      this.render = function() {
        return ShutdownsView.prototype.render.apply(_this, arguments);
      };
      this.update_order = function() {
        return ShutdownsView.prototype.update_order.apply(_this, arguments);
      };
      this.initialize = function(options) {
        return ShutdownsView.prototype.initialize.apply(_this, arguments);
      };
      return ShutdownsView.__super__.constructor.apply(this, arguments);
    }

    ShutdownsView.prototype.initialize = function(options) {
      var event, _i, _len, _ref;
      _ref = 'reset add remove sync'.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        this.collection.bind(event, this.render);
      }
    };

    ShutdownsView.prototype.render = function() {
      this.$("tbody.shutdowns").html('');
      this.collection.each(function(model) {
        return (_this.$("tbody.shutdowns")).append((new ShutdownRowView({
          model: model
        })).render());
      });
      return this.el;
    };

    return ShutdownsView;

  })(Backbone.View);

  EditShutdownView = (function(_super) {
    __extends(EditShutdownView, _super);

    function EditShutdownView() {
      var _this = this;
      this.initialize = function(options) {
        return EditShutdownView.prototype.initialize.apply(_this, arguments);
      }
      this.cancel = function(options) {
        return EditShutdownView.prototype.cancel.apply(_this, arguments);
      }
      this.render = function(options) {
        return EditShutdownView.prototype.render.apply(_this, arguments);
      }
      this.save = function(e) {
        return EditShutdownView.prototype.save.apply(_this, arguments);
      };
      this.$f = function(field) {
        return EditShutdownView.prototype.$f.apply(_this, arguments);
      };
      this.toggleRepeat = function(e) {
        return EditShutdownView.prototype.toggleRepeat.apply(_this, arguments);
      };
      this.$fieldValue = function() {
        var field, val;
        field = arguments[0], val = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return EditShutdownView.prototype.$fieldValue.apply(_this, arguments);
      };
      return EditShutdownView.__super__.constructor.apply(this, arguments);
    }

    EditShutdownView.prototype.$f = function(field) {
      return this.$("[name='" + field + "']");
    };

    EditShutdownView.prototype.$fieldValue = function() {
      var field, val, _ref;
      field = arguments[0], val = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.$f(field)).val.apply(_ref, val);
    };

    EditShutdownView.prototype.events = {
      'submit form': 'save',
      'click .cancel': 'cancel',
    }

    EditShutdownView.prototype.toggleRepeat = function() {
      var val,
        _this = this;
      val = $("input[name='repeat']").val();
      val = 1 - val;
      $("input[name='repeat']").val(val);
      return true;
    }

    EditShutdownView.prototype.prepareModelToSend = function(){
      _ref1 = this.model.fields;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        field = _ref1[_j];
        if (!(this.$f(field)).prop('disabled')) {
          _results.push(this.model.set(field, this.$fieldValue(field), {
            silent: true
          }));
        }
      }
      return _results;
    }

    EditShutdownView.prototype.viewmodel = function() {
      var field, which, _i, _j, _len, _len1, _ref, _ref1, _results;
      // _ref = ['start', 'end'];
      // for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      //   which = _ref[_i];
      //   if (this.$fieldValue("" + which + "_time").length > 0){
      //     this.$fieldValue("" + which + "_time", moment.utc(this.$fieldValue("" + which + "_time"),"hh:mm A").format("hh:mm A"));        
      //   }
      // }
      return this.prepareModelToSend();
    };

    EditShutdownView.prototype.initialize = function(options){
      var _this = this;
      this.model.on("invalid", function(model, error){
        alert(error);
      });
      this.edit = options.edit;
      ($('body')).append(this.$el.html(get_template('shutdown-modal')));
      (this.$el.children(":first")).modal();
      this.model.bind('change', this.render);
      this.render();

      this.$('.input-group.date').datetimepicker({
        format: 'HH:mm',
        allowInputToggle: true,
      });
      return false;
    }

    EditShutdownView.prototype.render = function(){
      var d, f, field, which, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      if (this.edit) {
        _ref = 'name'.split(' ');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          (this.$(f)).attr('disabled', true);
        }
      }
      _ref1 = this.model.fields;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          field = _ref1[_j];
          if ((this.$fieldValue(field)) !== this.model.get(field)) {
            this.$fieldValue(field, this.model.get(field));
          }
        }
      // this.switchPatternType();
      this.delegateEvents();
      return false; 
    }

    EditShutdownView.prototype.save = function(e) {
      var save,
        _this = this;
      e.preventDefault();
      this.prepareModelToSend();
      if(!this.model.isValid()){
        return false;
      }
      this.viewmodel();
      save = null;
      save = this.model.save();
      if(!save){
        return false;
      }
      save.done(function(data) {
        // _this.model.id = data.asset_id;
        if (!_this.model.collection) {
          _this.collection.add(_this.model);
        }
        (_this.$el.children(":first")).modal('hide');
        _.extend(_this.model.attributes, data);
        if (!_this.edit) {
          return _this.model.collection.add(_this.model);
        }
      });
      return false;
    }

    EditShutdownView.prototype.cancel = function() {
      return (this.$el.children(":first")).modal('hide');
    }

    EditShutdownView.prototype.switchPatternType = function() {
      switch($('select[name="pattern_type"]').val()) {
        case 'daily':
          $('select[name="pattern_days"]').prop('disabled', true);
          break;
        case 'weekly':
          $('select[name="pattern_days"]').prop('disabled', false);
          break;
      }
    }
    return EditShutdownView;
  })(Backbone.View);


  API.App = App = (function(_super) {

    __extends(App, _super);

    function App() {
      var _this = this;
      this.add = function(e) {
        return App.prototype.add.apply(_this, arguments);
      };
      this.inititalize = function() {
        return App.prototype.initialize.apply(_this, arguments);
      };
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.initialize = function() {
      var _this = this;
      ($(window)).ajaxError(function(e, r) {
        var err, j;
        ($('#request-error')).html((get_template('request-error'))());
        if ((j = $.parseJSON(r.responseText)) && (err = j.error)) {
          return ($('#request-error .msg')).text('Server Error: ' + err);
        }
      });
      ($(window)).ajaxSuccess(function(data) {
        return ($('#request-error')).html('');
      });
      Routes = Backbone.Router.extend({
        routes: {
          "asset/:asset_id/schedule": "loadSchedule",
          "shutdown": "loadShutdowns",
          "*path": "loadAssets"
        },
        loadSchedule: function(asset_id){
          assetNiceName = asset_id;
          (API.schedules = new Schedules(Schedule, {'asset_id':asset_id})).fetch();
        },
        loadShutdowns: function(){
          (API.shutdowns = new Shutdowns()).fetch();
          document.getElementById('confirmShutdown').onclick = function(){
            document.getElementById('shutdownForm').submit();
          }
        },
        loadAssets: function(){
          (API.assets = new Assets()).fetch();
        },
      });
      this.routes = new Routes();
      Backbone.history.start({pushState: true});
      if(API.assets){
        return API.assetsView = new AssetsView({
          collection: API.assets,
          el: this.$('#assets')
        });
      } else if (API.shutdowns) {
        console.log('here');
        return API.shutdownsView = new ShutdownsView({
          collection: API.shutdowns,
          el: this.$('#shutdowns'),
        });
      } else if (API.schedules) {
        return API.schedulesView = new SchedulesView({
          collection: API.schedules,
          el: this.$('#schedules'),
          attributes:{lol:assetNiceName}
        });
      }
    };

    App.prototype.events = {
      'click #add-asset-button': 'add',
      'click #add-schedule-button': 'addSchedule',
      'click #add-shutdown-button': 'addShutdown'
    };

    App.prototype.add = function(e) {
      new EditAssetView({
        model: new Asset({}, {
          collection: API.assets
        })
      });
      return false;
    };

    App.prototype.addSchedule = function(e) {
      new EditScheduleView({
        model: new Schedule({}, {
          collection: API.schedules
        })
      });
      return false;
    };

    App.prototype.addShutdown = function(e) {
      new EditShutdownView({
        model: new Shutdown({}, {
          collection: API.shutdowns
        })
      });
      return false;
    };


    App.prototype.shutdownNow = function(e){
      ($('body')).append(this.$el.html(get_template('shutdown-confirmation')));
      return false;
    }

    return App;

  })(Backbone.View);

  jQuery(function() {
    return API.app = new App({
      el: $('body')
    });
  });
}).call(this);