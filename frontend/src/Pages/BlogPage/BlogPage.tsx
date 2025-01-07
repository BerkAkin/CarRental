import React from 'react'
import styles from "./styles.module.css"
import BlogCard from '../../Components/BlogCard/BlogCard';

function BlogPage() {
    const textShorten = (text: string) => {
        return text.length > 300 ? text.slice(0, 300) + "..." : text;
    }
    return (
        <>
            <div className='container mt-4 pt-3'>
                <div className='row'>
                    <h2 className={`${styles.header}`}>FlexBlog'da Bugün</h2>
                </div>
                {/* foreach ile dönülecek yukarda api isteği yapılıp*/}
                <div className='row mt-4'>
                    <BlogCard Id={1} Date={"02 / 24 / 2024"}
                        Description={textShorten("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis turpis vitae augue euismod, non laoreet risus vestibulum. Vivamus condimentum tincidunt lorem, vel feugiat arcu malesuada id. Aliquam non tortor nisi. Aenean vel odio ac libero lobortis euismod eget vel erat. Mauris bibendum, lorem vitae sollicitudin vehicula, purus nunc tristique ligula, nec feugiat ligula odio sed elit. Duis at ullamcorper dui. Curabitur vehicula malesuada arcu at porttitor. Sed non libero nisi. Sed lacinia nisi in ligula cursus, sed luctus eros interdum. Nam euismod fringilla risus, id vulputate dolor.")}

                        ImageUrl='Deneme Image' Title='Deneme Title' />
                </div>
            </div>
        </>
    )
}

export default BlogPage