"use client"
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Spinner,
  } from "@nextui-org/react";
  import {useAsyncList} from "@react-stately/data";
import { useState } from "react";
  
export default function Stats({session,rows}){
    const [isLoading, setIsLoading] = useState(true);

    let list = useAsyncList({
      async load({signal}) {
        setIsLoading(false);
        return {
          items: rows,
        };
      },
      async sort({items, sortDescriptor}) {
        return {
          items: items.sort((a, b) => {
            let first = a[sortDescriptor.column];
            let second = b[sortDescriptor.column];
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
  
            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }
  
            return cmp;
          }),
        };
      },
    });
  
    return (
      <Table
        aria-label="Example table with client side sorting"
        classNames={{
          table: "min-h-[400px]",
        }}
        sortDescriptor={rows.sortDescriptor}
        onSortChange={rows.sort}
      >
        <TableHeader>
          <TableColumn key="name" allowsSorting>
            Level
          </TableColumn>
          <TableColumn key="height" allowsSorting>
            Score
          </TableColumn>
        
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => {
            console.log(item)
            console.log(getKeyValue(item, 0))
            return(
            <TableRow key={item.name}>
               <TableCell>{item.level}</TableCell>
               <TableCell>{item.grade}</TableCell>
            </TableRow>)
          }}
        </TableBody>
      </Table>
    );
}