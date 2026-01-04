import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bug, UserPlus, Radio } from "lucide-react"

const activities = [
  { id: 1, avatar: "/natali.jpg", label: "You have a bug that needs...", time: "Just now" },
  { id: 2, avatar: "/drew.jpg", label: "Released a new version", time: "59 minutes ago" },
  { id: 3, avatar: "/orlando.jpg", label: "Submitted a bug", time: "12 hours ago" },
  { id: 4, avatar: "/andi.jpg", label: "Modified A data in Page X", time: "Today, 11:59 AM" },
  { id: 5, avatar: "/kate.jpg", label: "Deleted a page in Project X", time: "Feb 2, 2023" },
]

//Secondary sidebar displaying notifications, user activities, and contacts
export function SidebarRight() {
  return (
    <aside className="w-[280px] h-full border-l border-border flex flex-col py-5 px-5 shrink-0 bg-background overflow-y-auto custom-scrollbar transition-colors">
      <div className="space-y-6">
        <section>
          <h3 className="text-[11px] font-medium text-foreground font-bold uppercase tracking-wider mb-4">Notifications</h3>
          <div className="space-y-4">
            <NotificationItem icon={<Bug className="w-3.5 h-3.5" />} bg="#E3F5FF" label="You have a bug that needs..." time="Just now" />
            <NotificationItem icon={<UserPlus className="w-3.5 h-3.5" />} bg="#E5ECF6" label="New user registered" time="59 minutes ago" />
            <NotificationItem icon={<Bug className="w-3.5 h-3.5" />} bg="#E3F5FF" label="You have a bug that needs..." time="12 hours ago" />
            <NotificationItem icon={<Radio className="w-3.5 h-3.5" />} bg="#E5ECF6" label="Andi Lane subscribed to you" time="Today, 11:59 AM" />
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-medium text-foreground font-bold uppercase tracking-wider mb-4">Activities</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} avatar={activity.avatar} label={activity.label} time={activity.time} />
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-medium text-foreground font-bold uppercase tracking-wider mb-4">Contacts</h3>
          <div className="space-y-3">
            <ContactItem avatar="/natali.jpg" name="Natali Craig" />
            <ContactItem avatar="/drew.jpg" name="Drew Cano" />
            <ContactItem avatar="/orlando.jpg" name="Orlando Diggs" />
            <ContactItem avatar="/andi.jpg" name="Andi Lane" />
            <ContactItem avatar="/kate.jpg" name="Kate Morrison" />
            <ContactItem avatar="/koray.jpg" name="Koray Okumus" />
          </div>
        </section>
      </div>
    </aside>
  )
}

function NotificationItem({ icon, bg = "#E3F5FF", label, time }) {
  return (
    <div className="flex gap-3">
      <div 
        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-black"
        style={{ backgroundColor: bg }}
      >
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[12px] text-foreground/80 truncate leading-tight">{label}</span>
        <span className="text-[11px] text-muted-foreground mt-0.5">{time}</span>
      </div>
    </div>
  )
}

function ActivityItem({ avatar, label, time }) {
  return (
    <div className="flex gap-3">
      <Avatar className="w-6 h-6 shrink-0">
        <AvatarImage src={avatar || "/placeholder.svg"} />
        <AvatarFallback className="text-[10px]">U</AvatarFallback>
      </Avatar>
      <div className="flex flex-col min-w-0">
        <span className="text-[12px] text-foreground/80 truncate leading-tight">{label}</span>
        <span className="text-[11px] text-muted-foreground mt-0.5">{time}</span>
      </div>
    </div>
  )
}

function ContactItem({ avatar, name }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-6 h-6 shrink-0">
        <AvatarImage src={avatar || "/placeholder.svg"} />
        <AvatarFallback className="text-[10px]">{name[0]}</AvatarFallback>
      </Avatar>
      <span className="text-[12px] text-foreground/80 font-medium">{name}</span>
    </div>
  )
}
