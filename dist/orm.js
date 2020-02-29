(function () {
// ASSET: index.js
var $Focm$exports = {};

class $A6pM$export$default {
  constructor(data) {
    Object.values(this.constructor.fields).filter(({
      isForeignEntity
    }) => !isForeignEntity).forEach(({
      field,
      isEnum
    }) => {
      var _data$field;

      const defaultValue = isEnum ? [] : undefined;
      this[field] = (_data$field = data[field]) !== null && _data$field !== void 0 ? _data$field : defaultValue;
    });
  }

}

// /* eslint-disable no-param-reassign */
// const addValue = (target, field, value) => {
//   target[field] = value
// }
// const addValueToEnumRequired = (target, field, value) => {
//   if (!target[field].includes(value)) {
//     target[field].push(value)
//   }
// }
// const addValueToEnum = (target, field, value) => {
//   if (target[field] === undefined) {
//     target[field] = [value]
//   } else {
//     addValueToEnumRequired(target, field, value)
//   }
// }
// const createAddValue = (isEnum = false, isRequired = true) => {
//   if (!isEnum) return addValue
//   if (!isRequired) return addValueToEnum
//   return addValueToEnumRequired
// }
// export default createAddValue

/* eslint-disable no-param-reassign */
const $otKq$var$addValue = (target, field, value) => {
  target[field] = value;
};

const $otKq$var$addValueToEnum = (target, field, value) => {
  if (!target[field].includes(value)) {
    target[field].push(value);
  }
};

const $otKq$export$default = isEnum => isEnum ? $otKq$var$addValueToEnum : $otKq$var$addValue;

const $hWjt$var$getValueList = (target, field) => target[field] !== undefined ? [target[field]] : [];

const $hWjt$var$getValueListFromEnum = (target, field) => {
  var _target$field;

  return (_target$field = target[field]) !== null && _target$field !== void 0 ? _target$field : [];
};

const $hWjt$export$default = isEnum => isEnum ? $hWjt$var$getValueListFromEnum : $hWjt$var$getValueList;

const $G2Rw$export$default = model => {
  // const fieldList = Object.values(model.fields)
  // const foreignEntityList = fieldList.filter((it) => it.isForeignEntity)
  // const foreignKeyList = fieldList.filter((it) => it.isForeignKey)
  // const addRelationshipDataList = foreignEntityList
  //   .map(({
  //     field,
  //     foreignField,
  //     foreignModel,
  //     localField,
  //     isEnum,
  //   }) => {
  //     const localFieldIsEnum = model.fields[localField]?.isEnum ?? false
  //     const foreignFieldIsEnum = foreignModel.fields[foreignField]?.isEnum ?? false
  //     const updateLocalTarget = createAddValue(localFieldIsEnum, false)
  //     const updateForeignTarget = createAddValue(foreignFieldIsEnum, false)
  //     const updateLocalData = !isEnum
  //       ? (data, foreignData) => updateLocalTarget(data, localField, foreignData.id)
  //       : (data, foreignDataList) => foreignDataList.map((foreignData) => updateLocalTarget(data, localField, foreignData.id))
  //     const updateForeignData = !isEnum
  //       ? (data, foreignData) => updateForeignTarget(foreignData, foreignField, data.id)
  //       : (data, foreignDataList) => foreignDataList.map((foreignData) => updateForeignTarget(foreignData, foreignField, data.id))
  //     const updateAllData = (() => {
  //       const arr = []
  //       if (localField !== undefined) {
  //         arr.push(updateLocalData)
  //       }
  //       if (foreignField !== undefined) {
  //         arr.push(updateForeignData)
  //       }
  //       return (data, foreignData) => arr.map((func) => func(data, foreignData))
  //     })()
  //     return (data) => {
  //       const foreignData = data[field]
  //       if (foreignData === undefined) return
  //       updateAllData(data, foreignData)
  //       foreignModel.insert(foreignData)
  //     }
  //   })
  const addRelationshipList = Object.values(model.fields).filter(({
    isForeignKey,
    foreignField
  }) => isForeignKey && foreignField !== undefined).map(({
    field,
    foreignField,
    foreignModel,
    isEnum
  }) => {
    const addForeignKey = $otKq$export$default(foreignModel.fields[foreignField].isEnum);
    const getForeignKeyList = $hWjt$export$default(isEnum);
    return data => getForeignKeyList(data, field).forEach(foreignKey => {
      const foreignInstance = foreignModel.source.get(foreignKey);

      if (foreignInstance !== undefined) {
        addForeignKey(foreignInstance, foreignField, data.id);
      }
    }); // .map((foreignKey) => foreignModel.source.get(foreignKey))
    // .filter((foreignInstance) => foreignInstance !== undefined)
    // .forEach((foreignInstance) => addForeignKey(foreignInstance, foreignField, target.id))
  });
  Object.defineProperty(model, 'insert', {
    value(...dataList) {
      dataList.flat().forEach(data => {
        // addRelationshipDataList.forEach((add) => add(data))
        addRelationshipList.forEach(add => add(data));
        model.source.set(data.id, new model(data));
      });
    }

  });
  return model;
};

const $sKyS$export$default = model => Object.defineProperties(model.prototype, {
  // clone: {
  //   value() {
  //     return new model(this)
  //   },
  // },
  update: {
    value(data) {
      model.update({ ...data,
        id: this.id
      });
    }

  },
  delete: {
    value() {
      model.delete(this.id);
    }

  }
});

// // eslint-disable-next-line no-unused-vars
// const removeValue = (target, field, value) => {
//   target[field] = null
// }
// const removeValueToEnumRequired = (target, field, value) => {
//   const index = target[field].indexOf(value)
//   if (index !== -1) {
//     target[field].splice(index, 1)
//   }
// }
// const removeValueToEnum = (target, field, value) => {
//   if (target[field] === undefined) {
//     target[field] = []
//   } else {
//     removeValueToEnumRequired(target, field, value)
//   }
// }
// const createRemoveValue = (isEnum = false, isRequired = true) => {
//   if (!isEnum) return removeValue
//   if (!isRequired) return removeValueToEnum
//   return removeValueToEnumRequired
// }
// export default createRemoveValue
// eslint-disable-next-line no-unused-vars
const $neuQ$var$removeValue = (target, field, value) => {
  target[field] = null;
};

const $neuQ$var$removeValueFromEnum = (target, field, value) => {
  const index = target[field].indexOf(value);

  if (index !== -1) {
    target[field].splice(index, 1);
  }
};

const $neuQ$export$default = isEnum => isEnum ? $neuQ$var$removeValueFromEnum : $neuQ$var$removeValue;

const $DUwW$export$default = (current, other) => [other.filter(it => !current.includes(it)), current.filter(it => !other.includes(it))];

const $fapk$export$default = model => {
  const fieldList = Object.values(model.fields).filter(it => !it.isForeignEntity); // const foreignEntityList = fieldList.filter((it) => it.isForeignEntity)
  // const foreignKeyList = fieldList.filter((it) => it.isForeignKey)

  const updateRelationshipHash = Object.values(model.fields).filter(({
    isForeignKey,
    foreignField
  }) => isForeignKey && foreignField !== undefined).reduce((acc, {
    field,
    foreignField,
    foreignModel,
    isEnum
  }) => {
    const addForeignKey = $otKq$export$default(foreignModel.fields[foreignField].isEnum);
    const removeForeignKey = $neuQ$export$default(foreignModel.fields[foreignField].isEnum);
    const getForeignKeyList = $hWjt$export$default(isEnum);

    acc[field] = (instance, data) => {
      if (!(field in data)) return;
      const [foreignKeyListAdded, foreignKeyListRemoved] = $DUwW$export$default(getForeignKeyList(instance, field), getForeignKeyList(data, field));
      foreignKeyListRemoved.forEach(foreignKey => {
        const foreignInstance = foreignModel.source.get(foreignKey);

        if (foreignInstance !== undefined) {
          removeForeignKey(foreignInstance, foreignField, instance.id);
        }
      });
      foreignKeyListAdded.forEach(foreignKey => {
        const foreignInstance = foreignModel.source.get(foreignKey);

        if (foreignInstance !== undefined) {
          addForeignKey(foreignInstance, foreignField, instance.id);
        }
      });
    };

    return acc;
  }, {});
  Object.defineProperty(model, 'update', {
    value(...dataList) {
      // .map((data) => model.source.get(data.id))
      // .filter((instance) => instance !== undefined)
      dataList.flat().forEach(data => {
        const instance = model.source.get(data.id);
        if (instance === undefined) return;
        fieldList.forEach(({
          field,
          isForeignKey
        }) => {
          if (field in data) {
            if (isForeignKey) {
              updateRelationshipHash[field](instance, data);
            }

            instance[field] = data[field];
          }
        }); // fieldList
        //   .filter(({ field }) => field in data)
        //   .forEach(({
        //     field,
        //     isForeignKey,
        //     isForeignEntity,
        //     foreignField,
        //     foreignModel,
        //     localField,
        //     isEnum,
        //   }) => {
        //     const newValue = data[field]
        //     if (isForeignEntity) {
        //       const foreignInstance = foreignModel.source.get(newValue.id)
        //       const instanceOfForeign = model.source.get(foreignInstance[foreignField])
        //       if (localField !== undefined && instance[localField] === undefined) {
        //         instance[localField] = newValue.id
        //       }
        //       if (foreignField !== undefined && newValue[foreignField] === undefined) {
        //         newValue[foreignField] = instance.id
        //       }
        //       instanceOfForeign[localField] = null
        //       foreignModel.update(newValue)
        //       return
        //     }
        //     if (isForeignKey) {
        //       const target = instance
        //       const addForeignKey = createAddValue(foreignModel.fields[foreignField].isEnum)
        //       const removeForeignKey = createRemoveValue(foreignModel.fields[foreignField].isEnum)
        //       const getForeignKeyList = createGetValueList(isEnum)
        //       const getInstanceList = (keyList) => keyList
        //         .map((foreignKey) => foreignModel.source.get(foreignKey))
        //         .filter((foreignInstance) => foreignInstance !== undefined)
        //       const [
        //         foreignInstanceListAdded,
        //         foreignInstanceListRemoved,
        //       ] = getDiffArray(
        //         getForeignKeyList(target, field) |> getInstanceList,
        //         getForeignKeyList(data, field) |> getInstanceList,
        //       )
        //       foreignInstanceListRemoved
        //         .forEach((foreignInstance) => removeForeignKey(foreignInstance, foreignField, target.id))
        //       foreignInstanceListAdded
        //         .forEach((foreignInstance) => addForeignKey(foreignInstance, foreignField, target.id))
        //     }
        //     instance[field] = newValue
        //   })
      });
    }

  });
  return model;
};

const $MlwE$var$isValue = (target, field, value) => target[field] === value;

const $MlwE$var$hasValue = (target, field, value) => target[field].includes(value);

const $MlwE$export$default = isEnum => isEnum ? $MlwE$var$hasValue : $MlwE$var$isValue;

const $PcjM$export$default = model => {
  const removeRelationshipList = Object.values(model.fields).filter(({
    isForeignKey,
    foreignField
  }) => isForeignKey && foreignField !== undefined).map(({
    foreignField,
    foreignModel
  }) => {
    const hasForeignKey = $MlwE$export$default(foreignModel.fields[foreignField].isEnum);
    const removeForeignKey = $neuQ$export$default(foreignModel.fields[foreignField].isEnum);
    return id => foreignModel.source.forEach(foreignInstance => {
      if (hasForeignKey(id)) {
        removeForeignKey(foreignInstance, foreignField, id);
      }
    }); // return (id) => [...foreignModel.source.values()]
    //   .filter((foreignInstance) => hasForeignKey(foreignInstance, foreignField, id))
    //   .forEach((foreignInstance) => removeForeignKey(foreignInstance, foreignField, id))
  });
  Object.defineProperties(model, {
    delete: {
      value(...dataList) {
        dataList.flat() // .map((data) => (data instanceof model ? data.id : data))
        .forEach(id => {
          removeRelationshipList.forEach(remove => remove(id));
          model.source.delete(id);
        });
      }

    },
    deleteAll: {
      value() {
        return model.delete(...model.source.keys());
      }

    }
  });
  return model;
};

const $vlmN$export$default = model => Object.defineProperties(model, {
  size: {
    get() {
      return model.source.size;
    }

  },
  keys: {
    get() {
      return [...model.source.keys()];
    }

  },
  values: {
    get() {
      return [...model.source.values()];
    }

  },
  entries: {
    get() {
      return [...model.source.entries()];
    }

  },
  get: {
    value(primaryKey) {
      return model.source.get(primaryKey);
    }

  },
  has: {
    value(primaryKey) {
      return model.source.has(primaryKey);
    }

  }
});

const $xciL$var$getInstanceByLocalKey = (foreignModel, localField) => function () {
  return foreignModel.source.get(this[localField]);
};

const $xciL$var$getInstanceListByLocalKey = (foreignModel, localField) => function () {
  return this[localField].map(foreignKey => foreignModel.source.get(foreignKey));
};

const $xciL$var$getInstanceByRelationKey = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()].find(foreignInstance => foreignInstance[foreignField] === this.id);
};

