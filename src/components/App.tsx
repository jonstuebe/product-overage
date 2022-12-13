import { useMemo, useState } from 'react'

const services = [
  { value: 1, label: 'All Over Color', maxAmount: 16.8 },
  { value: 10, label: 'Bleach & Tone', maxAmount: 20.6 },
  { value: 15, label: 'Full Highlight', maxAmount: 13.5 },
  { value: 20, label: 'Full Highlight w/ Root Retouch', maxAmount: 24 },
  { value: 25, label: 'Hair Painting w/ Root Retouch', maxAmount: 20.6 },
  { value: 30, label: 'Hair Painting/Balayage', maxAmount: 10.8 },
  { value: 35, label: 'Partial Highlight', maxAmount: 9 },
  { value: 40, label: 'Partial Highlight w/ Root Retouch', maxAmount: 20.6 },
  { value: 45, label: 'Root Retouch', maxAmount: 16.8 }
]

function App() {
  const [service, setService] = useState<number>(services[0].value)
  const [amount, setAmount] = useState<number | undefined>()

  const { overageLabel, overage } = useMemo<{
    overageLabel: string | undefined
    overage: number | undefined
  }>(() => {
    const _service = services.find((s) => s.value === service)

    if (_service && amount) {
      const overage = amount - _service.maxAmount

      if (overage > 0) {
        return {
          overageLabel: `Overage: ${overage.toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency'
          })}`,
          overage
        }
      }

      return { overageLabel: 'Overage: None', overage: undefined }
    }

    return { overageLabel: undefined, overage: undefined }
  }, [service, amount])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl p-4">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Overage Calculator
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select your service and enter the cost of the product to
                  calculate the overage.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                <div className="col-span-1">
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service
                  </label>
                  <div className="mt-1">
                    <select
                      id="service"
                      name="service"
                      className="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      onChange={(e) => {
                        setService(Number(e.target.value))
                      }}
                      value={service}
                    >
                      {services.map((service) => (
                        <option value={service.value} key={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      inputMode="decimal"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={amount ?? ''}
                      onChange={(e) => {
                        setAmount(
                          isNaN(e.target.valueAsNumber)
                            ? undefined
                            : e.target.valueAsNumber
                        )
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex items-center justify-start">
              {overage ? (
                <>
                  <p className="mr-2 text-sm font-medium text-gray-700">
                    {overageLabel}
                  </p>
                  {navigator.clipboard ? (
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(
                            overage.toString()
                          )
                        } catch {
                          //
                        }
                      }}
                    >
                      copy
                    </button>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
