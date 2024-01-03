/* eslint-disable react/no-unescaped-entities */

import React from 'react'
import { Command, Computer, ConciergeBell, Dribbble, Github, Globe, Linkedin, Siren } from 'lucide-react'
import Link from 'next/link'

export default function pPage() {
  return (
    <div className='w-full h-screen mt-[40px]'>
      <div className='w-full m-auto flex flex-col p-4 gap-4'>
        <div className='text-3xl font-bold'>
          Welcome to IGL (I'm Gonna Lie)
        </div>

        <div className='w-full border-8 border-yellow-600 rounded-lg p-4 flex flex-col lg:flex-row justify-around lg:items-center'>
          <div className='self-center lg:self-auto'>
            <Siren size={200} />
          </div>

          <div className='w-full lg:w-3/4 '>
            <h2 className="text-3xl font-bold mb-4">What is IGL?</h2>
            <div className='text-md font-semibold mb-6'>
              IGL is a unique platform that lets you connect with others through anonymous messaging. We believe in the power of honest expression and genuine connections, even if it means keeping things a bit mysterious.
            </div>
          </div>
        </div>

        <div className='w-full border-8 border-blue-400 rounded-lg p-4 flex flex-col lg:flex-row justify-around items-center'>
          <div className='w-full lg:w-3/4'>
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <div className="prose font-semibold">
              <ol className="list-decimal pl-6 mb-6">
                <li>Create Your Lie Link: Generate a personalized link that you can share with anyone. This link is your gateway to receiving anonymous messages.</li>
                <li>Share with Confidence: Share your Lie Link with friends, colleagues, or even strangers. Encourage them to send you messages without revealing their identity.</li>
                <li>Anonymously Connect: Receive honest and anonymous messages through your Lie Link. Dive into a world of authentic communication without the need for formal introductions.</li>
              </ol>
            </div>
          </div>

          <div className='mt-[20px]  self-center lg:self-auto'>
            <Link
              href="/messages/generate"
              className='px-8 py-2 rounded-xl text-lg border-4 border-white font-bold '>
              Get's Started
            </Link>
          </div>

        </div>

        <div className='w-full border-8 border-green-400 rounded-lg p-4 float-start flex flex-col lg:flex-row justify-around lg:items-center'>
          <div>
            <Command size={200} />
          </div>

          <div className='w-full lg:w-3/4'>
            <div className="prose">
              <h2 className="text-3xl font-bold mb-4">Why Choose IGL?</h2>
              <ul className="list-disc pl-6 mb-6">
                <li className='font-semibold'><span className="font-bold text-blue-700">Authenticity:</span> Experience conversations without preconceived notions or expectations. Allow genuine connections to unfold naturally.</li>
                <li className='font-semibold'><span className="font-bold text-green-700">Privacy:</span> Your identity remains a secret. Express yourself freely without the fear of judgment or consequences.</li>
                <li className='font-semibold'><span className="font-bold text-orange-700">Fun and Playful:</span> Embrace the lighter side of communication. Share jokes, secrets, or simply connect with others on a whole new level.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='w-full border-8 border-indigo-400 rounded-lg p-4 flex flex-col-reverse md:flex-row justify-around items-center'>

          <div className='w-full lg:w-3/4'>
            <div className="prose">
              <h2 className="text-3xl font-bold mb-4">Spread the Word</h2>
              <div className='text-md font-semibold mb-6'>
                Connect with IGL on social media and let your friends know about the platform. The more, the merrier! Join the conversation using #IGLPlatform.
              </div>
            </div>
          </div>

          <div>
            <Dribbble size={200} />
          </div>

        </div>

        <div className='w-full border-8 border-orange-400 rounded-lg p-4 flex flex-col md:flex-row justify-around lg:items-center'>
          <div>
            <Computer size={200} />
          </div>

          <div>
            <div className="prose">
              <h2 className="text-3xl font-bold mb-4">Ready to Im Gonna Lie?</h2>
              <div className='text-md font-semibold mb-6'>
                Create your Lie Link now and open the door to anonymous conversations. Because sometimes, a little mystery is all you need.
              </div>
            </div>
          </div>
        </div>


        <div className='w-full border-8 border-lime-400 rounded-lg p-4 flex justify-center flex-col items-center'>
          <div>
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          </div>

          <div className='flex flex-col lg:flex-row text-center gap-5 items-center'>
            <textarea
              placeholder='Message...'
              className='w-full lg:w-[700px] h-[100px] text-start font-bold p-3 outline-none resize-none bg-transparent 
              border-4 border-secondary rounded-lg' />

            <button
              className='text-xl font-semibold px-4 py-2 border-4 border-yellow-300 h-fit rounded-lg'>
              Send Query
            </button>
          </div>

          <div className='w-full lg:w-fit flex gap-4 my-6'>
            <Link href={"https://github.com/harshk461"} target='__blank'>
              <Github size={35} />
            </Link>
            <Link href={"https://github.com/harshk461"} target='__blank'>
              <Linkedin size={35} />
            </Link>
            <Link href={"https://github.com/harshk461"} target='__blank'>
              <Globe size={35} />
            </Link>
          </div>

          <h1 className='font-semibold'>Copyright to Harsh</h1>
        </div>
      </div>
    </div >
  )
}