const $xciL$var$getInstanceByRelationKeyList = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()].find(foreignInstance => foreignInstance[foreignField].includes(this.id));
};

const $xciL$var$getInstanceListByRelationKey = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()].filter(foreignInstance => foreignInstance[foreignField] === this.id);
};

const $xciL$var$getInstanceListByRelationKeyList = (foreignModel, foreignField) => function () {
  return [...foreignModel.source.values()].filter(foreignInstance => foreignInstance[foreignField].includes(this.id));
};

const $xciL$export$default = model => Object.defineProperties(model.prototype, Object.values(model.fields).filter(it => it.isForeignEntity).reduce((acc, {
  field,
  foreignField,
  foreignModel,
  localField,
  isEnum
}) => {
  if (localField !== undefined) {
    acc[field] = {
      get: !isEnum ? $xciL$var$getInstanceByLocalKey(foreignModel, localField) : $xciL$var$getInstanceListByLocalKey(foreignModel, localField)
    };
  } else if (foreignField !== undefined) {
    if (!foreignModel.fields[foreignField].isEnum) {
      acc[field] = {
        get: !isEnum ? $xciL$var$getInstanceByRelationKey(foreignModel, foreignField) : $xciL$var$getInstanceListByRelationKey(foreignModel, foreignField)
      };
    } else {
      acc[field] = {
        get: !isEnum ? $xciL$var$getInstanceByRelationKeyList(foreignModel, foreignField) : $xciL$var$getInstanceListByRelationKeyList(foreignModel, foreignField)
      };
    }
  } else if ("production" === 'development') {
    throw new Error('TODO');
  } // // one to one
  // acc[field] = {
  //   get: localField !== undefined
  //     ? getInstanceByLocalKey(foreignModel, localField)
  //     : getInstanceByRelationKey(foreignModel, foreignField),
  // }
  // // one to many
  // acc[field] = {
  //   get: localField !== undefined
  //     ? getInstanceListByLocalKey(foreignModel, localField)
  //     : getInstanceListByRelationKey(foreignModel, foreignField),
  // }
  // // many to one
  // acc[field] = {
  //   get: localField !== undefined
  //     ? getInstanceByLocalKey(foreignModel, localField)
  //     : getInstanceByRelationKeyList(foreignModel, foreignField),
  // }
  // // many to many
  // acc[field] = {
  //   get: localField !== undefined
  //     ? getInstanceListByLocalKey(foreignModel, localField)
  //     : getInstanceListByRelationKeyList(foreignModel, foreignField),
  // }


  return acc;
}, {}));

