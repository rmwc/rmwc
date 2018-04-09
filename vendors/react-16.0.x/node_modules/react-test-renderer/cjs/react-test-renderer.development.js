/** @license React v16.0.0
 * react-test-renderer.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';


if (process.env.NODE_ENV !== "production") {
(function() {

'use strict';

var _assign = require('object-assign');
var invariant = require('fbjs/lib/invariant');
var require$$0 = require('fbjs/lib/warning');
var emptyObject = require('fbjs/lib/emptyObject');
var react = require('react');
var checkPropTypes = require('prop-types/checkPropTypes');
var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactFeatureFlags
 * 
 */

var ReactFeatureFlags = {
  enableAsyncSubtreeAPI: true
};

var ReactFeatureFlags_1 = ReactFeatureFlags;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfSideEffect
 * 
 */

var ReactTypeOfSideEffect = {
  // Don't change these two values:
  NoEffect: 0, //           0b00000000
  PerformedWork: 1, //      0b00000001
  // You can change the rest (and add more).
  Placement: 2, //          0b00000010
  Update: 4, //             0b00000100
  PlacementAndUpdate: 6, // 0b00000110
  Deletion: 8, //           0b00001000
  ContentReset: 16, //      0b00010000
  Callback: 32, //          0b00100000
  Err: 64, //               0b01000000
  Ref: 128 };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactPriorityLevel
 * 
 */

var ReactPriorityLevel = {
  NoWork: 0, // No work is pending.
  SynchronousPriority: 1, // For controlled text inputs. Synchronous side-effects.
  TaskPriority: 2, // Completes at the end of the current tick.
  HighPriority: 3, // Interaction that needs to complete pretty soon to feel responsive.
  LowPriority: 4, // Data fetching, or result from updating stores.
  OffscreenPriority: 5 };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfWork
 * 
 */

var ReactTypeOfWork = {
  IndeterminateComponent: 0, // Before we know whether it is functional or class
  FunctionalComponent: 1,
  ClassComponent: 2,
  HostRoot: 3, // Root of a host tree. Could be nested inside another node.
  HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
  HostComponent: 5,
  HostText: 6,
  CoroutineComponent: 7,
  CoroutineHandlerPhase: 8,
  YieldComponent: 9,
  Fragment: 10
};

var CallbackEffect = ReactTypeOfSideEffect.Callback;

var NoWork = ReactPriorityLevel.NoWork;
var SynchronousPriority = ReactPriorityLevel.SynchronousPriority;
var TaskPriority = ReactPriorityLevel.TaskPriority;

var ClassComponent$1 = ReactTypeOfWork.ClassComponent;
var HostRoot$1 = ReactTypeOfWork.HostRoot;


{
  var warning$1 = require$$0;
}

// Callbacks are not validated until invocation


// Singly linked-list of updates. When an update is scheduled, it is added to
// the queue of the current fiber and the work-in-progress fiber. The two queues
// are separate but they share a persistent structure.
//
// During reconciliation, updates are removed from the work-in-progress fiber,
// but they remain on the current fiber. That ensures that if a work-in-progress
// is aborted, the aborted updates are recovered by cloning from current.
//
// The work-in-progress queue is always a subset of the current queue.
//
// When the tree is committed, the work-in-progress becomes the current.


var _queue1 = void 0;
var _queue2 = void 0;

function comparePriority(a, b) {
  // When comparing update priorities, treat sync and Task work as equal.
  // TODO: Could we avoid the need for this by always coercing sync priority
  // to Task when scheduling an update?
  if ((a === TaskPriority || a === SynchronousPriority) && (b === TaskPriority || b === SynchronousPriority)) {
    return 0;
  }
  if (a === NoWork && b !== NoWork) {
    return -255;
  }
  if (a !== NoWork && b === NoWork) {
    return 255;
  }
  return a - b;
}

function createUpdateQueue() {
  var queue = {
    first: null,
    last: null,
    hasForceUpdate: false,
    callbackList: null
  };
  {
    queue.isProcessing = false;
  }
  return queue;
}

function cloneUpdate(update) {
  return {
    priorityLevel: update.priorityLevel,
    partialState: update.partialState,
    callback: update.callback,
    isReplace: update.isReplace,
    isForced: update.isForced,
    isTopLevelUnmount: update.isTopLevelUnmount,
    next: null
  };
}

function insertUpdateIntoQueue(queue, update, insertAfter, insertBefore) {
  if (insertAfter !== null) {
    insertAfter.next = update;
  } else {
    // This is the first item in the queue.
    update.next = queue.first;
    queue.first = update;
  }

  if (insertBefore !== null) {
    update.next = insertBefore;
  } else {
    // This is the last item in the queue.
    queue.last = update;
  }
}

// Returns the update after which the incoming update should be inserted into
// the queue, or null if it should be inserted at beginning.
function findInsertionPosition(queue, update) {
  var priorityLevel = update.priorityLevel;
  var insertAfter = null;
  var insertBefore = null;
  if (queue.last !== null && comparePriority(queue.last.priorityLevel, priorityLevel) <= 0) {
    // Fast path for the common case where the update should be inserted at
    // the end of the queue.
    insertAfter = queue.last;
  } else {
    insertBefore = queue.first;
    while (insertBefore !== null && comparePriority(insertBefore.priorityLevel, priorityLevel) <= 0) {
      insertAfter = insertBefore;
      insertBefore = insertBefore.next;
    }
  }
  return insertAfter;
}

function ensureUpdateQueues(fiber) {
  var alternateFiber = fiber.alternate;

  var queue1 = fiber.updateQueue;
  if (queue1 === null) {
    queue1 = fiber.updateQueue = createUpdateQueue();
  }

  var queue2 = void 0;
  if (alternateFiber !== null) {
    queue2 = alternateFiber.updateQueue;
    if (queue2 === null) {
      queue2 = alternateFiber.updateQueue = createUpdateQueue();
    }
  } else {
    queue2 = null;
  }

  _queue1 = queue1;
  // Return null if there is no alternate queue, or if its queue is the same.
  _queue2 = queue2 !== queue1 ? queue2 : null;
}

// The work-in-progress queue is a subset of the current queue (if it exists).
// We need to insert the incoming update into both lists. However, it's possible
// that the correct position in one list will be different from the position in
// the other. Consider the following case:
//
//     Current:             3-5-6
//     Work-in-progress:        6
//
// Then we receive an update with priority 4 and insert it into each list:
//
//     Current:             3-4-5-6
//     Work-in-progress:        4-6
//
// In the current queue, the new update's `next` pointer points to the update
// with priority 5. But in the work-in-progress queue, the pointer points to the
// update with priority 6. Because these two queues share the same persistent
// data structure, this won't do. (This can only happen when the incoming update
// has higher priority than all the updates in the work-in-progress queue.)
//
// To solve this, in the case where the incoming update needs to be inserted
// into two different positions, we'll make a clone of the update and insert
// each copy into a separate queue. This forks the list while maintaining a
// persistent structure, because the update that is added to the work-in-progress
// is always added to the front of the list.
//
// However, if incoming update is inserted into the same position of both lists,
// we shouldn't make a copy.
//
// If the update is cloned, it returns the cloned update.
function insertUpdate(fiber, update) {
  // We'll have at least one and at most two distinct update queues.
  ensureUpdateQueues(fiber);
  var queue1 = _queue1;
  var queue2 = _queue2;

  // Warn if an update is scheduled from inside an updater function.
  {
    if (queue1.isProcessing || queue2 !== null && queue2.isProcessing) {
      warning$1(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
    }
  }

  // Find the insertion position in the first queue.
  var insertAfter1 = findInsertionPosition(queue1, update);
  var insertBefore1 = insertAfter1 !== null ? insertAfter1.next : queue1.first;

  if (queue2 === null) {
    // If there's no alternate queue, there's nothing else to do but insert.
    insertUpdateIntoQueue(queue1, update, insertAfter1, insertBefore1);
    return null;
  }

  // If there is an alternate queue, find the insertion position.
  var insertAfter2 = findInsertionPosition(queue2, update);
  var insertBefore2 = insertAfter2 !== null ? insertAfter2.next : queue2.first;

  // Now we can insert into the first queue. This must come after finding both
  // insertion positions because it mutates the list.
  insertUpdateIntoQueue(queue1, update, insertAfter1, insertBefore1);

  // See if the insertion positions are equal. Be careful to only compare
  // non-null values.
  if (insertBefore1 === insertBefore2 && insertBefore1 !== null || insertAfter1 === insertAfter2 && insertAfter1 !== null) {
    // The insertion positions are the same, so when we inserted into the first
    // queue, it also inserted into the alternate. All we need to do is update
    // the alternate queue's `first` and `last` pointers, in case they
    // have changed.
    if (insertAfter2 === null) {
      queue2.first = update;
    }
    if (insertBefore2 === null) {
      queue2.last = null;
    }
    return null;
  } else {
    // The insertion positions are different, so we need to clone the update and
    // insert the clone into the alternate queue.
    var update2 = cloneUpdate(update);
    insertUpdateIntoQueue(queue2, update2, insertAfter2, insertBefore2);
    return update2;
  }
}

function addUpdate(fiber, partialState, callback, priorityLevel) {
  var update = {
    priorityLevel: priorityLevel,
    partialState: partialState,
    callback: callback,
    isReplace: false,
    isForced: false,
    isTopLevelUnmount: false,
    next: null
  };
  insertUpdate(fiber, update);
}
var addUpdate_1 = addUpdate;

function addReplaceUpdate(fiber, state, callback, priorityLevel) {
  var update = {
    priorityLevel: priorityLevel,
    partialState: state,
    callback: callback,
    isReplace: true,
    isForced: false,
    isTopLevelUnmount: false,
    next: null
  };
  insertUpdate(fiber, update);
}
var addReplaceUpdate_1 = addReplaceUpdate;

function addForceUpdate(fiber, callback, priorityLevel) {
  var update = {
    priorityLevel: priorityLevel,
    partialState: null,
    callback: callback,
    isReplace: false,
    isForced: true,
    isTopLevelUnmount: false,
    next: null
  };
  insertUpdate(fiber, update);
}
var addForceUpdate_1 = addForceUpdate;

function getUpdatePriority(fiber) {
  var updateQueue = fiber.updateQueue;
  if (updateQueue === null) {
    return NoWork;
  }
  if (fiber.tag !== ClassComponent$1 && fiber.tag !== HostRoot$1) {
    return NoWork;
  }
  return updateQueue.first !== null ? updateQueue.first.priorityLevel : NoWork;
}
var getUpdatePriority_1 = getUpdatePriority;

function addTopLevelUpdate$1(fiber, partialState, callback, priorityLevel) {
  var isTopLevelUnmount = partialState.element === null;

  var update = {
    priorityLevel: priorityLevel,
    partialState: partialState,
    callback: callback,
    isReplace: false,
    isForced: false,
    isTopLevelUnmount: isTopLevelUnmount,
    next: null
  };
  var update2 = insertUpdate(fiber, update);

  if (isTopLevelUnmount) {
    // TODO: Redesign the top-level mount/update/unmount API to avoid this
    // special case.
    var queue1 = _queue1;
    var queue2 = _queue2;

    // Drop all updates that are lower-priority, so that the tree is not
    // remounted. We need to do this for both queues.
    if (queue1 !== null && update.next !== null) {
      update.next = null;
      queue1.last = update;
    }
    if (queue2 !== null && update2 !== null && update2.next !== null) {
      update2.next = null;
      queue2.last = update;
    }
  }
}
var addTopLevelUpdate_1 = addTopLevelUpdate$1;

function getStateFromUpdate(update, instance, prevState, props) {
  var partialState = update.partialState;
  if (typeof partialState === 'function') {
    var updateFn = partialState;
    return updateFn.call(instance, prevState, props);
  } else {
    return partialState;
  }
}

function beginUpdateQueue(current, workInProgress, queue, instance, prevState, props, priorityLevel) {
  if (current !== null && current.updateQueue === queue) {
    // We need to create a work-in-progress queue, by cloning the current queue.
    var currentQueue = queue;
    queue = workInProgress.updateQueue = {
      first: currentQueue.first,
      last: currentQueue.last,
      // These fields are no longer valid because they were already committed.
      // Reset them.
      callbackList: null,
      hasForceUpdate: false
    };
  }

  {
    // Set this flag so we can warn if setState is called inside the update
    // function of another setState.
    queue.isProcessing = true;
  }

  // Calculate these using the the existing values as a base.
  var callbackList = queue.callbackList;
  var hasForceUpdate = queue.hasForceUpdate;

  // Applies updates with matching priority to the previous state to create
  // a new state object.
  var state = prevState;
  var dontMutatePrevState = true;
  var update = queue.first;
  while (update !== null && comparePriority(update.priorityLevel, priorityLevel) <= 0) {
    // Remove each update from the queue right before it is processed. That way
    // if setState is called from inside an updater function, the new update
    // will be inserted in the correct position.
    queue.first = update.next;
    if (queue.first === null) {
      queue.last = null;
    }

    var _partialState = void 0;
    if (update.isReplace) {
      state = getStateFromUpdate(update, instance, state, props);
      dontMutatePrevState = true;
    } else {
      _partialState = getStateFromUpdate(update, instance, state, props);
      if (_partialState) {
        if (dontMutatePrevState) {
          state = _assign({}, state, _partialState);
        } else {
          state = _assign(state, _partialState);
        }
        dontMutatePrevState = false;
      }
    }
    if (update.isForced) {
      hasForceUpdate = true;
    }
    // Second condition ignores top-level unmount callbacks if they are not the
    // last update in the queue, since a subsequent update will cause a remount.
    if (update.callback !== null && !(update.isTopLevelUnmount && update.next !== null)) {
      callbackList = callbackList !== null ? callbackList : [];
      callbackList.push(update.callback);
      workInProgress.effectTag |= CallbackEffect;
    }
    update = update.next;
  }

  queue.callbackList = callbackList;
  queue.hasForceUpdate = hasForceUpdate;

  if (queue.first === null && callbackList === null && !hasForceUpdate) {
    // The queue is empty and there are no callbacks. We can reset it.
    workInProgress.updateQueue = null;
  }

  {
    // No longer processing.
    queue.isProcessing = false;
  }

  return state;
}
var beginUpdateQueue_1 = beginUpdateQueue;

function commitCallbacks(finishedWork, queue, context) {
  var callbackList = queue.callbackList;
  if (callbackList === null) {
    return;
  }

  // Set the list to null to make sure they don't get called more than once.
  queue.callbackList = null;

  for (var i = 0; i < callbackList.length; i++) {
    var _callback = callbackList[i];
    !(typeof _callback === 'function') ? invariant(false, 'Invalid argument passed as callback. Expected a function. Instead received: %s', _callback) : void 0;
    _callback.call(context);
  }
}
var commitCallbacks_1 = commitCallbacks;

var ReactFiberUpdateQueue = {
	addUpdate: addUpdate_1,
	addReplaceUpdate: addReplaceUpdate_1,
	addForceUpdate: addForceUpdate_1,
	getUpdatePriority: getUpdatePriority_1,
	addTopLevelUpdate: addTopLevelUpdate_1,
	beginUpdateQueue: beginUpdateQueue_1,
	commitCallbacks: commitCallbacks_1
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName$1(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactInstanceMap
 */

/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 */

// TODO: Replace this with ES6: var ReactInstanceMap = new Map();

var ReactInstanceMap = {
  /**
   * This API should be called `delete` but we'd have to make sure to always
   * transform these to strings for IE support. When this transform is fully
   * supported we can rename it.
   */
  remove: function (key) {
    key._reactInternalFiber = undefined;
  },

  get: function (key) {
    return key._reactInternalFiber;
  },

  has: function (key) {
    return key._reactInternalFiber !== undefined;
  },

  set: function (key, value) {
    key._reactInternalFiber = value;
  }
};

var ReactInstanceMap_1 = ReactInstanceMap;

var ReactInternals = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactGlobalSharedState = {
  ReactCurrentOwner: ReactInternals.ReactCurrentOwner
};

{
  _assign(ReactGlobalSharedState, {
    ReactComponentTreeHook: ReactInternals.ReactComponentTreeHook,
    ReactDebugCurrentFrame: ReactInternals.ReactDebugCurrentFrame
  });
}

var ReactGlobalSharedState_1 = ReactGlobalSharedState;

var ReactCurrentOwner = ReactGlobalSharedState_1.ReactCurrentOwner;




{
  var warning$3 = require$$0;
}

var ClassComponent$3 = ReactTypeOfWork.ClassComponent;
var HostComponent$2 = ReactTypeOfWork.HostComponent;
var HostRoot$3 = ReactTypeOfWork.HostRoot;
var HostPortal = ReactTypeOfWork.HostPortal;
var HostText$1 = ReactTypeOfWork.HostText;

var NoEffect = ReactTypeOfSideEffect.NoEffect;
var Placement = ReactTypeOfSideEffect.Placement;

var MOUNTING = 1;
var MOUNTED = 2;
var UNMOUNTED = 3;

function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (!fiber.alternate) {
    // If there is no alternate, this might be a new tree that isn't inserted
    // yet. If it is, then it will have a pending insertion effect on it.
    if ((node.effectTag & Placement) !== NoEffect) {
      return MOUNTING;
    }
    while (node['return']) {
      node = node['return'];
      if ((node.effectTag & Placement) !== NoEffect) {
        return MOUNTING;
      }
    }
  } else {
    while (node['return']) {
      node = node['return'];
    }
  }
  if (node.tag === HostRoot$3) {
    // TODO: Check if this was a nested HostRoot when used with
    // renderContainerIntoSubtree.
    return MOUNTED;
  }
  // If we didn't hit the root, that means that we're in an disconnected tree
  // that has been unmounted.
  return UNMOUNTED;
}
var isFiberMounted$1 = function (fiber) {
  return isFiberMountedImpl(fiber) === MOUNTED;
};

var isMounted = function (component) {
  {
    var owner = ReactCurrentOwner.current;
    if (owner !== null && owner.tag === ClassComponent$3) {
      var ownerFiber = owner;
      var instance = ownerFiber.stateNode;
      warning$3(instance._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', getComponentName_1(ownerFiber) || 'A component');
      instance._warnedAboutRefsInRender = true;
    }
  }

  var fiber = ReactInstanceMap_1.get(component);
  if (!fiber) {
    return false;
  }
  return isFiberMountedImpl(fiber) === MOUNTED;
};

function assertIsMounted(fiber) {
  !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
}

function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    // If there is no alternate, then we only need to check if it is mounted.
    var state = isFiberMountedImpl(fiber);
    !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
    if (state === MOUNTING) {
      return null;
    }
    return fiber;
  }
  // If we have two possible branches, we'll walk backwards up to the root
  // to see what path the root points to. On the way we may hit one of the
  // special cases and we'll deal with them.
  var a = fiber;
  var b = alternate;
  while (true) {
    var parentA = a['return'];
    var parentB = parentA ? parentA.alternate : null;
    if (!parentA || !parentB) {
      // We're at the root.
      break;
    }

    // If both copies of the parent fiber point to the same child, we can
    // assume that the child is current. This happens when we bailout on low
    // priority: the bailed out fiber's child reuses the current child.
    if (parentA.child === parentB.child) {
      var child = parentA.child;
      while (child) {
        if (child === a) {
          // We've determined that A is the current branch.
          assertIsMounted(parentA);
          return fiber;
        }
        if (child === b) {
          // We've determined that B is the current branch.
          assertIsMounted(parentA);
          return alternate;
        }
        child = child.sibling;
      }
      // We should never have an alternate for any mounting node. So the only
      // way this could possibly happen is if this was unmounted, if at all.
      invariant(false, 'Unable to find node on an unmounted component.');
    }

    if (a['return'] !== b['return']) {
      // The return pointer of A and the return pointer of B point to different
      // fibers. We assume that return pointers never criss-cross, so A must
      // belong to the child set of A.return, and B must belong to the child
      // set of B.return.
      a = parentA;
      b = parentB;
    } else {
      // The return pointers point to the same fiber. We'll have to use the
      // default, slow path: scan the child sets of each parent alternate to see
      // which child belongs to which set.
      //
      // Search parent A's child set
      var didFindChild = false;
      var _child = parentA.child;
      while (_child) {
        if (_child === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        // Search parent B's child set
        _child = parentB.child;
        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
      }
    }

    !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  }
  // If the root is not a host container, we're in a disconnected tree. I.e.
  // unmounted.
  !(a.tag === HostRoot$3) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
  if (a.stateNode.current === a) {
    // We've determined that A is the current branch.
    return fiber;
  }
  // Otherwise B has to be current branch.
  return alternate;
}
var findCurrentFiberUsingSlowPath_1 = findCurrentFiberUsingSlowPath;

var findCurrentHostFiber$1 = function (parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent$2 || node.tag === HostText$1) {
      return node;
    } else if (node.child) {
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
};

var findCurrentHostFiberWithNoPortals$1 = function (parent) {
  var currentParent = findCurrentFiberUsingSlowPath(parent);
  if (!currentParent) {
    return null;
  }

  // Next we'll drill down this component to find the first HostComponent/Text.
  var node = currentParent;
  while (true) {
    if (node.tag === HostComponent$2 || node.tag === HostText$1) {
      return node;
    } else if (node.child && node.tag !== HostPortal) {
      node.child['return'] = node;
      node = node.child;
      continue;
    }
    if (node === currentParent) {
      return null;
    }
    while (!node.sibling) {
      if (!node['return'] || node['return'] === currentParent) {
        return null;
      }
      node = node['return'];
    }
    node.sibling['return'] = node['return'];
    node = node.sibling;
  }
  // Flow needs the return null here, but ESLint complains about it.
  // eslint-disable-next-line no-unreachable
  return null;
};

var ReactFiberTreeReflection = {
	isFiberMounted: isFiberMounted$1,
	isMounted: isMounted,
	findCurrentFiberUsingSlowPath: findCurrentFiberUsingSlowPath_1,
	findCurrentHostFiber: findCurrentHostFiber$1,
	findCurrentHostFiberWithNoPortals: findCurrentHostFiberWithNoPortals$1
};

{
  var warning$4 = require$$0;
}

var valueStack = [];

{
  var fiberStack = [];
}

var index = -1;

var createCursor$1 = function (defaultValue) {
  return {
    current: defaultValue
  };
};

var isEmpty = function () {
  return index === -1;
};

var pop$1 = function (cursor, fiber) {
  if (index < 0) {
    {
      warning$4(false, 'Unexpected pop.');
    }
    return;
  }

  {
    if (fiber !== fiberStack[index]) {
      warning$4(false, 'Unexpected Fiber popped.');
    }
  }

  cursor.current = valueStack[index];

  valueStack[index] = null;

  {
    fiberStack[index] = null;
  }

  index--;
};

var push$1 = function (cursor, value, fiber) {
  index++;

  valueStack[index] = cursor.current;

  {
    fiberStack[index] = fiber;
  }

  cursor.current = value;
};

var reset = function () {
  while (index > -1) {
    valueStack[index] = null;

    {
      fiberStack[index] = null;
    }

    index--;
  }
};

var ReactFiberStack = {
	createCursor: createCursor$1,
	isEmpty: isEmpty,
	pop: pop$1,
	push: push$1,
	reset: reset
};

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent$1 = ReactTypeOfWork.FunctionalComponent;
var ClassComponent$4 = ReactTypeOfWork.ClassComponent;
var HostComponent$3 = ReactTypeOfWork.HostComponent;




function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent$1:
    case ClassComponent$4:
    case HostComponent$3:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName_1(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName_1(owner);
      }
      return describeComponentFrame(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber$1(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

var ReactFiberComponentTreeHook = {
  getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber$1
};

var ReactDebugCurrentFrame = ReactGlobalSharedState_1.ReactDebugCurrentFrame;

{
  var getComponentName$3 = getComponentName_1;

  var _require2$1 = ReactFiberComponentTreeHook,
      getStackAddendumByWorkInProgressFiber = _require2$1.getStackAddendumByWorkInProgressFiber;
}

function getCurrentFiberOwnerName() {
  {
    var fiber = ReactDebugCurrentFiber$2.current;
    if (fiber === null) {
      return null;
    }
    if (fiber._debugOwner != null) {
      return getComponentName$3(fiber._debugOwner);
    }
  }
  return null;
}

function getCurrentFiberStackAddendum() {
  {
    var fiber = ReactDebugCurrentFiber$2.current;
    if (fiber === null) {
      return null;
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackAddendumByWorkInProgressFiber(fiber);
  }
  return null;
}

function resetCurrentFiber() {
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFiber$2.current = null;
  ReactDebugCurrentFiber$2.phase = null;
}

function setCurrentFiber(fiber, phase) {
  ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum;
  ReactDebugCurrentFiber$2.current = fiber;
  ReactDebugCurrentFiber$2.phase = phase;
}

var ReactDebugCurrentFiber$2 = {
  current: null,
  phase: null,
  resetCurrentFiber: resetCurrentFiber,
  setCurrentFiber: setCurrentFiber,
  getCurrentFiberOwnerName: getCurrentFiberOwnerName,
  getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
};

var ReactDebugCurrentFiber_1 = ReactDebugCurrentFiber$2;

// Trust the developer to only use this with a true check
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugFiberPerf
 * 
 */

var ReactDebugFiberPerf = null;

{
  var _require$1 = ReactTypeOfWork,
      HostRoot$4 = _require$1.HostRoot,
      HostComponent$4 = _require$1.HostComponent,
      HostText$2 = _require$1.HostText,
      HostPortal$1 = _require$1.HostPortal,
      YieldComponent = _require$1.YieldComponent,
      Fragment$1 = _require$1.Fragment;

  var getComponentName$4 = getComponentName_1;

  // Prefix measurements so that it's possible to filter them.
  // Longer prefixes are hard to read in DevTools.
  var reactEmoji = '\u269B';
  var warningEmoji = '\u26D4';
  var supportsUserTiming = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  // Keep track of current fiber so that we know the path to unwind on pause.
  // TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
  var currentFiber = null;
  // If we're in the middle of user code, which fiber and method is it?
  // Reusing `currentFiber` would be confusing for this because user code fiber
  // can change during commit phase too, but we don't need to unwind it (since
  // lifecycles in the commit phase don't resemble a tree).
  var currentPhase = null;
  var currentPhaseFiber = null;
  // Did lifecycle hook schedule an update? This is often a performance problem,
  // so we will keep track of it, and include it in the report.
  // Track commits caused by cascading updates.
  var isCommitting = false;
  var hasScheduledUpdateInCurrentCommit = false;
  var hasScheduledUpdateInCurrentPhase = false;
  var commitCountInCurrentWorkLoop = 0;
  var effectCountInCurrentCommit = 0;
  // During commits, we only show a measurement once per method name
  // to avoid stretch the commit phase with measurement overhead.
  var labelsInCurrentCommit = new Set();

  var formatMarkName = function (markName) {
    return reactEmoji + ' ' + markName;
  };

  var formatLabel = function (label, warning) {
    var prefix = warning ? warningEmoji + ' ' : reactEmoji + ' ';
    var suffix = warning ? ' Warning: ' + warning : '';
    return '' + prefix + label + suffix;
  };

  var beginMark = function (markName) {
    performance.mark(formatMarkName(markName));
  };

  var clearMark = function (markName) {
    performance.clearMarks(formatMarkName(markName));
  };

  var endMark = function (label, markName, warning) {
    var formattedMarkName = formatMarkName(markName);
    var formattedLabel = formatLabel(label, warning);
    try {
      performance.measure(formattedLabel, formattedMarkName);
    } catch (err) {}
    // If previous mark was missing for some reason, this will throw.
    // This could only happen if React crashed in an unexpected place earlier.
    // Don't pile on with more errors.

    // Clear marks immediately to avoid growing buffer.
    performance.clearMarks(formattedMarkName);
    performance.clearMeasures(formattedLabel);
  };

  var getFiberMarkName = function (label, debugID) {
    return label + ' (#' + debugID + ')';
  };

  var getFiberLabel = function (componentName, isMounted, phase) {
    if (phase === null) {
      // These are composite component total time measurements.
      return componentName + ' [' + (isMounted ? 'update' : 'mount') + ']';
    } else {
      // Composite component methods.
      return componentName + '.' + phase;
    }
  };

  var beginFiberMark = function (fiber, phase) {
    var componentName = getComponentName$4(fiber) || 'Unknown';
    var debugID = fiber._debugID;
    var isMounted = fiber.alternate !== null;
    var label = getFiberLabel(componentName, isMounted, phase);

    if (isCommitting && labelsInCurrentCommit.has(label)) {
      // During the commit phase, we don't show duplicate labels because
      // there is a fixed overhead for every measurement, and we don't
      // want to stretch the commit phase beyond necessary.
      return false;
    }
    labelsInCurrentCommit.add(label);

    var markName = getFiberMarkName(label, debugID);
    beginMark(markName);
    return true;
  };

  var clearFiberMark = function (fiber, phase) {
    var componentName = getComponentName$4(fiber) || 'Unknown';
    var debugID = fiber._debugID;
    var isMounted = fiber.alternate !== null;
    var label = getFiberLabel(componentName, isMounted, phase);
    var markName = getFiberMarkName(label, debugID);
    clearMark(markName);
  };

  var endFiberMark = function (fiber, phase, warning) {
    var componentName = getComponentName$4(fiber) || 'Unknown';
    var debugID = fiber._debugID;
    var isMounted = fiber.alternate !== null;
    var label = getFiberLabel(componentName, isMounted, phase);
    var markName = getFiberMarkName(label, debugID);
    endMark(label, markName, warning);
  };

  var shouldIgnoreFiber = function (fiber) {
    // Host components should be skipped in the timeline.
    // We could check typeof fiber.type, but does this work with RN?
    switch (fiber.tag) {
      case HostRoot$4:
      case HostComponent$4:
      case HostText$2:
      case HostPortal$1:
      case YieldComponent:
      case Fragment$1:
        return true;
      default:
        return false;
    }
  };

  var clearPendingPhaseMeasurement = function () {
    if (currentPhase !== null && currentPhaseFiber !== null) {
      clearFiberMark(currentPhaseFiber, currentPhase);
    }
    currentPhaseFiber = null;
    currentPhase = null;
    hasScheduledUpdateInCurrentPhase = false;
  };

  var pauseTimers = function () {
    // Stops all currently active measurements so that they can be resumed
    // if we continue in a later deferred loop from the same unit of work.
    var fiber = currentFiber;
    while (fiber) {
      if (fiber._debugIsCurrentlyTiming) {
        endFiberMark(fiber, null, null);
      }
      fiber = fiber['return'];
    }
  };

  var resumeTimersRecursively = function (fiber) {
    if (fiber['return'] !== null) {
      resumeTimersRecursively(fiber['return']);
    }
    if (fiber._debugIsCurrentlyTiming) {
      beginFiberMark(fiber, null);
    }
  };

  var resumeTimers = function () {
    // Resumes all measurements that were active during the last deferred loop.
    if (currentFiber !== null) {
      resumeTimersRecursively(currentFiber);
    }
  };

  ReactDebugFiberPerf = {
    recordEffect: function () {
      effectCountInCurrentCommit++;
    },
    recordScheduleUpdate: function () {
      if (isCommitting) {
        hasScheduledUpdateInCurrentCommit = true;
      }
      if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
        hasScheduledUpdateInCurrentPhase = true;
      }
    },
    startWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // If we pause, this is the fiber to unwind from.
      currentFiber = fiber;
      if (!beginFiberMark(fiber, null)) {
        return;
      }
      fiber._debugIsCurrentlyTiming = true;
    },
    cancelWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // Remember we shouldn't complete measurement for this fiber.
      // Otherwise flamechart will be deep even for small updates.
      fiber._debugIsCurrentlyTiming = false;
      clearFiberMark(fiber, null);
    },
    stopWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // If we pause, its parent is the fiber to unwind from.
      currentFiber = fiber['return'];
      if (!fiber._debugIsCurrentlyTiming) {
        return;
      }
      fiber._debugIsCurrentlyTiming = false;
      endFiberMark(fiber, null, null);
    },
    stopFailedWorkTimer: function (fiber) {
      if (!supportsUserTiming || shouldIgnoreFiber(fiber)) {
        return;
      }
      // If we pause, its parent is the fiber to unwind from.
      currentFiber = fiber['return'];
      if (!fiber._debugIsCurrentlyTiming) {
        return;
      }
      fiber._debugIsCurrentlyTiming = false;
      var warning = 'An error was thrown inside this error boundary';
      endFiberMark(fiber, null, warning);
    },
    startPhaseTimer: function (fiber, phase) {
      if (!supportsUserTiming) {
        return;
      }
      clearPendingPhaseMeasurement();
      if (!beginFiberMark(fiber, phase)) {
        return;
      }
      currentPhaseFiber = fiber;
      currentPhase = phase;
    },
    stopPhaseTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      if (currentPhase !== null && currentPhaseFiber !== null) {
        var warning = hasScheduledUpdateInCurrentPhase ? 'Scheduled a cascading update' : null;
        endFiberMark(currentPhaseFiber, currentPhase, warning);
      }
      currentPhase = null;
      currentPhaseFiber = null;
    },
    startWorkLoopTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      commitCountInCurrentWorkLoop = 0;
      // This is top level call.
      // Any other measurements are performed within.
      beginMark('(React Tree Reconciliation)');
      // Resume any measurements that were in progress during the last loop.
      resumeTimers();
    },
    stopWorkLoopTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      var warning = commitCountInCurrentWorkLoop > 1 ? 'There were cascading updates' : null;
      commitCountInCurrentWorkLoop = 0;
      // Pause any measurements until the next loop.
      pauseTimers();
      endMark('(React Tree Reconciliation)', '(React Tree Reconciliation)', warning);
    },
    startCommitTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      isCommitting = true;
      hasScheduledUpdateInCurrentCommit = false;
      labelsInCurrentCommit.clear();
      beginMark('(Committing Changes)');
    },
    stopCommitTimer: function () {
      if (!supportsUserTiming) {
        return;
      }

      var warning = null;
      if (hasScheduledUpdateInCurrentCommit) {
        warning = 'Lifecycle hook scheduled a cascading update';
      } else if (commitCountInCurrentWorkLoop > 0) {
        warning = 'Caused by a cascading update in earlier commit';
      }
      hasScheduledUpdateInCurrentCommit = false;
      commitCountInCurrentWorkLoop++;
      isCommitting = false;
      labelsInCurrentCommit.clear();

      endMark('(Committing Changes)', '(Committing Changes)', warning);
    },
    startCommitHostEffectsTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      effectCountInCurrentCommit = 0;
      beginMark('(Committing Host Effects)');
    },
    stopCommitHostEffectsTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      var count = effectCountInCurrentCommit;
      effectCountInCurrentCommit = 0;
      endMark('(Committing Host Effects: ' + count + ' Total)', '(Committing Host Effects)', null);
    },
    startCommitLifeCyclesTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      effectCountInCurrentCommit = 0;
      beginMark('(Calling Lifecycle Methods)');
    },
    stopCommitLifeCyclesTimer: function () {
      if (!supportsUserTiming) {
        return;
      }
      var count = effectCountInCurrentCommit;
      effectCountInCurrentCommit = 0;
      endMark('(Calling Lifecycle Methods: ' + count + ' Total)', '(Calling Lifecycle Methods)', null);
    }
  };
}

