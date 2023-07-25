import { Menu } from '@/componants/Menu/Menu.tsx'
import { Require } from '@/componants/Require/Require.tsx'

export function Layout() {
  return (
    <div className="CozyNestLayout">
      <Menu className="Menu">
        <Require selector="#tabs > div.tab-nav" cnCss="tab-menu-button"/>
      </Menu>
      {/*gradio-container*/}
      <Require selector=".gradio-container.app" cnCss="app"/>
    </div>
  )
}
