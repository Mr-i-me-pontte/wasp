import {screen, render} from "@testing-library/react"
import { Modal } from '../'

describe("<Modal />", () => {
  it("The modal should don't be visible when open is setted to true", async () => {
    render(<Modal title={"fake title"} body={<h1>Fake Body</h1>}/>)

    expect(screen.queryByText("fake title")).not.toBeInTheDocument()
    expect(screen.queryByText("Fake Body")).not.toBeInTheDocument()

  })

  it("The modal should show a title and a body when open.", () => {
    render(<Modal title={"fake title"} body={<h1>Fake Body</h1>} show={true}/>)

    expect(screen.queryByText("fake title")).toBeInTheDocument()
    expect(screen.queryByText("Fake Body")).toBeInTheDocument()
  })
})