var ReactDebugFiberPerf_1 = ReactDebugFiberPerf;

var isFiberMounted = ReactFiberTreeReflection.isFiberMounted;

var ClassComponent$2 = ReactTypeOfWork.ClassComponent;
var HostRoot$2 = ReactTypeOfWork.HostRoot;

var createCursor = ReactFiberStack.createCursor;
var pop = ReactFiberStack.pop;
var push = ReactFiberStack.push;

{
  var warning$2 = require$$0;
  var checkPropTypes$1 = checkPropTypes;
  var ReactDebugCurrentFiber$1 = ReactDebugCurrentFiber_1;

  var _require4 = ReactDebugFiberPerf_1,
      startPhaseTimer = _require4.startPhaseTimer,
      stopPhaseTimer = _require4.stopPhaseTimer;

  var warnedAboutMissingGetChildContext = {};
}

// A cursor to the current merged context object on the stack.
var contextStackCursor = createCursor(emptyObject);
// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor = createCursor(false);
// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext = emptyObject;

function getUnmaskedContext(workInProgress) {
  var hasOwnContext = isContextProvider$1(workInProgress);
  if (hasOwnContext) {
    // If the fiber is a context provider itself, when we read its context
    // we have already pushed its own child context on the stack. A context
    // provider should not "see" its own child context. Therefore we read the
    // previous (parent) context instead for a context provider.
    return previousContext;
  }
  return contextStackCursor.current;
}
var getUnmaskedContext_1 = getUnmaskedContext;

function cacheContext(workInProgress, unmaskedContext, maskedContext) {
  var instance = workInProgress.stateNode;
  instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext;
  instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
}
var cacheContext_1 = cacheContext;

var getMaskedContext = function (workInProgress, unmaskedContext) {
  var type = workInProgress.type;
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyObject;
  }

  // Avoid recreating masked context unless unmasked context has changed.
  // Failing to do this will result in unnecessary calls to componentWillReceiveProps.
  // This may trigger infinite loops if componentWillReceiveProps calls setState.
  var instance = workInProgress.stateNode;
  if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) {
    return instance.__reactInternalMemoizedMaskedChildContext;
  }

  var context = {};
  for (var key in contextTypes) {
    context[key] = unmaskedContext[key];
  }

  {
    var name = getComponentName_1(workInProgress) || 'Unknown';
    ReactDebugCurrentFiber$1.setCurrentFiber(workInProgress, null);
    checkPropTypes$1(contextTypes, context, 'context', name, ReactDebugCurrentFiber$1.getCurrentFiberStackAddendum);
    ReactDebugCurrentFiber$1.resetCurrentFiber();
  }

  // Cache unmasked context so we can avoid recreating masked context unless necessary.
  // Context is created before the class component is instantiated so check for instance.
  if (instance) {
    cacheContext(workInProgress, unmaskedContext, context);
  }

  return context;
};

var hasContextChanged = function () {
  return didPerformWorkStackCursor.current;
};

function isContextConsumer(fiber) {
  return fiber.tag === ClassComponent$2 && fiber.type.contextTypes != null;
}
var isContextConsumer_1 = isContextConsumer;

function isContextProvider$1(fiber) {
  return fiber.tag === ClassComponent$2 && fiber.type.childContextTypes != null;
}
var isContextProvider_1 = isContextProvider$1;

function popContextProvider(fiber) {
  if (!isContextProvider$1(fiber)) {
    return;
  }

  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
var popContextProvider_1 = popContextProvider;

var popTopLevelContextObject = function (fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
};

var pushTopLevelContextObject = function (fiber, context, didChange) {
  !(contextStackCursor.cursor == null) ? invariant(false, 'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
};

function processChildContext$1(fiber, parentContext, isReconciling) {
  var instance = fiber.stateNode;
  var childContextTypes = fiber.type.childContextTypes;

  // TODO (bvaughn) Replace this behavior with an invariant() in the future.
  // It has only been added in Fiber to match the (unintentional) behavior in Stack.
  if (typeof instance.getChildContext !== 'function') {
    {
      var componentName = getComponentName_1(fiber) || 'Unknown';

      if (!warnedAboutMissingGetChildContext[componentName]) {
        warnedAboutMissingGetChildContext[componentName] = true;
        warning$2(false, '%s.childContextTypes is specified but there is no getChildContext() method ' + 'on the instance. You can either define getChildContext() on %s or remove ' + 'childContextTypes from it.', componentName, componentName);
      }
    }
    return parentContext;
  }

  var childContext = void 0;
  {
    ReactDebugCurrentFiber$1.setCurrentFiber(fiber, 'getChildContext');
    startPhaseTimer(fiber, 'getChildContext');
    childContext = instance.getChildContext();
    stopPhaseTimer();
    ReactDebugCurrentFiber$1.resetCurrentFiber();
  }
  for (var contextKey in childContext) {
    !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName_1(fiber) || 'Unknown', contextKey) : void 0;
  }
  {
    var name = getComponentName_1(fiber) || 'Unknown';
    // We can only provide accurate element stacks if we pass work-in-progress tree
    // during the begin or complete phase. However currently this function is also
    // called from unstable_renderSubtree legacy implementation. In this case it unsafe to
    // assume anything about the given fiber. We won't pass it down if we aren't sure.
    // TODO: remove this hack when we delete unstable_renderSubtree in Fiber.
    var workInProgress = isReconciling ? fiber : null;
    ReactDebugCurrentFiber$1.setCurrentFiber(workInProgress, null);
    checkPropTypes$1(childContextTypes, childContext, 'child context', name, ReactDebugCurrentFiber$1.getCurrentFiberStackAddendum);
    ReactDebugCurrentFiber$1.resetCurrentFiber();
  }

  return _assign({}, parentContext, childContext);
}
var processChildContext_1 = processChildContext$1;

var pushContextProvider = function (workInProgress) {
  if (!isContextProvider$1(workInProgress)) {
    return false;
  }

  var instance = workInProgress.stateNode;
  // We push the context as early as possible to ensure stack integrity.
  // If the instance does not exist yet, we will push null at first,
  // and replace it on the stack later when invalidating the context.
  var memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;

  // Remember the parent context so we can merge with it later.
  // Inherit the parent's did-perform-work value to avoid inadvertantly blocking updates.
  previousContext = contextStackCursor.current;
  push(contextStackCursor, memoizedMergedChildContext, workInProgress);
  push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress);

  return true;
};

var invalidateContextProvider = function (workInProgress, didChange) {
  var instance = workInProgress.stateNode;
  !instance ? invariant(false, 'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  if (didChange) {
    // Merge parent and own context.
    // Skip this if we're not updating due to sCU.
    // This avoids unnecessarily recomputing memoized values.
    var mergedContext = processChildContext$1(workInProgress, previousContext, true);
    instance.__reactInternalMemoizedMergedChildContext = mergedContext;

    // Replace the old (or empty) context with the new one.
    // It is important to unwind the context in the reverse order.
    pop(didPerformWorkStackCursor, workInProgress);
    pop(contextStackCursor, workInProgress);
    // Now push the new context and mark that it has changed.
    push(contextStackCursor, mergedContext, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  } else {
    pop(didPerformWorkStackCursor, workInProgress);
    push(didPerformWorkStackCursor, didChange, workInProgress);
  }
};

var resetContext = function () {
  previousContext = emptyObject;
  contextStackCursor.current = emptyObject;
  didPerformWorkStackCursor.current = false;
};

var findCurrentUnmaskedContext$1 = function (fiber) {
  // Currently this is only used with renderSubtreeIntoContainer; not sure if it
  // makes sense elsewhere
  !(isFiberMounted(fiber) && fiber.tag === ClassComponent$2) ? invariant(false, 'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  var node = fiber;
  while (node.tag !== HostRoot$2) {
    if (isContextProvider$1(node)) {
      return node.stateNode.__reactInternalMemoizedMergedChildContext;
    }
    var parent = node['return'];
    !parent ? invariant(false, 'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    node = parent;
  }
  return node.stateNode.context;
};

var ReactFiberContext = {
	getUnmaskedContext: getUnmaskedContext_1,
	cacheContext: cacheContext_1,
	getMaskedContext: getMaskedContext,
	hasContextChanged: hasContextChanged,
	isContextConsumer: isContextConsumer_1,
	isContextProvider: isContextProvider_1,
	popContextProvider: popContextProvider_1,
	popTopLevelContextObject: popTopLevelContextObject,
	pushTopLevelContextObject: pushTopLevelContextObject,
	processChildContext: processChildContext_1,
	pushContextProvider: pushContextProvider,
	invalidateContextProvider: invalidateContextProvider,
	resetContext: resetContext,
	findCurrentUnmaskedContext: findCurrentUnmaskedContext$1
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfInternalContext
 * 
 */

var ReactTypeOfInternalContext = {
  NoContext: 0,
  AsyncUpdates: 1
};

var IndeterminateComponent$1 = ReactTypeOfWork.IndeterminateComponent;
var ClassComponent$5 = ReactTypeOfWork.ClassComponent;
var HostRoot$5 = ReactTypeOfWork.HostRoot;
var HostComponent$5 = ReactTypeOfWork.HostComponent;
var HostText$3 = ReactTypeOfWork.HostText;
var HostPortal$2 = ReactTypeOfWork.HostPortal;
var CoroutineComponent = ReactTypeOfWork.CoroutineComponent;
var YieldComponent$1 = ReactTypeOfWork.YieldComponent;
var Fragment$2 = ReactTypeOfWork.Fragment;

var NoWork$1 = ReactPriorityLevel.NoWork;

var NoContext = ReactTypeOfInternalContext.NoContext;

var NoEffect$1 = ReactTypeOfSideEffect.NoEffect;



{
  var getComponentName$5 = getComponentName_1;
  var hasBadMapPolyfill = false;
  try {
    var nonExtensibleObject = Object.preventExtensions({});
    /* eslint-disable no-new */
    new Map([[nonExtensibleObject, null]]);
    new Set([nonExtensibleObject]);
    /* eslint-enable no-new */
  } catch (e) {
    // TODO: Consider warning about bad polyfills
    hasBadMapPolyfill = true;
  }
}

// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.


{
  var debugCounter = 1;
}

function FiberNode(tag, key, internalContextTag) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this['return'] = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = null;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;

  this.internalContextTag = internalContextTag;

  // Effects
  this.effectTag = NoEffect$1;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.pendingWorkPriority = NoWork$1;

  this.alternate = null;

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}

// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber = function (tag, key, internalContextTag) {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, key, internalContextTag);
};

function shouldConstruct(Component) {
  return !!(Component.prototype && Component.prototype.isReactComponent);
}

// This is used to create an alternate fiber to do work on.
var createWorkInProgress = function (current, renderPriority) {
  var workInProgress = current.alternate;
  if (workInProgress === null) {
    // We use a double buffering pooling technique because we know that we'll
    // only ever need at most two versions of a tree. We pool the "other" unused
    // node that we're free to reuse. This is lazily created to avoid allocating
    // extra objects for things that are never updated. It also allow us to
    // reclaim the extra memory if needed.
    workInProgress = createFiber(current.tag, current.key, current.internalContextTag);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;

    {
      // DEV-only fields
      workInProgress._debugID = current._debugID;
      workInProgress._debugSource = current._debugSource;
      workInProgress._debugOwner = current._debugOwner;
    }

    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // We already have an alternate.
    // Reset the effect tag.
    workInProgress.effectTag = NoEffect$1;

    // The effect list is no longer valid.
    workInProgress.nextEffect = null;
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;
  }

  workInProgress.pendingWorkPriority = renderPriority;

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;

  // pendingProps is set by the parent during reconciliation.
  // TODO: Pass this as an argument.

  // These will be overridden during the parent's reconciliation
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;

  return workInProgress;
};

var createHostRootFiber$1 = function () {
  var fiber = createFiber(HostRoot$5, null, NoContext);
  return fiber;
};

var createFiberFromElement = function (element, internalContextTag, priorityLevel) {
  var owner = null;
  {
    owner = element._owner;
  }

  var fiber = createFiberFromElementType(element.type, element.key, internalContextTag, owner);
  fiber.pendingProps = element.props;
  fiber.pendingWorkPriority = priorityLevel;

  {
    fiber._debugSource = element._source;
    fiber._debugOwner = element._owner;
  }

  return fiber;
};

var createFiberFromFragment = function (elements, internalContextTag, priorityLevel) {
  // TODO: Consider supporting keyed fragments. Technically, we accidentally
  // support that in the existing React.
  var fiber = createFiber(Fragment$2, null, internalContextTag);
  fiber.pendingProps = elements;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};

var createFiberFromText = function (content, internalContextTag, priorityLevel) {
  var fiber = createFiber(HostText$3, null, internalContextTag);
  fiber.pendingProps = content;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};

function createFiberFromElementType(type, key, internalContextTag, debugOwner) {
  var fiber = void 0;
  if (typeof type === 'function') {
    fiber = shouldConstruct(type) ? createFiber(ClassComponent$5, key, internalContextTag) : createFiber(IndeterminateComponent$1, key, internalContextTag);
    fiber.type = type;
  } else if (typeof type === 'string') {
    fiber = createFiber(HostComponent$5, key, internalContextTag);
    fiber.type = type;
  } else if (typeof type === 'object' && type !== null && typeof type.tag === 'number') {
    // Currently assumed to be a continuation and therefore is a fiber already.
    // TODO: The yield system is currently broken for updates in some cases.
    // The reified yield stores a fiber, but we don't know which fiber that is;
    // the current or a workInProgress? When the continuation gets rendered here
    // we don't know if we can reuse that fiber or if we need to clone it.
    // There is probably a clever way to restructure this.
    fiber = type;
  } else {
    var info = '';
    {
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }
      var ownerName = debugOwner ? getComponentName$5(debugOwner) : null;
      if (ownerName) {
        info += '\n\nCheck the render method of `' + ownerName + '`.';
      }
    }
    invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', type == null ? type : typeof type, info);
  }
  return fiber;
}

var createFiberFromElementType_1 = createFiberFromElementType;

var createFiberFromHostInstanceForDeletion = function () {
  var fiber = createFiber(HostComponent$5, null, NoContext);
  fiber.type = 'DELETED';
  return fiber;
};

var createFiberFromCoroutine = function (coroutine, internalContextTag, priorityLevel) {
  var fiber = createFiber(CoroutineComponent, coroutine.key, internalContextTag);
  fiber.type = coroutine.handler;
  fiber.pendingProps = coroutine;
  fiber.pendingWorkPriority = priorityLevel;
  return fiber;
};

var createFiberFromYield = function (yieldNode, internalContextTag, priorityLevel) {
  var fiber = createFiber(YieldComponent$1, null, internalContextTag);
  return fiber;
};

var createFiberFromPortal = function (portal, internalContextTag, priorityLevel) {
  var fiber = createFiber(HostPortal$2, portal.key, internalContextTag);
  fiber.pendingProps = portal.children || [];
  fiber.pendingWorkPriority = priorityLevel;
  fiber.stateNode = {
    containerInfo: portal.containerInfo,
    implementation: portal.implementation
  };
  return fiber;
};

var largerPriority = function (p1, p2) {
  return p1 !== NoWork$1 && (p2 === NoWork$1 || p2 > p1) ? p1 : p2;
};

var ReactFiber = {
	createWorkInProgress: createWorkInProgress,
	createHostRootFiber: createHostRootFiber$1,
	createFiberFromElement: createFiberFromElement,
	createFiberFromFragment: createFiberFromFragment,
	createFiberFromText: createFiberFromText,
	createFiberFromElementType: createFiberFromElementType_1,
	createFiberFromHostInstanceForDeletion: createFiberFromHostInstanceForDeletion,
	createFiberFromCoroutine: createFiberFromCoroutine,
	createFiberFromYield: createFiberFromYield,
	createFiberFromPortal: createFiberFromPortal,
	largerPriority: largerPriority
};

var createHostRootFiber = ReactFiber.createHostRootFiber;

var createFiberRoot$1 = function (containerInfo) {
  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  var uninitializedFiber = createHostRootFiber();
  var root = {
    current: uninitializedFiber,
    containerInfo: containerInfo,
    isScheduled: false,
    nextScheduledRoot: null,
    context: null,
    pendingContext: null
  };
  uninitializedFiber.stateNode = root;
  return root;
};

var ReactFiberRoot = {
	createFiberRoot: createFiberRoot$1
};

var defaultShowDialog = function (capturedError) {
  return true;
};

var showDialog = defaultShowDialog;

function logCapturedError$1(capturedError) {
  var logError = showDialog(capturedError);

  // Allow injected showDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  var error = capturedError.error;
  {
    var componentName = capturedError.componentName,
        componentStack = capturedError.componentStack,
        errorBoundaryName = capturedError.errorBoundaryName,
        errorBoundaryFound = capturedError.errorBoundaryFound,
        willRetry = capturedError.willRetry;


    var componentNameMessage = componentName ? 'The above error occurred in the <' + componentName + '> component:' : 'The above error occurred in one of your React components:';

    var errorBoundaryMessage = void 0;
    // errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
    if (errorBoundaryFound && errorBoundaryName) {
      if (willRetry) {
        errorBoundaryMessage = 'React will try to recreate this component tree from scratch ' + ('using the error boundary you provided, ' + errorBoundaryName + '.');
      } else {
        errorBoundaryMessage = 'This error was initially handled by the error boundary ' + errorBoundaryName + '.\n' + 'Recreating the tree from scratch failed so React will unmount the tree.';
      }
    } else {
      errorBoundaryMessage = 'Consider adding an error boundary to your tree to customize error handling behavior.\n' + 'You can learn more about error boundaries at https://fb.me/react-error-boundaries.';
    }
    var combinedMessage = '' + componentNameMessage + componentStack + '\n\n' + ('' + errorBoundaryMessage);

    // In development, we provide our own message with just the component stack.
    // We don't include the original error message and JS stack because the browser
    // has already printed it. Even if the application swallows the error, it is still
    // displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
    console.error(combinedMessage);
  }
}

var injection = {
  /**
   * Display custom dialog for lifecycle errors.
   * Return false to prevent default behavior of logging to console.error.
   */
  injectDialog: function (fn) {
    !(showDialog === defaultShowDialog) ? invariant(false, 'The custom dialog was already injected.') : void 0;
    !(typeof fn === 'function') ? invariant(false, 'Injected showDialog() must be a function.') : void 0;
    showDialog = fn;
  }
};

var logCapturedError_1 = logCapturedError$1;

var ReactFiberErrorLogger = {
	injection: injection,
	logCapturedError: logCapturedError_1
};

var ReactErrorUtils = {
  // Used by Fiber to simulate a try-catch.
  _caughtError: null,
  _hasCaughtError: false,

  // Used by event system to capture/rethrow the first error.
  _rethrowError: null,
  _hasRethrowError: false,

  injection: {
    injectErrorUtils: function (injectedErrorUtils) {
      !(typeof injectedErrorUtils.invokeGuardedCallback === 'function') ? invariant(false, 'Injected invokeGuardedCallback() must be a function.') : void 0;
      invokeGuardedCallback$1 = injectedErrorUtils.invokeGuardedCallback;
    }
  },

  /**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallback: function (name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback$1.apply(ReactErrorUtils, arguments);
  },

  /**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if _caughtError and _rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */
  invokeGuardedCallbackAndCatchFirstError: function (name, func, context, a, b, c, d, e, f) {
    ReactErrorUtils.invokeGuardedCallback.apply(this, arguments);
    if (ReactErrorUtils.hasCaughtError()) {
      var error = ReactErrorUtils.clearCaughtError();
      if (!ReactErrorUtils._hasRethrowError) {
        ReactErrorUtils._hasRethrowError = true;
        ReactErrorUtils._rethrowError = error;
      }
    }
  },

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    return rethrowCaughtError.apply(ReactErrorUtils, arguments);
  },

  hasCaughtError: function () {
    return ReactErrorUtils._hasCaughtError;
  },

  clearCaughtError: function () {
    if (ReactErrorUtils._hasCaughtError) {
      var error = ReactErrorUtils._caughtError;
      ReactErrorUtils._caughtError = null;
      ReactErrorUtils._hasCaughtError = false;
      return error;
    } else {
      invariant(false, 'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');
    }
  }
};

var invokeGuardedCallback$1 = function (name, func, context, a, b, c, d, e, f) {
  ReactErrorUtils._hasCaughtError = false;
  ReactErrorUtils._caughtError = null;
  var funcArgs = Array.prototype.slice.call(arguments, 3);
  try {
    func.apply(context, funcArgs);
  } catch (error) {
    ReactErrorUtils._caughtError = error;
    ReactErrorUtils._hasCaughtError = true;
  }
};

