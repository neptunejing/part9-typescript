import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Group projects: {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
                </div>
            );
        case "special":
            return (
                <div>
                    <h3>{part.name}</h3>
                    <p>Exercises: {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Requirements: {part.requirements.join(', ')}</p>
                </div>
            );
        default:
            return null;
    }
};

export default Part;
