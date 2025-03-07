import styles from "./styles.module.css"
import { useTypesContext } from '../../../Contexts/TypesContext'
import { useModelsContext } from '../../../Contexts/ModelsContext';
import SkeletonTable from "../../Skeletons/SkeletonTable/SkeletonTable";
import AdminModelList from "../AdminModelList/AdminModelList";
import { useState } from "react";
import AdminModelEditCard from "../AdminModelEditCard/AdminModelEditCard";




function AdminModelsComponent({ addNewFunc }: any) {

    const { gears, fuels, carTypes } = useTypesContext();
    const { HandleNextModelPage, HandlePreviousModelPage, models, error, isLoading } = useModelsContext();

    const [isEdit, setIsEdit] = useState(false);
    const [model, setModel] = useState(null);

    const setItemAndEditStatus = (Item: any) => {
        setIsEdit(true);
        setModel(Item);
    }

    const onCancelEdit = () => {
        setIsEdit(!isEdit);
        setModel(null);
    }


    return (

        <div className={`${styles.inner} border container my-2`}>
            {
                isLoading ?
                    <div className='d-flex justify-content-end my-4'>
                        <SkeletonTable />
                    </div>

                    :
                    (
                        <>
                            {isEdit ? <></> :
                                <div className='d-flex justify-content-end my-4'>

                                    <button onClick={addNewFunc} className={`${styles.addBtn}`} style={{ width: "40px" }}>+</button>

                                </div>
                            }
                            <div className='row'>
                                {isEdit ? <AdminModelEditCard CancelBtn={onCancelEdit} Gears={gears} CarTypes={carTypes} Fuels={fuels} Item={model!} /> :

                                    <>
                                        {
                                            models && gears && carTypes && fuels ?
                                                (
                                                    <div className="table-responsive">
                                                        <table className={`${styles.tableFont} border table-hover table mt-2`}>
                                                            <thead>
                                                                <tr className="text-center">

                                                                    <th>Marka</th>
                                                                    <th>Model</th>
                                                                    <th>Tip</th>
                                                                    <th>Yakıt</th>
                                                                    <th>Şanzıman</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>

                                                            {models?.data.map((item: any) => (
                                                                <AdminModelList setItemAndEditStatus={() => setItemAndEditStatus(item)} Item={item} CarTypes={carTypes} Fuels={fuels} Gears={gears} />

                                                            ))}
                                                        </table>
                                                    </div>
                                                )
                                                :
                                                (

                                                    <SkeletonTable />
                                                )
                                        }
                                    </>

                                }

                            </div>
                            {isEdit ? <></> :
                                <div className='d-flex justify-content-end my-4'>
                                    <button onClick={HandlePreviousModelPage} className={`${styles.btn} mx-3`} style={{ width: "40px" }}>←</button>
                                    <button onClick={HandleNextModelPage} className={`${styles.btn}`} style={{ width: "40px" }}>→</button>
                                </div>
                            }

                        </>
                    )

            }


        </div>
    )
}

export default AdminModelsComponent