{
  // In DEV mode, we swap out invokeGuardedCallback for a special version
  // that plays more nicely with the browser's DevTools. The idea is to preserve
  // "Pause on exceptions" behavior. Because React wraps all user-provided
  // functions in invokeGuardedCallback, and the production version of
  // invokeGuardedCallback uses a try-catch, all user exceptions are treated
  // like caught exceptions, and the DevTools won't pause unless the developer
  // takes the extra step of enabling pause on caught exceptions. This is
  // untintuitive, though, because even though React has caught the error, from
  // the developer's perspective, the error is uncaught.
  //
  // To preserve the expected "Pause on exceptions" behavior, we don't use a
  // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
  // DOM node, and call the user-provided callback from inside an event handler
  // for that fake event. If the callback throws, the error is "captured" using
  // a global event handler. But because the error happens in a different
  // event loop context, it does not interrupt the normal program flow.
  // Effectively, this gives us try-catch behavior without actually using
  // try-catch. Neat!

  // Check that the browser supports the APIs we need to implement our special
  // DEV version of invokeGuardedCallback
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');

    var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
      // Keeps track of whether the user-provided callback threw an error. We
      // set this to true at the beginning, then set it to false right after
      // calling the function. If the function errors, `didError` will never be
      // set to false. This strategy works even if the browser is flaky and
      // fails to call our global error handler, because it doesn't rely on
      // the error event at all.
      var didError = true;

      // Create an event handler for our fake event. We will synchronously
      // dispatch our fake event using `dispatchEvent`. Inside the handler, we
      // call the user-provided callback.
      var funcArgs = Array.prototype.slice.call(arguments, 3);
      function callCallback() {
        // We immediately remove the callback from event listeners so that
        // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
        // nested call would trigger the fake event handlers of any call higher
        // in the stack.
        fakeNode.removeEventListener(evtType, callCallback, false);
        func.apply(context, funcArgs);
        didError = false;
      }

      // Create a global error event handler. We use this to capture the value
      // that was thrown. It's possible that this error handler will fire more
      // than once; for example, if non-React code also calls `dispatchEvent`
      // and a handler for that event throws. We should be resilient to most of
      // those cases. Even if our error event handler fires more than once, the
      // last error event is always used. If the callback actually does error,
      // we know that the last error event is the correct one, because it's not
      // possible for anything else to have happened in between our callback
      // erroring and the code that follows the `dispatchEvent` call below. If
      // the callback doesn't error, but the error event was fired, we know to
      // ignore it because `didError` will be false, as described above.
      var error = void 0;
      // Use this to track whether the error event is ever called.
      var didSetError = false;
      var isCrossOriginError = false;

      function onError(event) {
        error = event.error;
        didSetError = true;
        if (error === null && event.colno === 0 && event.lineno === 0) {
          isCrossOriginError = true;
        }
      }

      // Create a fake event type.
      var evtType = 'react-' + (name ? name : 'invokeguardedcallback');

      // Attach our event handlers
      window.addEventListener('error', onError);
      fakeNode.addEventListener(evtType, callCallback, false);

      // Synchronously dispatch our fake event. If the user-provided function
      // errors, it will trigger our global error handler.
      var evt = document.createEvent('Event');
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);

      if (didError) {
        if (!didSetError) {
          // The callback errored, but the error event never fired.
          error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
        } else if (isCrossOriginError) {
          error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
        }
        ReactErrorUtils._hasCaughtError = true;
        ReactErrorUtils._caughtError = error;
      } else {
        ReactErrorUtils._hasCaughtError = false;
        ReactErrorUtils._caughtError = null;
      }

      // Remove our event listeners
      window.removeEventListener('error', onError);
    };

    invokeGuardedCallback$1 = invokeGuardedCallbackDev;
  }
}

var rethrowCaughtError = function () {
  if (ReactErrorUtils._hasRethrowError) {
    var error = ReactErrorUtils._rethrowError;
    ReactErrorUtils._rethrowError = null;
    ReactErrorUtils._hasRethrowError = false;
    throw error;
  }
};

var ReactErrorUtils_1 = ReactErrorUtils;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactCoroutine
 * 
 */

// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_COROUTINE_TYPE$1;
var REACT_YIELD_TYPE$1;
if (typeof Symbol === 'function' && Symbol['for']) {
  REACT_COROUTINE_TYPE$1 = Symbol['for']('react.coroutine');
  REACT_YIELD_TYPE$1 = Symbol['for']('react.yield');
} else {
  REACT_COROUTINE_TYPE$1 = 0xeac8;
  REACT_YIELD_TYPE$1 = 0xeac9;
}

var createCoroutine = function (children, handler, props) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var coroutine = {
    // This tag allow us to uniquely identify this as a React Coroutine
    $$typeof: REACT_COROUTINE_TYPE$1,
    key: key == null ? null : '' + key,
    children: children,
    handler: handler,
    props: props
  };

  {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(coroutine.props);
      Object.freeze(coroutine);
    }
  }

  return coroutine;
};

var createYield = function (value) {
  var yieldNode = {
    // This tag allow us to uniquely identify this as a React Yield
    $$typeof: REACT_YIELD_TYPE$1,
    value: value
  };

  {
    // TODO: Add _store property for marking this as validated.
    if (Object.freeze) {
      Object.freeze(yieldNode);
    }
  }

  return yieldNode;
};

/**
 * Verifies the object is a coroutine object.
 */
var isCoroutine = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_COROUTINE_TYPE$1;
};

/**
 * Verifies the object is a yield object.
 */
var isYield = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_YIELD_TYPE$1;
};

var REACT_YIELD_TYPE_1 = REACT_YIELD_TYPE$1;
var REACT_COROUTINE_TYPE_1 = REACT_COROUTINE_TYPE$1;

var ReactCoroutine = {
	createCoroutine: createCoroutine,
	createYield: createYield,
	isCoroutine: isCoroutine,
	isYield: isYield,
	REACT_YIELD_TYPE: REACT_YIELD_TYPE_1,
	REACT_COROUTINE_TYPE: REACT_COROUTINE_TYPE_1
};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactPortal
 * 
 */

// The Symbol used to tag the special React types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_PORTAL_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.portal') || 0xeaca;

var createPortal = function (children, containerInfo,
// TODO: figure out the API for cross-renderer implementation.
implementation) {
  var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE$1,
    key: key == null ? null : '' + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
};

/**
 * Verifies the object is a portal object.
 */
var isPortal = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_PORTAL_TYPE$1;
};

var REACT_PORTAL_TYPE_1 = REACT_PORTAL_TYPE$1;

var ReactPortal = {
	createPortal: createPortal,
	isPortal: isPortal,
	REACT_PORTAL_TYPE: REACT_PORTAL_TYPE_1
};

var REACT_COROUTINE_TYPE = ReactCoroutine.REACT_COROUTINE_TYPE;
var REACT_YIELD_TYPE = ReactCoroutine.REACT_YIELD_TYPE;

var REACT_PORTAL_TYPE = ReactPortal.REACT_PORTAL_TYPE;








{
  var _require3$2 = ReactDebugCurrentFiber_1,
      getCurrentFiberStackAddendum$1 = _require3$2.getCurrentFiberStackAddendum;

  var warning$7 = require$$0;
  var didWarnAboutMaps = false;
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */
  var ownerHasKeyUseWarning = {};

  var warnForMissingKey = function (child) {
    if (child === null || typeof child !== 'object') {
      return;
    }
    if (!child._store || child._store.validated || child.key != null) {
      return;
    }
    !(typeof child._store === 'object') ? invariant(false, 'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    child._store.validated = true;

    var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.' + (getCurrentFiberStackAddendum$1() || '');
    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }
    ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

    warning$7(false, 'Each child in an array or iterator should have a unique ' + '"key" prop. See https://fb.me/react-warning-keys for ' + 'more information.%s', getCurrentFiberStackAddendum$1());
  };
}

var createWorkInProgress$2 = ReactFiber.createWorkInProgress;
var createFiberFromElement$1 = ReactFiber.createFiberFromElement;
var createFiberFromFragment$1 = ReactFiber.createFiberFromFragment;
var createFiberFromText$1 = ReactFiber.createFiberFromText;
var createFiberFromCoroutine$1 = ReactFiber.createFiberFromCoroutine;
var createFiberFromYield$1 = ReactFiber.createFiberFromYield;
var createFiberFromPortal$1 = ReactFiber.createFiberFromPortal;


var isArray = Array.isArray;

var FunctionalComponent$3 = ReactTypeOfWork.FunctionalComponent;
var ClassComponent$8 = ReactTypeOfWork.ClassComponent;
var HostText$5 = ReactTypeOfWork.HostText;
var HostPortal$5 = ReactTypeOfWork.HostPortal;
var CoroutineComponent$2 = ReactTypeOfWork.CoroutineComponent;
var YieldComponent$3 = ReactTypeOfWork.YieldComponent;
var Fragment$4 = ReactTypeOfWork.Fragment;
var NoEffect$2 = ReactTypeOfSideEffect.NoEffect;
var Placement$3 = ReactTypeOfSideEffect.Placement;
var Deletion$1 = ReactTypeOfSideEffect.Deletion;


var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable === 'undefined') {
    return null;
  }
  var iteratorFn = ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
  return null;
}

function coerceRef(current, element) {
  var mixedRef = element.ref;
  if (mixedRef !== null && typeof mixedRef !== 'function') {
    if (element._owner) {
      var owner = element._owner;
      var inst = void 0;
      if (owner) {
        if (typeof owner.tag === 'number') {
          var ownerFiber = owner;
          !(ownerFiber.tag === ClassComponent$8) ? invariant(false, 'Stateless function components cannot have refs.') : void 0;
          inst = ownerFiber.stateNode;
        } else {
          // Stack
          inst = owner.getPublicInstance();
        }
      }
      !inst ? invariant(false, 'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.', mixedRef) : void 0;
      var stringRef = '' + mixedRef;
      // Check if previous string ref matches new string ref
      if (current !== null && current.ref !== null && current.ref._stringRef === stringRef) {
        return current.ref;
      }
      var ref = function (value) {
        var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
        if (value === null) {
          delete refs[stringRef];
        } else {
          refs[stringRef] = value;
        }
      };
      ref._stringRef = stringRef;
      return ref;
    } else {
      !(typeof mixedRef === 'string') ? invariant(false, 'Expected ref to be a function or a string.') : void 0;
      !element._owner ? invariant(false, 'Element ref was specified as a string (%s) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).', mixedRef) : void 0;
    }
  }
  return mixedRef;
}

function throwOnInvalidObjectType(returnFiber, newChild) {
  if (returnFiber.type !== 'textarea') {
    var addendum = '';
    {
      addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + (getCurrentFiberStackAddendum$1() || '');
    }
    invariant(false, 'Objects are not valid as a React child (found: %s).%s', Object.prototype.toString.call(newChild) === '[object Object]' ? 'object with keys {' + Object.keys(newChild).join(', ') + '}' : newChild, addendum);
  }
}

function warnOnFunctionType() {
  warning$7(false, 'Functions are not valid as a React child. This may happen if ' + 'you return a Component instead of <Component /> from render. ' + 'Or maybe you meant to call this function rather than return it.%s', getCurrentFiberStackAddendum$1() || '');
}

// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldClone, shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return;
    }
    if (!shouldClone) {
      // When we're reconciling in place we have a work in progress copy. We
      // actually want the current copy. If there is no current copy, then we
      // don't need to track deletion side-effects.
      if (childToDelete.alternate === null) {
        return;
      }
      childToDelete = childToDelete.alternate;
    }
    // Deletions are added in reversed order so we add it to the front.
    // At this point, the return fiber's effect list is empty except for
    // deletions, so we can just append the deletion to the list. The remaining
    // effects aren't added until the complete phase. Once we implement
    // resuming, this may not be true.
    var last = returnFiber.lastEffect;
    if (last !== null) {
      last.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
    childToDelete.nextEffect = null;
    childToDelete.effectTag = Deletion$1;
  }

  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) {
      // Noop.
      return null;
    }

    // TODO: For the shouldClone case, this could be micro-optimized a bit by
    // assuming that after the first child we've already added everything.
    var childToDelete = currentFirstChild;
    while (childToDelete !== null) {
      deleteChild(returnFiber, childToDelete);
      childToDelete = childToDelete.sibling;
    }
    return null;
  }

  function mapRemainingChildren(returnFiber, currentFirstChild) {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    var existingChildren = new Map();

    var existingChild = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }

  function useFiber(fiber, priority) {
    // We currently set sibling to null and index to 0 here because it is easy
    // to forget to do before returning it. E.g. for the single child case.
    if (shouldClone) {
      var clone = createWorkInProgress$2(fiber, priority);
      clone.index = 0;
      clone.sibling = null;
      return clone;
    } else {
      // We override the pending priority even if it is higher, because if
      // we're reconciling at a lower priority that means that this was
      // down-prioritized.
      fiber.pendingWorkPriority = priority;
      fiber.effectTag = NoEffect$2;
      fiber.index = 0;
      fiber.sibling = null;
      return fiber;
    }
  }

  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) {
      // Noop.
      return lastPlacedIndex;
    }
    var current = newFiber.alternate;
    if (current !== null) {
      var oldIndex = current.index;
      if (oldIndex < lastPlacedIndex) {
        // This is a move.
        newFiber.effectTag = Placement$3;
        return lastPlacedIndex;
      } else {
        // This item can stay in place.
        return oldIndex;
      }
    } else {
      // This is an insertion.
      newFiber.effectTag = Placement$3;
      return lastPlacedIndex;
    }
  }

  function placeSingleChild(newFiber) {
    // This is simpler for the single child case. We only need to do a
    // placement for inserting new children.
    if (shouldTrackSideEffects && newFiber.alternate === null) {
      newFiber.effectTag = Placement$3;
    }
    return newFiber;
  }

  function updateTextNode(returnFiber, current, textContent, priority) {
    if (current === null || current.tag !== HostText$5) {
      // Insert
      var created = createFiberFromText$1(textContent, returnFiber.internalContextTag, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, priority);
      existing.pendingProps = textContent;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateElement(returnFiber, current, element, priority) {
    if (current === null || current.type !== element.type) {
      // Insert
      var created = createFiberFromElement$1(element, returnFiber.internalContextTag, priority);
      created.ref = coerceRef(current, element);
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, priority);
      existing.ref = coerceRef(current, element);
      existing.pendingProps = element.props;
      existing['return'] = returnFiber;
      {
        existing._debugSource = element._source;
        existing._debugOwner = element._owner;
      }
      return existing;
    }
  }

  function updateCoroutine(returnFiber, current, coroutine, priority) {
    // TODO: Should this also compare handler to determine whether to reuse?
    if (current === null || current.tag !== CoroutineComponent$2) {
      // Insert
      var created = createFiberFromCoroutine$1(coroutine, returnFiber.internalContextTag, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, priority);
      existing.pendingProps = coroutine;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateYield(returnFiber, current, yieldNode, priority) {
    if (current === null || current.tag !== YieldComponent$3) {
      // Insert
      var created = createFiberFromYield$1(yieldNode, returnFiber.internalContextTag, priority);
      created.type = yieldNode.value;
      created['return'] = returnFiber;
      return created;
    } else {
      // Move based on index
      var existing = useFiber(current, priority);
      existing.type = yieldNode.value;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updatePortal(returnFiber, current, portal, priority) {
    if (current === null || current.tag !== HostPortal$5 || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
      // Insert
      var created = createFiberFromPortal$1(portal, returnFiber.internalContextTag, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, priority);
      existing.pendingProps = portal.children || [];
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function updateFragment(returnFiber, current, fragment, priority) {
    if (current === null || current.tag !== Fragment$4) {
      // Insert
      var created = createFiberFromFragment$1(fragment, returnFiber.internalContextTag, priority);
      created['return'] = returnFiber;
      return created;
    } else {
      // Update
      var existing = useFiber(current, priority);
      existing.pendingProps = fragment;
      existing['return'] = returnFiber;
      return existing;
    }
  }

  function createChild(returnFiber, newChild, priority) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes doesn't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      var created = createFiberFromText$1('' + newChild, returnFiber.internalContextTag, priority);
      created['return'] = returnFiber;
      return created;
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _created = createFiberFromElement$1(newChild, returnFiber.internalContextTag, priority);
            _created.ref = coerceRef(null, newChild);
            _created['return'] = returnFiber;
            return _created;
          }

        case REACT_COROUTINE_TYPE:
          {
            var _created2 = createFiberFromCoroutine$1(newChild, returnFiber.internalContextTag, priority);
            _created2['return'] = returnFiber;
            return _created2;
          }

        case REACT_YIELD_TYPE:
          {
            var _created3 = createFiberFromYield$1(newChild, returnFiber.internalContextTag, priority);
            _created3.type = newChild.value;
            _created3['return'] = returnFiber;
            return _created3;
          }

        case REACT_PORTAL_TYPE:
          {
            var _created4 = createFiberFromPortal$1(newChild, returnFiber.internalContextTag, priority);
            _created4['return'] = returnFiber;
            return _created4;
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _created5 = createFiberFromFragment$1(newChild, returnFiber.internalContextTag, priority);
        _created5['return'] = returnFiber;
        return _created5;
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateSlot(returnFiber, oldFiber, newChild, priority) {
    // Update the fiber if the keys match, otherwise return null.

    var key = oldFiber !== null ? oldFiber.key : null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes doesn't have keys. If the previous node is implicitly keyed
      // we can continue to replace it without aborting even if it is not a text
      // node.
      if (key !== null) {
        return null;
      }
      return updateTextNode(returnFiber, oldFiber, '' + newChild, priority);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            if (newChild.key === key) {
              return updateElement(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }

        case REACT_COROUTINE_TYPE:
          {
            if (newChild.key === key) {
              return updateCoroutine(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }

        case REACT_YIELD_TYPE:
          {
            // Yields doesn't have keys. If the previous node is implicitly keyed
            // we can continue to replace it without aborting even if it is not a
            // yield.
            if (key === null) {
              return updateYield(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }

        case REACT_PORTAL_TYPE:
          {
            if (newChild.key === key) {
              return updatePortal(returnFiber, oldFiber, newChild, priority);
            } else {
              return null;
            }
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        // Fragments doesn't have keys so if the previous key is implicit we can
        // update it.
        if (key !== null) {
          return null;
        }
        return updateFragment(returnFiber, oldFiber, newChild, priority);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, priority) {
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // Text nodes doesn't have keys, so we neither have to check the old nor
      // new node for the key. If both are text nodes, they match.
      var matchedFiber = existingChildren.get(newIdx) || null;
      return updateTextNode(returnFiber, matchedFiber, '' + newChild, priority);
    }

    if (typeof newChild === 'object' && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          {
            var _matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updateElement(returnFiber, _matchedFiber, newChild, priority);
          }

        case REACT_COROUTINE_TYPE:
          {
            var _matchedFiber2 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updateCoroutine(returnFiber, _matchedFiber2, newChild, priority);
          }

        case REACT_YIELD_TYPE:
          {
            // Yields doesn't have keys, so we neither have to check the old nor
            // new node for the key. If both are yields, they match.
            var _matchedFiber3 = existingChildren.get(newIdx) || null;
            return updateYield(returnFiber, _matchedFiber3, newChild, priority);
          }

        case REACT_PORTAL_TYPE:
          {
            var _matchedFiber4 = existingChildren.get(newChild.key === null ? newIdx : newChild.key) || null;
            return updatePortal(returnFiber, _matchedFiber4, newChild, priority);
          }
      }

      if (isArray(newChild) || getIteratorFn(newChild)) {
        var _matchedFiber5 = existingChildren.get(newIdx) || null;
        return updateFragment(returnFiber, _matchedFiber5, newChild, priority);
      }

      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }

    return null;
  }

  /**
   * Warns if there is a duplicate or missing key
   */
  function warnOnInvalidKey(child, knownKeys) {
    {
      if (typeof child !== 'object' || child === null) {
        return knownKeys;
      }
      switch (child.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_COROUTINE_TYPE:
        case REACT_PORTAL_TYPE:
          warnForMissingKey(child);
          var key = child.key;
          if (typeof key !== 'string') {
            break;
          }
          if (knownKeys === null) {
            knownKeys = new Set();
            knownKeys.add(key);
            break;
          }
          if (!knownKeys.has(key)) {
            knownKeys.add(key);
            break;
          }
          warning$7(false, 'Encountered two children with the same key, `%s`. ' + 'Keys should be unique so that components maintain their identity ' + 'across updates. Non-unique keys may cause children to be ' + 'duplicated and/or omitted — the behavior is unsupported and ' + 'could change in a future version.%s', key, getCurrentFiberStackAddendum$1());
          break;
        default:
          break;
      }
    }
    return knownKeys;
  }

  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, priority) {
    // This algorithm can't optimize by searching from boths ends since we
    // don't have backpointers on fibers. I'm trying to see how far we can get
    // with that model. If it ends up not being worth the tradeoffs, we can
    // add it later.

    // Even with a two ended optimization, we'd want to optimize for the case
    // where there are few changes and brute force the comparison instead of
    // going for the Map. It'd like to explore hitting that path first in
    // forward-only mode and only go for the Map once we notice that we need
    // lots of look ahead. This doesn't handle reversal as well as two ended
    // search but that's unusual. Besides, for the two ended optimization to
    // work on Iterables, we'd need to copy the whole set.

    // In this first iteration, we'll just live with hitting the bad case
    // (adding everything to a Map) in for every insert/move.

    // If you change this code, also update reconcileChildrenIterator() which
    // uses the same algorithm.

    {
      // First, validate keys.
      var knownKeys = null;
      for (var i = 0; i < newChildren.length; i++) {
        var child = newChildren[i];
        knownKeys = warnOnInvalidKey(child, knownKeys);
      }
    }

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], priority);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (newIdx === newChildren.length) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        var _newFiber = createChild(returnFiber, newChildren[newIdx], priority);
        if (!_newFiber) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber;
        } else {
          previousNewFiber.sibling = _newFiber;
        }
        previousNewFiber = _newFiber;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], priority);
      if (_newFiber2) {
        if (shouldTrackSideEffects) {
          if (_newFiber2.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber2.key === null ? newIdx : _newFiber2.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber2;
        } else {
          previousNewFiber.sibling = _newFiber2;
        }
        previousNewFiber = _newFiber2;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildrenIterable, priority) {
    // This is the same implementation as reconcileChildrenArray(),
    // but using the iterator instead.

    var iteratorFn = getIteratorFn(newChildrenIterable);
    !(typeof iteratorFn === 'function') ? invariant(false, 'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    {
      // Warn about using Maps as children
      if (typeof newChildrenIterable.entries === 'function') {
        var possibleMap = newChildrenIterable;
        if (possibleMap.entries === iteratorFn) {
          warning$7(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getCurrentFiberStackAddendum$1());
          didWarnAboutMaps = true;
        }
      }

      // First, validate keys.
      // We'll get a different iterator later for the main pass.
      var _newChildren = iteratorFn.call(newChildrenIterable);
      if (_newChildren) {
        var knownKeys = null;
        var _step = _newChildren.next();
        for (; !_step.done; _step = _newChildren.next()) {
          var child = _step.value;
          knownKeys = warnOnInvalidKey(child, knownKeys);
        }
      }
    }

    var newChildren = iteratorFn.call(newChildrenIterable);
    !(newChildren != null) ? invariant(false, 'An iterable object provided no iterator.') : void 0;

    var resultingFirstChild = null;
    var previousNewFiber = null;

    var oldFiber = currentFirstChild;
    var lastPlacedIndex = 0;
    var newIdx = 0;
    var nextOldFiber = null;

    var step = newChildren.next();
    for (; oldFiber !== null && !step.done; newIdx++, step = newChildren.next()) {
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        nextOldFiber = oldFiber.sibling;
      }
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, priority);
      if (newFiber === null) {
        // TODO: This breaks on empty slots like null children. That's
        // unfortunate because it triggers the slow path all the time. We need
        // a better way to communicate whether this was a miss or null,
        // boolean, undefined, etc.
        if (!oldFiber) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        if (oldFiber && newFiber.alternate === null) {
          // We matched the slot, but we didn't reuse the existing fiber, so we
          // need to delete the existing child.
          deleteChild(returnFiber, oldFiber);
        }
      }
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        // TODO: Move out of the loop. This only happens for the first run.
        resultingFirstChild = newFiber;
      } else {
        // TODO: Defer siblings if we're not at the right index for this slot.
        // I.e. if we had null values before, then we want to defer this
        // for each null value. However, we also don't want to call updateSlot
        // with the previous one.
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    if (step.done) {
      // We've reached the end of the new children. We can delete the rest.
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; !step.done; newIdx++, step = newChildren.next()) {
        var _newFiber3 = createChild(returnFiber, step.value, priority);
        if (_newFiber3 === null) {
          continue;
        }
        lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = _newFiber3;
        } else {
          previousNewFiber.sibling = _newFiber3;
        }
        previousNewFiber = _newFiber3;
      }
      return resultingFirstChild;
    }

    // Add all children to a key map for quick lookups.
    var existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // Keep scanning and use the map to restore deleted items as moves.
    for (; !step.done; newIdx++, step = newChildren.next()) {
      var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, priority);
      if (_newFiber4 !== null) {
        if (shouldTrackSideEffects) {
          if (_newFiber4.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren['delete'](_newFiber4.key === null ? newIdx : _newFiber4.key);
          }
        }
        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = _newFiber4;
        } else {
          previousNewFiber.sibling = _newFiber4;
        }
        previousNewFiber = _newFiber4;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      existingChildren.forEach(function (child) {
        return deleteChild(returnFiber, child);
      });
    }

    return resultingFirstChild;
  }

  function reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, priority) {
    // There's no need to check for keys on text nodes since we don't have a
    // way to define them.
    if (currentFirstChild !== null && currentFirstChild.tag === HostText$5) {
      // We already have an existing node so let's just update it and delete
      // the rest.
      deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
      var existing = useFiber(currentFirstChild, priority);
      existing.pendingProps = textContent;
      existing['return'] = returnFiber;
      return existing;
    }
    // The existing first child is not a text node so we need to create one
    // and delete the existing ones.
    deleteRemainingChildren(returnFiber, currentFirstChild);
    var created = createFiberFromText$1(textContent, returnFiber.internalContextTag, priority);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleElement(returnFiber, currentFirstChild, element, priority) {
    var key = element.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.type === element.type) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, priority);
          existing.ref = coerceRef(child, element);
          existing.pendingProps = element.props;
          existing['return'] = returnFiber;
          {
            existing._debugSource = element._source;
            existing._debugOwner = element._owner;
          }
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromElement$1(element, returnFiber.internalContextTag, priority);
    created.ref = coerceRef(currentFirstChild, element);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleCoroutine(returnFiber, currentFirstChild, coroutine, priority) {
    var key = coroutine.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === CoroutineComponent$2) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, priority);
          existing.pendingProps = coroutine;
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromCoroutine$1(coroutine, returnFiber.internalContextTag, priority);
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSingleYield(returnFiber, currentFirstChild, yieldNode, priority) {
    // There's no need to check for keys on yields since they're stateless.
    var child = currentFirstChild;
    if (child !== null) {
      if (child.tag === YieldComponent$3) {
        deleteRemainingChildren(returnFiber, child.sibling);
        var existing = useFiber(child, priority);
        existing.type = yieldNode.value;
        existing['return'] = returnFiber;
        return existing;
      } else {
        deleteRemainingChildren(returnFiber, child);
      }
    }

    var created = createFiberFromYield$1(yieldNode, returnFiber.internalContextTag, priority);
    created.type = yieldNode.value;
    created['return'] = returnFiber;
    return created;
  }

  function reconcileSinglePortal(returnFiber, currentFirstChild, portal, priority) {
    var key = portal.key;
    var child = currentFirstChild;
    while (child !== null) {
      // TODO: If key === null and child.key === null, then this only applies to
      // the first item in the list.
      if (child.key === key) {
        if (child.tag === HostPortal$5 && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
          deleteRemainingChildren(returnFiber, child.sibling);
          var existing = useFiber(child, priority);
          existing.pendingProps = portal.children || [];
          existing['return'] = returnFiber;
          return existing;
        } else {
          deleteRemainingChildren(returnFiber, child);
          break;
        }
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    var created = createFiberFromPortal$1(portal, returnFiber.internalContextTag, priority);
    created['return'] = returnFiber;
    return created;
  }

  // This API will tag the children with the side-effect of the reconciliation
  // itself. They will be added to the side-effect list as we pass through the
  // children and the parent.
  function reconcileChildFibers(returnFiber, currentFirstChild, newChild, priority) {
    // This function is not recursive.
    // If the top level item is an array, we treat it as a set of children,
    // not as a fragment. Nested arrays on the other hand will be treated as
    // fragment nodes. Recursion happens at the normal flow.

    // Handle object types
    var isObject = typeof newChild === 'object' && newChild !== null;
    if (isObject) {
      // Support only the subset of return types that Stack supports. Treat
      // everything else as empty, but log a warning.
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, priority));

        case REACT_COROUTINE_TYPE:
          return placeSingleChild(reconcileSingleCoroutine(returnFiber, currentFirstChild, newChild, priority));

        case REACT_YIELD_TYPE:
          return placeSingleChild(reconcileSingleYield(returnFiber, currentFirstChild, newChild, priority));

        case REACT_PORTAL_TYPE:
          return placeSingleChild(reconcileSinglePortal(returnFiber, currentFirstChild, newChild, priority));
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, priority));
    }

    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, priority);
    }

    if (getIteratorFn(newChild)) {
      return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, priority);
    }

    if (isObject) {
      throwOnInvalidObjectType(returnFiber, newChild);
    }

    {
      if (typeof newChild === 'function') {
        warnOnFunctionType();
      }
    }
    if (typeof newChild === 'undefined') {
      // If the new child is undefined, and the return fiber is a composite
      // component, throw an error. If Fiber return types are disabled,
      // we already threw above.
      switch (returnFiber.tag) {
        case ClassComponent$8:
          {
            {
              var instance = returnFiber.stateNode;
              if (instance.render._isMockFunction) {
                // We allow auto-mocks to proceed as if they're returning null.
                break;
              }
            }
          }
        // Intentionally fall through to the next case, which handles both
        // functions and classes
        // eslint-disable-next-lined no-fallthrough
        case FunctionalComponent$3:
          {
            var Component = returnFiber.type;
            invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', Component.displayName || Component.name || 'Component');
          }
      }
    }

    // Remaining cases are all treated as empty.
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }

  return reconcileChildFibers;
}

