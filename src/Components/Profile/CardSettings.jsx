/* eslint-disable react/prop-types */
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const CardSettings = ({ title = '', inputPlaceholder = '', label = '', value, setValue }) => {

    const resetValue = () => {
        setValue({
            actualValue: value.defaultValue,
            defaultValue: value.defaultValue
        })
    }

    const onChangePicture = async (img) => {
        const FR = new FileReader()
        FR.addEventListener("load", async (evt) => {
            setValue({
                actualValue: evt.target.result,
                defaultValue: value.defaultValue
            })
        })
        FR.readAsDataURL(img)
    }
    
    return (
        <Card className="w-9/12 h-min">
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">{ label }</Label>
                            {
                                title !== 'Picture'
                                ? (<Input value={ value.actualValue ? value.actualValue : '' } onChange={ (e) => setValue({ actualValue: e.target.value, defaultValue: value.defaultValue }) } id="name" placeholder={ inputPlaceholder } />  )
                                : (
                                    <div className="flex flex-col justify-center items-center gap-y-4">
                                        <img src={ value.actualValue ? value.actualValue : '' } alt="Your profile picture" height="200px" width="200px" className="rounded-full mt-4"/>
                                        <Input id="picture" type="file" className="w-2/4" onChange={ (e) => onChangePicture(e.target.files[0]) }/>
                                    </div>
                                )                            
                            }
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={ resetValue }>Reset</Button>
            </CardFooter>
        </Card>
    )
}

export default CardSettings