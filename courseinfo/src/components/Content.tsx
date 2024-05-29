import { Fragment } from "react/jsx-runtime"

interface CoursePart {
    name: string,
    exerciseCount: number
}

interface ContentProps {
    courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
    return (
        <Fragment>
            {props.courseParts.map(coursePart => <p>{coursePart.name} {coursePart.exerciseCount}</p>)}
        </Fragment>)
}

export default Content;