var reconcileChildFibers$1 = ChildReconciler(true, true);

var reconcileChildFibersInPlace$1 = ChildReconciler(false, true);

var mountChildFibersInPlace$1 = ChildReconciler(false, false);

var cloneChildFibers$1 = function (current, workInProgress) {
  !(current === null || workInProgress.child === current.child) ? invariant(false, 'Resuming work not yet implemented.') : void 0;

  if (workInProgress.child === null) {
    return;
  }

  var currentChild = workInProgress.child;
  var newChild = createWorkInProgress$2(currentChild, currentChild.pendingWorkPriority);
  // TODO: Pass this as an argument, since it's easy to forget.
  newChild.pendingProps = currentChild.pendingProps;
  workInProgress.child = newChild;

  newChild['return'] = workInProgress;
  while (currentChild.sibling !== null) {
    currentChild = currentChild.sibling;
    newChild = newChild.sibling = createWorkInProgress$2(currentChild, currentChild.pendingWorkPriority);
    newChild.pendingProps = currentChild.pendingProps;
    newChild['return'] = workInProgress;
  }
  newChild.sibling = null;
};

var ReactChildFiber = {
	reconcileChildFibers: reconcileChildFibers$1,
	reconcileChildFibersInPlace: reconcileChildFibersInPlace$1,
	mountChildFibersInPlace: mountChildFibersInPlace$1,
	cloneChildFibers: cloneChildFibers$1
};

var Update$1 = ReactTypeOfSideEffect.Update;



var AsyncUpdates$1 = ReactTypeOfInternalContext.AsyncUpdates;

var cacheContext$1 = ReactFiberContext.cacheContext;
var getMaskedContext$2 = ReactFiberContext.getMaskedContext;
var getUnmaskedContext$2 = ReactFiberContext.getUnmaskedContext;
var isContextConsumer$1 = ReactFiberContext.isContextConsumer;

var addUpdate$1 = ReactFiberUpdateQueue.addUpdate;
var addReplaceUpdate$1 = ReactFiberUpdateQueue.addReplaceUpdate;
var addForceUpdate$1 = ReactFiberUpdateQueue.addForceUpdate;
var beginUpdateQueue$2 = ReactFiberUpdateQueue.beginUpdateQueue;

var _require5 = ReactFiberContext;
var hasContextChanged$2 = _require5.hasContextChanged;

var isMounted$1 = ReactFiberTreeReflection.isMounted;







var fakeInternalInstance = {};
var isArray$1 = Array.isArray;

