export function setNodeStatus(node, statusName, status) {
  let data = node.data ? node.data : node;
  if (statusName instanceof Array) {
    for (let i = 0; i < statusName.length; i++) {
      data.status[statusName[i]] = status[i];
    }
  } else {
    data.status[statusName] = status;
  }
  return node;
}

export const dynTreeMixins = {
  methods: {
    setNodeStatus,
  },
};
