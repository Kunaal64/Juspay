import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const products = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
]

export function TopProducts() {
  return (
    <div className="bg-[#F7F9FB] dark:bg-white/10 p-5 rounded-2xl overflow-hidden border border-border/50 transition-colors">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">Top Selling Products</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-none">
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium text-[12px] h-10 border-none">Name</TableHead>
              <TableHead className="text-muted-foreground font-medium text-[12px] h-10 border-none">Price</TableHead>
              <TableHead className="text-muted-foreground font-medium text-[12px] h-10 border-none">
                Quantity
              </TableHead>
              <TableHead className="text-muted-foreground font-medium text-[12px] h-10 border-none">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.name} className="border-border/50 hover:bg-accent/30 transition-colors">
                <TableCell className="text-[12px] text-foreground font-medium py-3 border-none">
                  {product.name}
                </TableCell>
                <TableCell className="text-[12px] text-muted-foreground py-3 border-none">{product.price}</TableCell>
                <TableCell className="text-[12px] text-muted-foreground py-3 border-none">{product.quantity}</TableCell>
                <TableCell className="text-[12px] text-muted-foreground py-3 border-none">{product.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