{
  var _require7$1 = ReactDebugFiberPerf_1,
      startPhaseTimer$1 = _require7$1.startPhaseTimer,
      stopPhaseTimer$1 = _require7$1.stopPhaseTimer;

  var warning$8 = require$$0;
  var warnOnInvalidCallback = function (callback, callerName) {
    warning$8(callback === null || typeof callback === 'function', '%s(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callerName, callback);
  };

  // This is so gross but it's at least non-critical and can be removed if
  // it causes problems. This is meant to give a nicer error message for
  // ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
  // ...)) which otherwise throws a "_processChildContext is not a function"
  // exception.
  Object.defineProperty(fakeInternalInstance, '_processChildContext', {
    enumerable: false,
    value: function () {
      invariant(false, '_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');
    }
  });
  Object.freeze(fakeInternalInstance);
}

var ReactFiberClassComponent = function (scheduleUpdate, getPriorityContext, memoizeProps, memoizeState) {
  // Class component state updater
  var updater = {
    isMounted: isMounted$1,
    enqueueSetState: function (instance, partialState, callback) {
      var fiber = ReactInstanceMap_1.get(instance);
      var priorityLevel = getPriorityContext(fiber, false);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'setState');
      }
      addUpdate$1(fiber, partialState, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    },
    enqueueReplaceState: function (instance, state, callback) {
      var fiber = ReactInstanceMap_1.get(instance);
      var priorityLevel = getPriorityContext(fiber, false);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'replaceState');
      }
      addReplaceUpdate$1(fiber, state, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    },
    enqueueForceUpdate: function (instance, callback) {
      var fiber = ReactInstanceMap_1.get(instance);
      var priorityLevel = getPriorityContext(fiber, false);
      callback = callback === undefined ? null : callback;
      {
        warnOnInvalidCallback(callback, 'forceUpdate');
      }
      addForceUpdate$1(fiber, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    }
  };

  function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
    if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
      // If the workInProgress already has an Update effect, return true
      return true;
    }

    var instance = workInProgress.stateNode;
    var type = workInProgress.type;
    if (typeof instance.shouldComponentUpdate === 'function') {
      {
        startPhaseTimer$1(workInProgress, 'shouldComponentUpdate');
      }
      var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
      {
        stopPhaseTimer$1();
      }

      {
        warning$8(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', getComponentName_1(workInProgress) || 'Unknown');
      }

      return shouldUpdate;
    }

    if (type.prototype && type.prototype.isPureReactComponent) {
      return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
    }

    return true;
  }

  function checkClassInstance(workInProgress) {
    var instance = workInProgress.stateNode;
    var type = workInProgress.type;
    {
      var name = getComponentName_1(workInProgress);
      var renderPresent = instance.render;
      warning$8(renderPresent, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', name);
      var noGetInitialStateOnES6 = !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state;
      warning$8(noGetInitialStateOnES6, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', name);
      var noGetDefaultPropsOnES6 = !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved;
      warning$8(noGetDefaultPropsOnES6, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', name);
      var noInstancePropTypes = !instance.propTypes;
      warning$8(noInstancePropTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', name);
      var noInstanceContextTypes = !instance.contextTypes;
      warning$8(noInstanceContextTypes, 'contextTypes was defined as an instance property on %s. Use a static ' + 'property to define contextTypes instead.', name);
      var noComponentShouldUpdate = typeof instance.componentShouldUpdate !== 'function';
      warning$8(noComponentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', name);
      if (type.prototype && type.prototype.isPureReactComponent && typeof instance.shouldComponentUpdate !== 'undefined') {
        warning$8(false, '%s has a method called shouldComponentUpdate(). ' + 'shouldComponentUpdate should not be used when extending React.PureComponent. ' + 'Please extend React.Component if shouldComponentUpdate is used.', getComponentName_1(workInProgress) || 'A pure component');
      }
      var noComponentDidUnmount = typeof instance.componentDidUnmount !== 'function';
      warning$8(noComponentDidUnmount, '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', name);
      var noComponentWillRecieveProps = typeof instance.componentWillRecieveProps !== 'function';
      warning$8(noComponentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', name);
      var hasMutatedProps = instance.props !== workInProgress.pendingProps;
      warning$8(instance.props === undefined || !hasMutatedProps, '%s(...): When calling super() in `%s`, make sure to pass ' + "up the same props that your component's constructor was passed.", name, name);
      var noInstanceDefaultProps = !instance.defaultProps;
      warning$8(noInstanceDefaultProps, 'Setting defaultProps as an instance property on %s is not supported and will be ignored.' + ' Instead, define defaultProps as a static property on %s.', name, name);
    }

    var state = instance.state;
    if (state && (typeof state !== 'object' || isArray$1(state))) {
      invariant(false, '%s.state: must be set to an object or null', getComponentName_1(workInProgress));
    }
    if (typeof instance.getChildContext === 'function') {
      !(typeof workInProgress.type.childContextTypes === 'object') ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', getComponentName_1(workInProgress)) : void 0;
    }
  }

  function resetInputPointers(workInProgress, instance) {
    instance.props = workInProgress.memoizedProps;
    instance.state = workInProgress.memoizedState;
  }

  function adoptClassInstance(workInProgress, instance) {
    instance.updater = updater;
    workInProgress.stateNode = instance;
    // The instance needs access to the fiber so that it can schedule updates
    ReactInstanceMap_1.set(instance, workInProgress);
    {
      instance._reactInternalInstance = fakeInternalInstance;
    }
  }

  function constructClassInstance(workInProgress, props) {
    var ctor = workInProgress.type;
    var unmaskedContext = getUnmaskedContext$2(workInProgress);
    var needsContext = isContextConsumer$1(workInProgress);
    var context = needsContext ? getMaskedContext$2(workInProgress, unmaskedContext) : emptyObject;
    var instance = new ctor(props, context);
    adoptClassInstance(workInProgress, instance);

    // Cache unmasked context so we can avoid recreating masked context unless necessary.
    // ReactFiberContext usually updates this cache but can't for newly-created instances.
    if (needsContext) {
      cacheContext$1(workInProgress, unmaskedContext, context);
    }

    return instance;
  }

  function callComponentWillMount(workInProgress, instance) {
    {
      startPhaseTimer$1(workInProgress, 'componentWillMount');
    }
    var oldState = instance.state;
    instance.componentWillMount();
    {
      stopPhaseTimer$1();
    }

    if (oldState !== instance.state) {
      {
        warning$8(false, '%s.componentWillMount(): Assigning directly to this.state is ' + "deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName_1(workInProgress));
      }
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
    {
      startPhaseTimer$1(workInProgress, 'componentWillReceiveProps');
    }
    var oldState = instance.state;
    instance.componentWillReceiveProps(newProps, newContext);
    {
      stopPhaseTimer$1();
    }

    if (instance.state !== oldState) {
      {
        warning$8(false, '%s.componentWillReceiveProps(): Assigning directly to ' + "this.state is deprecated (except inside a component's " + 'constructor). Use setState instead.', getComponentName_1(workInProgress));
      }
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  // Invokes the mount life-cycles on a previously never rendered instance.
  function mountClassInstance(workInProgress, priorityLevel) {
    var current = workInProgress.alternate;

    {
      checkClassInstance(workInProgress);
    }

    var instance = workInProgress.stateNode;
    var state = instance.state || null;

    var props = workInProgress.pendingProps;
    !props ? invariant(false, 'There must be pending props for an initial mount. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    var unmaskedContext = getUnmaskedContext$2(workInProgress);

    instance.props = props;
    instance.state = state;
    instance.refs = emptyObject;
    instance.context = getMaskedContext$2(workInProgress, unmaskedContext);

    if (ReactFeatureFlags_1.enableAsyncSubtreeAPI && workInProgress.type != null && workInProgress.type.prototype != null && workInProgress.type.prototype.unstable_isAsyncReactComponent === true) {
      workInProgress.internalContextTag |= AsyncUpdates$1;
    }

    if (typeof instance.componentWillMount === 'function') {
      callComponentWillMount(workInProgress, instance);
      // If we had additional state updates during this life-cycle, let's
      // process them now.
      var updateQueue = workInProgress.updateQueue;
      if (updateQueue !== null) {
        instance.state = beginUpdateQueue$2(current, workInProgress, updateQueue, instance, state, props, priorityLevel);
      }
    }
    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= Update$1;
    }
  }

  // Called on a preexisting class instance. Returns false if a resumed render
  // could be reused.
  // function resumeMountClassInstance(
  //   workInProgress: Fiber,
  //   priorityLevel: PriorityLevel,
  // ): boolean {
  //   const instance = workInProgress.stateNode;
  //   resetInputPointers(workInProgress, instance);

  //   let newState = workInProgress.memoizedState;
  //   let newProps = workInProgress.pendingProps;
  //   if (!newProps) {
  //     // If there isn't any new props, then we'll reuse the memoized props.
  //     // This could be from already completed work.
  //     newProps = workInProgress.memoizedProps;
  //     invariant(
  //       newProps != null,
  //       'There should always be pending or memoized props. This error is ' +
  //         'likely caused by a bug in React. Please file an issue.',
  //     );
  //   }
  //   const newUnmaskedContext = getUnmaskedContext(workInProgress);
  //   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);

  //   const oldContext = instance.context;
  //   const oldProps = workInProgress.memoizedProps;

  //   if (
  //     typeof instance.componentWillReceiveProps === 'function' &&
  //     (oldProps !== newProps || oldContext !== newContext)
  //   ) {
  //     callComponentWillReceiveProps(
  //       workInProgress,
  //       instance,
  //       newProps,
  //       newContext,
  //     );
  //   }

  //   // Process the update queue before calling shouldComponentUpdate
  //   const updateQueue = workInProgress.updateQueue;
  //   if (updateQueue !== null) {
  //     newState = beginUpdateQueue(
  //       workInProgress,
  //       updateQueue,
  //       instance,
  //       newState,
  //       newProps,
  //       priorityLevel,
  //     );
  //   }

  //   // TODO: Should we deal with a setState that happened after the last
  //   // componentWillMount and before this componentWillMount? Probably
  //   // unsupported anyway.

  //   if (
  //     !checkShouldComponentUpdate(
  //       workInProgress,
  //       workInProgress.memoizedProps,
  //       newProps,
  //       workInProgress.memoizedState,
  //       newState,
  //       newContext,
  //     )
  //   ) {
  //     // Update the existing instance's state, props, and context pointers even
  //     // though we're bailing out.
  //     instance.props = newProps;
  //     instance.state = newState;
  //     instance.context = newContext;
  //     return false;
  //   }

  //   // Update the input pointers now so that they are correct when we call
  //   // componentWillMount
  //   instance.props = newProps;
  //   instance.state = newState;
  //   instance.context = newContext;

  //   if (typeof instance.componentWillMount === 'function') {
  //     callComponentWillMount(workInProgress, instance);
  //     // componentWillMount may have called setState. Process the update queue.
  //     const newUpdateQueue = workInProgress.updateQueue;
  //     if (newUpdateQueue !== null) {
  //       newState = beginUpdateQueue(
  //         workInProgress,
  //         newUpdateQueue,
  //         instance,
  //         newState,
  //         newProps,
  //         priorityLevel,
  //       );
  //     }
  //   }

  //   if (typeof instance.componentDidMount === 'function') {
  //     workInProgress.effectTag |= Update;
  //   }

  //   instance.state = newState;

  //   return true;
  // }

  // Invokes the update life-cycles and returns false if it shouldn't rerender.
  function updateClassInstance(current, workInProgress, priorityLevel) {
    var instance = workInProgress.stateNode;
    resetInputPointers(workInProgress, instance);

    var oldProps = workInProgress.memoizedProps;
    var newProps = workInProgress.pendingProps;
    if (!newProps) {
      // If there aren't any new props, then we'll reuse the memoized props.
      // This could be from already completed work.
      newProps = oldProps;
      !(newProps != null) ? invariant(false, 'There should always be pending or memoized props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    var oldContext = instance.context;
    var newUnmaskedContext = getUnmaskedContext$2(workInProgress);
    var newContext = getMaskedContext$2(workInProgress, newUnmaskedContext);

    // Note: During these life-cycles, instance.props/instance.state are what
    // ever the previously attempted to render - not the "current". However,
    // during componentDidUpdate we pass the "current" props.

    if (typeof instance.componentWillReceiveProps === 'function' && (oldProps !== newProps || oldContext !== newContext)) {
      callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
    }

    // Compute the next state using the memoized state and the update queue.
    var oldState = workInProgress.memoizedState;
    // TODO: Previous state can be null.
    var newState = void 0;
    if (workInProgress.updateQueue !== null) {
      newState = beginUpdateQueue$2(current, workInProgress, workInProgress.updateQueue, instance, oldState, newProps, priorityLevel);
    } else {
      newState = oldState;
    }

    if (oldProps === newProps && oldState === newState && !hasContextChanged$2() && !(workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate)) {
      // If an update was already in progress, we should schedule an Update
      // effect even though we're bailing out, so that cWU/cDU are called.
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
          workInProgress.effectTag |= Update$1;
        }
      }
      return false;
    }

    var shouldUpdate = checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

    if (shouldUpdate) {
      if (typeof instance.componentWillUpdate === 'function') {
        {
          startPhaseTimer$1(workInProgress, 'componentWillUpdate');
        }
        instance.componentWillUpdate(newProps, newState, newContext);
        {
          stopPhaseTimer$1();
        }
      }
      if (typeof instance.componentDidUpdate === 'function') {
        workInProgress.effectTag |= Update$1;
      }
    } else {
      // If an update was already in progress, we should schedule an Update
      // effect even though we're bailing out, so that cWU/cDU are called.
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
          workInProgress.effectTag |= Update$1;
        }
      }

      // If shouldComponentUpdate returned false, we should still update the
      // memoized props/state to indicate that this work can be reused.
      memoizeProps(workInProgress, newProps);
      memoizeState(workInProgress, newState);
    }

    // Update the existing instance's state, props, and context pointers even
    // if shouldComponentUpdate returns false.
    instance.props = newProps;
    instance.state = newState;
    instance.context = newContext;

    return shouldUpdate;
  }

  return {
    adoptClassInstance: adoptClassInstance,
    constructClassInstance: constructClassInstance,
    mountClassInstance: mountClassInstance,
    // resumeMountClassInstance,
    updateClassInstance: updateClassInstance
  };
};

var mountChildFibersInPlace = ReactChildFiber.mountChildFibersInPlace;
var reconcileChildFibers = ReactChildFiber.reconcileChildFibers;
var reconcileChildFibersInPlace = ReactChildFiber.reconcileChildFibersInPlace;
var cloneChildFibers = ReactChildFiber.cloneChildFibers;

var beginUpdateQueue$1 = ReactFiberUpdateQueue.beginUpdateQueue;



var getMaskedContext$1 = ReactFiberContext.getMaskedContext;
var getUnmaskedContext$1 = ReactFiberContext.getUnmaskedContext;
var hasContextChanged$1 = ReactFiberContext.hasContextChanged;
var pushContextProvider$1 = ReactFiberContext.pushContextProvider;
var pushTopLevelContextObject$1 = ReactFiberContext.pushTopLevelContextObject;
var invalidateContextProvider$1 = ReactFiberContext.invalidateContextProvider;

var IndeterminateComponent$2 = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent$2 = ReactTypeOfWork.FunctionalComponent;
var ClassComponent$7 = ReactTypeOfWork.ClassComponent;
var HostRoot$7 = ReactTypeOfWork.HostRoot;
var HostComponent$7 = ReactTypeOfWork.HostComponent;
var HostText$4 = ReactTypeOfWork.HostText;
var HostPortal$4 = ReactTypeOfWork.HostPortal;
var CoroutineComponent$1 = ReactTypeOfWork.CoroutineComponent;
var CoroutineHandlerPhase = ReactTypeOfWork.CoroutineHandlerPhase;
var YieldComponent$2 = ReactTypeOfWork.YieldComponent;
var Fragment$3 = ReactTypeOfWork.Fragment;

var NoWork$3 = ReactPriorityLevel.NoWork;
var OffscreenPriority$1 = ReactPriorityLevel.OffscreenPriority;

var PerformedWork$1 = ReactTypeOfSideEffect.PerformedWork;
var Placement$2 = ReactTypeOfSideEffect.Placement;
var ContentReset$1 = ReactTypeOfSideEffect.ContentReset;
var Err$1 = ReactTypeOfSideEffect.Err;
var Ref$1 = ReactTypeOfSideEffect.Ref;



var ReactCurrentOwner$2 = ReactGlobalSharedState_1.ReactCurrentOwner;



{
  var ReactDebugCurrentFiber$4 = ReactDebugCurrentFiber_1;

  var _require7 = ReactDebugFiberPerf_1,
      cancelWorkTimer = _require7.cancelWorkTimer;

  var warning$6 = require$$0;

  var warnedAboutStatelessRefs = {};
}

var ReactFiberBeginWork = function (config, hostContext, hydrationContext, scheduleUpdate, getPriorityContext) {
  var shouldSetTextContent = config.shouldSetTextContent,
      useSyncScheduling = config.useSyncScheduling,
      shouldDeprioritizeSubtree = config.shouldDeprioritizeSubtree;
  var pushHostContext = hostContext.pushHostContext,
      pushHostContainer = hostContext.pushHostContainer;
  var enterHydrationState = hydrationContext.enterHydrationState,
      resetHydrationState = hydrationContext.resetHydrationState,
      tryToClaimNextHydratableInstance = hydrationContext.tryToClaimNextHydratableInstance;

  var _ReactFiberClassCompo = ReactFiberClassComponent(scheduleUpdate, getPriorityContext, memoizeProps, memoizeState),
      adoptClassInstance = _ReactFiberClassCompo.adoptClassInstance,
      constructClassInstance = _ReactFiberClassCompo.constructClassInstance,
      mountClassInstance = _ReactFiberClassCompo.mountClassInstance,
      updateClassInstance = _ReactFiberClassCompo.updateClassInstance;

  function reconcileChildren(current, workInProgress, nextChildren) {
    var priorityLevel = workInProgress.pendingWorkPriority;
    reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel);
  }

  function reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel) {
    if (current === null) {
      // If this is a fresh new component that hasn't been rendered yet, we
      // won't update its child set by applying minimal side-effects. Instead,
      // we will add them all to the child before it gets rendered. That means
      // we can optimize this reconciliation pass by not tracking side-effects.
      workInProgress.child = mountChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, priorityLevel);
    } else if (current.child === workInProgress.child) {
      // If the current child is the same as the work in progress, it means that
      // we haven't yet started any work on these children. Therefore, we use
      // the clone algorithm to create a copy of all the current children.

      // If we had any progressed work already, that is invalid at this point so
      // let's throw it out.
      workInProgress.child = reconcileChildFibers(workInProgress, workInProgress.child, nextChildren, priorityLevel);
    } else {
      // If, on the other hand, it is already using a clone, that means we've
      // already begun some work on this tree and we can continue where we left
      // off by reconciling against the existing children.
      workInProgress.child = reconcileChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, priorityLevel);
    }
  }

  function updateFragment(current, workInProgress) {
    var nextChildren = workInProgress.pendingProps;
    if (hasContextChanged$1()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextChildren === null) {
        nextChildren = workInProgress.memoizedProps;
      }
    } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }
    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextChildren);
    return workInProgress.child;
  }

  function markRef(current, workInProgress) {
    var ref = workInProgress.ref;
    if (ref !== null && (!current || current.ref !== ref)) {
      // Schedule a Ref effect
      workInProgress.effectTag |= Ref$1;
    }
  }

  function updateFunctionalComponent(current, workInProgress) {
    var fn = workInProgress.type;
    var nextProps = workInProgress.pendingProps;

    var memoizedProps = workInProgress.memoizedProps;
    if (hasContextChanged$1()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextProps === null) {
        nextProps = memoizedProps;
      }
    } else {
      if (nextProps === null || memoizedProps === nextProps) {
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      // TODO: consider bringing fn.shouldComponentUpdate() back.
      // It used to be here.
    }

    var unmaskedContext = getUnmaskedContext$1(workInProgress);
    var context = getMaskedContext$1(workInProgress, unmaskedContext);

    var nextChildren;

    {
      ReactCurrentOwner$2.current = workInProgress;
      ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress, 'render');
      nextChildren = fn(nextProps, context);
      ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress, null);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork$1;
    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function updateClassComponent(current, workInProgress, priorityLevel) {
    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    var hasContext = pushContextProvider$1(workInProgress);

    var shouldUpdate = void 0;
    if (current === null) {
      if (!workInProgress.stateNode) {
        // In the initial pass we might need to construct the instance.
        constructClassInstance(workInProgress, workInProgress.pendingProps);
        mountClassInstance(workInProgress, priorityLevel);
        shouldUpdate = true;
      } else {
        invariant(false, 'Resuming work not yet implemented.');
        // In a resume, we'll already have an instance we can reuse.
        // shouldUpdate = resumeMountClassInstance(workInProgress, priorityLevel);
      }
    } else {
      shouldUpdate = updateClassInstance(current, workInProgress, priorityLevel);
    }
    return finishClassComponent(current, workInProgress, shouldUpdate, hasContext);
  }

  function finishClassComponent(current, workInProgress, shouldUpdate, hasContext) {
    // Refs should update even if shouldComponentUpdate returns false
    markRef(current, workInProgress);

    if (!shouldUpdate) {
      // Context providers should defer to sCU for rendering
      if (hasContext) {
        invalidateContextProvider$1(workInProgress, false);
      }

      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var instance = workInProgress.stateNode;

    // Rerender
    ReactCurrentOwner$2.current = workInProgress;
    var nextChildren = void 0;
    {
      ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress, 'render');
      nextChildren = instance.render();
      ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress, null);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork$1;
    reconcileChildren(current, workInProgress, nextChildren);
    // Memoize props and state using the values we just used to render.
    // TODO: Restructure so we never read values from the instance.
    memoizeState(workInProgress, instance.state);
    memoizeProps(workInProgress, instance.props);

    // The context might have changed so we need to recalculate it.
    if (hasContext) {
      invalidateContextProvider$1(workInProgress, true);
    }

    return workInProgress.child;
  }

  function pushHostRootContext(workInProgress) {
    var root = workInProgress.stateNode;
    if (root.pendingContext) {
      pushTopLevelContextObject$1(workInProgress, root.pendingContext, root.pendingContext !== root.context);
    } else if (root.context) {
      // Should always be set
      pushTopLevelContextObject$1(workInProgress, root.context, false);
    }
    pushHostContainer(workInProgress, root.containerInfo);
  }

  function updateHostRoot(current, workInProgress, priorityLevel) {
    pushHostRootContext(workInProgress);
    var updateQueue = workInProgress.updateQueue;
    if (updateQueue !== null) {
      var prevState = workInProgress.memoizedState;
      var state = beginUpdateQueue$1(current, workInProgress, updateQueue, null, prevState, null, priorityLevel);
      if (prevState === state) {
        // If the state is the same as before, that's a bailout because we had
        // no work matching this priority.
        resetHydrationState();
        return bailoutOnAlreadyFinishedWork(current, workInProgress);
      }
      var element = state.element;
      if ((current === null || current.child === null) && enterHydrationState(workInProgress)) {
        // If we don't have any current children this might be the first pass.
        // We always try to hydrate. If this isn't a hydration pass there won't
        // be any children to hydrate which is effectively the same thing as
        // not hydrating.

        // This is a bit of a hack. We track the host root as a placement to
        // know that we're currently in a mounting state. That way isMounted
        // works as expected. We must reset this before committing.
        // TODO: Delete this when we delete isMounted and findDOMNode.
        workInProgress.effectTag |= Placement$2;

        // Ensure that children mount into this root without tracking
        // side-effects. This ensures that we don't store Placement effects on
        // nodes that will be hydrated.
        workInProgress.child = mountChildFibersInPlace(workInProgress, workInProgress.child, element, priorityLevel);
      } else {
        // Otherwise reset hydration state in case we aborted and resumed another
        // root.
        resetHydrationState();
        reconcileChildren(current, workInProgress, element);
      }
      memoizeState(workInProgress, state);
      return workInProgress.child;
    }
    resetHydrationState();
    // If there is no update queue, that's a bailout because the root has no props.
    return bailoutOnAlreadyFinishedWork(current, workInProgress);
  }

  function updateHostComponent(current, workInProgress, renderPriority) {
    pushHostContext(workInProgress);

    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress);
    }

    var type = workInProgress.type;
    var memoizedProps = workInProgress.memoizedProps;
    var nextProps = workInProgress.pendingProps;
    if (nextProps === null) {
      nextProps = memoizedProps;
      !(nextProps !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    }
    var prevProps = current !== null ? current.memoizedProps : null;

    if (hasContextChanged$1()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
    } else if (nextProps === null || memoizedProps === nextProps) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var nextChildren = nextProps.children;
    var isDirectTextChild = shouldSetTextContent(type, nextProps);

    if (isDirectTextChild) {
      // We special case a direct text child of a host node. This is a common
      // case. We won't handle it as a reified child. We will instead handle
      // this in the host environment that also have access to this prop. That
      // avoids allocating another HostText fiber and traversing it.
      nextChildren = null;
    } else if (prevProps && shouldSetTextContent(type, prevProps)) {
      // If we're switching from a direct text child to a normal child, or to
      // empty, we need to schedule the text content to be reset.
      workInProgress.effectTag |= ContentReset$1;
    }

    markRef(current, workInProgress);

    // Check the host config to see if the children are offscreen/hidden.
    if (renderPriority !== OffscreenPriority$1 && !useSyncScheduling && shouldDeprioritizeSubtree(type, nextProps)) {
      // Down-prioritize the children.
      workInProgress.pendingWorkPriority = OffscreenPriority$1;
      // Bailout and come back to this fiber later at OffscreenPriority.
      return null;
    }

    reconcileChildren(current, workInProgress, nextChildren);
    memoizeProps(workInProgress, nextProps);
    return workInProgress.child;
  }

  function updateHostText(current, workInProgress) {
    if (current === null) {
      tryToClaimNextHydratableInstance(workInProgress);
    }
    var nextProps = workInProgress.pendingProps;
    if (nextProps === null) {
      nextProps = workInProgress.memoizedProps;
    }
    memoizeProps(workInProgress, nextProps);
    // Nothing to do here. This is terminal. We'll do the completion step
    // immediately after.
    return null;
  }

  function mountIndeterminateComponent(current, workInProgress, priorityLevel) {
    !(current === null) ? invariant(false, 'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    var fn = workInProgress.type;
    var props = workInProgress.pendingProps;
    var unmaskedContext = getUnmaskedContext$1(workInProgress);
    var context = getMaskedContext$1(workInProgress, unmaskedContext);

    var value;

    {
      ReactCurrentOwner$2.current = workInProgress;
      value = fn(props, context);
    }
    // React DevTools reads this flag.
    workInProgress.effectTag |= PerformedWork$1;

    if (typeof value === 'object' && value !== null && typeof value.render === 'function') {
      // Proceed under the assumption that this is a class instance
      workInProgress.tag = ClassComponent$7;

      // Push context providers early to prevent context stack mismatches.
      // During mounting we don't know the child context yet as the instance doesn't exist.
      // We will invalidate the child context in finishClassComponent() right after rendering.
      var hasContext = pushContextProvider$1(workInProgress);
      adoptClassInstance(workInProgress, value);
      mountClassInstance(workInProgress, priorityLevel);
      return finishClassComponent(current, workInProgress, true, hasContext);
    } else {
      // Proceed under the assumption that this is a functional component
      workInProgress.tag = FunctionalComponent$2;
      {
        var Component = workInProgress.type;

        if (Component) {
          warning$6(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component');
        }
        if (workInProgress.ref !== null) {
          var info = '';
          var ownerName = ReactDebugCurrentFiber$4.getCurrentFiberOwnerName();
          if (ownerName) {
            info += '\n\nCheck the render method of `' + ownerName + '`.';
          }

          var warningKey = ownerName || workInProgress._debugID || '';
          var debugSource = workInProgress._debugSource;
          if (debugSource) {
            warningKey = debugSource.fileName + ':' + debugSource.lineNumber;
          }
          if (!warnedAboutStatelessRefs[warningKey]) {
            warnedAboutStatelessRefs[warningKey] = true;
            warning$6(false, 'Stateless function components cannot be given refs. ' + 'Attempts to access this ref will fail.%s%s', info, ReactDebugCurrentFiber$4.getCurrentFiberStackAddendum());
          }
        }
      }
      reconcileChildren(current, workInProgress, value);
      memoizeProps(workInProgress, props);
      return workInProgress.child;
    }
  }

  function updateCoroutineComponent(current, workInProgress) {
    var nextCoroutine = workInProgress.pendingProps;
    if (hasContextChanged$1()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextCoroutine === null) {
        nextCoroutine = current && current.memoizedProps;
        !(nextCoroutine !== null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
    } else if (nextCoroutine === null || workInProgress.memoizedProps === nextCoroutine) {
      nextCoroutine = workInProgress.memoizedProps;
      // TODO: When bailing out, we might need to return the stateNode instead
      // of the child. To check it for work.
      // return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    var nextChildren = nextCoroutine.children;
    var priorityLevel = workInProgress.pendingWorkPriority;

    // The following is a fork of reconcileChildrenAtPriority but using
    // stateNode to store the child.
    if (current === null) {
      workInProgress.stateNode = mountChildFibersInPlace(workInProgress, workInProgress.stateNode, nextChildren, priorityLevel);
    } else if (current.child === workInProgress.child) {
      workInProgress.stateNode = reconcileChildFibers(workInProgress, workInProgress.stateNode, nextChildren, priorityLevel);
    } else {
      workInProgress.stateNode = reconcileChildFibersInPlace(workInProgress, workInProgress.stateNode, nextChildren, priorityLevel);
    }

    memoizeProps(workInProgress, nextCoroutine);
    // This doesn't take arbitrary time so we could synchronously just begin
    // eagerly do the work of workInProgress.child as an optimization.
    return workInProgress.stateNode;
  }

  function updatePortalComponent(current, workInProgress) {
    pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
    var priorityLevel = workInProgress.pendingWorkPriority;
    var nextChildren = workInProgress.pendingProps;
    if (hasContextChanged$1()) {
      // Normally we can bail out on props equality but if context has changed
      // we don't do the bailout and we have to reuse existing props instead.
      if (nextChildren === null) {
        nextChildren = current && current.memoizedProps;
        !(nextChildren != null) ? invariant(false, 'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      }
    } else if (nextChildren === null || workInProgress.memoizedProps === nextChildren) {
      return bailoutOnAlreadyFinishedWork(current, workInProgress);
    }

    if (current === null) {
      // Portals are special because we don't append the children during mount
      // but at commit. Therefore we need to track insertions which the normal
      // flow doesn't do during mount. This doesn't happen at the root because
      // the root always starts with a "current" with a null child.
      // TODO: Consider unifying this with how the root works.
      workInProgress.child = reconcileChildFibersInPlace(workInProgress, workInProgress.child, nextChildren, priorityLevel);
      memoizeProps(workInProgress, nextChildren);
    } else {
      reconcileChildren(current, workInProgress, nextChildren);
      memoizeProps(workInProgress, nextChildren);
    }
    return workInProgress.child;
  }

  /*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */

  function bailoutOnAlreadyFinishedWork(current, workInProgress) {
    {
      cancelWorkTimer(workInProgress);
    }

    // TODO: We should ideally be able to bail out early if the children have no
    // more work to do. However, since we don't have a separation of this
    // Fiber's priority and its children yet - we don't know without doing lots
    // of the same work we do anyway. Once we have that separation we can just
    // bail out here if the children has no more work at this priority level.
    // if (workInProgress.priorityOfChildren <= priorityLevel) {
    //   // If there are side-effects in these children that have not yet been
    //   // committed we need to ensure that they get properly transferred up.
    //   if (current && current.child !== workInProgress.child) {
    //     reuseChildrenEffects(workInProgress, child);
    //   }
    //   return null;
    // }

    cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }

  function bailoutOnLowPriority(current, workInProgress) {
    {
      cancelWorkTimer(workInProgress);
    }

    // TODO: Handle HostComponent tags here as well and call pushHostContext()?
    // See PR 8590 discussion for context
    switch (workInProgress.tag) {
      case HostRoot$7:
        pushHostRootContext(workInProgress);
        break;
      case ClassComponent$7:
        pushContextProvider$1(workInProgress);
        break;
      case HostPortal$4:
        pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
        break;
    }
    // TODO: What if this is currently in progress?
    // How can that happen? How is this not being cloned?
    return null;
  }

  // TODO: Delete memoizeProps/State and move to reconcile/bailout instead
  function memoizeProps(workInProgress, nextProps) {
    workInProgress.memoizedProps = nextProps;
  }

  function memoizeState(workInProgress, nextState) {
    workInProgress.memoizedState = nextState;
    // Don't reset the updateQueue, in case there are pending updates. Resetting
    // is handled by beginUpdateQueue.
  }

  function beginWork(current, workInProgress, priorityLevel) {
    if (workInProgress.pendingWorkPriority === NoWork$3 || workInProgress.pendingWorkPriority > priorityLevel) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    {
      ReactDebugCurrentFiber$4.setCurrentFiber(workInProgress, null);
    }

    switch (workInProgress.tag) {
      case IndeterminateComponent$2:
        return mountIndeterminateComponent(current, workInProgress, priorityLevel);
      case FunctionalComponent$2:
        return updateFunctionalComponent(current, workInProgress);
      case ClassComponent$7:
        return updateClassComponent(current, workInProgress, priorityLevel);
      case HostRoot$7:
        return updateHostRoot(current, workInProgress, priorityLevel);
      case HostComponent$7:
        return updateHostComponent(current, workInProgress, priorityLevel);
      case HostText$4:
        return updateHostText(current, workInProgress);
      case CoroutineHandlerPhase:
        // This is a restart. Reset the tag to the initial phase.
        workInProgress.tag = CoroutineComponent$1;
      // Intentionally fall through since this is now the same.
      case CoroutineComponent$1:
        return updateCoroutineComponent(current, workInProgress);
      case YieldComponent$2:
        // A yield component is just a placeholder, we can just run through the
        // next one immediately.
        return null;
      case HostPortal$4:
        return updatePortalComponent(current, workInProgress);
      case Fragment$3:
        return updateFragment(current, workInProgress);
      default:
        invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  function beginFailedWork(current, workInProgress, priorityLevel) {
    // Push context providers here to avoid a push/pop context mismatch.
    switch (workInProgress.tag) {
      case ClassComponent$7:
        pushContextProvider$1(workInProgress);
        break;
      case HostRoot$7:
        pushHostRootContext(workInProgress);
        break;
      default:
        invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
    }

    // Add an error effect so we can handle the error during the commit phase
    workInProgress.effectTag |= Err$1;

    // This is a weird case where we do "resume" work — work that failed on
    // our first attempt. Because we no longer have a notion of "progressed
    // deletions," reset the child to the current child to make sure we delete
    // it again. TODO: Find a better way to handle this, perhaps during a more
    // general overhaul of error handling.
    if (current === null) {
      workInProgress.child = null;
    } else if (workInProgress.child !== current.child) {
      workInProgress.child = current.child;
    }

    if (workInProgress.pendingWorkPriority === NoWork$3 || workInProgress.pendingWorkPriority > priorityLevel) {
      return bailoutOnLowPriority(current, workInProgress);
    }

    // If we don't bail out, we're going be recomputing our children so we need
    // to drop our effect list.
    workInProgress.firstEffect = null;
    workInProgress.lastEffect = null;

    // Unmount the current children as if the component rendered null
    var nextChildren = null;
    reconcileChildrenAtPriority(current, workInProgress, nextChildren, priorityLevel);

    if (workInProgress.tag === ClassComponent$7) {
      var instance = workInProgress.stateNode;
      workInProgress.memoizedProps = instance.props;
      workInProgress.memoizedState = instance.state;
    }

    return workInProgress.child;
  }

  return {
    beginWork: beginWork,
    beginFailedWork: beginFailedWork
  };
};

var reconcileChildFibers$2 = ReactChildFiber.reconcileChildFibers;

var popContextProvider$2 = ReactFiberContext.popContextProvider;
var popTopLevelContextObject$1 = ReactFiberContext.popTopLevelContextObject;




var IndeterminateComponent$3 = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent$4 = ReactTypeOfWork.FunctionalComponent;
var ClassComponent$9 = ReactTypeOfWork.ClassComponent;
var HostRoot$8 = ReactTypeOfWork.HostRoot;
var HostComponent$8 = ReactTypeOfWork.HostComponent;
var HostText$6 = ReactTypeOfWork.HostText;
var HostPortal$6 = ReactTypeOfWork.HostPortal;
var CoroutineComponent$3 = ReactTypeOfWork.CoroutineComponent;
var CoroutineHandlerPhase$1 = ReactTypeOfWork.CoroutineHandlerPhase;
var YieldComponent$4 = ReactTypeOfWork.YieldComponent;
var Fragment$5 = ReactTypeOfWork.Fragment;
var Placement$4 = ReactTypeOfSideEffect.Placement;
var Ref$2 = ReactTypeOfSideEffect.Ref;
var Update$2 = ReactTypeOfSideEffect.Update;
var OffscreenPriority$2 = ReactPriorityLevel.OffscreenPriority;


{
  var ReactDebugCurrentFiber$5 = ReactDebugCurrentFiber_1;
}



var ReactFiberCompleteWork = function (config, hostContext, hydrationContext) {
  var createInstance = config.createInstance,
      createTextInstance = config.createTextInstance,
      appendInitialChild = config.appendInitialChild,
      finalizeInitialChildren = config.finalizeInitialChildren,
      prepareUpdate = config.prepareUpdate;
  var getRootHostContainer = hostContext.getRootHostContainer,
      popHostContext = hostContext.popHostContext,
      getHostContext = hostContext.getHostContext,
      popHostContainer = hostContext.popHostContainer;
  var prepareToHydrateHostInstance = hydrationContext.prepareToHydrateHostInstance,
      prepareToHydrateHostTextInstance = hydrationContext.prepareToHydrateHostTextInstance,
      popHydrationState = hydrationContext.popHydrationState;


  function markUpdate(workInProgress) {
    // Tag the fiber with an update effect. This turns a Placement into
    // an UpdateAndPlacement.
    workInProgress.effectTag |= Update$2;
  }

  function markRef(workInProgress) {
    workInProgress.effectTag |= Ref$2;
  }

  function appendAllYields(yields, workInProgress) {
    var node = workInProgress.stateNode;
    if (node) {
      node['return'] = workInProgress;
    }
    while (node !== null) {
      if (node.tag === HostComponent$8 || node.tag === HostText$6 || node.tag === HostPortal$6) {
        invariant(false, 'A coroutine cannot have host component children.');
      } else if (node.tag === YieldComponent$4) {
        yields.push(node.type);
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === workInProgress) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function moveCoroutineToHandlerPhase(current, workInProgress) {
    var coroutine = workInProgress.memoizedProps;
    !coroutine ? invariant(false, 'Should be resolved by now. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    // First step of the coroutine has completed. Now we need to do the second.
    // TODO: It would be nice to have a multi stage coroutine represented by a
    // single component, or at least tail call optimize nested ones. Currently
    // that requires additional fields that we don't want to add to the fiber.
    // So this requires nested handlers.
    // Note: This doesn't mutate the alternate node. I don't think it needs to
    // since this stage is reset for every pass.
    workInProgress.tag = CoroutineHandlerPhase$1;

    // Build up the yields.
    // TODO: Compare this to a generator or opaque helpers like Children.
    var yields = [];
    appendAllYields(yields, workInProgress);
    var fn = coroutine.handler;
    var props = coroutine.props;
    var nextChildren = fn(props, yields);

    var currentFirstChild = current !== null ? current.child : null;
    // Inherit the priority of the returnFiber.
    var priority = workInProgress.pendingWorkPriority;
    workInProgress.child = reconcileChildFibers$2(workInProgress, currentFirstChild, nextChildren, priority);
    return workInProgress.child;
  }

  function appendAllChildren(parent, workInProgress) {
    // We only have the top Fiber that was created but we need recurse down its
    // children to find all the terminal nodes.
    var node = workInProgress.child;
    while (node !== null) {
      if (node.tag === HostComponent$8 || node.tag === HostText$6) {
        appendInitialChild(parent, node.stateNode);
      } else if (node.tag === HostPortal$6) {
        // If we have a portal child, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node = node.child;
        continue;
      }
      if (node === workInProgress) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === workInProgress) {
          return;
        }
        node = node['return'];
      }
      node = node.sibling;
    }
  }

  function completeWork(current, workInProgress, renderPriority) {
    {
      ReactDebugCurrentFiber$5.setCurrentFiber(workInProgress, null);
    }

    // Get the latest props.
    var newProps = workInProgress.pendingProps;
    if (newProps === null) {
      newProps = workInProgress.memoizedProps;
    } else if (workInProgress.pendingWorkPriority !== OffscreenPriority$2 || renderPriority === OffscreenPriority$2) {
      // Reset the pending props, unless this was a down-prioritization.
      workInProgress.pendingProps = null;
    }

    switch (workInProgress.tag) {
      case FunctionalComponent$4:
        return null;
      case ClassComponent$9:
        {
          // We are leaving this subtree, so pop context if any.
          popContextProvider$2(workInProgress);
          return null;
        }
      case HostRoot$8:
        {
          popHostContainer(workInProgress);
          popTopLevelContextObject$1(workInProgress);
          var fiberRoot = workInProgress.stateNode;
          if (fiberRoot.pendingContext) {
            fiberRoot.context = fiberRoot.pendingContext;
            fiberRoot.pendingContext = null;
          }

          if (current === null || current.child === null) {
            // If we hydrated, pop so that we can delete any remaining children
            // that weren't hydrated.
            popHydrationState(workInProgress);
            // This resets the hacky state to fix isMounted before committing.
            // TODO: Delete this when we delete isMounted and findDOMNode.
            workInProgress.effectTag &= ~Placement$4;
          }
          return null;
        }
      case HostComponent$8:
        {
          popHostContext(workInProgress);
          var rootContainerInstance = getRootHostContainer();
          var type = workInProgress.type;
          if (current !== null && workInProgress.stateNode != null) {
            // If we have an alternate, that means this is an update and we need to
            // schedule a side-effect to do the updates.
            var oldProps = current.memoizedProps;
            // If we get updated because one of our children updated, we don't
            // have newProps so we'll have to reuse them.
            // TODO: Split the update API as separate for the props vs. children.
            // Even better would be if children weren't special cased at all tho.
            var instance = workInProgress.stateNode;
            var currentHostContext = getHostContext();
            var updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);

            // TODO: Type this specific to this type of component.
            workInProgress.updateQueue = updatePayload;
            // If the update payload indicates that there is a change or if there
            // is a new ref we mark this as an update.
            if (updatePayload) {
              markUpdate(workInProgress);
            }
            if (current.ref !== workInProgress.ref) {
              markRef(workInProgress);
            }
          } else {
            if (!newProps) {
              !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // This can happen when we abort work.
              return null;
            }

            var _currentHostContext = getHostContext();
            // TODO: Move createInstance to beginWork and keep it on a context
            // "stack" as the parent. Then append children as we go in beginWork
            // or completeWork depending on we want to add then top->down or
            // bottom->up. Top->down is faster in IE11.
            var wasHydrated = popHydrationState(workInProgress);
            if (wasHydrated) {
              // TOOD: Move this and createInstance step into the beginPhase
              // to consolidate.
              if (prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext)) {
                // If changes to the hydrated node needs to be applied at the
                // commit-phase we mark this as such.
                markUpdate(workInProgress);
              }
            } else {
              var _instance = createInstance(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);

              appendAllChildren(_instance, workInProgress);

              // Certain renderers require commit-time effects for initial mount.
              // (eg DOM renderer supports auto-focus for certain elements).
              // Make sure such renderers get scheduled for later work.
              if (finalizeInitialChildren(_instance, type, newProps, rootContainerInstance)) {
                markUpdate(workInProgress);
              }
              workInProgress.stateNode = _instance;
            }

            if (workInProgress.ref !== null) {
              // If there is a ref on a host node we need to schedule a callback
              markRef(workInProgress);
            }
          }
          return null;
        }
      case HostText$6:
        {
          var newText = newProps;
          if (current && workInProgress.stateNode != null) {
            var oldText = current.memoizedProps;
            // If we have an alternate, that means this is an update and we need
            // to schedule a side-effect to do the updates.
            if (oldText !== newText) {
              markUpdate(workInProgress);
            }
          } else {
            if (typeof newText !== 'string') {
              !(workInProgress.stateNode !== null) ? invariant(false, 'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // This can happen when we abort work.
              return null;
            }
            var _rootContainerInstance = getRootHostContainer();
            var _currentHostContext2 = getHostContext();
            var _wasHydrated = popHydrationState(workInProgress);
            if (_wasHydrated) {
              if (prepareToHydrateHostTextInstance(workInProgress)) {
                markUpdate(workInProgress);
              }
            } else {
              workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
            }
          }
          return null;
        }
      case CoroutineComponent$3:
        return moveCoroutineToHandlerPhase(current, workInProgress);
      case CoroutineHandlerPhase$1:
        // Reset the tag to now be a first phase coroutine.
        workInProgress.tag = CoroutineComponent$3;
        return null;
      case YieldComponent$4:
        // Does nothing.
        return null;
      case Fragment$5:
        return null;
      case HostPortal$6:
        // TODO: Only mark this as an update if we have any pending callbacks.
        markUpdate(workInProgress);
        popHostContainer(workInProgress);
        return null;
      // Error cases
      case IndeterminateComponent$3:
        invariant(false, 'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');
      // eslint-disable-next-line no-fallthrough
      default:
        invariant(false, 'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  return {
    completeWork: completeWork
  };
};

{
  var warning$9 = require$$0;
}

var onCommitFiberRoot = null;
var onCommitFiberUnmount = null;
var hasLoggedError = false;

function catchErrors(fn) {
  return function (arg) {
    try {
      return fn(arg);
    } catch (err) {
      if (true && !hasLoggedError) {
        hasLoggedError = true;
        warning$9(false, 'React DevTools encountered an error: %s', err);
      }
    }
  };
}

function injectInternals(internals) {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
    // No DevTools
    return false;
  }
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook.supportsFiber) {
    {
      warning$9(false, 'The installed version of React DevTools is too old and will not work ' + 'with the current version of React. Please update React DevTools. ' + 'https://fb.me/react-devtools');
    }
    // DevTools exists, even though it doesn't support Fiber.
    return true;
  }
  try {
    var rendererID = hook.inject(internals);
    // We have successfully injected, so now it is safe to set up hooks.
    onCommitFiberRoot = catchErrors(function (root) {
      return hook.onCommitFiberRoot(rendererID, root);
    });
    onCommitFiberUnmount = catchErrors(function (fiber) {
      return hook.onCommitFiberUnmount(rendererID, fiber);
    });
  } catch (err) {
    // Catch all errors because it is unsafe to throw during initialization.
    {
      warning$9(false, 'React DevTools encountered an error: %s.', err);
    }
  }
  // DevTools exists
  return true;
}

function onCommitRoot$1(root) {
  if (typeof onCommitFiberRoot === 'function') {
    onCommitFiberRoot(root);
  }
}

function onCommitUnmount$1(fiber) {
  if (typeof onCommitFiberUnmount === 'function') {
    onCommitFiberUnmount(fiber);
  }
}

var injectInternals_1 = injectInternals;
var onCommitRoot_1 = onCommitRoot$1;
var onCommitUnmount_1 = onCommitUnmount$1;

var ReactFiberDevToolsHook = {
	injectInternals: injectInternals_1,
	onCommitRoot: onCommitRoot_1,
	onCommitUnmount: onCommitUnmount_1
};

var ClassComponent$10 = ReactTypeOfWork.ClassComponent;
var HostRoot$9 = ReactTypeOfWork.HostRoot;
var HostComponent$9 = ReactTypeOfWork.HostComponent;
var HostText$7 = ReactTypeOfWork.HostText;
var HostPortal$7 = ReactTypeOfWork.HostPortal;
var CoroutineComponent$4 = ReactTypeOfWork.CoroutineComponent;

var commitCallbacks$1 = ReactFiberUpdateQueue.commitCallbacks;

var onCommitUnmount = ReactFiberDevToolsHook.onCommitUnmount;

var invokeGuardedCallback$2 = ReactErrorUtils_1.invokeGuardedCallback;
var hasCaughtError$1 = ReactErrorUtils_1.hasCaughtError;
var clearCaughtError$1 = ReactErrorUtils_1.clearCaughtError;

var Placement$5 = ReactTypeOfSideEffect.Placement;
var Update$3 = ReactTypeOfSideEffect.Update;
var Callback$1 = ReactTypeOfSideEffect.Callback;
var ContentReset$2 = ReactTypeOfSideEffect.ContentReset;



{
  var _require5$1 = ReactDebugFiberPerf_1,
      startPhaseTimer$2 = _require5$1.startPhaseTimer,
      stopPhaseTimer$2 = _require5$1.stopPhaseTimer;
}

var ReactFiberCommitWork = function (config, captureError) {
  var commitMount = config.commitMount,
      commitUpdate = config.commitUpdate,
      resetTextContent = config.resetTextContent,
      commitTextUpdate = config.commitTextUpdate,
      appendChild = config.appendChild,
      appendChildToContainer = config.appendChildToContainer,
      insertBefore = config.insertBefore,
      insertInContainerBefore = config.insertInContainerBefore,
      removeChild = config.removeChild,
      removeChildFromContainer = config.removeChildFromContainer,
      getPublicInstance = config.getPublicInstance;


  {
    var callComponentWillUnmountWithTimerInDev = function (current, instance) {
      startPhaseTimer$2(current, 'componentWillUnmount');
      instance.props = current.memoizedProps;
      instance.state = current.memoizedState;
      instance.componentWillUnmount();
      stopPhaseTimer$2();
    };
  }

  // Capture errors so they don't interrupt unmounting.
  function safelyCallComponentWillUnmount(current, instance) {
    {
      invokeGuardedCallback$2(null, callComponentWillUnmountWithTimerInDev, null, current, instance);
      if (hasCaughtError$1()) {
        var unmountError = clearCaughtError$1();
        captureError(current, unmountError);
      }
    }
  }

  function safelyDetachRef(current) {
    var ref = current.ref;
    if (ref !== null) {
      {
        invokeGuardedCallback$2(null, ref, null, null);
        if (hasCaughtError$1()) {
          var refError = clearCaughtError$1();
          captureError(current, refError);
        }
      }
    }
  }

  function getHostParentFiber(fiber) {
    var parent = fiber['return'];
    while (parent !== null) {
      if (isHostParent(parent)) {
        return parent;
      }
      parent = parent['return'];
    }
    invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');
  }

  function isHostParent(fiber) {
    return fiber.tag === HostComponent$9 || fiber.tag === HostRoot$9 || fiber.tag === HostPortal$7;
  }

  function getHostSibling(fiber) {
    // We're going to search forward into the tree until we find a sibling host
    // node. Unfortunately, if multiple insertions are done in a row we have to
    // search past them. This leads to exponential search for the next sibling.
    var node = fiber;
    siblings: while (true) {
      // If we didn't find anything, let's try the next sibling.
      while (node.sibling === null) {
        if (node['return'] === null || isHostParent(node['return'])) {
          // If we pop out of the root or hit the parent the fiber we are the
          // last sibling.
          return null;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
      while (node.tag !== HostComponent$9 && node.tag !== HostText$7) {
        // If it is not host node and, we might have a host node inside it.
        // Try to search down until we find one.
        if (node.effectTag & Placement$5) {
          // If we don't have a child, try the siblings instead.
          continue siblings;
        }
        // If we don't have a child, try the siblings instead.
        // We also skip portals because they are not part of this host tree.
        if (node.child === null || node.tag === HostPortal$7) {
          continue siblings;
        } else {
          node.child['return'] = node;
          node = node.child;
        }
      }
      // Check if this host node is stable or about to be placed.
      if (!(node.effectTag & Placement$5)) {
        // Found it!
        return node.stateNode;
      }
    }
  }

  function commitPlacement(finishedWork) {
    // Recursively insert all host nodes into the parent.
    var parentFiber = getHostParentFiber(finishedWork);
    var parent = void 0;
    var isContainer = void 0;
    switch (parentFiber.tag) {
      case HostComponent$9:
        parent = parentFiber.stateNode;
        isContainer = false;
        break;
      case HostRoot$9:
        parent = parentFiber.stateNode.containerInfo;
        isContainer = true;
        break;
      case HostPortal$7:
        parent = parentFiber.stateNode.containerInfo;
        isContainer = true;
        break;
      default:
        invariant(false, 'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');
    }
    if (parentFiber.effectTag & ContentReset$2) {
      // Reset the text content of the parent before doing any insertions
      resetTextContent(parent);
      // Clear ContentReset from the effect tag
      parentFiber.effectTag &= ~ContentReset$2;
    }

    var before = getHostSibling(finishedWork);
    // We only have the top Fiber that was inserted but we need recurse down its
    // children to find all the terminal nodes.
    var node = finishedWork;
    while (true) {
      if (node.tag === HostComponent$9 || node.tag === HostText$7) {
        if (before) {
          if (isContainer) {
            insertInContainerBefore(parent, node.stateNode, before);
          } else {
            insertBefore(parent, node.stateNode, before);
          }
        } else {
          if (isContainer) {
            appendChildToContainer(parent, node.stateNode);
          } else {
            appendChild(parent, node.stateNode);
          }
        }
      } else if (node.tag === HostPortal$7) {
        // If the insertion itself is a portal, then we don't want to traverse
        // down its children. Instead, we'll get insertions from each child in
        // the portal directly.
      } else if (node.child !== null) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === finishedWork) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === finishedWork) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function commitNestedUnmounts(root) {
    // While we're inside a removed host node we don't want to call
    // removeChild on the inner nodes because they're removed by the top
    // call anyway. We also want to call componentWillUnmount on all
    // composites before this host node is removed from the tree. Therefore
    var node = root;
    while (true) {
      commitUnmount(node);
      // Visit children because they may contain more composite or host nodes.
      // Skip portals because commitUnmount() currently visits them recursively.
      if (node.child !== null && node.tag !== HostPortal$7) {
        node.child['return'] = node;
        node = node.child;
        continue;
      }
      if (node === root) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === root) {
          return;
        }
        node = node['return'];
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function unmountHostComponents(current) {
    // We only have the top Fiber that was inserted but we need recurse down its
    var node = current;

    // Each iteration, currentParent is populated with node's host parent if not
    // currentParentIsValid.
    var currentParentIsValid = false;
    var currentParent = void 0;
    var currentParentIsContainer = void 0;

    while (true) {
      if (!currentParentIsValid) {
        var parent = node['return'];
        findParent: while (true) {
          !(parent !== null) ? invariant(false, 'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          switch (parent.tag) {
            case HostComponent$9:
              currentParent = parent.stateNode;
              currentParentIsContainer = false;
              break findParent;
            case HostRoot$9:
              currentParent = parent.stateNode.containerInfo;
              currentParentIsContainer = true;
              break findParent;
            case HostPortal$7:
              currentParent = parent.stateNode.containerInfo;
              currentParentIsContainer = true;
              break findParent;
          }
          parent = parent['return'];
        }
        currentParentIsValid = true;
      }

      if (node.tag === HostComponent$9 || node.tag === HostText$7) {
        commitNestedUnmounts(node);
        // After all the children have unmounted, it is now safe to remove the
        // node from the tree.
        if (currentParentIsContainer) {
          removeChildFromContainer(currentParent, node.stateNode);
        } else {
          removeChild(currentParent, node.stateNode);
        }
        // Don't visit children because we already visited them.
      } else if (node.tag === HostPortal$7) {
        // When we go into a portal, it becomes the parent to remove from.
        // We will reassign it back when we pop the portal on the way up.
        currentParent = node.stateNode.containerInfo;
        // Visit children because portals might contain host components.
        if (node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
      } else {
        commitUnmount(node);
        // Visit children because we may find more host components below.
        if (node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
      }
      if (node === current) {
        return;
      }
      while (node.sibling === null) {
        if (node['return'] === null || node['return'] === current) {
          return;
        }
        node = node['return'];
        if (node.tag === HostPortal$7) {
          // When we go out of the portal, we need to restore the parent.
          // Since we don't keep a stack of them, we will search for it.
          currentParentIsValid = false;
        }
      }
      node.sibling['return'] = node['return'];
      node = node.sibling;
    }
  }

  function commitDeletion(current) {
    // Recursively delete all host nodes from the parent.
    // Detach refs and call componentWillUnmount() on the whole subtree.
    unmountHostComponents(current);

    // Cut off the return pointers to disconnect it from the tree. Ideally, we
    // should clear the child pointer of the parent alternate to let this
    // get GC:ed but we don't know which for sure which parent is the current
    // one so we'll settle for GC:ing the subtree of this child. This child
    // itself will be GC:ed when the parent updates the next time.
    current['return'] = null;
    current.child = null;
    if (current.alternate) {
      current.alternate.child = null;
      current.alternate['return'] = null;
    }
  }

  // User-originating errors (lifecycles and refs) should not interrupt
  // deletion, so don't let them throw. Host-originating errors should
  // interrupt deletion, so it's okay
  function commitUnmount(current) {
    if (typeof onCommitUnmount === 'function') {
      onCommitUnmount(current);
    }

    switch (current.tag) {
      case ClassComponent$10:
        {
          safelyDetachRef(current);
          var instance = current.stateNode;
          if (typeof instance.componentWillUnmount === 'function') {
            safelyCallComponentWillUnmount(current, instance);
          }
          return;
        }
      case HostComponent$9:
        {
          safelyDetachRef(current);
          return;
        }
      case CoroutineComponent$4:
        {
          commitNestedUnmounts(current.stateNode);
          return;
        }
      case HostPortal$7:
        {
          // TODO: this is recursive.
          // We are also not using this parent because
          // the portal will get pushed immediately.
          unmountHostComponents(current);
          return;
        }
    }
  }

  function commitWork(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent$10:
        {
          return;
        }
      case HostComponent$9:
        {
          var instance = finishedWork.stateNode;
          if (instance != null) {
            // Commit the work prepared earlier.
            var newProps = finishedWork.memoizedProps;
            // For hydration we reuse the update path but we treat the oldProps
            // as the newProps. The updatePayload will contain the real change in
            // this case.
            var oldProps = current !== null ? current.memoizedProps : newProps;
            var type = finishedWork.type;
            // TODO: Type the updateQueue to be specific to host components.
            var updatePayload = finishedWork.updateQueue;
            finishedWork.updateQueue = null;
            if (updatePayload !== null) {
              commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
            }
          }
          return;
        }
      case HostText$7:
        {
          !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          var textInstance = finishedWork.stateNode;
          var newText = finishedWork.memoizedProps;
          // For hydration we reuse the update path but we treat the oldProps
          // as the newProps. The updatePayload will contain the real change in
          // this case.
          var oldText = current !== null ? current.memoizedProps : newText;
          commitTextUpdate(textInstance, oldText, newText);
          return;
        }
      case HostRoot$9:
        {
          return;
        }
      case HostPortal$7:
        {
          return;
        }
      default:
        {
          invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
        }
    }
  }

  function commitLifeCycles(current, finishedWork) {
    switch (finishedWork.tag) {
      case ClassComponent$10:
        {
          var instance = finishedWork.stateNode;
          if (finishedWork.effectTag & Update$3) {
            if (current === null) {
              {
                startPhaseTimer$2(finishedWork, 'componentDidMount');
              }
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              instance.componentDidMount();
              {
                stopPhaseTimer$2();
              }
            } else {
              var prevProps = current.memoizedProps;
              var prevState = current.memoizedState;
              {
                startPhaseTimer$2(finishedWork, 'componentDidUpdate');
              }
              instance.props = finishedWork.memoizedProps;
              instance.state = finishedWork.memoizedState;
              instance.componentDidUpdate(prevProps, prevState);
              {
                stopPhaseTimer$2();
              }
            }
          }
          if (finishedWork.effectTag & Callback$1 && finishedWork.updateQueue !== null) {
            commitCallbacks$1(finishedWork, finishedWork.updateQueue, instance);
          }
          return;
        }
      case HostRoot$9:
        {
          var updateQueue = finishedWork.updateQueue;
          if (updateQueue !== null) {
            var _instance = finishedWork.child && finishedWork.child.stateNode;
            commitCallbacks$1(finishedWork, updateQueue, _instance);
          }
          return;
        }
      case HostComponent$9:
        {
          var _instance2 = finishedWork.stateNode;

          // Renderers may schedule work to be done after host components are mounted
          // (eg DOM renderer may schedule auto-focus for inputs and form controls).
          // These effects should only be committed when components are first mounted,
          // aka when there is no current/alternate.
          if (current === null && finishedWork.effectTag & Update$3) {
            var type = finishedWork.type;
            var props = finishedWork.memoizedProps;
            commitMount(_instance2, type, props, finishedWork);
          }

          return;
        }
      case HostText$7:
        {
          // We have no life-cycles associated with text.
          return;
        }
      case HostPortal$7:
        {
          // We have no life-cycles associated with portals.
          return;
        }
      default:
        {
          invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
        }
    }
  }

  function commitAttachRef(finishedWork) {
    var ref = finishedWork.ref;
    if (ref !== null) {
      var instance = finishedWork.stateNode;
      switch (finishedWork.tag) {
        case HostComponent$9:
          ref(getPublicInstance(instance));
          break;
        default:
          ref(instance);
      }
    }
  }

  function commitDetachRef(current) {
    var currentRef = current.ref;
    if (currentRef !== null) {
      currentRef(null);
    }
  }

  return {
    commitPlacement: commitPlacement,
    commitDeletion: commitDeletion,
    commitWork: commitWork,
    commitLifeCycles: commitLifeCycles,
    commitAttachRef: commitAttachRef,
    commitDetachRef: commitDetachRef
  };
};

var createCursor$2 = ReactFiberStack.createCursor;
var pop$2 = ReactFiberStack.pop;
var push$2 = ReactFiberStack.push;



var NO_CONTEXT = {};

var ReactFiberHostContext = function (config) {
  var getChildHostContext = config.getChildHostContext,
      getRootHostContext = config.getRootHostContext;


  var contextStackCursor = createCursor$2(NO_CONTEXT);
  var contextFiberStackCursor = createCursor$2(NO_CONTEXT);
  var rootInstanceStackCursor = createCursor$2(NO_CONTEXT);

  function requiredContext(c) {
    !(c !== NO_CONTEXT) ? invariant(false, 'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    return c;
  }

  function getRootHostContainer() {
    var rootInstance = requiredContext(rootInstanceStackCursor.current);
    return rootInstance;
  }

  function pushHostContainer(fiber, nextRootInstance) {
    // Push current root instance onto the stack;
    // This allows us to reset root when portals are popped.
    push$2(rootInstanceStackCursor, nextRootInstance, fiber);

    var nextRootContext = getRootHostContext(nextRootInstance);

    // Track the context and the Fiber that provided it.
    // This enables us to pop only Fibers that provide unique contexts.
    push$2(contextFiberStackCursor, fiber, fiber);
    push$2(contextStackCursor, nextRootContext, fiber);
  }

  function popHostContainer(fiber) {
    pop$2(contextStackCursor, fiber);
    pop$2(contextFiberStackCursor, fiber);
    pop$2(rootInstanceStackCursor, fiber);
  }

  function getHostContext() {
    var context = requiredContext(contextStackCursor.current);
    return context;
  }

  function pushHostContext(fiber) {
    var rootInstance = requiredContext(rootInstanceStackCursor.current);
    var context = requiredContext(contextStackCursor.current);
    var nextContext = getChildHostContext(context, fiber.type, rootInstance);

    // Don't push this Fiber's context unless it's unique.
    if (context === nextContext) {
      return;
    }

    // Track the context and the Fiber that provided it.
    // This enables us to pop only Fibers that provide unique contexts.
    push$2(contextFiberStackCursor, fiber, fiber);
    push$2(contextStackCursor, nextContext, fiber);
  }

  function popHostContext(fiber) {
    // Do not pop unless this Fiber provided the current context.
    // pushHostContext() only pushes Fibers that provide unique contexts.
    if (contextFiberStackCursor.current !== fiber) {
      return;
    }

    pop$2(contextStackCursor, fiber);
    pop$2(contextFiberStackCursor, fiber);
  }

  function resetHostContainer() {
    contextStackCursor.current = NO_CONTEXT;
    rootInstanceStackCursor.current = NO_CONTEXT;
  }

  return {
    getHostContext: getHostContext,
    getRootHostContainer: getRootHostContainer,
    popHostContainer: popHostContainer,
    popHostContext: popHostContext,
    pushHostContainer: pushHostContainer,
    pushHostContext: pushHostContext,
    resetHostContainer: resetHostContainer
  };
};

var HostComponent$10 = ReactTypeOfWork.HostComponent;
var HostText$8 = ReactTypeOfWork.HostText;
var HostRoot$10 = ReactTypeOfWork.HostRoot;

var Deletion$2 = ReactTypeOfSideEffect.Deletion;
var Placement$6 = ReactTypeOfSideEffect.Placement;

var createFiberFromHostInstanceForDeletion$1 = ReactFiber.createFiberFromHostInstanceForDeletion;

var ReactFiberHydrationContext = function (config) {
  var shouldSetTextContent = config.shouldSetTextContent,
      canHydrateInstance = config.canHydrateInstance,
      canHydrateTextInstance = config.canHydrateTextInstance,
      getNextHydratableSibling = config.getNextHydratableSibling,
      getFirstHydratableChild = config.getFirstHydratableChild,
      hydrateInstance = config.hydrateInstance,
      hydrateTextInstance = config.hydrateTextInstance,
      didNotHydrateInstance = config.didNotHydrateInstance,
      didNotFindHydratableInstance = config.didNotFindHydratableInstance,
      didNotFindHydratableTextInstance = config.didNotFindHydratableTextInstance;

  // If this doesn't have hydration mode.

  if (!(canHydrateInstance && canHydrateTextInstance && getNextHydratableSibling && getFirstHydratableChild && hydrateInstance && hydrateTextInstance && didNotHydrateInstance && didNotFindHydratableInstance && didNotFindHydratableTextInstance)) {
    return {
      enterHydrationState: function () {
        return false;
      },
      resetHydrationState: function () {},
      tryToClaimNextHydratableInstance: function () {},
      prepareToHydrateHostInstance: function () {
        invariant(false, 'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      },
      prepareToHydrateHostTextInstance: function () {
        invariant(false, 'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');
      },
      popHydrationState: function (fiber) {
        return false;
      }
    };
  }

  // The deepest Fiber on the stack involved in a hydration context.
  // This may have been an insertion or a hydration.
  var hydrationParentFiber = null;
  var nextHydratableInstance = null;
  var isHydrating = false;

  function enterHydrationState(fiber) {
    var parentInstance = fiber.stateNode.containerInfo;
    nextHydratableInstance = getFirstHydratableChild(parentInstance);
    hydrationParentFiber = fiber;
    isHydrating = true;
    return true;
  }

  function deleteHydratableInstance(returnFiber, instance) {
    {
      switch (returnFiber.tag) {
        case HostRoot$10:
          didNotHydrateInstance(returnFiber.stateNode.containerInfo, instance);
          break;
        case HostComponent$10:
          didNotHydrateInstance(returnFiber.stateNode, instance);
          break;
      }
    }

    var childToDelete = createFiberFromHostInstanceForDeletion$1();
    childToDelete.stateNode = instance;
    childToDelete['return'] = returnFiber;
    childToDelete.effectTag = Deletion$2;

    // This might seem like it belongs on progressedFirstDeletion. However,
    // these children are not part of the reconciliation list of children.
    // Even if we abort and rereconcile the children, that will try to hydrate
    // again and the nodes are still in the host tree so these will be
    // recreated.
    if (returnFiber.lastEffect !== null) {
      returnFiber.lastEffect.nextEffect = childToDelete;
      returnFiber.lastEffect = childToDelete;
    } else {
      returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
    }
  }

  function insertNonHydratedInstance(returnFiber, fiber) {
    fiber.effectTag |= Placement$6;
    {
      var parentInstance;
      switch (returnFiber.tag) {
        // TODO: Currently we don't warn for insertions into the root because
        // we always insert into the root in the non-hydrating case. We just
        // delete the existing content. Reenable this once we have a better
        // strategy for determining if we're hydrating or not.
        // case HostRoot:
        //   parentInstance = returnFiber.stateNode.containerInfo;
        //   break;
        case HostComponent$10:
          parentInstance = returnFiber.stateNode;
          break;
        default:
          return;
      }
      switch (fiber.tag) {
        case HostComponent$10:
          var type = fiber.type;
          var props = fiber.pendingProps;
          didNotFindHydratableInstance(parentInstance, type, props);
          break;
        case HostText$8:
          var text = fiber.pendingProps;
          didNotFindHydratableTextInstance(parentInstance, text);
          break;
      }
    }
  }

  function canHydrate(fiber, nextInstance) {
    switch (fiber.tag) {
      case HostComponent$10:
        {
          var type = fiber.type;
          var props = fiber.pendingProps;
          return canHydrateInstance(nextInstance, type, props);
        }
      case HostText$8:
        {
          var text = fiber.pendingProps;
          return canHydrateTextInstance(nextInstance, text);
        }
      default:
        return false;
    }
  }

  function tryToClaimNextHydratableInstance(fiber) {
    if (!isHydrating) {
      return;
    }
    var nextInstance = nextHydratableInstance;
    if (!nextInstance) {
      // Nothing to hydrate. Make it an insertion.
      insertNonHydratedInstance(hydrationParentFiber, fiber);
      isHydrating = false;
      hydrationParentFiber = fiber;
      return;
    }
    if (!canHydrate(fiber, nextInstance)) {
      // If we can't hydrate this instance let's try the next one.
      // We use this as a heuristic. It's based on intuition and not data so it
      // might be flawed or unnecessary.
      nextInstance = getNextHydratableSibling(nextInstance);
      if (!nextInstance || !canHydrate(fiber, nextInstance)) {
        // Nothing to hydrate. Make it an insertion.
        insertNonHydratedInstance(hydrationParentFiber, fiber);
        isHydrating = false;
        hydrationParentFiber = fiber;
        return;
      }
      // We matched the next one, we'll now assume that the first one was
      // superfluous and we'll delete it. Since we can't eagerly delete it
      // we'll have to schedule a deletion. To do that, this node needs a dummy
      // fiber associated with it.
      deleteHydratableInstance(hydrationParentFiber, nextHydratableInstance);
    }
    fiber.stateNode = nextInstance;
    hydrationParentFiber = fiber;
    nextHydratableInstance = getFirstHydratableChild(nextInstance);
  }

  function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
    var instance = fiber.stateNode;
    var updatePayload = hydrateInstance(instance, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
    // TODO: Type this specific to this type of component.
    fiber.updateQueue = updatePayload;
    // If the update payload indicates that there is a change or if there
    // is a new ref we mark this as an update.
    if (updatePayload !== null) {
      return true;
    }
    return false;
  }

  function prepareToHydrateHostTextInstance(fiber) {
    var textInstance = fiber.stateNode;
    var shouldUpdate = hydrateTextInstance(textInstance, fiber.memoizedProps, fiber);
    return shouldUpdate;
  }

  function popToNextHostParent(fiber) {
    var parent = fiber['return'];
    while (parent !== null && parent.tag !== HostComponent$10 && parent.tag !== HostRoot$10) {
      parent = parent['return'];
    }
    hydrationParentFiber = parent;
  }

  function popHydrationState(fiber) {
    if (fiber !== hydrationParentFiber) {
      // We're deeper than the current hydration context, inside an inserted
      // tree.
      return false;
    }
    if (!isHydrating) {
      // If we're not currently hydrating but we're in a hydration context, then
      // we were an insertion and now need to pop up reenter hydration of our
      // siblings.
      popToNextHostParent(fiber);
      isHydrating = true;
      return false;
    }

    var type = fiber.type;

    // If we have any remaining hydratable nodes, we need to delete them now.
    // We only do this deeper than head and body since they tend to have random
    // other nodes in them. We also ignore components with pure text content in
    // side of them.
    // TODO: Better heuristic.
    if (fiber.tag !== HostComponent$10 || type !== 'head' && type !== 'body' && !shouldSetTextContent(type, fiber.memoizedProps)) {
      var nextInstance = nextHydratableInstance;
      while (nextInstance) {
        deleteHydratableInstance(fiber, nextInstance);
        nextInstance = getNextHydratableSibling(nextInstance);
      }
    }

    popToNextHostParent(fiber);
    nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
    return true;
  }

  function resetHydrationState() {
    hydrationParentFiber = null;
    nextHydratableInstance = null;
    isHydrating = false;
  }

  return {
    enterHydrationState: enterHydrationState,
    resetHydrationState: resetHydrationState,
    tryToClaimNextHydratableInstance: tryToClaimNextHydratableInstance,
    prepareToHydrateHostInstance: prepareToHydrateHostInstance,
    prepareToHydrateHostTextInstance: prepareToHydrateHostTextInstance,
    popHydrationState: popHydrationState
  };
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactFiberInstrumentation
 * 
 */

// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.

var ReactFiberInstrumentation$2 = {
  debugTool: null
};

var ReactFiberInstrumentation_1 = ReactFiberInstrumentation$2;

var popContextProvider$1 = ReactFiberContext.popContextProvider;

var reset$1 = ReactFiberStack.reset;

var getStackAddendumByWorkInProgressFiber$2 = ReactFiberComponentTreeHook.getStackAddendumByWorkInProgressFiber;

var logCapturedError = ReactFiberErrorLogger.logCapturedError;

var invokeGuardedCallback = ReactErrorUtils_1.invokeGuardedCallback;
var hasCaughtError = ReactErrorUtils_1.hasCaughtError;
var clearCaughtError = ReactErrorUtils_1.clearCaughtError;







var ReactCurrentOwner$1 = ReactGlobalSharedState_1.ReactCurrentOwner;



var createWorkInProgress$1 = ReactFiber.createWorkInProgress;
var largerPriority$1 = ReactFiber.largerPriority;

var onCommitRoot = ReactFiberDevToolsHook.onCommitRoot;

var NoWork$2 = ReactPriorityLevel.NoWork;
var SynchronousPriority$1 = ReactPriorityLevel.SynchronousPriority;
var TaskPriority$1 = ReactPriorityLevel.TaskPriority;
var HighPriority = ReactPriorityLevel.HighPriority;
var LowPriority = ReactPriorityLevel.LowPriority;
var OffscreenPriority = ReactPriorityLevel.OffscreenPriority;

var AsyncUpdates = ReactTypeOfInternalContext.AsyncUpdates;

var PerformedWork = ReactTypeOfSideEffect.PerformedWork;
var Placement$1 = ReactTypeOfSideEffect.Placement;
var Update = ReactTypeOfSideEffect.Update;
var PlacementAndUpdate = ReactTypeOfSideEffect.PlacementAndUpdate;
var Deletion = ReactTypeOfSideEffect.Deletion;
var ContentReset = ReactTypeOfSideEffect.ContentReset;
var Callback = ReactTypeOfSideEffect.Callback;
var Err = ReactTypeOfSideEffect.Err;
var Ref = ReactTypeOfSideEffect.Ref;

var HostRoot$6 = ReactTypeOfWork.HostRoot;
var HostComponent$6 = ReactTypeOfWork.HostComponent;
var HostPortal$3 = ReactTypeOfWork.HostPortal;
var ClassComponent$6 = ReactTypeOfWork.ClassComponent;

var getUpdatePriority$1 = ReactFiberUpdateQueue.getUpdatePriority;

var _require14 = ReactFiberContext;
var resetContext$1 = _require14.resetContext;



{
  var warning$5 = require$$0;
  var ReactFiberInstrumentation$1 = ReactFiberInstrumentation_1;
  var ReactDebugCurrentFiber$3 = ReactDebugCurrentFiber_1;

  var _require15 = ReactDebugFiberPerf_1,
      recordEffect = _require15.recordEffect,
      recordScheduleUpdate = _require15.recordScheduleUpdate,
      startWorkTimer = _require15.startWorkTimer,
      stopWorkTimer = _require15.stopWorkTimer,
      stopFailedWorkTimer = _require15.stopFailedWorkTimer,
      startWorkLoopTimer = _require15.startWorkLoopTimer,
      stopWorkLoopTimer = _require15.stopWorkLoopTimer,
      startCommitTimer = _require15.startCommitTimer,
      stopCommitTimer = _require15.stopCommitTimer,
      startCommitHostEffectsTimer = _require15.startCommitHostEffectsTimer,
      stopCommitHostEffectsTimer = _require15.stopCommitHostEffectsTimer,
      startCommitLifeCyclesTimer = _require15.startCommitLifeCyclesTimer,
      stopCommitLifeCyclesTimer = _require15.stopCommitLifeCyclesTimer;

  var warnAboutUpdateOnUnmounted = function (instance) {
    var ctor = instance.constructor;
    warning$5(false, 'Can only update a mounted or mounting component. This usually means ' + 'you called setState, replaceState, or forceUpdate on an unmounted ' + 'component. This is a no-op.\n\nPlease check the code for the ' + '%s component.', ctor && (ctor.displayName || ctor.name) || 'ReactClass');
  };

  var warnAboutInvalidUpdates = function (instance) {
    switch (ReactDebugCurrentFiber$3.phase) {
      case 'getChildContext':
        warning$5(false, 'setState(...): Cannot call setState() inside getChildContext()');
        break;
      case 'render':
        warning$5(false, 'Cannot update during an existing state transition (such as within ' + "`render` or another component's constructor). Render methods should " + 'be a pure function of props and state; constructor side-effects are ' + 'an anti-pattern, but can be moved to `componentWillMount`.');
        break;
    }
  };
}

var timeHeuristicForUnitOfWork = 1;

var ReactFiberScheduler = function (config) {
  var hostContext = ReactFiberHostContext(config);
  var hydrationContext = ReactFiberHydrationContext(config);
  var popHostContainer = hostContext.popHostContainer,
      popHostContext = hostContext.popHostContext,
      resetHostContainer = hostContext.resetHostContainer;

  var _ReactFiberBeginWork = ReactFiberBeginWork(config, hostContext, hydrationContext, scheduleUpdate, getPriorityContext),
      beginWork = _ReactFiberBeginWork.beginWork,
      beginFailedWork = _ReactFiberBeginWork.beginFailedWork;

  var _ReactFiberCompleteWo = ReactFiberCompleteWork(config, hostContext, hydrationContext),
      completeWork = _ReactFiberCompleteWo.completeWork;

  var _ReactFiberCommitWork = ReactFiberCommitWork(config, captureError),
      commitPlacement = _ReactFiberCommitWork.commitPlacement,
      commitDeletion = _ReactFiberCommitWork.commitDeletion,
      commitWork = _ReactFiberCommitWork.commitWork,
      commitLifeCycles = _ReactFiberCommitWork.commitLifeCycles,
      commitAttachRef = _ReactFiberCommitWork.commitAttachRef,
      commitDetachRef = _ReactFiberCommitWork.commitDetachRef;

  var scheduleDeferredCallback = config.scheduleDeferredCallback,
      useSyncScheduling = config.useSyncScheduling,
      prepareForCommit = config.prepareForCommit,
      resetAfterCommit = config.resetAfterCommit;

  // The priority level to use when scheduling an update. We use NoWork to
  // represent the default priority.
  // TODO: Should we change this to an array instead of using the call stack?
  // Might be less confusing.

  var priorityContext = NoWork$2;

  // Keeps track of whether we're currently in a work loop.
  var isPerformingWork = false;

  // Keeps track of whether the current deadline has expired.
  var deadlineHasExpired = false;

  // Keeps track of whether we should should batch sync updates.
  var isBatchingUpdates = false;

  // This is needed for the weird case where the initial mount is synchronous
  // even inside batchedUpdates :(
  var isUnbatchingUpdates = false;

  // The next work in progress fiber that we're currently working on.
  var nextUnitOfWork = null;
  var nextPriorityLevel = NoWork$2;

  // The next fiber with an effect that we're currently committing.
  var nextEffect = null;

  var pendingCommit = null;

  // Linked list of roots with scheduled work on them.
  var nextScheduledRoot = null;
  var lastScheduledRoot = null;

  // Keep track of which host environment callbacks are scheduled.
  var isCallbackScheduled = false;

  // Keep track of which fibers have captured an error that need to be handled.
  // Work is removed from this collection after componentDidCatch is called.
  var capturedErrors = null;
  // Keep track of which fibers have failed during the current batch of work.
  // This is a different set than capturedErrors, because it is not reset until
  // the end of the batch. This is needed to propagate errors correctly if a
  // subtree fails more than once.
  var failedBoundaries = null;
  // Error boundaries that captured an error during the current commit.
  var commitPhaseBoundaries = null;
  var firstUncaughtError = null;
  var didFatal = false;

  var isCommitting = false;
  var isUnmounting = false;

  // Use these to prevent an infinite loop of nested updates
  var NESTED_UPDATE_LIMIT = 1000;
  var nestedUpdateCount = 0;
  var nextRenderedTree = null;

  function resetContextStack() {
    // Reset the stack
    reset$1();
    // Reset the cursors
    resetContext$1();
    resetHostContainer();
  }

  // resetNextUnitOfWork mutates the current priority context. It is reset after
  // after the workLoop exits, so never call resetNextUnitOfWork from outside
  // the work loop.
  function resetNextUnitOfWork() {
    // Clear out roots with no more work on them, or if they have uncaught errors
    while (nextScheduledRoot !== null && nextScheduledRoot.current.pendingWorkPriority === NoWork$2) {
      // Unschedule this root.
      nextScheduledRoot.isScheduled = false;
      // Read the next pointer now.
      // We need to clear it in case this root gets scheduled again later.
      var next = nextScheduledRoot.nextScheduledRoot;
      nextScheduledRoot.nextScheduledRoot = null;
      // Exit if we cleared all the roots and there's no work to do.
      if (nextScheduledRoot === lastScheduledRoot) {
        nextScheduledRoot = null;
        lastScheduledRoot = null;
        nextPriorityLevel = NoWork$2;
        return null;
      }
      // Continue with the next root.
      // If there's no work on it, it will get unscheduled too.
      nextScheduledRoot = next;
    }

    var root = nextScheduledRoot;
    var highestPriorityRoot = null;
    var highestPriorityLevel = NoWork$2;
    while (root !== null) {
      if (root.current.pendingWorkPriority !== NoWork$2 && (highestPriorityLevel === NoWork$2 || highestPriorityLevel > root.current.pendingWorkPriority)) {
        highestPriorityLevel = root.current.pendingWorkPriority;
        highestPriorityRoot = root;
      }
      // We didn't find anything to do in this root, so let's try the next one.
      root = root.nextScheduledRoot;
    }
    if (highestPriorityRoot !== null) {
      nextPriorityLevel = highestPriorityLevel;
      // Before we start any new work, let's make sure that we have a fresh
      // stack to work from.
      // TODO: This call is buried a bit too deep. It would be nice to have
      // a single point which happens right before any new work and
      // unfortunately this is it.
      resetContextStack();

      nextUnitOfWork = createWorkInProgress$1(highestPriorityRoot.current, highestPriorityLevel);
      if (highestPriorityRoot !== nextRenderedTree) {
        // We've switched trees. Reset the nested update counter.
        nestedUpdateCount = 0;
        nextRenderedTree = highestPriorityRoot;
      }
      return;
    }

    nextPriorityLevel = NoWork$2;
    nextUnitOfWork = null;
    nextRenderedTree = null;
    return;
  }

  function commitAllHostEffects() {
    while (nextEffect !== null) {
      {
        ReactDebugCurrentFiber$3.setCurrentFiber(nextEffect, null);
        recordEffect();
      }

      var effectTag = nextEffect.effectTag;
      if (effectTag & ContentReset) {
        config.resetTextContent(nextEffect.stateNode);
      }

      if (effectTag & Ref) {
        var current = nextEffect.alternate;
        if (current !== null) {
          commitDetachRef(current);
        }
      }

      // The following switch statement is only concerned about placement,
      // updates, and deletions. To avoid needing to add a case for every
      // possible bitmap value, we remove the secondary effects from the
      // effect tag and switch on that value.
      var primaryEffectTag = effectTag & ~(Callback | Err | ContentReset | Ref | PerformedWork);
      switch (primaryEffectTag) {
        case Placement$1:
          {
            commitPlacement(nextEffect);
            // Clear the "placement" from effect tag so that we know that this is inserted, before
            // any life-cycles like componentDidMount gets called.
            // TODO: findDOMNode doesn't rely on this any more but isMounted
            // does and isMounted is deprecated anyway so we should be able
            // to kill this.
            nextEffect.effectTag &= ~Placement$1;
            break;
          }
        case PlacementAndUpdate:
          {
            // Placement
            commitPlacement(nextEffect);
            // Clear the "placement" from effect tag so that we know that this is inserted, before
            // any life-cycles like componentDidMount gets called.
            nextEffect.effectTag &= ~Placement$1;

            // Update
            var _current = nextEffect.alternate;
            commitWork(_current, nextEffect);
            break;
          }
        case Update:
          {
            var _current2 = nextEffect.alternate;
            commitWork(_current2, nextEffect);
            break;
          }
        case Deletion:
          {
            isUnmounting = true;
            commitDeletion(nextEffect);
            isUnmounting = false;
            break;
          }
      }
      nextEffect = nextEffect.nextEffect;
    }

    {
      ReactDebugCurrentFiber$3.resetCurrentFiber();
    }
  }

  function commitAllLifeCycles() {
    while (nextEffect !== null) {
      var effectTag = nextEffect.effectTag;

      // Use Task priority for lifecycle updates
      if (effectTag & (Update | Callback)) {
        {
          recordEffect();
        }
        var current = nextEffect.alternate;
        commitLifeCycles(current, nextEffect);
      }

      if (effectTag & Ref) {
        {
          recordEffect();
        }
        commitAttachRef(nextEffect);
      }

      if (effectTag & Err) {
        {
          recordEffect();
        }
        commitErrorHandling(nextEffect);
      }

      var next = nextEffect.nextEffect;
      // Ensure that we clean these up so that we don't accidentally keep them.
      // I'm not actually sure this matters because we can't reset firstEffect
      // and lastEffect since they're on every node, not just the effectful
      // ones. So we have to clean everything as we reuse nodes anyway.
      nextEffect.nextEffect = null;
      // Ensure that we reset the effectTag here so that we can rely on effect
      // tags to reason about the current life-cycle.
      nextEffect = next;
    }
  }

  function commitAllWork(finishedWork) {
    // We keep track of this so that captureError can collect any boundaries
    // that capture an error during the commit phase. The reason these aren't
    // local to this function is because errors that occur during cWU are
    // captured elsewhere, to prevent the unmount from being interrupted.
    isCommitting = true;
    {
      startCommitTimer();
    }

    pendingCommit = null;
    var root = finishedWork.stateNode;
    !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    if (nextPriorityLevel === SynchronousPriority$1 || nextPriorityLevel === TaskPriority$1) {
      // Keep track of the number of iterations to prevent an infinite
      // update loop.
      nestedUpdateCount++;
    }

    // Reset this to null before calling lifecycles
    ReactCurrentOwner$1.current = null;

    var firstEffect = void 0;
    if (finishedWork.effectTag > PerformedWork) {
      // A fiber's effect list consists only of its children, not itself. So if
      // the root has an effect, we need to add it to the end of the list. The
      // resulting list is the set that would belong to the root's parent, if
      // it had one; that is, all the effects in the tree including the root.
      if (finishedWork.lastEffect !== null) {
        finishedWork.lastEffect.nextEffect = finishedWork;
        firstEffect = finishedWork.firstEffect;
      } else {
        firstEffect = finishedWork;
      }
    } else {
      // There is no effect on the root.
      firstEffect = finishedWork.firstEffect;
    }

    prepareForCommit();

    // Commit all the side-effects within a tree. We'll do this in two passes.
    // The first pass performs all the host insertions, updates, deletions and
    // ref unmounts.
    nextEffect = firstEffect;
    {
      startCommitHostEffectsTimer();
    }
    while (nextEffect !== null) {
      var didError = false;
      var _error = void 0;
      {
        invokeGuardedCallback(null, commitAllHostEffects, null);
        if (hasCaughtError()) {
          didError = true;
          _error = clearCaughtError();
        }
      }
      if (didError) {
        !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        captureError(nextEffect, _error);
        // Clean-up
        if (nextEffect !== null) {
          nextEffect = nextEffect.nextEffect;
        }
      }
    }
    {
      stopCommitHostEffectsTimer();
    }

    resetAfterCommit();

    // The work-in-progress tree is now the current tree. This must come after
    // the first pass of the commit phase, so that the previous tree is still
    // current during componentWillUnmount, but before the second pass, so that
    // the finished work is current during componentDidMount/Update.
    root.current = finishedWork;

    // In the second pass we'll perform all life-cycles and ref callbacks.
    // Life-cycles happen as a separate pass so that all placements, updates,
    // and deletions in the entire tree have already been invoked.
    // This pass also triggers any renderer-specific initial effects.
    nextEffect = firstEffect;
    {
      startCommitLifeCyclesTimer();
    }
    while (nextEffect !== null) {
      var _didError = false;
      var _error2 = void 0;
      {
        invokeGuardedCallback(null, commitAllLifeCycles, null);
        if (hasCaughtError()) {
          _didError = true;
          _error2 = clearCaughtError();
        }
      }
      if (_didError) {
        !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        captureError(nextEffect, _error2);
        if (nextEffect !== null) {
          nextEffect = nextEffect.nextEffect;
        }
      }
    }

    isCommitting = false;
    {
      stopCommitLifeCyclesTimer();
      stopCommitTimer();
    }
    if (typeof onCommitRoot === 'function') {
      onCommitRoot(finishedWork.stateNode);
    }
    if (true && ReactFiberInstrumentation$1.debugTool) {
      ReactFiberInstrumentation$1.debugTool.onCommitWork(finishedWork);
    }

    // If we caught any errors during this commit, schedule their boundaries
    // to update.
    if (commitPhaseBoundaries) {
      commitPhaseBoundaries.forEach(scheduleErrorRecovery);
      commitPhaseBoundaries = null;
    }

    // This tree is done. Reset the unit of work pointer to the next highest
    // priority root. If there's no more work left, the pointer is set to null.
    resetNextUnitOfWork();
  }

  function resetWorkPriority(workInProgress, renderPriority) {
    if (workInProgress.pendingWorkPriority !== NoWork$2 && workInProgress.pendingWorkPriority > renderPriority) {
      // This was a down-prioritization. Don't bubble priority from children.
      return;
    }

    // Check for pending update priority.
    var newPriority = getUpdatePriority$1(workInProgress);

    // TODO: Coroutines need to visit stateNode

    var child = workInProgress.child;
    while (child !== null) {
      // Ensure that remaining work priority bubbles up.
      newPriority = largerPriority$1(newPriority, child.pendingWorkPriority);
      child = child.sibling;
    }
    workInProgress.pendingWorkPriority = newPriority;
  }

  function completeUnitOfWork(workInProgress) {
    while (true) {
      // The current, flushed, state of this fiber is the alternate.
      // Ideally nothing should rely on this, but relying on it here
      // means that we don't need an additional field on the work in
      // progress.
      var current = workInProgress.alternate;
      var next = completeWork(current, workInProgress, nextPriorityLevel);

      var returnFiber = workInProgress['return'];
      var siblingFiber = workInProgress.sibling;

      resetWorkPriority(workInProgress, nextPriorityLevel);

      if (next !== null) {
        {
          stopWorkTimer(workInProgress);
        }
        if (true && ReactFiberInstrumentation$1.debugTool) {
          ReactFiberInstrumentation$1.debugTool.onCompleteWork(workInProgress);
        }
        // If completing this work spawned new work, do that next. We'll come
        // back here again.
        return next;
      }

      if (returnFiber !== null) {
        // Append all the effects of the subtree and this fiber onto the effect
        // list of the parent. The completion order of the children affects the
        // side-effect order.
        if (returnFiber.firstEffect === null) {
          returnFiber.firstEffect = workInProgress.firstEffect;
        }
        if (workInProgress.lastEffect !== null) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
          }
          returnFiber.lastEffect = workInProgress.lastEffect;
        }

        // If this fiber had side-effects, we append it AFTER the children's
        // side-effects. We can perform certain side-effects earlier if
        // needed, by doing multiple passes over the effect list. We don't want
        // to schedule our own side-effect on our own list because if end up
        // reusing children we'll schedule this effect onto itself since we're
        // at the end.
        var effectTag = workInProgress.effectTag;
        // Skip both NoWork and PerformedWork tags when creating the effect list.
        // PerformedWork effect is read by React DevTools but shouldn't be committed.
        if (effectTag > PerformedWork) {
          if (returnFiber.lastEffect !== null) {
            returnFiber.lastEffect.nextEffect = workInProgress;
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }
      }

      {
        stopWorkTimer(workInProgress);
      }
      if (true && ReactFiberInstrumentation$1.debugTool) {
        ReactFiberInstrumentation$1.debugTool.onCompleteWork(workInProgress);
      }

      if (siblingFiber !== null) {
        // If there is more work to do in this returnFiber, do that next.
        return siblingFiber;
      } else if (returnFiber !== null) {
        // If there's no more work in this returnFiber. Complete the returnFiber.
        workInProgress = returnFiber;
        continue;
      } else {
        // We've reached the root. Mark the root as pending commit. Depending
        // on how much time we have left, we'll either commit it now or in
        // the next frame.
        pendingCommit = workInProgress;
        return null;
      }
    }

    // Without this explicit null return Flow complains of invalid return type
    // TODO Remove the above while(true) loop
    // eslint-disable-next-line no-unreachable
    return null;
  }

  function performUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;

    // See if beginning this work spawns more work.
    {
      startWorkTimer(workInProgress);
    }
    var next = beginWork(current, workInProgress, nextPriorityLevel);
    if (true && ReactFiberInstrumentation$1.debugTool) {
      ReactFiberInstrumentation$1.debugTool.onBeginWork(workInProgress);
    }

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
      next = completeUnitOfWork(workInProgress);
    }

    ReactCurrentOwner$1.current = null;
    {
      ReactDebugCurrentFiber$3.resetCurrentFiber();
    }

    return next;
  }

  function performFailedUnitOfWork(workInProgress) {
    // The current, flushed, state of this fiber is the alternate.
    // Ideally nothing should rely on this, but relying on it here
    // means that we don't need an additional field on the work in
    // progress.
    var current = workInProgress.alternate;

    // See if beginning this work spawns more work.
    {
      startWorkTimer(workInProgress);
    }
    var next = beginFailedWork(current, workInProgress, nextPriorityLevel);
    if (true && ReactFiberInstrumentation$1.debugTool) {
      ReactFiberInstrumentation$1.debugTool.onBeginWork(workInProgress);
    }

    if (next === null) {
      // If this doesn't spawn new work, complete the current work.
      next = completeUnitOfWork(workInProgress);
    }

    ReactCurrentOwner$1.current = null;
    {
      ReactDebugCurrentFiber$3.resetCurrentFiber();
    }

    return next;
  }

  function performDeferredWork(deadline) {
    performWork(OffscreenPriority, deadline);
  }

  function handleCommitPhaseErrors() {
    // This is a special work loop for handling commit phase errors. It's
    // similar to the syncrhonous work loop, but does an additional check on
    // each fiber to see if it's an error boundary with an unhandled error. If
    // so, it uses a forked version of performUnitOfWork that unmounts the
    // failed subtree.
    //
    // The loop stops once the children have unmounted and error lifecycles are
    // called. Then we return to the regular flow.

    if (capturedErrors !== null && capturedErrors.size > 0 && nextPriorityLevel === TaskPriority$1) {
      while (nextUnitOfWork !== null) {
        if (hasCapturedError(nextUnitOfWork)) {
          // Use a forked version of performUnitOfWork
          nextUnitOfWork = performFailedUnitOfWork(nextUnitOfWork);
        } else {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
        if (nextUnitOfWork === null) {
          !(pendingCommit !== null) ? invariant(false, 'Should have a pending commit. This error is likely caused by a bug in React. Please file an issue.') : void 0;
          // We just completed a root. Commit it now.
          priorityContext = TaskPriority$1;
          commitAllWork(pendingCommit);
          priorityContext = nextPriorityLevel;

          if (capturedErrors === null || capturedErrors.size === 0 || nextPriorityLevel !== TaskPriority$1) {
            // There are no more unhandled errors. We can exit this special
            // work loop. If there's still additional work, we'll perform it
            // using one of the normal work loops.
            break;
          }
          // The commit phase produced additional errors. Continue working.
        }
      }
    }
  }

  function workLoop(minPriorityLevel, deadline) {
    if (pendingCommit !== null) {
      priorityContext = TaskPriority$1;
      commitAllWork(pendingCommit);
      handleCommitPhaseErrors();
    } else if (nextUnitOfWork === null) {
      resetNextUnitOfWork();
    }

    if (nextPriorityLevel === NoWork$2 || nextPriorityLevel > minPriorityLevel) {
      return;
    }

    // During the render phase, updates should have the same priority at which
    // we're rendering.
    priorityContext = nextPriorityLevel;

    loop: do {
      if (nextPriorityLevel <= TaskPriority$1) {
        // Flush all synchronous and task work.
        while (nextUnitOfWork !== null) {
          nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
          if (nextUnitOfWork === null) {
            !(pendingCommit !== null) ? invariant(false, 'Should have a pending commit. This error is likely caused by a bug in React. Please file an issue.') : void 0;
            // We just completed a root. Commit it now.
            priorityContext = TaskPriority$1;
            commitAllWork(pendingCommit);
            priorityContext = nextPriorityLevel;
            // Clear any errors that were scheduled during the commit phase.
            handleCommitPhaseErrors();
            // The priority level may have changed. Check again.
            if (nextPriorityLevel === NoWork$2 || nextPriorityLevel > minPriorityLevel || nextPriorityLevel > TaskPriority$1) {
              // The priority level does not match.
              break;
            }
          }
        }
      } else if (deadline !== null) {
        // Flush asynchronous work until the deadline expires.
        while (nextUnitOfWork !== null && !deadlineHasExpired) {
          if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
            nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
            // In a deferred work batch, iff nextUnitOfWork returns null, we just
            // completed a root and a pendingCommit exists. Logically, we could
            // omit either of the checks in the following condition, but we need
            // both to satisfy Flow.
            if (nextUnitOfWork === null) {
              !(pendingCommit !== null) ? invariant(false, 'Should have a pending commit. This error is likely caused by a bug in React. Please file an issue.') : void 0;
              // We just completed a root. If we have time, commit it now.
              // Otherwise, we'll commit it in the next frame.
              if (deadline.timeRemaining() > timeHeuristicForUnitOfWork) {
                priorityContext = TaskPriority$1;
                commitAllWork(pendingCommit);
                priorityContext = nextPriorityLevel;
                // Clear any errors that were scheduled during the commit phase.
                handleCommitPhaseErrors();
                // The priority level may have changed. Check again.
                if (nextPriorityLevel === NoWork$2 || nextPriorityLevel > minPriorityLevel || nextPriorityLevel < HighPriority) {
                  // The priority level does not match.
                  break;
                }
              } else {
                deadlineHasExpired = true;
              }
            }
          } else {
            deadlineHasExpired = true;
          }
        }
      }

      // There might be work left. Depending on the priority, we should
      // either perform it now or schedule a callback to perform it later.
      switch (nextPriorityLevel) {
        case SynchronousPriority$1:
        case TaskPriority$1:
          // We have remaining synchronous or task work. Keep performing it,
          // regardless of whether we're inside a callback.
          if (nextPriorityLevel <= minPriorityLevel) {
            continue loop;
          }
          break loop;
        case HighPriority:
        case LowPriority:
        case OffscreenPriority:
          // We have remaining async work.
          if (deadline === null) {
            // We're not inside a callback. Exit and perform the work during
            // the next callback.
            break loop;
          }
          // We are inside a callback.
          if (!deadlineHasExpired && nextPriorityLevel <= minPriorityLevel) {
            // We still have time. Keep working.
            continue loop;
          }
          // We've run out of time. Exit.
          break loop;
        case NoWork$2:
          // No work left. We can exit.
          break loop;
        default:
          invariant(false, 'Switch statement should be exhuastive. This error is likely caused by a bug in React. Please file an issue.');
      }
    } while (true);
  }

  function performWorkCatchBlock(failedWork, boundary, minPriorityLevel, deadline) {
    // We're going to restart the error boundary that captured the error.
    // Conceptually, we're unwinding the stack. We need to unwind the
    // context stack, too.
    unwindContexts(failedWork, boundary);

    // Restart the error boundary using a forked version of
    // performUnitOfWork that deletes the boundary's children. The entire
    // failed subree will be unmounted. During the commit phase, a special
    // lifecycle method is called on the error boundary, which triggers
    // a re-render.
    nextUnitOfWork = performFailedUnitOfWork(boundary);

    // Continue working.
    workLoop(minPriorityLevel, deadline);
  }

  function performWork(minPriorityLevel, deadline) {
    {
      startWorkLoopTimer();
    }

    !!isPerformingWork ? invariant(false, 'performWork was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    isPerformingWork = true;

    // The priority context changes during the render phase. We'll need to
    // reset it at the end.
    var previousPriorityContext = priorityContext;

    var didError = false;
    var error = null;
    {
      invokeGuardedCallback(null, workLoop, null, minPriorityLevel, deadline);
      if (hasCaughtError()) {
        didError = true;
        error = clearCaughtError();
      }
    }

    // An error was thrown during the render phase.
    while (didError) {
      if (didFatal) {
        // This was a fatal error. Don't attempt to recover from it.
        firstUncaughtError = error;
        break;
      }

      var failedWork = nextUnitOfWork;
      if (failedWork === null) {
        // An error was thrown but there's no current unit of work. This can
        // happen during the commit phase if there's a bug in the renderer.
        didFatal = true;
        continue;
      }

      // "Capture" the error by finding the nearest boundary. If there is no
      // error boundary, we use the root.
      var boundary = captureError(failedWork, error);
      !(boundary !== null) ? invariant(false, 'Should have found an error boundary. This error is likely caused by a bug in React. Please file an issue.') : void 0;

      if (didFatal) {
        // The error we just captured was a fatal error. This happens
        // when the error propagates to the root more than once.
        continue;
      }

      didError = false;
      error = null;
      {
        invokeGuardedCallback(null, performWorkCatchBlock, null, failedWork, boundary, minPriorityLevel, deadline);
        if (hasCaughtError()) {
          didError = true;
          error = clearCaughtError();
          continue;
        }
      }
      // We're finished working. Exit the error loop.
      break;
    }

    // Reset the priority context to its previous value.
    priorityContext = previousPriorityContext;

    // If we're inside a callback, set this to false, since we just flushed it.
    if (deadline !== null) {
      isCallbackScheduled = false;
    }
    // If there's remaining async work, make sure we schedule another callback.
    if (nextPriorityLevel > TaskPriority$1 && !isCallbackScheduled) {
      scheduleDeferredCallback(performDeferredWork);
      isCallbackScheduled = true;
    }

    var errorToThrow = firstUncaughtError;

    // We're done performing work. Time to clean up.
    isPerformingWork = false;
    deadlineHasExpired = false;
    didFatal = false;
    firstUncaughtError = null;
    capturedErrors = null;
    failedBoundaries = null;
    nextRenderedTree = null;
    nestedUpdateCount = 0;

    {
      stopWorkLoopTimer();
    }

    // It's safe to throw any unhandled errors.
    if (errorToThrow !== null) {
      throw errorToThrow;
    }
  }

  // Returns the boundary that captured the error, or null if the error is ignored
  function captureError(failedWork, error) {
    // It is no longer valid because we exited the user code.
    ReactCurrentOwner$1.current = null;
    {
      ReactDebugCurrentFiber$3.resetCurrentFiber();
    }

    // Search for the nearest error boundary.
    var boundary = null;

    // Passed to logCapturedError()
    var errorBoundaryFound = false;
    var willRetry = false;
    var errorBoundaryName = null;

    // Host containers are a special case. If the failed work itself is a host
    // container, then it acts as its own boundary. In all other cases, we
    // ignore the work itself and only search through the parents.
    if (failedWork.tag === HostRoot$6) {
      boundary = failedWork;

      if (isFailedBoundary(failedWork)) {
        // If this root already failed, there must have been an error when
        // attempting to unmount it. This is a worst-case scenario and
        // should only be possible if there's a bug in the renderer.
        didFatal = true;
      }
    } else {
      var node = failedWork['return'];
      while (node !== null && boundary === null) {
        if (node.tag === ClassComponent$6) {
          var instance = node.stateNode;
          if (typeof instance.componentDidCatch === 'function') {
            errorBoundaryFound = true;
            errorBoundaryName = getComponentName_1(node);

            // Found an error boundary!
            boundary = node;
            willRetry = true;
          }
        } else if (node.tag === HostRoot$6) {
          // Treat the root like a no-op error boundary
          boundary = node;
        }

        if (isFailedBoundary(node)) {
          // This boundary is already in a failed state.

          // If we're currently unmounting, that means this error was
          // thrown while unmounting a failed subtree. We should ignore
          // the error.
          if (isUnmounting) {
            return null;
          }

          // If we're in the commit phase, we should check to see if
          // this boundary already captured an error during this commit.
          // This case exists because multiple errors can be thrown during
          // a single commit without interruption.
          if (commitPhaseBoundaries !== null && (commitPhaseBoundaries.has(node) || node.alternate !== null && commitPhaseBoundaries.has(node.alternate))) {
            // If so, we should ignore this error.
            return null;
          }

          // The error should propagate to the next boundary -— we keep looking.
          boundary = null;
          willRetry = false;
        }

        node = node['return'];
      }
    }

    if (boundary !== null) {
      // Add to the collection of failed boundaries. This lets us know that
      // subsequent errors in this subtree should propagate to the next boundary.
      if (failedBoundaries === null) {
        failedBoundaries = new Set();
      }
      failedBoundaries.add(boundary);

      // This method is unsafe outside of the begin and complete phases.
      // We might be in the commit phase when an error is captured.
      // The risk is that the return path from this Fiber may not be accurate.
      // That risk is acceptable given the benefit of providing users more context.
      var _componentStack = getStackAddendumByWorkInProgressFiber$2(failedWork);
      var _componentName = getComponentName_1(failedWork);

      // Add to the collection of captured errors. This is stored as a global
      // map of errors and their component stack location keyed by the boundaries
      // that capture them. We mostly use this Map as a Set; it's a Map only to
      // avoid adding a field to Fiber to store the error.
      if (capturedErrors === null) {
        capturedErrors = new Map();
      }

      var capturedError = {
        componentName: _componentName,
        componentStack: _componentStack,
        error: error,
        errorBoundary: errorBoundaryFound ? boundary.stateNode : null,
        errorBoundaryFound: errorBoundaryFound,
        errorBoundaryName: errorBoundaryName,
        willRetry: willRetry
      };

      capturedErrors.set(boundary, capturedError);

      try {
        logCapturedError(capturedError);
      } catch (e) {
        // Prevent cycle if logCapturedError() throws.
        // A cycle may still occur if logCapturedError renders a component that throws.
        console.error(e);
      }

      // If we're in the commit phase, defer scheduling an update on the
      // boundary until after the commit is complete
      if (isCommitting) {
        if (commitPhaseBoundaries === null) {
          commitPhaseBoundaries = new Set();
        }
        commitPhaseBoundaries.add(boundary);
      } else {
        // Otherwise, schedule an update now.
        // TODO: Is this actually necessary during the render phase? Is it
        // possible to unwind and continue rendering at the same priority,
        // without corrupting internal state?
        scheduleErrorRecovery(boundary);
      }
      return boundary;
    } else if (firstUncaughtError === null) {
      // If no boundary is found, we'll need to throw the error
      firstUncaughtError = error;
    }
    return null;
  }

  function hasCapturedError(fiber) {
    // TODO: capturedErrors should store the boundary instance, to avoid needing
    // to check the alternate.
    return capturedErrors !== null && (capturedErrors.has(fiber) || fiber.alternate !== null && capturedErrors.has(fiber.alternate));
  }

  function isFailedBoundary(fiber) {
    // TODO: failedBoundaries should store the boundary instance, to avoid
    // needing to check the alternate.
    return failedBoundaries !== null && (failedBoundaries.has(fiber) || fiber.alternate !== null && failedBoundaries.has(fiber.alternate));
  }

  function commitErrorHandling(effectfulFiber) {
    var capturedError = void 0;
    if (capturedErrors !== null) {
      capturedError = capturedErrors.get(effectfulFiber);
      capturedErrors['delete'](effectfulFiber);
      if (capturedError == null) {
        if (effectfulFiber.alternate !== null) {
          effectfulFiber = effectfulFiber.alternate;
          capturedError = capturedErrors.get(effectfulFiber);
          capturedErrors['delete'](effectfulFiber);
        }
      }
    }

    !(capturedError != null) ? invariant(false, 'No error for given unit of work. This error is likely caused by a bug in React. Please file an issue.') : void 0;

    switch (effectfulFiber.tag) {
      case ClassComponent$6:
        var instance = effectfulFiber.stateNode;

        var info = {
          componentStack: capturedError.componentStack
        };

        // Allow the boundary to handle the error, usually by scheduling
        // an update to itself
        instance.componentDidCatch(capturedError.error, info);
        return;
      case HostRoot$6:
        if (firstUncaughtError === null) {
          // If this is the host container, we treat it as a no-op error
          // boundary. We'll throw the first uncaught error once it's safe to
          // do so, at the end of the batch.
          firstUncaughtError = capturedError.error;
        }
        return;
      default:
        invariant(false, 'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');
    }
  }

  function unwindContexts(from, to) {
    var node = from;
    while (node !== null) {
      switch (node.tag) {
        case ClassComponent$6:
          popContextProvider$1(node);
          break;
        case HostComponent$6:
          popHostContext(node);
          break;
        case HostRoot$6:
          popHostContainer(node);
          break;
        case HostPortal$3:
          popHostContainer(node);
          break;
      }
      if (node === to || node.alternate === to) {
        {
          stopFailedWorkTimer(node);
        }
        break;
      } else {
        stopWorkTimer(node);
      }
      node = node['return'];
    }
  }

  function scheduleRoot(root, priorityLevel) {
    if (priorityLevel === NoWork$2) {
      return;
    }

    if (!root.isScheduled) {
      root.isScheduled = true;
      if (lastScheduledRoot) {
        // Schedule ourselves to the end.
        lastScheduledRoot.nextScheduledRoot = root;
        lastScheduledRoot = root;
      } else {
        // We're the only work scheduled.
        nextScheduledRoot = root;
        lastScheduledRoot = root;
      }
    }
  }

  function scheduleUpdate(fiber, priorityLevel) {
    return scheduleUpdateImpl(fiber, priorityLevel, false);
  }

  function scheduleUpdateImpl(fiber, priorityLevel, isErrorRecovery) {
    {
      recordScheduleUpdate();
    }

    if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
      didFatal = true;
      invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
    }

    if (!isPerformingWork && priorityLevel <= nextPriorityLevel) {
      // We must reset the current unit of work pointer so that we restart the
      // search from the root during the next tick, in case there is now higher
      // priority work somewhere earlier than before.
      nextUnitOfWork = null;
    }

    {
      if (!isErrorRecovery && fiber.tag === ClassComponent$6) {
        var instance = fiber.stateNode;
        warnAboutInvalidUpdates(instance);
      }
    }

    var node = fiber;
    var shouldContinue = true;
    while (node !== null && shouldContinue) {
      // Walk the parent path to the root and update each node's priority. Once
      // we reach a node whose priority matches (and whose alternate's priority
      // matches) we can exit safely knowing that the rest of the path is correct.
      shouldContinue = false;
      if (node.pendingWorkPriority === NoWork$2 || node.pendingWorkPriority > priorityLevel) {
        // Priority did not match. Update and keep going.
        shouldContinue = true;
        node.pendingWorkPriority = priorityLevel;
      }
      if (node.alternate !== null) {
        if (node.alternate.pendingWorkPriority === NoWork$2 || node.alternate.pendingWorkPriority > priorityLevel) {
          // Priority did not match. Update and keep going.
          shouldContinue = true;
          node.alternate.pendingWorkPriority = priorityLevel;
        }
      }
      if (node['return'] === null) {
        if (node.tag === HostRoot$6) {
          var root = node.stateNode;
          scheduleRoot(root, priorityLevel);
          if (!isPerformingWork) {
            switch (priorityLevel) {
              case SynchronousPriority$1:
                // Perform this update now.
                if (isUnbatchingUpdates) {
                  // We're inside unbatchedUpdates, which is inside either
                  // batchedUpdates or a lifecycle. We should only flush
                  // synchronous work, not task work.
                  performWork(SynchronousPriority$1, null);
                } else {
                  // Flush both synchronous and task work.
                  performWork(TaskPriority$1, null);
                }
                break;
              case TaskPriority$1:
                !isBatchingUpdates ? invariant(false, 'Task updates can only be scheduled as a nested update or inside batchedUpdates.') : void 0;
                break;
              default:
                // Schedule a callback to perform the work later.
                if (!isCallbackScheduled) {
                  scheduleDeferredCallback(performDeferredWork);
                  isCallbackScheduled = true;
                }
            }
          }
        } else {
          {
            if (!isErrorRecovery && fiber.tag === ClassComponent$6) {
              warnAboutUpdateOnUnmounted(fiber.stateNode);
            }
          }
          return;
        }
      }
      node = node['return'];
    }
  }

  function getPriorityContext(fiber, forceAsync) {
    var priorityLevel = priorityContext;
    if (priorityLevel === NoWork$2) {
      if (!useSyncScheduling || fiber.internalContextTag & AsyncUpdates || forceAsync) {
        priorityLevel = LowPriority;
      } else {
        priorityLevel = SynchronousPriority$1;
      }
    }

    // If we're in a batch, or if we're already performing work, downgrade sync
    // priority to task priority
    if (priorityLevel === SynchronousPriority$1 && (isPerformingWork || isBatchingUpdates)) {
      return TaskPriority$1;
    }
    return priorityLevel;
  }

  function scheduleErrorRecovery(fiber) {
    scheduleUpdateImpl(fiber, TaskPriority$1, true);
  }

  function batchedUpdates(fn, a) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      // If we're not already inside a batch, we need to flush any task work
      // that was created by the user-provided function.
      if (!isPerformingWork && !isBatchingUpdates) {
        performWork(TaskPriority$1, null);
      }
    }
  }

  function unbatchedUpdates(fn) {
    var previousIsUnbatchingUpdates = isUnbatchingUpdates;
    var previousIsBatchingUpdates = isBatchingUpdates;
    // This is only true if we're nested inside batchedUpdates.
    isUnbatchingUpdates = isBatchingUpdates;
    isBatchingUpdates = false;
    try {
      return fn();
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      isUnbatchingUpdates = previousIsUnbatchingUpdates;
    }
  }

  function flushSync(batch) {
    var previousIsBatchingUpdates = isBatchingUpdates;
    var previousPriorityContext = priorityContext;
    isBatchingUpdates = true;
    priorityContext = SynchronousPriority$1;
    try {
      return batch();
    } finally {
      isBatchingUpdates = previousIsBatchingUpdates;
      priorityContext = previousPriorityContext;

      !!isPerformingWork ? invariant(false, 'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.') : void 0;
      performWork(TaskPriority$1, null);
    }
  }

  function deferredUpdates(fn) {
    var previousPriorityContext = priorityContext;
    priorityContext = LowPriority;
    try {
      return fn();
    } finally {
      priorityContext = previousPriorityContext;
    }
  }

  return {
    scheduleUpdate: scheduleUpdate,
    getPriorityContext: getPriorityContext,
    batchedUpdates: batchedUpdates,
    unbatchedUpdates: unbatchedUpdates,
    flushSync: flushSync,
    deferredUpdates: deferredUpdates
  };
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getContextForSubtree
 * 
 */






var getContextFiber = function (arg) {
  invariant(false, 'Missing injection for fiber getContextForSubtree');
};

function getContextForSubtree(parentComponent) {
  if (!parentComponent) {
    return emptyObject;
  }

  var instance = ReactInstanceMap_1.get(parentComponent);
  if (typeof instance.tag === 'number') {
    return getContextFiber(instance);
  } else {
    return instance._processChildContext(instance._context);
  }
}

getContextForSubtree._injectFiber = function (fn) {
  getContextFiber = fn;
};

var getContextForSubtree_1 = getContextForSubtree;

var addTopLevelUpdate = ReactFiberUpdateQueue.addTopLevelUpdate;

var findCurrentUnmaskedContext = ReactFiberContext.findCurrentUnmaskedContext;
var isContextProvider = ReactFiberContext.isContextProvider;
var processChildContext = ReactFiberContext.processChildContext;

var createFiberRoot = ReactFiberRoot.createFiberRoot;



var HostComponent$1 = ReactTypeOfWork.HostComponent;

{
  var warning = require$$0;
  var ReactFiberInstrumentation = ReactFiberInstrumentation_1;
  var ReactDebugCurrentFiber = ReactDebugCurrentFiber_1;
  var getComponentName = getComponentName_1;
}

var findCurrentHostFiber = ReactFiberTreeReflection.findCurrentHostFiber;
var findCurrentHostFiberWithNoPortals = ReactFiberTreeReflection.findCurrentHostFiberWithNoPortals;



getContextForSubtree_1._injectFiber(function (fiber) {
  var parentContext = findCurrentUnmaskedContext(fiber);
  return isContextProvider(fiber) ? processChildContext(fiber, parentContext, false) : parentContext;
});

var ReactFiberReconciler = function (config) {
  var getPublicInstance = config.getPublicInstance;

  var _ReactFiberScheduler = ReactFiberScheduler(config),
      scheduleUpdate = _ReactFiberScheduler.scheduleUpdate,
      getPriorityContext = _ReactFiberScheduler.getPriorityContext,
      batchedUpdates = _ReactFiberScheduler.batchedUpdates,
      unbatchedUpdates = _ReactFiberScheduler.unbatchedUpdates,
      flushSync = _ReactFiberScheduler.flushSync,
      deferredUpdates = _ReactFiberScheduler.deferredUpdates;

  function scheduleTopLevelUpdate(current, element, callback) {
    {
      if (ReactDebugCurrentFiber.phase === 'render' && ReactDebugCurrentFiber.current !== null) {
        warning(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(ReactDebugCurrentFiber.current) || 'Unknown');
      }
    }

    // Check if the top-level element is an async wrapper component. If so, treat
    // updates to the root as async. This is a bit weird but lets us avoid a separate
    // `renderAsync` API.
    var forceAsync = ReactFeatureFlags_1.enableAsyncSubtreeAPI && element != null && element.type != null && element.type.prototype != null && element.type.prototype.unstable_isAsyncReactComponent === true;
    var priorityLevel = getPriorityContext(current, forceAsync);
    var nextState = { element: element };
    callback = callback === undefined ? null : callback;
    {
      warning(callback === null || typeof callback === 'function', 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback);
    }
    addTopLevelUpdate(current, nextState, callback, priorityLevel);
    scheduleUpdate(current, priorityLevel);
  }

  return {
    createContainer: function (containerInfo) {
      return createFiberRoot(containerInfo);
    },
    updateContainer: function (element, container, parentComponent, callback) {
      // TODO: If this is a nested container, this won't be the root.
      var current = container.current;

      {
        if (ReactFiberInstrumentation.debugTool) {
          if (current.alternate === null) {
            ReactFiberInstrumentation.debugTool.onMountContainer(container);
          } else if (element === null) {
            ReactFiberInstrumentation.debugTool.onUnmountContainer(container);
          } else {
            ReactFiberInstrumentation.debugTool.onUpdateContainer(container);
          }
        }
      }

      var context = getContextForSubtree_1(parentComponent);
      if (container.context === null) {
        container.context = context;
      } else {
        container.pendingContext = context;
      }

      scheduleTopLevelUpdate(current, element, callback);
    },


    batchedUpdates: batchedUpdates,

    unbatchedUpdates: unbatchedUpdates,

    deferredUpdates: deferredUpdates,

    flushSync: flushSync,

    getPublicRootInstance: function (container) {
      var containerFiber = container.current;
      if (!containerFiber.child) {
        return null;
      }
      switch (containerFiber.child.tag) {
        case HostComponent$1:
          return getPublicInstance(containerFiber.child.stateNode);
        default:
          return containerFiber.child.stateNode;
      }
    },
    findHostInstance: function (fiber) {
      var hostFiber = findCurrentHostFiber(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    },
    findHostInstanceWithNoPortals: function (fiber) {
      var hostFiber = findCurrentHostFiberWithNoPortals(fiber);
      if (hostFiber === null) {
        return null;
      }
      return hostFiber.stateNode;
    }
  };
};

{
  var warning$10 = require$$0;
}

/**
 * Injected dependencies:
 */

/**
 * - `ComponentTree`: [required] Module that can convert between React instances
 *   and actual node references.
 */
var ComponentTree;
var injection$1 = {
  injectComponentTree: function (Injected) {
    ComponentTree = Injected;
    {
      warning$10(Injected && Injected.getNodeFromInstance && Injected.getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.');
    }
  }
};

function isEndish(topLevelType) {
  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
}

function isMoveish(topLevelType) {
  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
}
function isStartish(topLevelType) {
  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
}

var validateEventDispatches;
{
  validateEventDispatches = function (event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    var instancesIsArr = Array.isArray(dispatchInstances);
    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

    warning$10(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.');
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
  ReactErrorUtils_1.invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchInstances[i])) {
        return dispatchInstances[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchInstances)) {
      return dispatchInstances;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchInstances = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchInstance = event._dispatchInstances;
  !!Array.isArray(dispatchListener) ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : void 0;
  event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
  var res = dispatchListener ? dispatchListener(event) : null;
  event.currentTarget = null;
  event._dispatchListeners = null;
  event._dispatchInstances = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getFiberCurrentPropsFromNode: function (node) {
    return ComponentTree.getFiberCurrentPropsFromNode(node);
  },
  getInstanceFromNode: function (node) {
    return ComponentTree.getInstanceFromNode(node);
  },
  getNodeFromInstance: function (node) {
    return ComponentTree.getNodeFromInstance(node);
  },

  injection: injection$1
};

var EventPluginUtils_1 = EventPluginUtils;

// Use to restore controlled state after a change event has fired.

var fiberHostComponent = null;

var ReactControlledComponentInjection = {
  injectFiberControlledHostComponent: function (hostComponentImpl) {
    // The fiber implementation doesn't use dynamic dispatch so we need to
    // inject the implementation.
    fiberHostComponent = hostComponentImpl;
  }
};

var restoreTarget = null;
var restoreQueue = null;

function restoreStateOfTarget(target) {
  // We perform this translation at the end of the event loop so that we
  // always receive the correct fiber here
  var internalInstance = EventPluginUtils_1.getInstanceFromNode(target);
  if (!internalInstance) {
    // Unmounted
    return;
  }
  if (typeof internalInstance.tag === 'number') {
    !(fiberHostComponent && typeof fiberHostComponent.restoreControlledState === 'function') ? invariant(false, 'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    var props = EventPluginUtils_1.getFiberCurrentPropsFromNode(internalInstance.stateNode);
    fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
    return;
  }
  !(typeof internalInstance.restoreControlledState === 'function') ? invariant(false, 'The internal instance must be a React host component. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  // If it is not a Fiber, we can just use dynamic dispatch.
  internalInstance.restoreControlledState();
}

var ReactControlledComponent = {
  injection: ReactControlledComponentInjection,

  enqueueStateRestore: function (target) {
    if (restoreTarget) {
      if (restoreQueue) {
        restoreQueue.push(target);
      } else {
        restoreQueue = [target];
      }
    } else {
      restoreTarget = target;
    }
  },
  restoreStateIfNeeded: function () {
    if (!restoreTarget) {
      return;
    }
    var target = restoreTarget;
    var queuedTargets = restoreQueue;
    restoreTarget = null;
    restoreQueue = null;

    restoreStateOfTarget(target);
    if (queuedTargets) {
      for (var i = 0; i < queuedTargets.length; i++) {
        restoreStateOfTarget(queuedTargets[i]);
      }
    }
  }
};

var ReactControlledComponent_1 = ReactControlledComponent;

// Used as a way to call batchedUpdates when we don't know if we're in a Fiber
// or Stack context. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.

// Defaults
var stackBatchedUpdates = function (fn, a, b, c, d, e) {
  return fn(a, b, c, d, e);
};
var fiberBatchedUpdates = function (fn, bookkeeping) {
  return fn(bookkeeping);
};

function performFiberBatchedUpdates(fn, bookkeeping) {
  // If we have Fiber loaded, we need to wrap this in a batching call so that
  // Fiber can apply its default priority for this call.
  return fiberBatchedUpdates(fn, bookkeeping);
}
function batchedUpdates(fn, bookkeeping) {
  // We first perform work with the stack batching strategy, by passing our
  // indirection to it.
  return stackBatchedUpdates(performFiberBatchedUpdates, fn, bookkeeping);
}

var isNestingBatched = false;
function batchedUpdatesWithControlledComponents(fn, bookkeeping) {
  if (isNestingBatched) {
    // If we are currently inside another batch, we need to wait until it
    // fully completes before restoring state. Therefore, we add the target to
    // a queue of work.
    return batchedUpdates(fn, bookkeeping);
  }
  isNestingBatched = true;
  try {
    return batchedUpdates(fn, bookkeeping);
  } finally {
    // Here we wait until all updates have propagated, which is important
    // when using controlled components within layers:
    // https://github.com/facebook/react/issues/1698
    // Then we restore state of any controlled component.
    isNestingBatched = false;
    ReactControlledComponent_1.restoreStateIfNeeded();
  }
}

var ReactGenericBatchingInjection = {
  injectStackBatchedUpdates: function (_batchedUpdates) {
    stackBatchedUpdates = _batchedUpdates;
  },
  injectFiberBatchedUpdates: function (_batchedUpdates) {
    fiberBatchedUpdates = _batchedUpdates;
  }
};

var ReactGenericBatching = {
  batchedUpdates: batchedUpdatesWithControlledComponents,
  injection: ReactGenericBatchingInjection
};

var ReactGenericBatching_1 = ReactGenericBatching;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }







var Fragment = ReactTypeOfWork.Fragment;
var FunctionalComponent = ReactTypeOfWork.FunctionalComponent;
var ClassComponent = ReactTypeOfWork.ClassComponent;
var HostComponent = ReactTypeOfWork.HostComponent;
var HostText = ReactTypeOfWork.HostText;
var HostRoot = ReactTypeOfWork.HostRoot;


var UPDATE_SIGNAL = {};

function getPublicInstance(inst) {
  switch (inst.tag) {
    case 'INSTANCE':
      var _createNodeMock = inst.rootContainerInstance.createNodeMock;
      return _createNodeMock({
        type: inst.type,
        props: inst.props
      });
    default:
      return inst;
  }
}

function appendChild(parentInstance, child) {
  var index = parentInstance.children.indexOf(child);
  if (index !== -1) {
    parentInstance.children.splice(index, 1);
  }
  parentInstance.children.push(child);
}

function insertBefore(parentInstance, child, beforeChild) {
  var index = parentInstance.children.indexOf(child);
  if (index !== -1) {
    parentInstance.children.splice(index, 1);
  }
  var beforeIndex = parentInstance.children.indexOf(beforeChild);
  parentInstance.children.splice(beforeIndex, 0, child);
}

function removeChild(parentInstance, child) {
  var index = parentInstance.children.indexOf(child);
  parentInstance.children.splice(index, 1);
}

var TestRenderer = ReactFiberReconciler({
  getRootHostContext: function () {
    return emptyObject;
  },
  getChildHostContext: function () {
    return emptyObject;
  },
  prepareForCommit: function () {
    // noop
  },
  resetAfterCommit: function () {
    // noop
  },
  createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    return {
      type: type,
      props: props,
      children: [],
      rootContainerInstance: rootContainerInstance,
      tag: 'INSTANCE'
    };
  },
  appendInitialChild: function (parentInstance, child) {
    var index = parentInstance.children.indexOf(child);
    if (index !== -1) {
      parentInstance.children.splice(index, 1);
    }
    parentInstance.children.push(child);
  },
  finalizeInitialChildren: function (testElement, type, props, rootContainerInstance) {
    return false;
  },
  prepareUpdate: function (testElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
    return UPDATE_SIGNAL;
  },
  commitUpdate: function (instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    instance.type = type;
    instance.props = newProps;
  },
  commitMount: function (instance, type, newProps, internalInstanceHandle) {
    // noop
  },
  shouldSetTextContent: function (type, props) {
    return false;
  },
  resetTextContent: function (testElement) {
    // noop
  },
  shouldDeprioritizeSubtree: function (type, props) {
    return false;
  },
  createTextInstance: function (text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return {
      text: text,
      tag: 'TEXT'
    };
  },
  commitTextUpdate: function (textInstance, oldText, newText) {
    textInstance.text = newText;
  },


  appendChild: appendChild,
  appendChildToContainer: appendChild,
  insertBefore: insertBefore,
  insertInContainerBefore: insertBefore,
  removeChild: removeChild,
  removeChildFromContainer: removeChild,

  scheduleDeferredCallback: function (fn) {
    setTimeout(fn, 0, { timeRemaining: Infinity });
  },


  useSyncScheduling: true,

  getPublicInstance: getPublicInstance
});

var defaultTestOptions = {
  createNodeMock: function () {
    return null;
  }
};

function toJSON(inst) {
  switch (inst.tag) {
    case 'TEXT':
      return inst.text;
    case 'INSTANCE':
      /* eslint-disable no-unused-vars */
      // We don't include the `children` prop in JSON.
      // Instead, we will include the actual rendered children.
      var _inst$props = inst.props,
          _children = _inst$props.children,
          _props = _objectWithoutProperties(_inst$props, ['children']);
      /* eslint-enable */


      var renderedChildren = null;
      if (inst.children && inst.children.length) {
        renderedChildren = inst.children.map(toJSON);
      }
      var json = {
        type: inst.type,
        props: _props,
        children: renderedChildren
      };
      Object.defineProperty(json, '$$typeof', {
        value: Symbol['for']('react.test.json')
      });
      return json;
    default:
      throw new Error('Unexpected node type in toJSON: ' + inst.tag);
  }
}

function nodeAndSiblingsTrees(nodeWithSibling) {
  var array = [];
  var node = nodeWithSibling;
  while (node != null) {
    array.push(node);
    node = node.sibling;
  }
  var trees = array.map(toTree);
  return trees.length ? trees : null;
}

function hasSiblings(node) {
  return node && node.sibling;
}

function toTree(node) {
  if (node == null) {
    return null;
  }
  switch (node.tag) {
    case HostRoot:
      // 3
      return toTree(node.child);
    case ClassComponent:
      return {
        nodeType: 'component',
        type: node.type,
        props: _assign({}, node.memoizedProps),
        instance: node.stateNode,
        rendered: hasSiblings(node.child) ? nodeAndSiblingsTrees(node.child) : toTree(node.child)
      };
    case FunctionalComponent:
      // 1
      return {
        nodeType: 'component',
        type: node.type,
        props: _assign({}, node.memoizedProps),
        instance: null,
        rendered: hasSiblings(node.child) ? nodeAndSiblingsTrees(node.child) : toTree(node.child)
      };
    case HostComponent:
      // 5
      return {
        nodeType: 'host',
        type: node.type,
        props: _assign({}, node.memoizedProps),
        instance: null, // TODO: use createNodeMock here somehow?
        rendered: nodeAndSiblingsTrees(node.child)
      };
    case HostText:
      // 6
      return node.stateNode.text;
    default:
      invariant(false, 'toTree() does not yet know how to handle nodes with tag=%s', node.tag);
  }
}

var fiberToWrapper = new WeakMap();
function wrapFiber(fiber) {
  var wrapper = fiberToWrapper.get(fiber);
  if (wrapper === undefined && fiber.alternate !== null) {
    wrapper = fiberToWrapper.get(fiber.alternate);
  }
  if (wrapper === undefined) {
    wrapper = new ReactTestInstance(fiber);
    fiberToWrapper.set(fiber, wrapper);
  }
  return wrapper;
}

var validWrapperTypes = new Set([FunctionalComponent, ClassComponent, HostComponent]);

var ReactTestInstance = function () {
  ReactTestInstance.prototype._currentFiber = function _currentFiber() {
    // Throws if this component has been unmounted.
    var fiber = ReactFiberTreeReflection.findCurrentFiberUsingSlowPath(this._fiber);
    !(fiber !== null) ? invariant(false, 'Can\'t read from currently-mounting component. This error is likely caused by a bug in React. Please file an issue.') : void 0;
    return fiber;
  };

  function ReactTestInstance(fiber) {
    _classCallCheck(this, ReactTestInstance);

    !validWrapperTypes.has(fiber.tag) ? invariant(false, 'Unexpected object passed to ReactTestInstance constructor (tag: %s). This is probably a bug in React.', fiber.tag) : void 0;
    this._fiber = fiber;
  }

  // Custom search functions
  ReactTestInstance.prototype.find = function find(predicate) {
    return expectOne(this.findAll(predicate, { deep: false }), 'matching custom predicate: ' + predicate.toString());
  };

  ReactTestInstance.prototype.findByType = function findByType(type) {
    return expectOne(this.findAllByType(type, { deep: false }), 'with node type: "' + (type.displayName || type.name) + '"');
  };

  ReactTestInstance.prototype.findByProps = function findByProps(props) {
    return expectOne(this.findAllByProps(props, { deep: false }), 'with props: ' + JSON.stringify(props));
  };

  ReactTestInstance.prototype.findAll = function findAll(predicate) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return _findAll(this, predicate, options);
  };

  ReactTestInstance.prototype.findAllByType = function findAllByType(type) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return _findAll(this, function (node) {
      return node.type === type;
    }, options);
  };

  ReactTestInstance.prototype.findAllByProps = function findAllByProps(props) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    return _findAll(this, function (node) {
      return node.props && propsMatch(node.props, props);
    }, options);
  };

  _createClass(ReactTestInstance, [{
    key: 'instance',
    get: function () {
      if (this._fiber.tag === HostComponent) {
        return getPublicInstance(this._fiber.stateNode);
      } else {
        return this._fiber.stateNode;
      }
    }
  }, {
    key: 'type',
    get: function () {
      return this._fiber.type;
    }
  }, {
    key: 'props',
    get: function () {
      return this._currentFiber().memoizedProps;
    }
  }, {
    key: 'parent',
    get: function () {
      var parent = this._fiber['return'];
      return parent === null || parent.tag === HostRoot ? null : wrapFiber(parent);
    }
  }, {
    key: 'children',
    get: function () {
      var children = [];
      var startingNode = this._currentFiber();
      var node = startingNode;
      if (node.child === null) {
        return children;
      }
      node.child['return'] = node;
      node = node.child;
      outer: while (true) {
        var descend = false;
        switch (node.tag) {
          case FunctionalComponent:
          case ClassComponent:
          case HostComponent:
            children.push(wrapFiber(node));
            break;
          case HostText:
            children.push('' + node.memoizedProps);
            break;
          case Fragment:
            descend = true;
            break;
          default:
            invariant(false, 'Unsupported component type %s in test renderer. This is probably a bug in React.', node.tag);
        }
        if (descend && node.child !== null) {
          node.child['return'] = node;
          node = node.child;
          continue;
        }
        while (node.sibling === null) {
          if (node['return'] === startingNode) {
            break outer;
          }
          node = node['return'];
        }
        node.sibling['return'] = node['return'];
        node = node.sibling;
      }
      return children;
    }
  }]);

  return ReactTestInstance;
}();

function _findAll(root, predicate, options) {
  var deep = options ? options.deep : true;
  var results = [];

  if (predicate(root)) {
    results.push(root);
    if (!deep) {
      return results;
    }
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = root.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      if (typeof child === 'string') {
        continue;
      }
      results.push.apply(results, _findAll(child, predicate, options));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return results;
}

function expectOne(all, message) {
  if (all.length === 1) {
    return all[0];
  }

  var prefix = all.length === 0 ? 'No instances found ' : 'Expected 1 but found ' + all.length + ' instances ';

  throw new Error(prefix + message);
}

function propsMatch(props, filter) {
  for (var key in filter) {
    if (props[key] !== filter[key]) {
      return false;
    }
  }
  return true;
}

var ReactTestRendererFiber = {
  create: function (element, options) {
    var createNodeMock = defaultTestOptions.createNodeMock;
    if (options && typeof options.createNodeMock === 'function') {
      createNodeMock = options.createNodeMock;
    }
    var container = {
      children: [],
      createNodeMock: createNodeMock,
      tag: 'CONTAINER'
    };
    var root = TestRenderer.createContainer(container);
    !(root != null) ? invariant(false, 'something went wrong') : void 0;
    TestRenderer.updateContainer(element, root, null, null);

    var entry = {
      root: undefined, // makes flow happy
      // we define a 'getter' for 'root' below using 'Object.defineProperty'
      toJSON: function () {
        if (root == null || root.current == null || container == null) {
          return null;
        }
        if (container.children.length === 0) {
          return null;
        }
        if (container.children.length === 1) {
          return toJSON(container.children[0]);
        }
        return container.children.map(toJSON);
      },
      toTree: function () {
        if (root == null || root.current == null) {
          return null;
        }
        return toTree(root.current);
      },
      update: function (newElement) {
        if (root == null || root.current == null) {
          return;
        }
        TestRenderer.updateContainer(newElement, root, null, null);
      },
      unmount: function () {
        if (root == null || root.current == null) {
          return;
        }
        TestRenderer.updateContainer(null, root, null);
        container = null;
        root = null;
      },
      getInstance: function () {
        if (root == null || root.current == null) {
          return null;
        }
        return TestRenderer.getPublicRootInstance(root);
      }
    };

    Object.defineProperty(entry, 'root', {
      configurable: true,
      enumerable: true,
      get: function () {
        if (root === null || root.current.child === null) {
          throw new Error("Can't access .root on unmounted test renderer");
        }
        return wrapFiber(root.current.child);
      }
    });

    return entry;
  },


  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactGenericBatching_1.batchedUpdates
};

var ReactTestRendererFiberEntry = ReactTestRendererFiber;

module.exports = ReactTestRendererFiberEntry;

})();
}
