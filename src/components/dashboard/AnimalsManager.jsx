import MobileContainer from "../shared/MobileContainer"
import PageSection from "../shared/PageSection"
import LoadingBackdrop from "../shared/LoadingBackdrop"
import { useState, useEffect } from "react"
import axios from "axios"
import { BASE_URL } from "../../App"
import { toast } from "react-toastify"

export default function AnimalsManager (){
    const [isLoading, setIsLoading] = useState(false)
    const [sendNewName, setSendNewName] = useState(false)
    const [sendNewRace, setSendNewRace] = useState(false)
    const [animalNameId, setAnimalNameId] = useState(-1)
    const [newName, setNewName] = useState('')
    const [newRace, setNewRace] = useState('')
    const [animalNames, setAnimalNames] = useState({})
    const [animalRaces, setAnimalRaces] = useState({})
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(isLoading) setNewAnimalName()
        getAnimalNames()
        setNewName('')
        setIsLoading(false)
        setSendNewName(false)
    }, [sendNewName])

    useEffect(()=>{
        if(isLoading) setNewAnimalRace()
        getAnimalRaces()
        setNewRace('')
        setAnimalNameId(-1)
        document.getElementById('animals-names').value=-1
        setIsLoading(false)
        setSendNewRace(false)
    }, [sendNewRace])

    useEffect(()=>{
        if(animalNameId < 0) setAnimalRaces({})
        getAnimalRaces()
    }, [animalNameId])

    const getAnimalNames = async () => {        
        const response = await axios.get(BASE_URL + 'animals/all', {
            headers:{
                accept:'application/json',
                authorization:'Bearer ' + token
            }
        })
        if(response.status < 400) setAnimalNames(response.data)
    }
    const setNewAnimalName = async () => {
        if(newName.trim().length == 0){
            toast('نام نوع جدید حیوان را وارد کنید', {type:'error'})
            return
        }
        
        const response = await axios.post(BASE_URL + 'animals/add', {name:newName}, {
            headers:{
                accept:'application/json',
                authorization:'Bearer ' + token
            }
        })
    }

    const getAnimalRaces = async () => {
        if(animalNameId < 0) return
        const response = await axios.get(BASE_URL + 'animals/races?id=' + animalNameId, {
            headers:{
                accept:'application/json',
                authorization:'Bearer ' + token
            }
        })
        if(response.status < 400) setAnimalRaces(response.data)
    }
    const setNewAnimalRace = async () => {
        // if(animalNameId < 0){
        //     toast('نام حیوان برای درج نژاد جدید را انتخاب کنید', {type:'error'})
        //     return false
        // }
        // else if(newRace.trim().length == 0){
        //     toast('نام نژاد جدید حیوان را وارد کنید', {type:'error'})
        //     return false
        // }
        const response = await axios.post(BASE_URL + 'races/add', {name:newRace, animal_id: animalNameId}, {headers:{
            accept:'application/json',
            authorization:'Bearer ' + token
        }})
        if(response.status < 400){ 
            setAnimalRaces(response.data)
            return true
        }
        return false
    }

    return <MobileContainer>
        <PageSection border={false}>
            <h3 className='font-bold text-xl pb-5'>نوع</h3>
            <label>نام نوع حیوان</label>
            <input type="text" placeholder="نام نوع حیوان" value={newName} onChange={e=>setNewName(e.target.value)}/>
            <input type="button" value="ثبت حیوان جدید" className="btn btn-ghost" onClick={e=>{setIsLoading(true)
            setSendNewName(true)
            }}/>
            <div className='w-full h-[200px] relative overflow-y-scroll'>
                {isLoading && sendNewName && <LoadingBackdrop />}
                <table className='my-5 p-2 w-full text-center'>
                    <thead className='border-b-2 border-sky-900'>
                        <tr>
                            <th>ردیف</th>
                            <th>نوع حیوان</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && !sendNewName && typeof animalNames != null && animalNames.length>0 && animalNames.map((name, index) => <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{name.name}</th>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </PageSection>
        <PageSection border={false}>
        <h3 className='font-bold text-xl pb-5'>نژاد</h3>
            <label>انتخاب نوع حیوان</label>
            <select id="animals-names" defaultValue={-1} onChange={e=>setAnimalNameId(e.target.value)}>
                <option value={-1}>انتخاب کنید</option>
                {(!isLoading && !sendNewName && animalNames != null) && animalNames.length>0 && animalNames.map((name, index) => <option key={index} value={name.id}>
                    {name.name}    
                </option>)}
            </select>
            <label>نام نژاد حیوان</label>
            <input type="text" placeholder="نام نوع حیوان" value={newRace} onChange={e=>setNewRace(e.target.value)}/>
            <input type="button" value="ثبت نژاد جدید" className="btn btn-ghost"
                onClick={e=>{
                    if(animalNameId < 0){
                        toast('نام حیوان برای درج نژاد جدید را انتخاب کنید', {type:'error'})
                        return
                    }
                    else if(newRace.trim().length == 0){
                        toast('نام نژاد جدید حیوان را وارد کنید', {type:'error'})
                        return
                    }
                    setIsLoading(true)
                    setSendNewRace(true)
                }}
            />
            <div className='w-full h-[200px] relative overflow-y-scroll'>
                {isLoading && sendNewRace && <LoadingBackdrop />}
                <table className='my-5 p-2 w-full text-center'>
                    <thead className='border-b-2 border-sky-900'>
                        <tr>
                            <th>ردیف</th>
                            <th>نژاد حیوان</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!isLoading && !sendNewRace && animalRaces != null) && animalRaces.length>0 && animalRaces.map((race, index) => <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{race.name}</th>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </PageSection>
    </MobileContainer>
}