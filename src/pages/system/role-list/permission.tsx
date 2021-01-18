import React, { useEffect, useState } from 'react';
import { Modal, Tree, message } from 'antd';
import type { Props } from '@/components/Modal/data';
import { saveEditRoleMenu } from './service';

interface PermissionModalProps extends Props {
  roleId: string
}

const EditForm = (props: PermissionModalProps) => {
  const [keys, setKeys] = React.useState();
  const [menus, setMenus] = useState([]);
  const { data, roleId, onOk } = props;
  const tmpCheckedKeys: string[] = []

  useEffect(() => {
    setMenus(getTree(data))
    setKeys(tmpCheckedKeys)
  }, [data]);

  function getTree(tree = []): string[] {
    const arr: any[] = [];
    if (!!tree && tree.length !== 0) {
      tree.forEach((item: { name: string; id: string; children: any; check: string }) => {
        const obj: any = {};
        if (item.check === "true") {
          tmpCheckedKeys.push(item.id)
        }
        obj.title = item.name;
        obj.key = item.id; // 其他你想要添加的属性
        obj.children = getTree(item.children); // 递归调用
        arr.push(obj);
      });
    }
    return arr;
  }

  function onCheck(checkKeys: string[] = []) {
    setKeys(checkKeys);
  }

  return (
    <Modal
      {...props}
      onOk={async () => {
        try {
          await saveEditRoleMenu({ menuIds: keys.checked.join(), roleId });
          message.success("修改成功")
          onOk();
        } catch (e) {
          message.error("修改失败")
          console.error(e)
        }
      }}
    >
      <Tree
        checkable
        checkStrictly
        // titleRender={(node) => <span key={node.id}>{node.name}</span>}
        // defaultCheckedKeys={[]}
        onCheck={onCheck}
        treeData={menus}
        checkedKeys={keys}
      />
    </Modal>
  );
};

export default EditForm;
