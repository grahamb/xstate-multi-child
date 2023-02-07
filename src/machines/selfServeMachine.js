import { assign, createMachine } from 'xstate';
import { createContext } from 'react';

/**
 * The top-level parent (grandparent?) machine.
 * This machine will invoke child machines,
 * which in turn may invoke their own child machines.
 */
const selfServeMachine = createMachine(
  {
    id: 'SELF_SERVE_MACHINE',
    predictableActionArguments: true,
    strict: true,
    context: {
      enrolled: false
    },
    initial: 'determiningState',
    states: {
      determiningState: {
        always: [
          {
            cond: (ctx) => ctx.enrolled,
            target: 'enrolled'
          },
          {
            target: 'notEnrolled'
          }
        ]
      },
      notEnrolled: {
        initial: 'idle',
        states: {}
      },
      enrolled: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              UNENROLL: {
                actions: ['unenroll']
              }
            }
          }
        }
      },
      fatalError: {
        type: 'final'
      }
    }
  },
  {
    actions: {
      unenroll: assign(() => ({ enrolled: false })),
      enroll: assign(() => ({ enrolled: true }))
    }
  }
);

export const SelfServeMachineContext = createContext({
  selfServeService: selfServeMachine
});

export default selfServeMachine;