const $TJcN$export$default = db => model => Object.defineProperties(model, {
  source: {
    value: db.entities[model.name]
  },
  fields: {
    value: Object.entries(model.fields).reduce((acc, [field, options]) => {
      acc[field] = {
        field,
        ...options
      };

      if ('foreignModel' in options) {
        const foreignModel = typeof options.foreignModel === 'string' ? db.models[options.foreignModel] : options.foreignModel;

        if ("production" === 'development') {
          if (foreignModel === undefined) {
            throw new Error(`The "${options.foreignModel}" model was not registered in the database`);
          }
        }

        Object.assign(acc[field], {
          foreignModel
        });
      }

      return acc;
    }, {})
  }
});

class $zy9f$export$default {
  constructor(...modelList) {
    this.entities = {};
    this.models = {};
    modelList.flat().map(model => {
      this.entities[model.name] = new Map();
      this.models[model.name] = model;
      return model;
    }).map(model => {
      $TJcN$export$default(this)(model);
      return model;
    }).map(model => {
      $G2Rw$export$default(model);
      $vlmN$export$default(model);
      $fapk$export$default(model);
      $PcjM$export$default(model);
      $sKyS$export$default(model);
      $xciL$export$default(model);
      return model;
    });
  }

}

$Focm$exports.Model = $A6pM$export$default;
$Focm$exports.Database = $zy9f$export$default;

if (typeof exports === "object" && typeof module !== "undefined") {
  // CommonJS
  module.exports = $Focm$exports;
} else if (typeof define === "function" && define.amd) {
  // RequireJS
  define(function () {
    return $Focm$exports;
  });
}
})();