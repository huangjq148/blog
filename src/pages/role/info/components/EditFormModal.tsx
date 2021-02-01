import type { Props } from '@/components/Modal/data';
import type { Item } from "@/components/Modal/Edit";
import EditModal from "@/components/Modal/Edit";
import React from 'react';
import { add, findById, update } from '../service';

const fields: Item[] = [
  { name: "name", label: "角色名", required: true },
  { name: "code", label: "角色码", required: true },
  { name: "description", label: "内容", required: true, type: "textarea" }
]

const EditForm = (props: Props) => (
  <EditModal
    {...props}
    fields={fields}
    add={add}
    findById={findById}
    update={update}
  />
)

export default EditForm;
