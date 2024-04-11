import styles from "./Details.module.css"
import { Field, Input, TextEditor } from "@/components"
import { Development } from "@itaaj/entities"
import { ChangeEvent, createRef } from "react";

interface Props {
    development: Partial<Development>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

const Details = ({ development, handleChange }: Props) => {
    const textareaRef = createRef<ChangeEvent<HTMLTextAreaElement>>();
console.log({development})
    const handleEditorChange = (value: string) => {
        console.log(value)
        const syntheticEvent: ChangeEvent<HTMLTextAreaElement> = {
            target: {
                value: value,
                name: "description" 
            } as unknown as EventTarget & HTMLTextAreaElement,
            currentTarget: textareaRef.current?.currentTarget!, 
            bubbles: false,
            cancelable: false,
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: false,
            preventDefault: () => { },
            stopPropagation: () => { },
            persist: () => { },
            nativeEvent: textareaRef.current?.nativeEvent!,
            isDefaultPrevented: function (): boolean {
                throw new Error("Function not implemented.");
            },
            isPropagationStopped: function (): boolean {
                throw new Error("Function not implemented.");
            },
            timeStamp: 0,
            type: ""
        };
        handleChange(syntheticEvent);
    };
    

  return (
    <div>
        <div className={styles.content}>
                        <h3>General details</h3>
                        <p className={styles.subtitle}>A brief description of these settings</p>
                        <div className={styles.col}>

                            <Field label='Bedrooms'>
                                <Input value={development.bedrooms} name='bedrooms' onChange={handleChange} />
                            </Field>
                            <Field label='Bathrooms'>
                                <Input value={development.bathrooms} name='bathrooms' onChange={handleChange} />
                            </Field>

                        </div>

                        <div className={styles.col}>

                            <Field label='Development price (From)'>
                                <Input type='number' value={development.price} name='price' onChange={handleChange} />
                            </Field>

                            <Field label='Households'>
                                <Input value={development.households} name='households' onChange={handleChange} />
                            </Field>




                        </div>

                        <h3>Development details</h3>
                        <p className={styles.subtitle}>A brief description of these settings</p>
                        <Field label='Development name'>
                            <Input name='name' value={development.name} onChange={handleChange} />
                        </Field>
                        <Field label='Area'>
                            <Input name='area' value={development.area} placeholder='De 91 m2 a 128 m2' onChange={handleChange} />
                        </Field>

                        <div className={styles.col}>

                            <Field label='Development type'>
                                <Input name='type' value={development.type} onChange={handleChange} />
                            </Field>

                            <Field label='Antiquity'>
                                <Input type='number' name='antiquity' value={development.antiquity} onChange={handleChange} />
                            </Field>
                        </div>

                        <Field label='Video URL'>
                                <Input type='text' value={development.video} name='video' onChange={handleChange} />
                            </Field>

                            <Field label='360 Tour URL'>
                                <Input value={development.virtualTourUrl} name='virtualTourUrl' onChange={handleChange} />
                            </Field>


                            <Field label='PDF URL'>
                                <Input value={development.owner} name='owner' onChange={handleChange} />
                            </Field>



                        <div className={styles.divider}>

                            <Field label='Development description'>
                                <TextEditor
                                    value={development.description}
                                    onChange={handleEditorChange}
                                />
                            </Field>
                        </div>
                    </div>
    </div>
  )
}

export default Details